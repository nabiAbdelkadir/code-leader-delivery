<template>
  <div class="mt-10">
    <div class="d-flex ">
      <span class="bullet bullet-bar align-self-stretch bg-success mr-2"></span>
      <span class="text-dark-75 font-weight-600 font-size-lg  d-block  mr-3">
                  prix d'achat : {{ buyingPrice }} DZD
    </span>
    </div>

    <div class="d-flex mt-5">
      <span class="bullet bullet-bar align-self-stretch bg-primary mr-2"></span>
      <span class="text-dark-75 font-weight-600 font-size-lg  d-block  mr-3">
                  Prix de la commande : {{ orderPrice }} DZD
    </span>
    </div>

  </div>

</template>

<script>
export default {
  name: "OrderPricing",
  props: {
    buyingPrice: {
      type: [Number, String],
      required: true
    },
    orderPrice: {
      type: [Number, String],
      required: true
    },
  }
}
</script>

<style scoped>

</style>
