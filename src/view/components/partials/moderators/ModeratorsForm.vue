<template>
  <el-form :model="form" :ref="formName">
    <pre v-if="false">{{ form }}</pre>

    <div class="row">
      <div class="col-lg-12">
        <label>Nom<span class="text-danger">*</span> </label>
        <el-form-item
            prop="name"
            :rules="validate.required">
          <el-input
              class="custom-el"
              placeholder="nom"
              v-model="form.name"/>
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
        <label>Email<span class="text-danger">*</span></label>
        <el-form-item
            prop="email"
            :rules="validate.required">
          <el-input
              class="custom-el"
              placeholder="email"
              v-model="form.email"/>
        </el-form-item>
      </div>
    </div>


    <b-check-box
        v-if="isUpdate"
        v-model="updatePassword" label="Mettre à jour le mot de passe"/>

    <div class="row" v-if="updatePassword || !isUpdate">
      <div :class="passwordClass">
        <label>mot de pass <span class="text-danger">*</span> </label>
        <el-form-item
            prop="password"
            :rules="validate.required">
          <el-input
              class="custom-el"
              show-password
              placeholder="mot de pass"
              v-model="form.password"/>
        </el-form-item>
      </div>
      <div class="col-lg-6" v-if="isUpdate">
        <label>{{ newPasswordText }} <span class="text-danger">*</span> </label>
        <el-form-item
            prop="newPassword"
            :rules="validate.required">
          <el-input
              class="custom-el"
              show-password
              :placeholder="newPasswordText"
              v-model="form.newPassword"/>
        </el-form-item>
      </div>

    </div>

    <div class="row">
      <div class="col-lg-12">
        <label>Role <span class="text-danger">*</span> </label>
        <el-form-item
            prop="roleId"
            :rules="validate.required"
        >
          <el-select
              class="custom-el"
              v-model="form.roleId"
              clearable
              placeholder="Sélectionner role">
            <el-option
                v-for="item in roles"
                :key="item.label"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </div>

    </div>

    <b-check-box v-model="form.isActive" class="mt-7" title="Activer l'utilisateur"/>
    <b-check-box
        v-if="false"
        v-model="form.isConfirmedEmail" label=" Envoyer le lien de vérification d'email."/>

    <div class="modal-footer flex-center">
      <div class="btn btn-primary " @click.prevent="submitForm()">
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
  name: "ModeratorsForm",
  props: {
    editeId: {
      type: Number,
      default: -1 //insert
    }
  },

  data() {
    return {
      formName: "form",
      validate,
      btnSave: 'crée le produit',
      updatePassword: false,
      form: {
        name: "nabi",
        phone: "0668521144",
        email: "e@gmail.com",
        password: "123456789",
        newPassword: "",
        isActive: false,
        isConfirmedEmail: false,
        type: false,
        isMale: null,
        roleId: '',
        shopId: null,
      },
      initEmail: null,//unique field
      roles: [],
    }
  },
  computed: {
    isUpdate() {
      return this.editeId !== -1
    },
    newPasswordText() {
      return this.isUpdate ? 'nouveau mot de passe' : 'confirm mot de pass'
    },
    passwordClass() {
      return this.isUpdate ? 'col-lg-6' : 'col-lg-12'
    }
  },
  methods: {
    submitForm() {
      this.$refs[this.formName].validate(async (valid) => {

        if (valid) {
          if (!this.isUpdate)
            await this.$store.dispatch("insertUser", this.form)
          else
            await this.$store.dispatch("updateUser", this.form)

          this.resetForm()
          this.$bvModal.hide('add-user')
        }
      })
    },

    resetForm() {
      this.$refs[this.formName].resetFields();
    }
  },
  async created() {
    const roles = await ApiService.get("/roles")
    this.roles = roles.map(({name, id}) => {
      return {
        label: name,
        value: id
      }
    })

    if (this.editeId !== -1)
      this.form = await ApiService.get(`/users/` + this.editeId)
  }
}
</script>

<style scoped>

</style>
