<template>
  <apexchart type="bar" :options="options" :series="series" :key="key"></apexchart>
</template>


<script>
export default {
  name: "BarChart",
  props: {
    categories: {
      type: Array,
      required: true
    },
    series: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      key: 1,
      options: {
        chart: {id: 'vuechart-example'},
        noData: {
          text: 'Loading...'
        },
        xaxis: {
          categories: []
        },
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            distributed: true,
          }
        },
      },
    }
  },
  created() {
    this.options.xaxis.categories = this.categories
  }
}
</script>

<style scoped>

</style>
