<template>
  <div>


    <vs-tooltip success v-if="showTooltip">
      <a
          href="#" class="btn btn-sm btn-icon btn-light-success  mr-2">
        <i class="fa fa-check"></i>
      </a>
      <template #tooltip>
        {{ text }}
      </template>
    </vs-tooltip>
    <a
        v-else
        href="#" class="btn btn-sm btn-icon btn-light-success mr-2">
      <i class="fa fa-check"></i>
    </a>
  </div>
</template>

<script>
export default {
  name: "MiniValidateButton",
  props: {
    text: {
      type: String,
      default: 'ajouter'
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
