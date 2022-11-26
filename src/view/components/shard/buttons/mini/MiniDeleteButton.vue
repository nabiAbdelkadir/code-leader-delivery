<template>
  <vs-tooltip danger>
    <a
        href="#" class="btn btn-sm btn-icon btn-light-danger mr-2">
      <i class="flaticon2-rubbish-bin-delete-button"></i>
    </a>
    <template #tooltip v-if="vsTooltip">
      Supprimer
    </template>
  </vs-tooltip>
</template>

<script>
export default {
  name: "MiniDeleteButton",
  props: {
    vsTooltip: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>

</style>
