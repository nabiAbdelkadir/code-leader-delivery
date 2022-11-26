<template>
  <div>
    <vs-tooltip danger v-if="showTooltip">
      <a
          href="#" class="btn btn-sm btn-icon btn-light-danger mr-2">
        <i class="fas fa-minus"></i>
      </a>
      <template #tooltip>
        {{ text }}
      </template>
    </vs-tooltip>
    <a
        v-else
        href="#" class="btn btn-sm btn-icon btn-light-danger mr-2">
      <i class="fas fa-minus"></i>
    </a>
  </div>
</template>

<script>
export default {
  name: "MiniWithdrawButton",
  props: {
    text: {
      type: String,
      default: 'Retirer'
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
