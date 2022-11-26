<template>
  <div>
    <el-form class="container-80" :model="order" :ref="formName">
      <div class="row">
        <div class="col-lg-3">
          <default-card title="Order Details" :body-card="false">
            <template #card-body>
              <div>
                <label>statut commande <span class="text-danger">*</span> </label>
                <el-select
                    v-model="order.statusOrderId"
                >
                  <el-option
                      v-for="item in statusOrderOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
                <p class="text-muted fa-sm mt-2">Choisir la statut de commande.</p>
              </div>

              <div class="mt-7">
                <label>Assign<span class="text-danger">*</span> </label>
                <el-form-item
                    prop="userId"
                    :rules="validate.required"
                >
                  <el-select
                      clearable
                      v-model="order.userId"
                      placeholder="Assign"
                  >
                    <el-option
                        v-for="item in usersOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>

              <div class="mt-7">
                <label>date </label>
                <el-date-picker
                    style="width: 100%"
                    v-model="order.requestedOn"
                    type="date"
                    placeholder="Pick a day">
                </el-date-picker>
              </div>

            </template>
          </default-card>
        </div>

        <div class="col-lg-8">
          <!--Begin products Box-->
          <default-card title="Select Products" :body-card="false">
            <template #card-body>
              <label class="form-label"> Add products to this order </label>

              <empty-selected-product v-if="productSelected.length === 0"/>

              <div v-else class="row border border-dashed rounded mt-5  overflow-auto" style=" max-height: 265px">

                <pre v-if="false"> {{ productSelected }}</pre>

                <div class="col-lg-6" v-for="product in productSelected" :key="product.id">
                  <product-item :product="product" :show="true"/>
                </div>
              </div>

              <order-pricing v-if="productSelected.length!==0"
                             :netProfit="order.netProfit"
                             :buying-price='order.buyingPrice'
                             :order-price="order.orderPrice"/>

              <el-divider/>
              <search style="width: 50%" class="mb-7" v-model="searchProduct"/>


              <!--Start Product List -->
              <div class="container-product overflow-x-auto" style="max-height: 500px" v-if="mapProducts.length> 0">
                <div class="row align-items-center products-box ml-0 mr-0"
                     v-for="(product , index ) in mapProducts" :key="index">

                  <div class="checkbox-inline">
                    <label class="checkbox checkbox-lg">
                      <input type="checkbox"
                             v-model="product.isSelected"
                             @change="selectProduct(product.id , index)"/>
                      <span></span>
                    </label>
                  </div>

                  <product-item class="col-lg-7" :product="product" :border="false"/>
                  <div class="col-lg-4" style="text-align: end">
                    <span class="font-weight-500 text-gray-600">{{ product.quantity }}</span>
                  </div>
                </div>
              </div>
              <empty-product-list v-else/>
              <!--End Product List -->
            </template>
          </default-card>
          <!--End products Box-->

          <!--Start Client Card-->
          <default-card title="Client" :body-card="false" class="mt-7">
            <template #card-body>

              <div class="row">
                <div class="col-lg-12">
                  <label>client <span class="text-danger">*</span> </label>
                  <el-select
                      v-model="clientSelected"
                      clearable
                      filterable
                      @change="onChoiceClient"
                      placeholder="Recherche d'un client">
                    <el-option
                        v-for="item in clients"
                        :key="item.label"
                        :label=" `${item.fullName} ( ${item.phone} )`"
                        :value="item.id">
                    </el-option>
                  </el-select>
                </div>

                <div class="col-lg-12">
                  <label>Nom de client <span class="text-danger">*</span> </label>
                  <el-form-item
                      prop="clientName"
                      :rules="validate.required">
                    <el-input
                        :disabled="disableClientInfo"
                        placeholder="Nom et prenom"
                        v-model="order.clientName">
                    </el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-6">
                  <label>Téléphone <span class="text-danger">*</span> </label>
                  <el-form-item
                      prop="clientPhone"
                      :rules="validate.required">
                    <el-input
                        :disabled="disableClientInfo"
                        v-model="order.clientPhone"
                        placeholder="Téléphone ">
                    </el-input>
                  </el-form-item>

                </div>
                <div class="col-lg-6">
                  <label>Téléphone 2 </label>
                  <el-input
                      :disabled="disableClientInfo"
                      v-model="order.clientPhone02"
                      placeholder="Téléphone 2"
                  />
                </div>
              </div>

            </template>
          </default-card>
          <!--End Client Card-->

          <!--Start Delivery Card-->
          <default-card title="détails de livraison" class="mt-7" :body-card="false">
            <template #card-body>
              <div class="row">
                <div class="col-lg-6">
                  <label>Wilayas <span class="text-danger">*</span> </label>
                  <el-form-item
                      prop="wilaya"
                      :rules="validate.required"
                  >
                    <el-select
                        v-model="order.wilaya"
                        clearable
                        filterable
                        @change="changeWilaya"
                        placeholder="Sélectionner wilaya ">
                      <el-option
                          v-for="item in selectOptionsWilays"
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
                        v-model="order.commune"
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

                <div class="col-lg-12">
                  <label>Adresse <span class="text-danger">*</span> </label>
                  <el-form-item
                      prop="address"
                      :rules="validate.required">
                    <el-input
                        v-model="order.address"
                        placeholder="Adresse ">
                    </el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="mt-7">
                <label>Méthode de livraison <span class="text-danger">*</span> </label>
                <el-form-item
                    prop="type"
                    :rules="validate.required"
                >
                  <el-select
                      clearable
                      placeholder="Méthode de livraison"
                      v-model="order.type"
                      :disabled="disabledDeliveryMethod">
                    <el-option
                        v-for="item in deliveryMethodOptions"
                        :key="item.label"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <p class="text-muted fa-sm mt-2">Choisir le mode de livraison.</p>
              </div>

            </template>
          </default-card>
          <!--End Delivery Card-->

          <!--Start Remark Card-->
          <default-card title="Autre options" class="mt-7" :body-card="false">
            <template #card-body>
              <label>Remarque </label>
              <el-input
                  type="textarea"
                  :rows="5"
                  :maxlength="5000"
                  placeholder="Entrer une remarque"
                  v-model="order.remark">
              </el-input>
            </template>
          </default-card>
          <!--End Remark Card-->
          <modal-footer :flex-center="false"
                        :disabled-save-btn="productSelected.length===0"
                        @reset-form="resetForm"
                        @submit-form="submitForm"/>

        </div>
      </div>

    </el-form>

  </div>

</template>

<script>
import ProductItem from "@/view/components/partials/orders/create/productItem";
import {mapGetters} from "vuex";
import ApiService from "@/core/services/api.service";
import EmptySelectedProduct from "@/view/components/partials/orders/create/EmptySelectedProduct";
import OrderPricing from "@/view/components/partials/orders/details/OrderPricing";
import EmptyProductList from "@/view/components/partials/orders/create/EmptyProductList";
import validate from "@/core/data/validate.ts";
import {searchWordByKeys} from "@/core/utils/object";
import {SET_BREADCRUMB} from "@/core/services/store/breadcrumbs.module";

export default {
  name: "create",
  components: {EmptyProductList, OrderPricing, EmptySelectedProduct, ProductItem},
  data() {
    return {
      validate,
      formName: "form",
      searchProduct: '',
      mapProducts: [],// filter products (search)
      originalMapProducts: [],
      productSelected: [],

      shops: [],
      shopsSelected: [],
      moderators: [],

      order: {
        type: null,
        statusOrderId: 1,
        requestedOn: new Date(),//requestedOn
        clientName: "",
        commune: "",
        wilaya: "",
        address: "",
        clientPhone: "",
        clientPhone02: "",
        remark: "",
        buyingPrice: 0,
        orderPrice: 0,//prix de vent
        shippingCost: 0,
        totalFinal: 0,//totalCost
        netProfit: 0,
        userId: null,//moderator -> change to null
        sourceId: null,
        orderItems: []
      },

      clientSelected: '',//search
      communes: [],
      cost: [],
      deliveryMethodOptions: [],
      originalDeliveryMethodOptions: [
        {value: true, label: 'Livraison à domicile'},
        {value: false, label: 'Stop desk'},
      ],

      statusOrderOptions: [
        {value: 1, label: 'En attente de confirmation'},
        {value: 2, label: 'Confirmée'},
      ],
    }
  },
  computed: {
    disableClientInfo() {
      return Number.isInteger(this.clientSelected)
    },
    disabledDeliveryMethod() {
      return this.order.wilaya.length === 0 || this.deliveryMethodOptions.length === 0
    },
    ...mapGetters(['wilaysCommune', 'selectOptionsWilays', 'products', 'users', 'usersOptions', 'clients'])
  },

  methods: {
    onChoiceClient() {
      console.log(this.clientSelected)
      const findIndex = this.clients.findIndex(({id}) => id === this.clientSelected)

      if (findIndex === -1) {
        this.order.clientId = undefined
        return this.$convert.emptyField(this.order, ['clientName', 'wilaya', 'commune', 'clientPhone', 'clientPhone02'])
      }
      const client = this.clients[findIndex]

      this.order.clientName = client.fullName
      this.order.clientPhone = client.phone
      this.order.clientPhone02 = client.phone02
      this.order.wilaya = client.wilaya
      this.order.commune = client.commune
      this.order.address = client.address
      this.order.clientId = client.id
    },

    submitForm() {
      this.$refs[this.formName].validate(async (valid) => {
        if (valid) {
          let toServer = Object.assign({}, this.order)

          this.productSelected.forEach(product => {
            toServer['orderItems'].push({
              options: null,
              quantity: product.qte,
              price: product.sellingPrice,
              totalPrice: product.qte * product.sellingPrice,
              //comment: "",
              productName: product.nameFr,
              productId: product.id
            })
          })
          if (this.order.type === true)
            toServer.shippingCost = this.cost ['homeDeliveryFees']
          else
            toServer.shippingCost = this.cost ['stopDeskFees']

          toServer['totalFinal'] = toServer.orderPrice + toServer.shippingCost
          toServer['netProfit'] = toServer['totalFinal'] - toServer.buyingPrice

          //console.log("toServer " + JSON.stringify(toServer))
          const wilaya = this.selectOptionsWilays.find(({label}) => label === this.order.wilaya)
          const wilayaId = wilaya?.value
          toServer ['wilayaId'] = wilaya?.value //@nabi

          await this.$api.postItem('/orders', toServer).then(() => {
            this.resetForm()
            this.productSelected = []
          })

        }
      });
    },
    resetForm() {
      this.$refs[this.formName].resetFields();
    },
    selectProduct(id, index) {
      const findIndex = this.productSelected.findIndex(item => item.id === id)
      if (findIndex === -1) { //insert
        let mapProduct = Object.assign({}, this.mapProducts[index])
        mapProduct.qte = 1
        this.productSelected.unshift(mapProduct)
      } else
        this.productSelected.splice(findIndex, 1)

      this.calcTotalAmount()
    },

    calcTotalAmount() {
      this.order.orderPrice = 0
      this.order.buyingPrice = 0

      this.productSelected.forEach(item => {
        this.order.buyingPrice = this.order.buyingPrice + (item.buyingPrice * item.qte)
        this.order.orderPrice = this.order.orderPrice + (item.sellingPrice * item.qte)
      })

    },
    changeWilaya() {//change after select wilaya;
      this.order.commune = ''
    },
  },
  async mounted() {
    await this.$store.dispatch(SET_BREADCRUMB, [{title: "orders"}, {title: "add order"}]);
  },
  async created() {
    const params = {isActive: true}
    await this.$store.dispatch("getWilaysCommune")
    await this.$store.dispatch("getProducts", params)
    await this.$store.dispatch("getUsers")
    await this.$store.dispatch('getClients')

    this.originalMapProducts = this.products.map(item => {
      return {
        ...item,
        isSelected: false,
      }
    })
    this.mapProducts = [...this.originalMapProducts]
  },

  watch: {
    async 'order.wilaya'(newVal) {
      const commune = this.wilaysCommune.find(wilaya => wilaya.name === this.order.wilaya)
      this.communes = commune?.communes.map((commune, index) => {
        return {
          label: commune.name,
        }
      })

      this.cost = await ApiService.get("/cost/one", {wilaya: this.order?.wilaya, shopId: 1}) // replace (shopId,token)

      if (this.cost) {
        this.deliveryMethodOptions = [...this.originalDeliveryMethodOptions]
        this.order.type = null
        if (this.cost['isStopDisk'] === false)
          this.deliveryMethodOptions.splice(1, 1)

        if (this.cost['isHome'] === false)
          this.deliveryMethodOptions.splice(0, 1)
      } else
        this.deliveryMethodOptions = []

    },

    'searchProduct'(searchWord) {
      if (searchWord.length > 1)
        return this.mapProducts = searchWordByKeys(this.mapProducts, searchWord, ['nameFr', 'sku'])
      this.mapProducts = [...this.originalMapProducts]
    },
  }
}
</script>

