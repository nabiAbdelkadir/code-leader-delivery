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
        <div class="col-lg-12">
          <label>Assign </label>
          <el-select
              class="custom-el"
              clearable
              filterable
              v-model="form.userId"
              placeholder="Assign"
          >
            <el-option
                v-for="item in usersOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>

        <div class="col-lg-12">
          <label>Plateforme <span class="text-danger">*</span></label>
          <el-form-item
              prop="sourcePlateformId"
              :rules="validate.required"
          >
            <el-select
                class="custom-el"
                clearable
                v-model="form.sourcePlateformId"
                placeholder="choisir une plateforme">
              <el-option
                  v-for="item in platforms"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </div>

        <div class="col-lg-6" v-if="showApiId">
          <label>API ID <span class="text-danger">*</span> </label>
          <el-form-item
              prop="apiId"
              :rules="validate.required">
            <el-input
                class="custom-el"
                placeholder="API ID"
                v-model="form.apiId"/>
          </el-form-item>
        </div>

        <div class="col-lg-6" v-if="showStoreId">
          <label>STORE ID<span class="text-danger">*</span> </label>
          <el-form-item
              prop="storeId"
              :rules="validate.required">
            <el-input
                class="custom-el"
                placeholder="STORE ID"
                v-model="form.storeId"/>
          </el-form-item>
        </div>

        <div class="col-lg-6" v-if="showApiToken">
          <label>API TOKEN <span class="text-danger">*</span> </label>
          <el-form-item
              prop="apiToken"
              class="custom-el"
              :rules="validate.required">
            <el-input
                placeholder="API TOKEN"
                v-model="form.apiToken"/>
          </el-form-item>
        </div>
      </div>
      <modal-footer :is-create="isCreate" @submit-form='submitForm' @reset-form='resetForm'/>

    </el-form>


</template>

<script>
import validate from "@/core/data/validate.ts";
import {mapGetters} from "vuex";
import ApiService from "@/core/services/api.service";


export default {
  name: "ResourcesForm",
  props: {
    editeId: {
      type: Number,
      default: -1 //insert
    }
  },
  data() {
    return {
      validate,
      formName: 'sourcesForm',
      message: "Veuillez introduire les informations d'accès à votre compte ECOTRACK pour la boutique: Biskrashopping.",
      platforms: [],
      form: {
        name: "",
        apiId: "",
        apiToken: "",
        storeId: "",
        shopId: 1,
        sourcePlateformId: '',
        userId: ""
      }
    }
  },
  computed: {
    ...mapGetters(['usersOptions']),
    showApiId() {
      return this.form.platformSelected === 1
    },
    showApiToken() {//Yalidin , Maystro
      const id = this.form.platformSelected
      return id === 1 || id === 2
    },
    showStoreId() {//maystro
      return this.form.platformSelected === 2
    },
    isCreate() {
      return this.editeId === -1
    }
  },
  methods: {
    submitForm() {
      this.$refs[this.formName].validate(async (valid) => {
        if (valid) {
          const toServer = Object.assign({}, this.form)
          toServer['isAutoAssign'] = this.form.userId !== ''
          if (this.isCreate)
            await this.$store.dispatch('insertResource', toServer)
          else
            await this.$store.dispatch('updateResource', toServer)

          this.$bvModal.hide('add-resource')
          this.$emit('create')
        }
      });
    },
    resetForm() {
      this.$refs[this.formName].resetFields();
    },
  },

  async created() {
    this.platforms = await this.$api.getItems('/source-platforms')
    await this.$store.dispatch("getUsers")
    if (!this.isCreate) {
      this.form = await ApiService.get(`/sources/${this.editeId}`)
      // console.log('fromServer ' + JSON.stringify(fromServer))
      //this.form.name = fromServer.name
    }

  }
}
</script>

<style scoped>

</style>
