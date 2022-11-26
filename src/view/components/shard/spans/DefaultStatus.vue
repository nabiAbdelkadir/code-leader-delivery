<template>
      <span
          :class="{'label-light-success' : isActive  ,  'label-light-danger' : !isActive}"
          class="label label-lg   label-inline ">
        <span class="font-size-sm">{{ isActive ? activeText : InActiveText }}</span>
      </span>
</template>

<script>
export default {
  name: "DefaultStatus",
  props: {
    isActive: {
      type: Boolean,
      required: true
    },
    activeText: {
      type: String,
      default: 'Active',
    },
    InActiveText: {
      type: String,
      default: 'Inactif',
    },
  }
}
</script>

<style scoped>
span {
  font-size: 0.85em!important;
  font-weight: 600!important;
}
</style>
