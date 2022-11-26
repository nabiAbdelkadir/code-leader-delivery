<template>
  <button
      class="btn btn-primary px-6 font-weight-bold align-self-center">
    <i class="flaticon2-pie-chart" v-if="false"></i>
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "PrimaryButton",
  props: {
    text: {
      type: String,
      default: 'Enregistrer'
    },
    showIcon: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
