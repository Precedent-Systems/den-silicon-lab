import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const { items, customerEmail } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: item.description || 'Den Silicon Lab Vintage PC Hardware',
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100), // Amount in cents
      },
      quantity: item.quantity || 1,
    }));

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // 2026 Stripe Best Practice: Dynamic payment methods enabled by omitting payment_method_types
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      customer_email: customerEmail || undefined,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      integration_identifier: 'den_silicon_lab_v1_c8x9q2m1',
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('[Stripe Checkout Error]:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
