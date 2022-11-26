<template>
  <vs-tooltip success>
    <a
        href="#" class="btn btn-sm btn-icon btn-light-success mr-2">
      <i class="fas fa-edit"></i>
    </a>
    <template #tooltip>
      {{ text }}
    </template>
  </vs-tooltip>
</template>

<script>
export default {
  name: "MiniEditeButton",
  props: {
    text: {
      type: String,
      default: 'Éditer'
    }
  }
}
</script>

<style scoped>

</style>
