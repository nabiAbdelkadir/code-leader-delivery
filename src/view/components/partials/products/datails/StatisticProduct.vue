<template>
  <div class="row">

    <div class="col-lg-12 ">
      <default-card :body-card="false" title="statistic product" class="">
        <template #card-body>
          <empty-chart v-if="showEmptyData"/>

          <apexchart
              v-else
              type="polarArea" height="350" :options="options" :series="series" :key="key"></apexchart>
        </template>
      </default-card>
    </div>

  </div>

</template>

<script>
export default {
  name: "StatisticProduct",
  data() {
    return {
      key: 1,
      showEmptyData: false,
      options: {
        yaxis: {
          show: true
        },
        noData: {
          text: 'Chargement...'
        },
        chart: {
          type: 'polarArea',
        },
        fill: {
          opacity: 0.8
        },
        //labels: ['April', 'May', 'June', 'July', 'August', 'September'],
        labels: [],
        stroke: {
          colors: ['#fff']
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
      series: [],
    }
  },
  async created() {
    const {id} = this.$route.params
    setTimeout(async () => {
      const sources = await this.$api.getItems(`/analytics/analytics-confirmation/${id}`)
      if (sources.length === 0)
        this.showEmptyData = true
      sources.forEach(source => {
        this.series.push(source["count"])
        this.options.labels.push(source["status"])
      })
      this.key++
    }, 2000)


  }
}
</script>

<style scoped>
.apexcharts-text {
  display: none !important;
}
</style>
