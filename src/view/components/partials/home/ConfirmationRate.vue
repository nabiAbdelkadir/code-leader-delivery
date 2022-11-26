<template>
  <default-card title="Taux de confirmation" :body-card="false">
    <template #card-body>
      <pie-chart ref="pie-chart" :height="450"/>
    </template>
  </default-card>
</template>

<script>

export default {
  name: "ConfirmationRate",
  data() {
    return {
      confirmationRate: [],
    }
  },
  methods: {
    async init() {
      const {totatl01: t, confirme01: c} = this.confirmationRate

      this.$refs['pie-chart'].series = [c, t - c]
      this.$refs['pie-chart'].chartOptions.labels = [`confirm (${c})`, `cancel (${t - c})`, `total (${t})`]
      this.$refs['pie-chart'].key++
    }
  },
  async created() {
    this.confirmationRate = await this.$api.getItems('/analytics/confirmation-rate')
    await this.init()
  }
}
</script>

<style scoped>

</style>
