import { PUBLIC_API_URL } from '$env/static/public'
import { stripe } from '$lib/clients/stripe'
import { randomPassword } from '$lib/encryption'
import { deliverAt, weekday } from '$lib/formatters'
import type { Kiosk, Product, Bundle } from '$lib/payload-types'
import { json, type Action, type RequestHandler } from '@sveltejs/kit'
import { DateTime } from 'luxon'

export const POST: RequestHandler = async ({ request, url }) => {

  const { customer, items, kiosk, interval, coupon } = await request.json() as { customer: string, kiosk: Kiosk, interval: string, items: {
    product: string
    bundle: string
    price: number
    size: number
    quantity: number
  }[], coupon?: string }

  console.log(items)

  const today = new Date()
  const id = `${today.getFullYear()}_${today.getMonth()}_${randomPassword(3)}`

  if (interval === 'one-time') {
    let invoice = await stripe.invoices.create({
      customer,
      auto_advance: false,
      discounts: coupon ? [{ coupon }] : [],
      metadata: {
        id,
        kiosk: kiosk.id,
        deliver_at: deliverAt(kiosk.open_hours[0].weekdays[0], kiosk.minimum_order_days).toISO()
      },
      expand: ['payment_intent'],
      currency: 'CAD',
      collection_method: 'charge_automatically',
      payment_settings: {
        payment_method_types: ['card', 'acss_debit'],
        payment_method_options: {
          acss_debit: {
            mandate_options: {
              // payment_schedule: 'combined',
              // interval_description: 'when any invoice becomes due',
              transaction_type: 'personal',
            },
          },
        },
      },
    }, {
      stripeAccount: 'acct_1LpynD4IazTmFSzT'
    })

    for (let index = 0; index < items.length; index++) {
      const { product, bundle, price, size, quantity } = items[index]

      await stripe.invoiceItems.create({
        invoice: invoice.id,
        customer,
        price_data: {
          product: {'Radis Mauve': 'radis-mauve', 'Découverte': 'decouverte'}[product || bundle] || (product || bundle),
          currency: 'CAD',
          unit_amount: Math.round(price * 100)
        },
        quantity,
        metadata: {
          size,
        },
      }, {
        stripeAccount: 'acct_1LpynD4IazTmFSzT'
      })
    }

    invoice = await stripe.invoices.finalizeInvoice(invoice.id, {
      auto_advance: false,
      expand: ['payment_intent'],
    }, {
      stripeAccount: 'acct_1LpynD4IazTmFSzT'
    })
    console.log(invoice)
  
    if (invoice) {
      return json(invoice)
    }
  }

  const split = interval.split('-')
  const subscription = await stripe.subscriptions.create({
    customer,
    coupon,
    items: items
      .map(({ size, quantity, product, bundle, price }) => 
      ({
        price_data: {
          product: {'Radis Mauve': 'radis-mauve', 'Découverte': 'decouverte'}[product || bundle] || (product || bundle),
          unit_amount: Math.round(price * 100),
          currency: 'CAD',
          recurring: {
            interval: split[0] as 'week',
            interval_count: parseInt(split[1])
          },
        },
        metadata: {
          size,
        },
        quantity
      })),
    metadata: {
      id,
      kiosk: kiosk.id,
      deliver_at: deliverAt(kiosk.open_hours[0].weekdays[0], kiosk.minimum_order_days).toISO()
    },
    // trial_end: deliverAt(kiosk.open_hours[0].weekdays[0], kiosk.minimum_order_days).toUnixInteger(),
    expand: ['latest_invoice.payment_intent'],
    currency: 'CAD',
    payment_behavior: 'default_incomplete',
    // transfer_data: {
    //   destination: 'acct_1LpynD4IazTmFSzT'
    // },
    payment_settings: {
      save_default_payment_method: 'on_subscription',
      payment_method_types: ['card', 'acss_debit'],
      payment_method_options: {
        acss_debit: {
          mandate_options: {
            // payment_schedule: '',
            // interval_description: 'when any invoice becomes due',
            transaction_type: 'personal',
          },
        },
      },
    },
  }, {
    stripeAccount: 'acct_1LpynD4IazTmFSzT'
  })

  console.log(subscription)

  if (subscription) {
    return json(subscription)
  }
}

