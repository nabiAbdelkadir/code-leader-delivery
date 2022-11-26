<template>
  <el-form :model="form" :ref="formName">
    <div class="row">
      <div class="col-lg-12">
        <label>Description</label>
        <el-form-item
            prop="description">
          <el-input
              type="textarea"
              :rows="5"
              :maxlength="5000"
              class="custom-el"
              v-model="form.description"
              placeholder="description"/>
        </el-form-item>

      </div>
    </div>
    <modal-footer :is-create="true" @submit-form='submitForm' @reset-form='resetForm' :flex-center="true"/>
  </el-form>
</template>

<script>
import validate from "@/core/data/validate.ts";

export default {
  name: "AddRemarks",
  props: {
    order: {
      type: Object,
      required: true
    },
    orders: {
      type: Array,
      required: true
    },
  },
  data: () => ({
    validate,
    formName: 'add-remarks',
    form: {
      description: '',
    },
    cancellationModel: []
  }),
  methods: {
    submitForm() {
      this.$refs[this.formName].validate(async (valid) => {
        if (valid) {
          this.form.orderId = this.order['id']
          await this.$api.postItem('/follow-up-remark', this.form)
          this.$bvModal.hide('add-remarks')

          const findIndex = this.orders.findIndex(order => order.id === this.order.id)
          if (findIndex !== -1) {
            this.orders[findIndex]['remarks'].push({
              description: this.form.description,
            })
          }
        }
      });
    },
    resetForm() {
      this.$refs[this.formName].resetFields();
    },
  }
}
</script>

<style scoped>

</style>