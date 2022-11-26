<template>
  <vs-alert closable v-model="active">
    <template #title>
      Remarque
    </template>
    {{ message }}
  </vs-alert>
</template>

<script>
export default {
  name: "InfoAlert",
  props: {
    title: {
      type: String,
      default: 'Remarque'
    },
    message: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      active: true
    }
  }
}
</script>

<style scoped>

</style>
