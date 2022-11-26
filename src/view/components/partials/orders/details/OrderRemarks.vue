<template>
  <default-card title="Remarques" :body-card="false">
    <template #card-body>
      <div class="row align-self-center">
        <vs-table v-if="items.length > 0" class=" col-lg-10">

          <template #thead>
            <vs-tr>
              <vs-th v-for="header in headers" :key="header.text"
                     @click="items = $vs.sortData($event ,items, header.text)">
                {{ header.text.toUpperCase() }}
              </vs-th>
            </vs-tr>
          </template>

          <template #tbody>
            <vs-tr
                :key="i"
                v-for="(tr, i) in $vs.getPage($vs.getSearch(items, ''), 1, 10000)"
                :data="tr"
            >

              <vs-td v-for="item in headers" :key="item.text" :class="{'custom-td' : item.customTd}">
              <span v-if="!item.custom"> <!--simple text-->
                {{ $convert.getData(item.value, tr) /* tr -> object */ }}
              </span>

              </vs-td>

            </vs-tr>

          </template>

        </vs-table>

      </div>
      <empty-data v-if="items.length ===0"/>
    </template>
  </default-card>
</template>

<script>
import EmptyData from "@/view/components/shard/layout/EmptyData";
import {mapGetters} from "vuex";
import ApiService from "@/core/services/api.service";

export default {
  name: "OrderRemarks",
  components: {EmptyData},
  data() {
    return {
      items: [],
      headers: [
        {text: "l'utilisateur", value: 'username'},
        {text: 'description', value: 'description'},
        {text: 'crée le', value: 'createdAt'},
      ],
      statusModels: {},//Motif model
      statusModelSelected: '',//Motif
    }
  },
  computed: {
    ...mapGetters(["order"]),
  },
  methods: {},

  async created() {
    const statusModel = await ApiService.get("/status-models?type=false");
    this.statusModels = statusModel.map(({nameFr}, index) => {
      return {
        label: `${index + 1} - ${nameFr}`,//send String
      }
    })
  },

  watch: {
    order(newVal) {
      newVal['remarks'].forEach(order => {
        this.items.push(order)
      })
    }
  }
}
</script>

<style scoped>

</style>