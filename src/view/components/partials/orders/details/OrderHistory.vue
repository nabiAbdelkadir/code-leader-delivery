<template>
  <default-card :title="`Order (#${order.id})`" :body-card="false">
    <template #card-body>
      <vs-table v-if="items.length > 0" class="col-lg-10">
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

              <default-status v-else-if="item.value==='statusOrder'" :is-active="true"/>

            </vs-td>

          </vs-tr>

        </template>

      </vs-table>

      <empty-data v-else/>
    </template>
  </default-card>
</template>

<script>
import {mapGetters} from "vuex";
import EmptyData from "@/view/components/shard/layout/EmptyData";
//import {getData} from "@/core/utils/convertor";

export default {
  name: "OrderHistory",
  components: {EmptyData},
  data() {
    return {
      items: [],
      headers: [
        {text: "l'utilisateur", value: 'username'},
        {text: 'description', value: 'description'},
        {text: 'status', value: 'statusOrder', custom: true},
        {text: 'crée le', value: 'createdAt'},
      ],
    }
  },
  computed: mapGetters(["order"]),
  watch: {
    order(newVal, oldVal) {
      this.items = newVal['history']
    }
  }
}
</script>

<style scoped>

</style>
