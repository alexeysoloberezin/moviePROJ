<template>
  <div>
    <button @click="submit">Pay now!</button>
  </div>
</template>

<script lang="ts">
export default {
  components: {
  },
  data () {
    return {
      loading: false,
      publishableKey: '',
      lineItems: [
        {
          price: 'some-price-id', // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      successURL: 'your-success-url',
      cancelURL: 'your-cancel-url',
    };
  },
  methods: {
    submit () {
    },
  },
};
</script>