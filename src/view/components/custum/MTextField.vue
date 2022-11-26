<template>
  <v-text-field
      :label="label"
      class="form-control form-control-solid"
      outlined
      dense
      clearable
      v-bind="$attrs"
  ></v-text-field>
</template>
<script>
export default {
  name: "MTextField",
  props: ['label', 'error', 'input']
}
</script>
