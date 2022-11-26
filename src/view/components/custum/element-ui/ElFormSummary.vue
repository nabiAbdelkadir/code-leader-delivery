<template>
  <el-alert
    v-if="preferredValidator.$anyError"
    title="Form Errors"
    type="error">
    <div v-for="(error, index) in activeErrorMessages" :key="index">
      <div>{{ error }}</div>
    </div>
  </el-alert>
</template>
<script>
import { multiErrorExtractorMixin } from "vuelidate-error-extractor";
export default {
  name: "ElFormSummary",
  extends: multiErrorExtractorMixin
};
</script>
