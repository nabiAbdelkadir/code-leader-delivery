<template>
  <div class="overflow-auto p-2">
    <p class="text-left " v-for="(item , index ) in list" :key="index">{{ item }}</p>
  </div>
</template>

<script>
export default {
  name: "ListDetails",
  props: {
    list: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
div {
  max-height: 220px;
}
</style>