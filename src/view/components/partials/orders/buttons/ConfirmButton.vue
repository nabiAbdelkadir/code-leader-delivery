<template>
  <vs-tooltip success>
    <button href="#"
            class="btn btn-light-success px-6 font-weight-bold"
            @click="deleteOrderById">
      <i class="flaticon2-pie-chart"></i>
      confirmation
    </button>
    <template #tooltip>
      {{ tooltipMessage }}
    </template>
  </vs-tooltip>

</template>

<script>
export default {
  name: "ConfirmButton",
  computed: {
    selected() {
      return this.$parent.$data.selected
    },
    tooltipMessage() {
      return this.selected.length === 0 ? 'aucun élément sélectionné' : 'confirmer les commandes';
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
