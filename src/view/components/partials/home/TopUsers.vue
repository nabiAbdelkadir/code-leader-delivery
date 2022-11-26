<template>
  <default-card title="Top Modérateur" class="mt-7" :body-card="false">
    <template #card-body>
      <pre style="color: transparent">{{ chartOptions.xaxis.categories[0] }}</pre>
      <apexchart type="bar" height="350" :options="chartOptions" :series="series" :key:="userKey"></apexchart>
    </template>
  </default-card>
</template>
<script>
export default {
  name: "TopUsers",
  data() {
    return {
      userKey: 1,
      series: [{data: []}],
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
    const users = await this.$api.getItems('/analytics/top-confirmatrice')
    //console.log('top users ' + JSON.stringify(users))
    users.forEach(user => {
      // console.log('push  user ' + JSON.stringify(user))
      this.series[0].data.push(user["count"])
      this.chartOptions.xaxis.categories.push(user["name"])
    })
    // console.log('####################')
    this.userKey++
  },
}
</script>

