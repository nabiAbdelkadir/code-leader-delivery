<template>
  <div>
    <div
        v-b-tooltip.hover :title="text" class="btn btn-sm btn-icon btn-light-primary mr-2">
      <i class="fa fa-plus"></i>
    </div>

    <!--
    <vs-tooltip primary v-if="showTooltip">
      <a
          href="#" class="btn btn-sm btn-icon btn-light-primary mr-2">
        <i class="fa fa-plus"></i>
      </a>
      <template #tooltip>
        {{ text }}
      </template>
    </vs-tooltip>
    <a
        v-else
        href="#" class="btn btn-sm btn-icon btn-light-primary mr-2">
      <i class="fa fa-plus"></i>
    </a>
    -->
  </div>


</template>

<script>
export default {
  name: "MiniAddButton",
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
