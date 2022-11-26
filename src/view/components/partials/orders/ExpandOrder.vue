<template>
  <div class="pl-10 pr-10 mb-5 " style="max-width: 75vw ">
    <default-tabs :tabs="tabs">
      <template slot="tab-items">
        <!--Begin Tentatives -->
        <b-tab active class="">
          <div class="row tab-item mb-7">
            <div class="col-lg-8">
              <div class="card card-custom">
                <card-header title="Tentatives de confirmation"/>
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-5">
                      <label>Motif</label>
                      <el-select
                          v-model="attempt.description"
                          clearable
                          placeholder="Sélectionner un motif ">
                        <el-option
                            v-for="item in statusModels"
                            :key="item.label"
                            :label="item.label"
                            :value="item.label">
                        </el-option>
                      </el-select>

                    </div>

                    <div class="col-lg-5">
                      <label>comment</label>
                      <el-input
                          v-model="attempt.comment"
                          :disabled="attempt.description.length > 0"
                          placeholder="comment"/>
                    </div>

                    <div class="">
                      <mini-add-button
                          @click.native="addAttempt"
                          text="Ajouter un Tentative" style="margin-top: 41px"/>
                    </div>
                    <table-default class="mt-5" :headers="headers" :items="order.attempts"/>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-4"><!---v-if="order[client.key]"-->
              <default-card title="Informations client" :body-card="false">
                <div slot="card-body"
                     class="d-flex "
                     v-for="(client , index )  in clients" :key="index"

                     :class="{'mt-5' : index!==0}"
                >
                  <i class="fas " :class="client.icon"></i>
                  <span class="ml-3"> {{ order[client.key] }}</span>
                </div>
                <mini-edite-button text="Modifier l'utilisateur" slot="card-toolbar"/>

              </default-card>

            </div>

          </div>
        </b-tab>

        <!--End  Tentatives -->

        <!--Begin client info -->
        <b-tab class="tab-item">
          <default-card title="update client" :body-card="false">
            <client-form slot="card-body"/>
          </default-card>

        </b-tab>
        <!--End client info -->

        <!--Begin product info -->
        <b-tab class="tab-item">
          <div class="row">
            <div class="col-lg-10">
              <table-default :items="products" :headers="productHeaders"/>
            </div>
            <div class="col-lg-2 mt-2">
              <div class="d-flex">
                <span class="bullet bullet-bar align-self-stretch bg-success mr-2"></span>
                <span class="text-dark-75 font-weight-bolder d-block  text-center mr-3">
                Sous total:
              </span>
                <span>3500</span>
              </div>
            </div>
          </div>
        </b-tab>
        <!--End product info -->
      </template>

    </default-tabs>

  </div>
</template>

<script>
import TableDefault from "@/view/components/shard/tabes/TableDefault";
import DefaultTabs from "@/view/components/shard/common/DefaultTabs";
import {mapGetters} from "vuex";
import ApiService from "@/core/services/api.service";
import ClientForm from "@/view/components/partials/clients/ClientForm";


export default {
  name: "ExpandOrder",
  components: {ClientForm, TableDefault, DefaultTabs},
  props: ['order'],

  data() {
    return {
      attempt: {
        username: "",
        description: '',
        type: true,
        orderId: this.order.id,
        comment: ""
      },
      clients: [
        {
          icon: "fa-user",
          key: "clientName",
        },
        {
          icon: "fa-phone-alt",
          key: "clientPhone"
        },
        {
          icon: "fa-phone-alt",
          key: "clientPhone2"
        },
        {
          icon: "fa-map-marker-alt",
          key: "address"
        }
      ],
      statusModels: {},//Motif model
      statusModelSelected: '',//Motif
      strTabs: ['Tentatives de confirmations', 'Informations client', 'Informations de produit'],
      tabs: [],
      headers: [
        {text: "l'utilisateur", value: 'username'},
        {text: 'description', value: 'description'},
        {text: 'crée le', value: 'createdAt'},
      ],
      productHeaders: [
        {text: 'image', value: 'image', image: true},
        {text: 'Référence', value: 'sku'},
        {text: 'Produit', value: 'name'},
        {text: 'Option', value: 'options'},
        {text: 'Prix', value: 'price'},
        {text: 'Qte', value: 'qte'},
        {text: 'Total', value: 'total'},
      ],
      products: [
        {
          image: "media/svg/avatars/001-boy.svg",
          sku: "varices",
          name: "كريمة الطبيعية ل علاج الدوالي les varices",
          options: "-",
          price: 250,
          qte: 1,
          total: 2500
        },
        {
          image: "media/svg/avatars/018-girl-9.svg",
          sku: "varices",
          name: "كريمة الطبيعية ل علاج",
          options: "-",
          price: 250,
          qte: 1,
          total: 2500
        },
      ],
    };
  },
  mounted() {
    this.tabs = this.prepareTabs(this.strTabs);
  },
  computed: {
    ...mapGetters(["orders"]),
  },
  methods: {
    async addAttempt() {
      const {description, comment} = this.attempt
      if (description.length === 0 && comment.length === 0)
        return console.log("error please choice comment ")

      const toServer = Object.assign({}, this.attempt);

      if (comment.length > 0 && description.length === 0)
        toServer.description = this.attempt.comment
      const response = await ApiService.post("/attempts", toServer)
      if (response)
        this.order.attempts.unshift(response)

      console.log('response ' + JSON.stringify(response))
      console.log('after  add  ' + JSON.stringify(this.order.attempts))

    }
  },
  async created() {
    const statusModel = await ApiService.get("status-models?type=true");
    this.statusModels = statusModel.map(status => {
      return {
        label: status.nameFr,//send String
      }
    })

    //console.log(`attempts ${JSON.stringify(this.order.attempts)}`)
    //console.log(`attempts ${JSON.stringify(this.attempts)}`)
  }

}
</script>

<style scoped>
.form-group {
  margin-bottom: 1em !important;
}

.tab-item {
  min-height: 250px;
  max-height: 500px;
  overflow-y: auto;
}
</style>
