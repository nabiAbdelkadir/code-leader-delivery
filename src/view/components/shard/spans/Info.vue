<template>
  <span
      :class="{'label-light-primary' : isPrimary  ,  'label-light-info' : !isPrimary}"
      class="label label-lg  label-inline">
            {{ text }}
  </span>
</template>

<script>
export default {
  name: "Info",
  props: {
    text: {
      type: String,
      required: true
    },
    isPrimary: {
      type: Boolean,
      default: true
    },
  }
}
</script>

<style scoped>

</style>
