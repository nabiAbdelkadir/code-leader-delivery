<template>
  <div class="body-root">
    <pre v-if="false">{{ form }}</pre>
    <el-form :model="form" :ref="formName">
      <div class="row">
        <div class="col-lg-6">

          <default-card title="Société de livraison" :body-card="false">
            <template #card-body>
              <div class="row">
                <div class="col-lg-6">
                  <label>Nom <span class="text-danger">*</span> </label>
                  <el-form-item
                      prop="name"
                      :rules="validate.required">
                    <el-input
                        placeholder="nom"
                        v-model="form.name"/>
                  </el-form-item>
                </div>

                <div class="col-lg-6">
                  <label class="">Boutiques <span class="text-danger">*</span> </label>
                  <el-form-item
                      prop="shopsSelected"
                      :rules="validate.required">
                    <el-select
                        v-model="form.shopsSelected"
                        multiple
                        placeholder="Sélectionnez la boutique">
                      <el-option
                          v-for="item in shops"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>

                <div class="col-lg-6">
                  <label>commission (%)</label>
                  <el-form-item
                      prop="commission"
                  >
                    <el-input
                        type="number"
                        :min="0"
                        :max="100"
                        placeholder="commission (%)"
                        v-model.number="form.commission"/>
                  </el-form-item>
                </div>

                <div class="col-lg-6">
                  <label>Frais de retour</label>
                  <el-form-item
                      prop="returnFee"
                  >
                    <el-input
                        type="number"
                        :min="0"
                        placeholder="Frais de retour"
                        v-model.number="form.returnFee"/>
                  </el-form-item>
                </div>
              </div>
              <div class="d-flex mt-15">
                <b-check-box title="Activer livreur" class="mr-5" v-model="form.isActive"/>
                <b-check-box title="isFixed " class="" v-model="form.isFixed"/>
              </div>
            </template>
          </default-card>

          <!--Begin Api key-->
          <default-card title="Clés Api " :body-card="false" class="mt-15">
            <template #card-body>
              <div class="row">
                <div class="col-lg-12">
                  <label>Plateforme <span class="text-danger">*</span></label>
                  <el-form-item
                      prop="platformId"
                      :rules="validate.required"
                  >
                    <el-select
                        clearable
                        @change="changePlatform"
                        v-model="form.platformId"
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
              </div>

              <div class="row">
                <div class="col-lg-6" v-if="showApiId">
                  <label>API ID <span class="text-danger">*</span> </label>
                  <el-form-item
                      prop="apiId"
                      :rules="validate.required">
                    <el-input
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
                        placeholder="STORE ID"
                        v-model="form.storeId"/>
                  </el-form-item>
                </div>

                <div class="col-lg-6" v-if="showApiToken">
                  <label>API TOKEN <span class="text-danger">*</span> </label>
                  <el-form-item
                      prop="apiToken"
                      :rules="validate.required">
                    <el-input
                        placeholder="API TOKEN"
                        v-model="form.apiToken"/>
                  </el-form-item>
                </div>
              </div>
              <info-alert class="mt-15" :message="message" v-if="message" ref="info-alert"/>

            </template>
          </default-card>
          <!--End Api key-->
        </div>

        <div class="col-lg-6">
          <pre v-if="false">{{ form.deliveryTypesInsert }}</pre>
          <default-card title="Wilayas" :body-card="false">
            <template #card-body>
              <div class="body-scroll">

                <table class="table table-head-custom table-vertical-center table-head-bg table-borderless ">
                  <thead>
                  <tr class="text-left">
                    <th class="text-dark-75 text-center" v-for="header  in headers" :key="header">
                      {{ header }}
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(wilaya ,index ) in form.deliveryTypesInsert" :key="index">
                    <td class="pl-0 pt-2 mt-2">
                      <span class="d-block  text-center">
                      {{ wilaya.name }}
                      </span>
                    </td>

                    <td>
                      <b-check-box
                          :form-group="false"
                          size="sm"
                          label="Livraison à domicile"
                          v-model="wilaya.isHome" @enCheck="check('isHome' , index)"/>
                    </td>

                    <td>
                      <b-check-box
                          :form-group="false"
                          size="sm"
                          label=" Stop desk"
                          v-model="wilaya.isStopDisk" @enCheck="check('isStopDisk' , index)"/>
                    </td>
                  </tr>

                  </tbody>
                </table>
              </div>
            </template>
          </default-card>
        </div>
      </div>

      <modal-footer :is-create="!isUpdate" :flex-center="false" :key="key" @submit-form='submitForm'
                    @reset-form='resetForm'/>

    </el-form>
  </div>
</template>


<script>
import ApiService from "@/core/services/api.service";
import validate from "@/core/data/validate.ts";

export default {
  name: "DeliveryCompany",
  props: {
    editeId: {
      type: [Number, String],
      default: -1
    },
  },
  data() {
    return {
      key: 1,
      validate,
      formName: "form",
      message: null,
      headers: ['wilaya', 'Livraison à domicile', 'Stop desk'],

      shops: [],
      platforms: [],
      wilays: [],
      form: {
        shopsSelected: [],
        platformId: '',
        name: "",
        commission: 0,
        isFixed: true,
        returnFee: 0,
        isActive: true,
        //apiId: 'd645d402-39aa-4d70-8c3e-2f953714bc25',//from yalidin
        apiId: '',
        //apiToken: '5f73621fa1b01cb7c88f0f292a891bb4f1f8f20f',//from Yalidin ,Maystro
        apiToken: '',//from Yalidin ,Maystro
        //storeId: 'd645d402-39aa-4d70-8c3e-2f953714bc25',
        storeId: '',
        deliveryTypesInsert: [],
        password: "123456789",//password cannot be null
      }
    }
  },
  computed: {
    showApiId() {//Yalidin
      return this.form.platformId === 1
    },
    showApiToken() {//Yalidin , Maystro
      const id = this.form.platformId
      return id === 1 || id === 2
    },
    showStoreId() {//maystro
      return this.form.platformId === 2
    },

    isUpdate() {
      return this.$route.params.id !== undefined
    }
  },
  methods: {
    check(key, index) {
      if (index === 0)
        this.form.deliveryTypesInsert.forEach(wilaya => {
          wilaya[key] = this.form.deliveryTypesInsert[0][key]
        })
    },

    submitForm() {
      this.$refs[this.formName].validate(async (valid) => {
        if (valid) {
          let toServer = Object.assign({}, this.form)

          toServer.shopsInsert = []
          this.form.shopsSelected.forEach(sh => toServer.shopsInsert.push({shopId: sh}))
          toServer.deliveryTypesInsert.splice(0, 1)//remove first item

          const {deliveryTypesInsert: delivery} = toServer
          for (let i = 0; i < delivery.length; i++) {// remove items (if isHome,isStopDesk is false)
            if (!(delivery[i]['isHome'] && delivery[i]['isStopDisk']))
              delivery.splice(i, 1)
          }

          console.log('toServer ' + JSON.stringify(toServer))

          if (!this.isUpdate)
            return this.$api.postItem('/shipping-company', toServer).then(() => this.$router.push({name: 'shippers'}))

          const id = this.$route.params.id
          this.$api.putItem(`/shipping-company/${id}`, toServer).then(() => this.$router.push({name: 'shippers'}))

        }
      });
    },
    resetForm() {
      this.$refs[this.formName].resetFields();
    },

    changePlatform() {
      if (this.form.platformId === 1) {
        this.message = 'Les frais de livraison, retour, et pickup vont être surfacturé, ' +
            'écrasé, ou remplaçé durant la syncrnoisation API.'
      } else if (this.form.platformId === 2) {
        this.message = 'Veuillez introduire les accès api de votre compte MAYSTRO pour la boutique: Biskrashopping.'
      } else
        this.message = null
    },

    init() {
      if (!this.isUpdate) {
        this.wilays.unshift(
            {
              wilayaId: -1,
              name: "Toutes",
              isHome: false,
              isStopDisk: false
            })
        this.form.deliveryTypesInsert = this.wilays.map(item => {
          return {
            wilayaId: item.id,
            name: item.name,
            isHome: false,
            isStopDisk: false
          }
        })
      }
    }
  },

  async created() {
    this.shops = await ApiService.get('/common?table_name=Shop')
    this.platforms = await ApiService.get('/platforms')
    this.wilays = await ApiService.get('/wilaya')
    this.init()
  },
}
</script>

<style scoped>
.table.table-vertical-center td {
  vertical-align: unset !important;
}

tr:nth-child(even) {
  background-color: #f9fcfd;
}

.body-scroll {
  max-height: 75vh;
  overflow-y: scroll;
}
</style>
