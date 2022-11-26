<template>
  <button

      class="btn btn-success px-6 font-weight-bold align-self-center" >
    <i class="flaticon2-pie-chart" v-if="showIcon"></i>
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "SuccessButton",
  props: {
    text: {
      type: String,
      default: 'Éditer'
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
