<template>
  <div class="table-responsive">
    <table class="table table-head-custom table-vertical-center table-head-bg table-borderless">
      <thead>
      <tr class="text-left">
        <th class="text-dark-75 text-center" v-for="header in headers" :key="header.value">
          {{ header.text }}
        </th>
      </tr>
      </thead>

      <tbody>
      <template>
        <tr v-for="(product , index) in items" :key="index">

          <td class="pl-0 pt-2 mt-2" v-for="(item , index) in headers" :key="index" style="height: 50px">

            <div class="d-flex align-items-center" v-if="item.image">
              <div class="symbol symbol-50 symbol-light mr-4">
                        <span class="symbol-label">
                          <img :src="product.image"
                               class="h-75 align-self-end"
                               alt=""
                          />
                        </span>
              </div>
            </div>

            <span v-else class="d-block  text-center">
              {{ product[item.value] }}
            </span>
          </td>
        </tr>

      </template>
      </tbody>

    </table>
  </div>
</template>

<script>
export default {
  name: "TableDefault",
  props: ["headers", "items"],
  /*
  * props: {
    headers: {
      type: Object,
      required: true
    },
    items: {
      type: Object,
      required: true
    }
  },
  * */
  data() {
    return {};
  },
}
</script>

<style scoped>
td, tr {
  min-height: 50px;
}
</style>
