<template>
  <default-card :body-card="false" title="Historique">
    <template #card-body>
      <div v-for="(item , index ) in history" :key="index"
           :class="{'border-bottom' : index !== history.length-1}"
           class="d-flex align-items-center justify-content-between mb-2 mt-5 pb-2 ">
        <span class="font-weight-bold">{{ item.heading }} </span>
        <span class="font-weight-bold " :class="item.textColor">{{ product[item.key] }} </span>
      </div>
    </template>
  </default-card>
</template>


<script>
export default {
  name: "HistoryProduct",
  data() {
    return {
      keys: ['created', 'inDispatch', 'inDelivery', 'canceled'],
      history: [
        {
          heading: 'Crée',
          textColor: "text-primary",
          key: 'created',
        },
        {
          heading: 'Expédiée',
          textColor: "text-success",
          key: 'inDispatch',
        },
        {
          heading: 'Livrée',
          textColor: "text-warning",
          key: 'inDelivery',
        },
        {
          heading: 'Annulée',
          textColor: "text-danger",
          key: 'canceled',
        }
      ],
      product: {
        created: 0,
        inDispatch: 0,
        inDelivery: 0,
        canceled: 0
      }
    }
  },
  async created() {
    const {id} = this.$route.params
    this.product = await this.$api.getItems(`/analytics/history/${id}`)
  }
}
</script>

