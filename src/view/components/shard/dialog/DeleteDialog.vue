<template>

  <v-dialog v-model="dialogDelete" max-width="500px">
    <v-card>
      <v-card-title class="text-h5">delete this item?</v-card-title>
      <v-card-text>Are you sure you want to delete this item?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <slot name="btn-cancel"></slot>
        <slot name="btn-ok"></slot>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
export default {
  name: "DeleteDialog",
  data() {
    return {
      dialogDelete: false,
    }
  },
  methods: {
    closeDelete() {
      this.dialogDelete = false
    }
  }
}
</script>

<style scoped>

</style>
