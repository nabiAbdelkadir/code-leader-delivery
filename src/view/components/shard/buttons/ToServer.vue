<template>
  <div>
    <div class="btn btn-primary " @click="submitForm">
      {{ btnSave }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ToServer",
  props: {
    isCreate: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
