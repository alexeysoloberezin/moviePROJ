import { StripePlugin } from '@vue-stripe/vue-stripe';

export const initStripe = (app) => {
  const options = {
    pk: '',
    stripeAccount: '',
    apiVersion: '',
    locale: '',
  };

  app.use(StripePlugin, options);
}
