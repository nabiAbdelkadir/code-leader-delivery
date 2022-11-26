<template>
  <el-form :model="form" :ref="formName">

    <div class="row">
      <div class="col-lg-12">
        <label>Nom et prénom<span class="text-danger">*</span> </label>
        <el-form-item
            prop="fullName"
            :rules="validate.required">
          <el-input
              class="custom-el"
              placeholder="nom et prénom"
              v-model="form.fullName"/>
        </el-form-item>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6">
        <label>Téléphone <span class="text-danger">*</span></label>
        <el-form-item
            prop="phone"
            :rules="validate.number">
          <el-input
              class="custom-el"
              placeholder="Téléphone"
              maxlength="10"
              v-model="form.phone">
          </el-input>
        </el-form-item>
      </div>

      <div class="col-lg-6">
        <label>Téléphone 2</label>
        <el-input
            class="custom-el"
            placeholder="Téléphone 2"
            maxlength="10"
            v-model="form.phone02">
        </el-input>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6">
        <label>Wilaya <span class="text-danger">*</span> </label>
        <el-form-item
            prop="wilaya"
            :rules="validate.required"
        >
          <el-select
              class="custom-el"
              v-model="form.wilaya"
              clearable
              @change="changeWilaya"
              placeholder="Sélectionner wilaya ">
            <el-option
                v-for="item in wilays"
                :key="item.label"
                :label="item.label"
                :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
      </div>

      <div class="col-lg-6">
        <label>commune <span class="text-danger">*</span> </label>
        <el-form-item
            prop="commune"
            :rules="validate.required"
        >
          <el-select
              class="custom-el"
              v-model="form.commune"
              clearable
              placeholder="Sélectionner commune ">
            <el-option
                v-for="item in communes"
                :key="item.label"
                :label="item.label"
                :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <label>Adresse<span class="text-danger">*</span> </label>
        <el-form-item
            prop="address"
            :rules="validate.required">
          <el-input
              class="custom-el"
              placeholder="Adresse"
              v-model="form.address"/>
        </el-form-item>
      </div>
    </div>

    <div class="modal-footer flex-center">
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
import ApiService from "@/core/services/api.service";
import validate from "@/core/data/validate.ts";

export default {
  name: 'ClientForm',
  props: {
    title: {
      type: String,
      default: 'Creation de client'
    },
    editeId: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      validate,
      formName: "form",
      form: {
        fullName: '',
        phone: '',
        phone02: '',
        address: '',
        wilaya: '',
        commune: '',
      },
      wilays: [],//use in select
      communes: [],//use in select
      wilaysCommune: [],//original
    }
  },
  methods: {
    changeWilaya() {//change after select wilaya;
      this.form.commune = ''
    },
    submitForm() {
      this.$refs[this.formName].validate(async (valid) => {
        if (!valid)
          return console.log('error submit!!');

        try {
          let response;
          if (this.editeId === -1)
            response = await this.$api.postItem('/client', this.form)
          else
            response = await this.$api.putItem(`/client/${this.editeId}`, this.form)

          console.log("response " + JSON.stringify(response))

          if (response)
            if (this.editeId !== -1)
              return this.$emit('update-item', this.form)

          this.$emit('insert-item', response)

        } catch (e) {
          console.log("error post" + e)
          console.log("error.response " + JSON.stringify(e.response))
        }

        this.resetForm()
      });
    },

    resetForm() {
      this.$refs[this.formName].resetFields();
    }
  },
  async created() {
    this.wilaysCommune = await ApiService.get("/wilaya?includes=true")
    this.wilays = this.wilaysCommune.map(wilaya => {
      return {
        label: wilaya.name,
      }
    })

    if (this.editeId !== -1)
      this.form = await ApiService.get(`/client/${this.editeId}`)
  },

  watch: {
    'form.wilaya'(newVal) {
      const commune = this.wilaysCommune.find(wilaya => wilaya.name === this.form.wilaya)
      this.communes = commune?.communes.map((commune, index) => {
        return {
          label: commune.name,
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
