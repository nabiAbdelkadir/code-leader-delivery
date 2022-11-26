<template>
  <div>
    <apexchart
        :height="height"
        type="polarArea" :options="options" :series="series" :key="key"></apexchart>
  </div>
</template>

<script>
export default {
  name: "PolarAreaChart",
  props: {
    labels: {
      type: Array,
      required: true
    },
    series: {
      type: Array,
      required: true
    },
    height: {
      type: [Number, String],
      default: 350
    },
  },
  data() {
    return {
      key: 1,
      showEmptyData: false,
      options: {
        yaxis: {
          show: true
        },
        noData: {
          text: 'Chargement ...'
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
      //series: [],
    }
  },

  async created() {
    this.options.labels = this.labels
  }
}
</script>

<style scoped>
.apexcharts-text {
  display: none !important;
}
</style>
