<template>
  <div>
    <bar-chart :series="series" :categories="categories" v-if="false"/>
    <pie-chart ref="pie-chart"/>
  </div>

</template>

<script>
export default {
  name: "AnalyticsProductDetails",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      key: 1,
      series: [{
        name: 'status',
        data: []
      }],
      categories: ['En confirmation', 'dispatch & livraison', 'Livrée & Encaissée', 'Retournée & échouée'],
    }
  },
  methods: {
    init() {
      setTimeout(() => {
        console.log('created Analytics-ProductDetails')
        const {inConfirmation: a, dispatch_inDelivery: b, delivery_payments: c, return_failed: d} = this.item
        this.series[0].data = [a, b, c, d]

        this.$refs['pie-chart'].series = [a, b, c, d]
        this.$refs['pie-chart'].chartOptions.labels = this.categories
        this.$refs['pie-chart'].key++
      }, 500)
    },
  },

  created() {
    this.init()
  }
}
</script>

<style scoped>

</style>
