<template>
  <div class="container-80">
    <default-tabs :tabs="tabs">
      <template #tab-items>
        <b-tab active class="mt-7">

          <!--Start Order Cards-->
          <div class="row">
            <div class="col-xl-4 col-lg-12 col-md-12" v-for="(order , index) in orderCards" :key="index">
              <default-card :title="order.cardTitle" :body-card="false">
                <template #card-body>
                  <div v-for="(item , index) in order.items" :key="index"
                       class="d-flex align-items-center
                       justify-space-between text-muted font-weight-500 card-item font-size-sm">
                    <div style="flex: 1">
                      <i class="mr-2" :class="item.icon"></i>
                      <img :src="item.image" class="option-image" alt="" v-if="false"/>
                      <span class="text-black">{{ item.title }}</span>
                    </div>
                    <div :class="item.class">{{ item.text }}</div>
                  </div>
                </template>
              </default-card>
            </div>
          </div>
          <!--End Order Cards-->

          <div class="row mt-15">
            <div class="col-lg-6 col-md-12 col-sm-12">
              <default-card title="Adresse de paiement" :body-card="false">
                <template #card-body>
                  <div class="row">
                    <div class="col">

                      <p class="details">Adresse : {{ order.address }}</p>
                      <p class="details">wilaya : {{ order.wilaya }}</p>
                      <p class="details">commune : {{ order.commune }}</p>
                    </div>
                  </div>
                  <div
                      class="position-absolute top-0 right-0 bottom-0">
                    <img style="width: 100% ; height: 100%"
                         :src="require('@/assets/media/images/12.jpg')" alt=""/>
                  </div>

                </template>
              </default-card>
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12">
              <default-card title="Source" :body-card="false">
                <template #card-body>
                  <div class="row">
                    <div class="col">
                      <p class="details">source : {{ order.source ? order.source.name : '-' }}</p>
                      <p class="details">wilaya : {{ order.wilaya }}</p>
                      <p class="details">commune : {{ order.commune }}</p>
                    </div>
                  </div>
                  <div
                      class="position-absolute top-0 right-0 bottom-0">
                    <img style="width: 100% ; height: 100%"
                         :src="require('@/assets/media/images/13.jpg')" alt=""/>
                  </div>

                </template>
              </default-card>
            </div>

          </div>


          <!--Start ProductTable Cards-->
          <vs-product-table/>
          <!--Start Order Cards-->

        </b-tab>

        <b-tab class="mt-7">
          <DeliveryStatus/>
        </b-tab>
        <b-tab class="mt-7">
          <order-history/>
        </b-tab>
      </template>
    </default-tabs>
  </div>
</template>

<script>
import DefaultTabs from "@/view/components/shard/common/DefaultTabs";
import {mapGetters} from "vuex";

import VsProductTable from "@/view/components/partials/orders/details/VsProductTable";
import OrderHistory from "@/view/components/partials/orders/details/OrderHistory";
import DeliveryStatus from "@/view/components/partials/orders/details/DeliveryStatus";


export default {
  name: "orderDetails",
  components: {DeliveryStatus, OrderHistory, VsProductTable, DefaultTabs},
  data() {
    return {
      orderCards: [],
      tabs: [],
      strTabs: ['General', 'Tentatives de livraison', 'Historique de commandes'],
    }
  },
  computed: mapGetters(["order", 'statusOrder']),

  mounted() {

  },
  methods: {},
  async created() {
    const {id} = this.$route.params
    await this.$store.dispatch('getStatusOrder')
    //console.log('status order is ' + JSON.stringify(this.statusOrder))

    await this.$store.dispatch('getOrder', id)

    this.tabs = this.$convert.prepareTabs(this.strTabs);

    this.orderCards = [
      {
        cardTitle: `Order Details (#${this.order.id})`,
        items: [
          {
            image: require('@/assets/media/images/9.jpg'),
            icon: 'fas fa-calendar',
            title: "Date ajoutée",
            text: this.$convert.timestampToDate(this.order?.requestedOn, false),
          },
          {
            image: require('@/assets/media/images/blank-image.svg'),
            icon: 'fas fa-shipping-fast',
            title: "statut de la commande",
            class: 'badge badge-light fw-bolder',
            text: this.order?.statusOrder?.nameFr,
          },
          {
            image: require('@/assets/media/images/blank-image.svg'),
            icon: 'fas fa-shipping-fast',
            title: "Shipping Method",
            text: this.order.type ? 'Livraison à domicile ' : 'stop desk',
          },
        ]
      },
      {
        cardTitle: 'Détails du client',
        items: [
          {
            image: require('@/assets/media/images/blank-image.svg'),
            icon: 'fas fa-user-circle',
            title: "Nom et prénom",
            text: this.order.clientName,
          },
          {
            image: require('@/assets/media/images/blank-image.svg'),
            icon: 'fas fa-mobile',
            title: "Téléphoner",
            text: this.order.clientPhone,
          },
          {
            image: require('@/assets/media/images/blank-image.svg'),
            icon: 'fas fa-phone-alt',
            title: "Téléphoner 2",
            text: this.order.clientPhone02 ? this.order.clientPhone02 : '-',
          },
        ]
      },
      {
        cardTitle: 'Détails des prix',
        items: [
          {
            image: require('@/assets/media/images/blank-image.svg'),
            icon: 'fas fa-dollar-sign',
            title: "prix d'achat",
            text: this.order.buyingPrice + ' DZD',
          },
          {
            image: require('@/assets/media/images/blank-image.svg'),
            icon: 'fas fa-dollar-sign',
            title: "Prix de la commande",
            text: this.order.orderPrice + ' DZD',
          },
          {
            image: require('@/assets/media/images/blank-image.svg'),
            icon: 'fas fa-hand-holding-usd',//<i class="fas fa-hand-holding-usd"></i>
            title: "Bénéfice net",
            text: this.order.netProfit + ' DZD',
          },
        ]
      }
    ]
  }
}
</script>

<style scoped>
img.option-image {
  width: 40px;
  height: 40px;
}

.card-item {
  padding-top: 0.85rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid #b5b5c333;
}

.card-item:last-child {
  border-bottom: 0
}

.text-black {
  color: black !important;
  font-weight: 600 !important;
}

.details {
  line-height: 1;
}
</style>
