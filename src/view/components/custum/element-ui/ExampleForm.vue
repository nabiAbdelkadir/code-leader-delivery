<template>
  <div>
    <el-form>
      <form-wrapper :validator="$v.form">
        <div style="margin-bottom: 20px">
          <el-form-summary/>
        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Text without wrapper">
              <el-input v-model="form.text"  @input="$v.form.text.$touch()"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item-extended label="Email with wrapper" name="email">
              <el-input v-model="form.email"  @input="$v.form.email.$touch()"/>
            </el-form-item-extended>
          </el-col>
        </el-row>
      </form-wrapper>
    </el-form>
  </div>
</template>
<script>
import { required, email } from "vuelidate/lib/validators";
import ElFormSummary from "@/view/components/custum/element-ui/ElFormSummary";

export default {
  components: {ElFormSummary},
  data() {
    return {
      form: {
        text: "",
        email: ""
      }
    };
  },
  validations: {
    form: {
      text: { required },
      email: { required, email }
    }
  }
};
</script>
