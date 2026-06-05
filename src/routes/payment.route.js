import router from 'express';
import express from 'express';
import { handleWebhook } from '../controller/webhook.controller.js';

const paymentRouter = router();

/**
 * POST /api/payment/webhook
 * Razorpay webhook — uses raw body parser for signature verification
 * No auth middleware (Razorpay calls this endpoint directly)
 */
paymentRouter.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  handleWebhook
);

export default paymentRouter;
