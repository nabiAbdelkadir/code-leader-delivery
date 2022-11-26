<template>

  <vs-tooltip>
    <a href="#" class="btn btn-sm btn-icon btn-light-success">
      <i class="fas fa-file-excel"></i>
    </a>
    <template #tooltip>
      Export excel
    </template>
  </vs-tooltip>

</template>

<script>
export default {
  name: "ExcelButton",
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
