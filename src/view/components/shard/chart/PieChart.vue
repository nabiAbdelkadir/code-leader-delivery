<template>
  <div>
    <apexchart
        :height="height"
        type="pie" :options="chartOptions" :series="series" :key="key"></apexchart>
  </div>

</template>

<script>
export default {
  name: "PieChart",
  props: {
    height: {
      type: [Number, String],
      default: 350
    },
  },

  data() {
    return {
      key: 1,
      series: [],
      chartOptions: {
        fill: {
          colors: ["#008FFB", '#00E396', '#FF4560', '#775DD0', '#03A9F4', '#4CAF50'],
        },
        noData: {
          text: 'Chargement...'
        },
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: [],
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
    }
  },

  created() {
    console.log('created PieChart ')
  }
}
</script>

<style scoped>

</style>
