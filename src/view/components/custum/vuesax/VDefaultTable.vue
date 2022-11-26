<template>
  <vs-table v-model="selected" v-if="items.length > 0">
    <template #header v-if="false">
      <vs-input v-model="search" border placeholder="Search"/>
    </template>

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


        <slot name="body"></slot>


      </vs-tr>
    </template>

    <template #footer v-if="false">
      <vs-pagination v-model="page" :length="$vs.getLength($vs.getSearch(items, search), max)"/>
    </template>

  </vs-table>
</template>

<script>
export default {
  name: "VDefaultTable",
  props: {
    items: {
      type: Array,
      required: true
    },
    headers: {
      type: [Array, Object],
      required: true
    },
  },
  data() {
    return {
      search: '',//search in table
      selected: [],
      allCheck: false,
      page: 1,//page selected
      max: 10,// max item
    }
  }
}
</script>

<style scoped>

</style>
