<template>
  <default-card title="Taux de Livraison" :body-card="false">
    <template #card-body>
      <pie-chart ref="pie-chart" :height="450"/>
    </template>
  </default-card>
</template>

<script>
export default {
  name: "DeliveryRate",
  data() {
    return {
      deliveryRate: [],
    }
  },
  methods: {
    async init() {
      const {totatl: t, delivred: d, returned: r} = this.deliveryRate
      const temp = t - (d + r)
      this.$refs['pie-chart'].series = [d, r, temp]
      this.$refs['pie-chart'].chartOptions.labels =
          [`delivred (${d})`, `cancel (${r})`, `auter  (${temp})`, `total (${t})`]

      this.$refs['pie-chart'].key++
    }
  },
  async created() {
    this.deliveryRate = await this.$api.getItems('/analytics/delivery-rate')
    await this.init()
  }
}
</script>

<style scoped>

</style>
