<template>
  <div
      v-bind:class="{ 'quick-search-has-result': hasResult() }"
      class="quick-search quick-search-dropdown quick-search-result-compact"
      id="kt_quick_search_dropdown"
  >
    <div class="quick-search-form">
      <div class="input-group spinner-input spinner-sm spinner-brand spinner-right"
           v-bind:class="{ spinner: loading }"
      >
        <div class="input-group-prepend">
          <span class="input-group-text">
            <i class="flaticon2-search-1"></i>
          </span>
        </div>
        <input
            v-on:keyup.enter="onSearch"
            v-model="searchWord"
            type="text"
            class="form-control quick-search-input"
            placeholder="Search..."
        />
        <div class="input-group-append">
          <span class="input-group-text">
            <i
                class="quick-search-close"
                v-on:click="reset"
                v-bind:style="{ display: hasResult() ? 'flex' : '' }"
            ></i>
          </span>
        </div>
      </div>
    </div>

    <KTSearchResult v-bind:data="data"></KTSearchResult>
  </div>
</template>

<script>
import KTSearchResult from "@/view/layout/extras/dropdown/SearchResult.vue";

export default {
  name: "KTSearchDefault",
  components: {KTSearchResult},
  data() {
    return {
      data: [],
      loading: false,
      searchWord: '',
      //dummy search result data
      result: []
    };
  },
  methods: {
    onSearch(event) {
      //const value = event.target.value
      const value = this.searchWord
      const length = value.length

      if (length > 2) {
        this.loading = true;
        const params = {string: value}
        setTimeout(async () => {
          const result = await this.$api.getItems('/orders', params)
          const {count, rows: orders} = result

          this.data = orders.map(order => {
            return {
              //svg: process.env.BASE_URL + "media/svg/files/zip.svg",
              text: "COM " + order.ref,
              ref: order.ref,
              desc: order.clientName,
              status: order.statusOrder?.nameFr,
              id: order.statusOrderId + '',
              class: order.statusOrderId === 1 ? "text-danger fas fa-exclamation-circle" : 'fas fa-check-circle text-success',
              type: 1
            }
          })
          this.data.unshift({
            count: count,
            text: "commandes",
            type: 0
          })
          this.loading = false;
        }, 250);
      }
    },
    /**
     * Check if the data has result
     * @returns {boolean}
     */
    hasResult() {
      return this.data.length || false;
    },
    reset() {
      this.data = [];
    }
  },
  watch: {
    'searchWord'(newValue) {
      if (newValue.length === 0)
        this.reset()
    }
  }
};
</script>
