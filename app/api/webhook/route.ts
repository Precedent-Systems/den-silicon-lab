import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: 'Missing webhook signature or secret' },
      { status: 400 }
    );
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`[Webhook Signature Verification Failed]: ${err.message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle order fulfillment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    if (session.payment_status !== 'unpaid') {
      console.log(`[+] Order Paid: ${session.id} for ${session.customer_details?.email}`);
      // TODO: Fulfill order, update database, send email confirmation to Don
    }
  } else if (event.type === 'checkout.session.async_payment_succeeded') {
    const session = event.data.object as any;
    console.log(`[+] Async Payment Succeeded: ${session.id}`);
  }

  return NextResponse.json({ received: true });
}
