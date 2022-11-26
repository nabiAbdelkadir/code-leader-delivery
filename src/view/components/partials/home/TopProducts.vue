<template>
  <default-card title="Top products" class="mt-7" :body-card="false">
    <template #card-body>
      <apexchart type="bar" :options="options" :series="series" :key="key"></apexchart>
    </template>

  </default-card>
</template>

<script>
export default {
  name: "TopProducts",
  data() {
    return {
      key: 1,
      options: {
        fill: {
          colors: ["#008FFB", '#00E396', '#FF4560', '#775DD0', '#03A9F4', '#4CAF50'],
        },
        chart: {id: 'vuechart-example'},
        xaxis: {
          //categories: ['product01', 1992, 1993, 1994, 1995, 1996, 1997, 1998]
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
      series: [{
        name: 'N produit',
        //data: [30, 40, 45, 50, 49, 60, 70, 91]
        data: []
      }]
    }
  },
  async beforeCreate() {
    const products = await this.$api.getItems('/analytics/top-products')
    //console.log('products ' + JSON.stringify(products))

    if (products.length > 8)
      products.length = 8
    //console.log('toProducts ' + JSON.stringify(products))

    products.forEach(product => {
      this.series[0].data.push(product['ProductCount'])
      this.options.xaxis.categories
          .push(product['product.nameFr'] ? product['product.nameFr'] : '')
    })
    this.key++
  }
}
</script>

<style scoped>

</style>
