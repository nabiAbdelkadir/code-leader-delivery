<template>
  <default-card :body-card="false" title="performance">
    <template #card-body>
      <div class="row">
        <div class="text-center col" v-for="(p ,index ) in performance" :key="index">
          <div class="d-flex justify-center" style="justify-content: center">
            <p class="font-weight-bold h6 heading">
              {{ p.heading }}
            </p>

            <vs-tooltip shadow>
              <i class="ml-2 fa fa-eye fa-sm"></i>
              <template #tooltip>
                {{ p.heading }}
              </template>
            </vs-tooltip>
          </div>
          <p class="text-center text-success h2">{{ p.value }}</p>
          <p class="font-size-xs text-muted">{{ p.description }}</p>
        </div>
      </div>
    </template>
  </default-card>
</template>

<script>
export default {
  name: "PerformanceProduct",//
  data() {
    return {
      performance: [
        {
          heading: 'Taux de livraision',
          value: '12 %',
          description: 'comprant la dernire perode'
        },

        /*{
          heading: 'Moy de commandes/jours',
          value: '0 %',
          description: 'comprant la dernire perode'
        },
        * */

        {
          heading: 'Taux de confirmation',
          value: '0 %',
          description: 'comprant la dernire perode'
        },
        {
          heading: "Taux d'annulation",
          value: '0 %',
          description: 'comprant la dernire perode'
        },
        {
          heading: 'Quantité Disponible',
          value: '',
          description: 'comprant la dernire perode'
        },
      ]
    }
  },

  methods: {
    getPercent(res, key) {
      return res[key] != null ? (res[key]).toFixed(2) + ' %' : '0 %'
    }
  },

  async created() {
    const {id} = this.$route.params
    const res = await this.$api.getItems(`/analytics/products/performance/${id}`)

    this.performance[0].value = this.getPercent(res, 'deliveryRate')
    this.performance[1].value = this.getPercent(res, 'confirmationRate')
    this.performance[2].value = this.getPercent(res, 'cancelRate')
    this.performance[3].value = res['quantity']
  }
}
</script>

<style scoped>
.heading {
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
