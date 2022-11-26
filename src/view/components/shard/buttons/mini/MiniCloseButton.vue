<template>
  <div>
    <vs-tooltip warn v-if="showTooltip">
      <a
          href="#" class="btn btn-sm btn-icon btn-light-warning  mr-2">
        <i class="fa fa fa-times"></i>
      </a>
      <template #tooltip>
        {{ text }}
      </template>
    </vs-tooltip>
    <a
        v-else
        href="#" class="btn btn-sm btn-icon btn-light-warning mr-2">
      <i class="fa fa fa-times"></i>
    </a>
  </div>
</template>

<script>
export default {
  name: "MiniCloseButton",
  props: {
    text: {
      type: String,
      default: 'Cacher'
    },
    showTooltip: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>

</style>
