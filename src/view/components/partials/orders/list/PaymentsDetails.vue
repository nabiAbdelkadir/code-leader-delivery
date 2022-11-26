<template>
  <div>
    <div v-if="payments.length > 0">

      <vs-table>
        <template #thead>
          <vs-tr>
            <vs-th v-for="header in headers" :key="header.text"
                   @click="payments = $vs.sortData($event ,payments, header.text)">
              {{ header.text.toUpperCase() }}
            </vs-th>
          </vs-tr>
        </template>

        <template #tbody>
          <vs-tr
              :key="i"
              v-for="(tr, i) in $vs.getPage($vs.getSearch(payments, ''), 1, 10000)"
              :data="tr"
          >
            <vs-td v-for="item in headers" :key="item.text">
                  <span v-if="!item.custom">
                     {{ tr[item.value] + '' }}
                  </span>
              <span v-else :class="getClassName(tr['netProfit'])">
                     {{ tr[item.value] + '' }}
                  </span>

            </vs-td>
          </vs-tr>
        </template>

      </vs-table>

      <div class=" col-lg-6 mt-5">
        <div class="d-flex justify-content-between mt-3" v-for="(item , index ) in items " :key="index">
          <div class="d-flex">
            <span class="bullet bullet-bar align-self-stretch  mr-2 " :class="item.class"></span>
            <span class="text-dark-75 font-weight-bolder d-block  text-center mr-3">
                 {{ item.text }}
            </span>
          </div>
          <span class="font-weight-bolder"> {{ paymentsDetails [item.key] }} DZD </span>
        </div>
      </div>

    </div>
    <empty-data v-else/>

  </div>

</template>

<script>


import EmptyData from "@/view/components/shard/layout/EmptyData";

export default {
  name: "PaymentsDetails",
  components: {EmptyData},
  props: {
    paymentsDetails: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      search: '',//search in table
      allCheck: false,
      page: 1,//page selected
      max: 10000,// max item
      selected: [],//payments
      headers: [
        {text: '#', value: 'orderNumber'},
        {text: 'ref', value: 'ref'},
        {text: 'client', value: 'clientName'},
        {text: 'wilaya', value: 'wilaya'},
        {text: "prix d'achat", value: 'buyingPrice'},
        {text: 'total', value: 'totalFinal'},
        {text: 'bénéfice net', value: 'netProfit', custom: true},
      ],

      items: [
        {
          text: "prix d'achat",
          class: 'bg-success',
          key: 'AllbuyingPrice'
        },
        {
          text: "Prix de la commande",
          class: 'bg-primary',
          key: 'AlltotalFinal'
        },
        {
          text: "frais de port",
          class: 'bg-danger',
          key: 'AllnetProfit'
        },
      ]

    }
  },
  computed: {
    payments() {
      return this.paymentsDetails['payment']
    }
  },
  methods: {
    getClassName(number) {
      return number > 0 ? 'text-success' : 'text-danger'
    }
  },
}
</script>

<style scoped>
th, tr {
  width: 100%;
}
</style>
