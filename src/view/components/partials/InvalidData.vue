<template>
  <b-form-invalid-feedback
  >{{ data }}
  </b-form-invalid-feedback>
</template>

<script>
export default {
  name: "InvalidData",
  props: {
    data: {
      type: String,
      default: 'this field is required'
    }
  }
}
</script>
