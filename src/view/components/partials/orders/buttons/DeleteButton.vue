<template>
  <vs-tooltip danger>
    <button href="#"
            class="btn btn-danger px-6 font-weight-bold"
            @click="deleteOrderById">
      <i class="flaticon2-pie-chart"></i>
      Supprimer
    </button>
    <template #tooltip>
      {{ tooltipMessage }}
    </template>
  </vs-tooltip>

</template>

<script>
export default {
  name: "DeleteButton",
  computed: {
    selected() {
      return this.$parent.$data.selected
    },
    tooltipMessage() {
      return this.selected.length === 0 ? 'aucun élément sélectionné' : 'Supprimer les commandes';
    }
  },
  methods: {
    deleteOrderById() {
      this.selected.forEach(order => this.$store.dispatch('deleteOrderById', order.id))
    }
  },

  watch: {
    selected: function (newVal, oldVal) {
      //console.log(`selected ` + JSON.stringify(newVal))
    },
  }
}
</script>
