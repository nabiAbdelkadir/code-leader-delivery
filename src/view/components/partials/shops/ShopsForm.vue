<template>
  <el-form :model="form" :ref="formName">
    <div class="row">
      <div class="col-lg-12">
        <label>Nom <span class="text-danger">*</span> </label>
        <el-form-item
            prop="name"
            :rules="validate.required">
          <el-input
              class="custom-el"
              placeholder="nom"
              v-model="form.name"/>
        </el-form-item>
      </div>

      <div class="col-lg-6">
        <label>commandes Préfixe <span class="text-danger">*</span> </label>
        <el-form-item
            prop="commandsPrefix"
            :rules="validate.required">
          <el-input
              class="custom-el"
              placeholder="commandes Préfixe"
              v-model="form.commandsPrefix"/>
        </el-form-item>
      </div>

      <div class="col-lg-6">
        <label>domain <span class="text-danger">*</span> </label>
        <el-form-item
            prop="domain"
            :rules="validate.required">
          <el-input
              class="custom-el"
              placeholder="domain"
              v-model="form.domain"/>
        </el-form-item>
      </div>
      <div class="col-lg-6">
        <b-check-box v-model="form.isActive" title="Activer la boutique"/>
      </div>

    </div>
    <modal-footer :is-create="isCreate" @submit-form='submitForm' @reset-form='resetForm'/>

    <div class="modal-footer flex-center" v-if="false">
      <div class="btn btn-primary " @click="submitForm()">
        Save
      </div>
      <div class="btn btn-light-primary " @click="resetForm()">
        Reset
      </div>
    </div>


  </el-form>
</template>

<script>
import validate from "@/core/data/validate.ts";
import ApiService from "@/core/services/api.service";

export default {
  name: "ShopsForm",
  props: {
    editeId: {
      type: Number,
      default: -1 //insert
    }
  },
  data() {
    return {
      validate,
      formName: 'shopForm',
      platforms: [],
      form: {
        name: "",
        commandsPrefix: "",
        domain: "",
        //smsSenderName: "",
        isActive: true,

      }
    }
  },
  computed: {
    isCreate() {
      return this.editeId === -1
    }
  },
  methods: {
    submitForm() {
      this.$refs[this.formName].validate(async (valid) => {
        if (valid) {
          if (this.isCreate)
            await this.$store.dispatch('insertShop', this.form)
          else
            await this.$store.dispatch('updateShop', this.form)

          this.$bvModal.hide('add-shop')
        }
      });
    },
    resetForm() {
      this.$refs[this.formName].resetFields();
    },
  },
  async created() {
    if (!this.isCreate) {
      this.form = await ApiService.get(`/shops/${this.editeId}`)
    }
  }

}
</script>

<style scoped>

</style>
