import { Injectable, BadRequestException } from '@nestjs/common';
import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';

const stripe = new Stripe(process.env.STRIPE_SECRET || 'sk_test_placeholder', {
  apiVersion: '2022-11-15',
});

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createCheckoutSession(params: {
    amount: number;
    currency?: string;
    studentId: string;
    feeId?: string;
    successUrl: string;
    cancelUrl: string;
  }) {
    const { amount, currency = 'usd', studentId, feeId, successUrl, cancelUrl } = params;
    if (!amount) throw new BadRequestException('Amount required');

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency,
            product_data: { name: `School Fee ${feeId ?? ''}` },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { studentId, feeId },
    });

    await this.prisma.payment.create({
      data: {
        studentId,
        feeId,
        amount,
        currency,
        provider: 'stripe',
        providerRef: session.id,
        status: 'PENDING',
      },
    });

    return { url: session.url, id: session.id };
  }

  async handleStripeWebhook(signature: string, payload: Buffer) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder';
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (error) {
      throw new BadRequestException('Invalid webhook signature');
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const sessionId = session.id;
      await this.prisma.payment.updateMany({
        where: { providerRef: sessionId },
        data: { status: 'SUCCEEDED' },
      });

      if (session.metadata?.feeId) {
        await this.prisma.fee.update({
          where: { id: session.metadata.feeId },
          data: { status: 'PAID' },
        });
      }
    }

    return { received: true };
  }
}
