import { PUBLIC_API_URL } from '$env/static/public'
import { stripe } from '$lib/clients/stripe'
import { randomPassword } from '$lib/encryption'
import type { Kiosk, Product } from '$lib/payload-types'
import { json, type Action, type RequestHandler } from '@sveltejs/kit'
import { DateTime } from 'luxon'

export const POST: RequestHandler = async ({ request, url }) => {

  const { customer, items, kiosk, interval, coupon } = await request.json() as { customer: string, kiosk: Kiosk, interval: string, items: {
    product: string
    size: number
    quantity: number
  }[], coupon?: string }

  const today = new Date()
  const id = `${today.getFullYear()}_${today.getMonth()}_${randomPassword(3)}`

  if (interval === 'one-time') {
    let invoice = await stripe.invoices.create({
      customer,
      auto_advance: false,
      discounts: coupon ? [{ coupon }] : [],
      // line_items: (await Promise.all(items.map(async item => ({ ...item, product: await (await fetch(`${PUBLIC_API_URL}/products/${item.product}`)).json() as Product })))).map(({ size, quantity, product }) => 
      //   ({
      //     product_data: { id: product.id, name: product.title, metadata: {
      //       size,
      //       unit: product.unit
      //     } },
      //     price_data: { unit_amount: Math.round(product.price * size * product.sizes.find(s => size === s.size).adjustment * 100) },
      //     quantity,
          
      //   }),
      // ),
      metadata: {
        id,
        kiosk: kiosk.id,
        deliver_at: DateTime.now().set({ weekday: 4 }).plus({ days: kiosk.minimum_order_days }).toISO()
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
      const { product, size, quantity } = items[index]
      const p = await (await fetch(`${PUBLIC_API_URL}/products/${product}`)).json() as Product
      await stripe.invoiceItems.create({
        invoice: invoice.id,
        customer,
        price_data: {
          product: p.id,
          currency: 'CAD',
          unit_amount: Math.round(p.price * size * p.sizes.find(s => size === s.size).adjustment * 100)
        },
        quantity,
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
    items: (await Promise.all(items.map(async item => ({ ...item, product: await (await fetch(`${PUBLIC_API_URL}/products/${item.product}`)).json() as Product })))).map(({ size, quantity, product }) => 
      ({
        price_data: {
          product: product.id,
          unit_amount: Math.round(product.price * size * product.sizes.find(s => size === s.size).adjustment * 100),
          currency: 'CAD',
          recurring: {
            interval: split[0] as 'week',
            interval_count: parseInt(split[1])
          },
        },
        metadata: {
          size,
          unit: product.unit
        },
        quantity
      }),
    ),
    metadata: {
      id,
      kiosk: kiosk.id,
      deliver_at: DateTime.now().set({ weekday: 4 }).plus({ days: kiosk.minimum_order_days }).toISO()
    },
    // trial_end: DateTime.now().set({ weekday: 4 }).plus({ days: kiosk.minimum_order_days }).toUnixInteger(),
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

