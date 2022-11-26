<template>
  <div>
    <pie-chart ref="wilaya-pie-chart"/>
  </div>
</template>

<script>
export default {
  name: "AnalyticsWilayaDetails",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      series: [{
        name: 'status',
        data: []
      }],
      categories: ['dispatch & livraison', 'Livrée & Encaissée', 'Retournée & échouée'],
    }
  },
  created() {
    // const {dispatch_inDelivery: a, delivery_payments: b, return_failed: c} = this.item
    //this.series[0].data = [a, b, c]


    setTimeout(() => {
      const {dispatch_inDelivery: a, delivery_payments: b, return_failed: c} = this.item
      //this.series[0].data = [a, b, c]

      this.$refs['wilaya-pie-chart'].series = [a, b, c]
      this.$refs['wilaya-pie-chart'].chartOptions.labels = this.categories
      this.$refs['wilaya-pie-chart'].key++
    }, 500)


  }
}
</script>

<style scoped>

</style>
