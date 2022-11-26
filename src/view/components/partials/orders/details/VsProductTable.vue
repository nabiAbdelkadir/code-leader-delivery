<template>
  <default-card :title="`Les produits`" :body-card="false" class="mt-15">
    <template #card-body>
      <div class="row">

        <div class="col-lg-12">
          <vs-table v-if="products.length > 0">
            <template #thead>
              <vs-tr>
                <vs-th v-for="header in headers" :key="header.text"
                       @click="products = $vs.sortData($event ,products, header.text)">
                  {{ header.text.toUpperCase() }}
                </vs-th>
              </vs-tr>
            </template>

            <template #tbody>
              <vs-tr
                  :key="i"
                  v-for="(tr, i) in $vs.getPage($vs.getSearch(products, ''), 1, 10000)"
                  :data="tr"
              >

                <vs-td v-for="item in headers" :key="item.text" :class="{'custom-td' : item.customTd}">
              <span v-if="!item.custom"> <!--simple text-->
                {{ $convert.getData(item.value, tr) /* tr -> object */ }}
              </span>

                  <template v-else-if="item.text==='image'">
                    <default-table-image :src="tr.image ? tr.image : '' "/>
                  </template>

                  <default-table-image v-if="false" :src="tr.image"/>

                </vs-td>

              </vs-tr>

            </template>

          </vs-table>
        </div>

        <div class="col-lg-6 col-sm-12 col-md-6 mt-5">
          <div class="d-flex justify-content-between mt-3" v-for="(item , index ) in orderPricing " :key="index">
            <div class="d-flex">
              <span class="bullet bullet-bar align-self-stretch  mr-2" :class="item.class"></span>
              <span class="text-dark-75 font-weight-bolder d-block  text-center mr-3">
                {{ item.text }}
              </span>
            </div>
            <span class="font-weight-bolder">{{ item.price }} DZD </span>
          </div>
        </div>
      </div>

    </template>

  </default-card>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: "VsProductTable",
  props: {},
  computed: mapGetters(["order"]),
  data() {
    return {
      products: [],
      headers: [
        {text: 'image', value: 'image', image: true, custom: true},
        {text: 'Référence', value: 'sku'},
        {text: 'Produit', value: 'nameFr'},
        {text: 'Option', value: 'options'},
        {text: 'Prix', value: 'sellingPrice'},
        {text: 'Qte', value: 'quantity'},
        {text: 'Total', value: 'totalPrice'},
      ],
      orderPricing: []
    }
  },
  watch: {
    order(newVal) {
      this.products = newVal?.orderItems?.map(item => ({...item?.product}))
      this.orderPricing = [
        /*
        *  {
          text: "buyingPrice",
          price: newVal.buyingPrice,
          class: 'bg-success',
        },
        * */
        {
          text: "Prix de produit",
          price: newVal.orderPrice,
          class: 'bg-primary',
        },
        {
          text: "Frais de livraision",
          price: newVal.shippingCost,
          class: 'bg-danger',
        },
        {
          text: "Total prix",
          price: +newVal.orderPrice + +newVal.shippingCost,
          class: 'bg-success',
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>
