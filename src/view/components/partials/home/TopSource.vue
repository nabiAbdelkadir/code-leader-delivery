<template>
  <default-card title="Top Source" class="mt-7" :body-card="false">
    <template #card-body>
      <apexchart type="bar" height="350" :options="chartOptions" :series="series" :key="key"></apexchart>
    </template>
  </default-card>
</template>

<script>
export default {
  name: "TopSource",
  data() {
    return {
      key: 1,
      series: [{
        data: []
      }],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350
        },
        noData: {
          text: 'Loading...'
        },
        plotOptions: {
          bar: {
            borderRadius: 8,
            horizontal: true,
            distributed: true
          }
        },
        dataLabels: {
          enabled: true
        },
        xaxis: {
          categories: [],
        }
      },
    }
  },
  async created() {
    const sources = await this.$api.getItems('/analytics/top-sources')
    sources.forEach(source => {
      this.series[0].data.push(source["count"])
      this.chartOptions.xaxis.categories.push(source["source"] ? source["source"].name : 'local')
    })
    this.key++
  }
}
</script>

<style scoped>

</style>
