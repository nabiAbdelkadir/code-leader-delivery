<template>
  <el-form :model="form" :ref="formName">
    <div class="row align-self-center">
      <div class="col-lg-12">
        <label>Motif d'annulation <span class="text-danger">*</span> </label>
        <el-form-item
            prop="modelId"
            :rules="validate.required">
          <el-select
              class="custom-el"
              v-model="form.modelId"
              clearable
              placeholder="Sélectionner un motif ">
            <el-option
                v-for="item in cancellationModel"
                :key="item.nameFr"
                :label="item.nameFr"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>


      </div>

      <div class="col-lg-12">
        <label>Description</label>
        <el-form-item
            prop="description">
          <el-input
              type="textarea"
              :rows="5"
              :disabled="form.modelId!==15"
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
  name: "CanceledForm",
  props: {
    selected: {
      type: Array,
      required: true
    },
    statusOrderSelectedId: {
      type: Number,
      required: true
    },
  },
  data: () => ({
    validate,
    formName: 'cancellation-orders',
    form: {
      description: '',
      modelId: '',
    },
    cancellationModel: []
  }),
  methods: {
    submitForm() {
      this.$refs[this.formName].validate(async (valid) => {
        if (valid) {
          const ids = this.selected.map(({id}) => id)
          console.log('toServer ' + JSON.stringify(this.form))

          const api = this.statusOrderSelected === 1 ? 'in-confirmation-canceled' : 'in-dispatch-canceled'

          const res = await this.$api.putItem(`/orders/to/${api}`, this.form, {orderId: ids})
          console.log('response put ' + JSON.stringify(res))
          this.$store.commit('deleteOrdersByIds', res)
        }
      });
    },
    resetForm() {
      this.$refs[this.formName].resetFields();
    },
  },
  async created() {
    this.cancellationModel = await this.$api.getItems('/cancellation-reason-model')
  }
}
</script>

<style scoped>

</style>
