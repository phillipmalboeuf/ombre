import { PUBLIC_API_URL } from '$env/static/public'
import { stripe } from '$lib/clients/stripe'
import { randomPassword } from '$lib/encryption'
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

  const split = interval.split('-')
  const quote = await stripe.quotes.create({
    customer,
    discounts: coupon ? [{ coupon }] : [],
    metadata: {
      id,
      kiosk: kiosk.id,
      deliver_at: DateTime.now().set({ weekday: 4 }).plus({ days: kiosk.minimum_order_days }).toISO()
    },
    // currency: 'CAD',
    collection_method: 'charge_automatically',
    // payment_settings: {
    //   payment_method_types: ['card', 'acss_debit'],
    //   payment_method_options: {
    //     acss_debit: {
    //       mandate_options: {
    //         // payment_schedule: 'combined',
    //         // interval_description: 'when any invoice becomes due',
    //         transaction_type: 'personal',
    //       },
    //     },
    //   },
    // },
    line_items: items.map(({ product, bundle, price, size, quantity }) => ({
      price_data: {
        product: {'Radis Mauve': 'radis-mauve', 'Découverte': 'decouverte'}[product || bundle] || (product || bundle),
        currency: 'CAD',
        unit_amount: price * 100,
        ...interval !== 'one-time' && {
          recurring: {
            interval: split[0] as 'week',
            interval_count: parseInt(split[1])
          }
        }
      },
      quantity,
      metadata: {
        size,
      },
    }))
  }, {
    stripeAccount: 'acct_1LpynD4IazTmFSzT'
  })

  const { invoice } = await stripe.quotes.accept(quote.id, { expand: ['invoice.payment_intent'] }, {
    stripeAccount: 'acct_1LpynD4IazTmFSzT'
  })
  console.log(invoice)

  return json(invoice)

  // if (interval === 'one-time') {
  //   let invoice = await stripe.invoices.create({
  //     customer,
  //     auto_advance: false,
  //     discounts: coupon ? [{ coupon }] : [],
  //     metadata: {
  //       id,
  //       kiosk: kiosk.id,
  //       deliver_at: DateTime.now().set({ weekday: 4 }).plus({ days: kiosk.minimum_order_days }).toISO()
  //     },
  //     expand: ['payment_intent'],
  //     currency: 'CAD',
  //     collection_method: 'charge_automatically',
  //     payment_settings: {
  //       payment_method_types: ['card', 'acss_debit'],
  //       payment_method_options: {
  //         acss_debit: {
  //           mandate_options: {
  //             // payment_schedule: 'combined',
  //             // interval_description: 'when any invoice becomes due',
  //             transaction_type: 'personal',
  //           },
  //         },
  //       },
  //     },
  //   }, {
  //     stripeAccount: 'acct_1LpynD4IazTmFSzT'
  //   })

  //   await Promise.all(items.map(({ product, bundle, price, size, quantity }) => stripe.invoiceItems.create({
  //       invoice: invoice.id,
  //       customer,
  //       price_data: {
  //         product: {'Radis Mauve': 'radis-mauve', 'Découverte': 'decouverte'}[product || bundle] || (product || bundle),
  //         currency: 'CAD',
  //         unit_amount: price * 100
  //       },
  //       quantity,
  //       metadata: {
  //         size,
  //       },
  //     }, {
  //       stripeAccount: 'acct_1LpynD4IazTmFSzT'
  //     })
  //   ))

  //   invoice = await stripe.invoices.finalizeInvoice(invoice.id, {
  //     auto_advance: false,
  //     expand: ['payment_intent'],
  //   }, {
  //     stripeAccount: 'acct_1LpynD4IazTmFSzT'
  //   })
  //   console.log(invoice)
  
  //   if (invoice) {
  //     return json(invoice)
  //   }
  // }

  // const split = interval.split('-')
  // const subscription = await stripe.subscriptions.create({
  //   customer,
  //   coupon,
  //   items: items
  //     .map(({ size, quantity, product, bundle, price }) => 
  //     ({
  //       price_data: {
  //         product: {'Radis Mauve': 'radis-mauve', 'Découverte': 'decouverte'}[product || bundle] || (product || bundle),
  //         unit_amount: price * 100,
  //         currency: 'CAD',
  //         recurring: {
  //           interval: split[0] as 'week',
  //           interval_count: parseInt(split[1])
  //         },
  //       },
  //       metadata: {
  //         size,
  //       },
  //       quantity
  //     })),
  //   metadata: {
  //     id,
  //     kiosk: kiosk.id,
  //     deliver_at: DateTime.now().set({ weekday: 4 }).plus({ days: kiosk.minimum_order_days }).toISO()
  //   },
  //   // trial_end: DateTime.now().set({ weekday: 4 }).plus({ days: kiosk.minimum_order_days }).toUnixInteger(),
  //   expand: ['latest_invoice.payment_intent'],
  //   currency: 'CAD',
  //   payment_behavior: 'default_incomplete',
  //   // transfer_data: {
  //   //   destination: 'acct_1LpynD4IazTmFSzT'
  //   // },
  //   payment_settings: {
  //     save_default_payment_method: 'on_subscription',
  //     payment_method_types: ['card', 'acss_debit'],
  //     payment_method_options: {
  //       acss_debit: {
  //         mandate_options: {
  //           // payment_schedule: '',
  //           // interval_description: 'when any invoice becomes due',
  //           transaction_type: 'personal',
  //         },
  //       },
  //     },
  //   },
  // }, {
  //   stripeAccount: 'acct_1LpynD4IazTmFSzT'
  // })

  // console.log(subscription)

  // if (subscription) {
  //   return json(subscription)
  // }
}

