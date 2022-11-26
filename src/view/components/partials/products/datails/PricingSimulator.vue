<template>
  <default-card title="Pricing Simulator" :body-card="false">
    <template #card-body>
      <div class="row position-relative">

        <div class="col">
          <search v-model="search"/>
        </div>
        <div class="col-lg-12">
          <vs-table v-model="selected" v-if="items.length > 0" class="mt-10">
            <template #thead>
              <vs-tr>
                <vs-th>
                  <vs-checkbox
                      :indeterminate="selected.length === items.length" v-model="allCheck"
                      @change="selected = $vs.checkAll(selected, items)"
                  />
                </vs-th>

                <vs-th v-for="header in headers" :key="header.text"
                       @click="items = $vs.sortData($event ,items, header.text)">
                  {{ header.text.toUpperCase() }}
                </vs-th>

              </vs-tr>

            </template>

            <template #tbody>
              <vs-tr
                  :key="i"
                  v-for="(tr, i) in $vs.getPage($vs.getSearch(items, search), page, max)"
                  :data="tr"
                  :is-selected="!!selected.includes(tr)"
                  not-click-selected
              >

                <vs-td checkbox>
                  <vs-checkbox :val="tr" v-model="selected"/>
                </vs-td>

                <vs-td v-for="item in headers" :key="item.text">
              <span v-if="!item.custom"> <!--simple text-->
                {{ $convert.getData(item.value, tr) /* tr -> object */ }}
              </span>

                  <template v-else-if="item.text === 'Action'">
                    <div class="row">
                      <b-dropdown size="sm" text="Action" class="m-2">
                        <b-dropdown-item-button
                            class="dropdown-sm">
                          <span><i class="fa fa-trash text-danger fa-sm mr-2"></i> Supprimer</span>
                        </b-dropdown-item-button>
                      </b-dropdown>
                    </div>
                  </template>
                </vs-td>
              </vs-tr>
            </template>
            <template #footer>
              <vs-pagination v-model="page" :length="$vs.getLength($vs.getSearch(items, search), max)"/>
            </template>
          </vs-table>
        </div>


      </div>
    </template>
  </default-card>
</template>

<script>
export default {
  name: "PricingSimulator",
  data() {
    return {
      items: [],
      page: 2,//page selected
      max: 5,// max item
      search: '',
      allCheck: false,
      selected: [],
      headers: [
        //{text: 'id', value: 'id'},
        {text: 'totalOrder', value: 'totalOrder'},
        {text: 'confirmed', value: 'confirmed'},
        {text: 'delivered', value: 'delivered'},
        {text: 'date', value: 'date'},
        {text: 'outlay', value: 'outlay'},
        {text: 'ads', value: 'ads'},
        {text: "Action", value: 'action', custom: true},
      ],
    }
  },
  async created() {
    const page = document.getElementsByClassName('vs-pagination__button prevActive')
    console.log('class ' + JSON.stringify(page))

    const {id} = this.$route.params
    //this.items = await this.$api.getItems(`/analytics/product-list/${id}`)
    this.items = [
      {
        "id": 2,
        "totalOrder": 50,
        "confirmed": 36,
        "delivered": 70,
        "date": "2022-07-20",
        "outlay": 150,
        "ads": 110,
        "productId": 28
      },
      {
        "id": 1,
        "totalOrder": 150,
        "confirmed": 12,
        "delivered": 14,
        "date": "2020-12-29",
        "outlay": 150,
        "ads": 110,
        "productId": 28
      },
      {
        "id": 1,
        "totalOrder": 150,
        "confirmed": 12,
        "delivered": 14,
        "date": "2020-12-29",
        "outlay": 150,
        "ads": 110,
        "productId": 28
      },
      {
        "id": 1,
        "totalOrder": 150,
        "confirmed": 12,
        "delivered": 14,
        "date": "2020-12-29",
        "outlay": 150,
        "ads": 110,
        "productId": 28
      },
      {
        "id": 1,
        "totalOrder": 150,
        "confirmed": 12,
        "delivered": 14,
        "date": "2020-12-29",
        "outlay": 150,
        "ads": 110,
        "productId": 28
      },
      {
        "id": 1,
        "totalOrder": 150,
        "confirmed": 12,
        "delivered": 14,
        "date": "2020-12-29",
        "outlay": 150,
        "ads": 110,
        "productId": 28
      },
      {
        "id": 1,
        "totalOrder": 150,
        "confirmed": 12,
        "delivered": 14,
        "date": "2020-12-29",
        "outlay": 150,
        "ads": 110,
        "productId": 28
      },
      {
        "id": 1,
        "totalOrder": 150,
        "confirmed": 12,
        "delivered": 14,
        "date": "2020-12-29",
        "outlay": 150,
        "ads": 110,
        "productId": 28
      },
      {
        "id": 1,
        "totalOrder": 150,
        "confirmed": 12,
        "delivered": 14,
        "date": "2020-12-29",
        "outlay": 150,
        "ads": 110,
        "productId": 28
      },
      {
        "id": 1,
        "totalOrder": 150,
        "confirmed": 12,
        "delivered": 14,
        "date": "2020-12-29",
        "outlay": 150,
        "ads": 110,
        "productId": 28
      },
      {
        "id": 1,
        "totalOrder": 150,
        "confirmed": 12,
        "delivered": 14,
        "date": "2020-12-29",
        "outlay": 150,
        "ads": 110,
        "productId": 28
      },
      {
        "id": 1,
        "totalOrder": 150,
        "confirmed": 12,
        "delivered": 14,
        "date": "2020-12-29",
        "outlay": 150,
        "ads": 110,
        "productId": 28
      }, {
        "id": 1,
        "totalOrder": 150,
        "confirmed": 12,
        "delivered": 14,
        "date": "2020-12-29",
        "outlay": 150,
        "ads": 110,
        "productId": 28
      }, {
        "id": 1,
        "totalOrder": 150,
        "confirmed": 12,
        "delivered": 14,
        "date": "2020-12-29",
        "outlay": 150,
        "ads": 110,
        "productId": 28
      },
      {
        "id": 1,
        "totalOrder": 150,
        "confirmed": 12,
        "delivered": 14,
        "date": "2020-12-29",
        "outlay": 150,
        "ads": 110,
        "productId": 28
      },
      {
        "id": 1,
        "totalOrder": 150,
        "confirmed": 12,
        "delivered": 14,
        "date": "2020-12-29",
        "outlay": 150,
        "ads": 110,
        "productId": 28
      },
      {
        "id": 1,
        "totalOrder": 150,
        "confirmed": 12,
        "delivered": 14,
        "date": "2020-12-29",
        "outlay": 150,
        "ads": 110,
        "productId": 28
      },
      {
        "id": 1,
        "totalOrder": 150,
        "confirmed": 12,
        "delivered": 14,
        "date": "2020-12-29",
        "outlay": 150,
        "ads": 110,
        "productId": 28
      }, {
        "id": 1,
        "totalOrder": 150,
        "confirmed": 12,
        "delivered": 14,
        "date": "2020-12-29",
        "outlay": 150,
        "ads": 110,
        "productId": 28
      },
      {
        "id": 1,
        "totalOrder": 150,
        "confirmed": 12,
        "delivered": 14,
        "date": "2020-12-29",
        "outlay": 150,
        "ads": 110,
        "productId": 28
      },
      {
        "id": 1,
        "totalOrder": 150,
        "confirmed": 12,
        "delivered": 14,
        "date": "2020-12-29",
        "outlay": 150,
        "ads": 110,
        "productId": 28
      },


    ]
  }
}
</script>

<style scoped>

</style>
