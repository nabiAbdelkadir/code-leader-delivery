<template>
  <pie-chart ref="user-chart"/>
</template>

<script>
export default {
  name: "AnalyticsUserDetails",
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
      categories: ['Assingées', 'En confirmation', 'confirmé', 'Annulée'],
    }
  },
  created() {
    setTimeout(() => {
      const {assaulted: a, inConfirmation: b, confirmed: c, canceled: d} = this.item
      this.series[0].data = [a, b, c, d]

      this.$refs['user-chart'].series = [a, b, c, d]
      this.$refs['user-chart'].chartOptions.labels = this.categories
      this.$refs['user-chart'].key++
    }, 500)


  }
}
</script>
