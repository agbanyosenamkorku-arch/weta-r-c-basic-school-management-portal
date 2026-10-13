import {
  Body,
  Controller,
  Headers,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as rawBody from 'raw-body';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('checkout')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'PARENT')
  async createCheckout(
    @Body() body: {
      amount: number;
      currency?: string;
      studentId: string;
      feeId?: string;
      successUrl: string;
      cancelUrl: string;
    },
  ) {
    return this.paymentsService.createCheckoutSession(body);
  }

  @Post('webhook')
  async webhook(@Req() req: Request, @Res() res: Response, @Headers('stripe-signature') signature: string) {
    const buf = await rawBody(req);
    try {
      await this.paymentsService.handleStripeWebhook(signature, buf);
      res.status(200).send('ok');
    } catch (error) {
      res.status(400).send('webhook error');
    }
  }
}
