<template>
  <default-card title="Order Details (#14534)" :body-card="false" class="mt-15">
    <template #card-body>
      <div class="row">
        <div class="col-lg-10">
          <table-default :items="products" :headers="productHeaders"/>
        </div>
        <div class="col-lg-2">
          <div class="d-flex mt-3" v-for="n in 5 " :key="n">
            <span class="bullet bullet-bar align-self-stretch bg-success mr-2"></span>
            <span class="text-dark-75 font-weight-bolder d-block  text-center mr-3">
                Sous total:
              </span>
            <span>3500</span>
          </div>
        </div>

      </div>

    </template>

  </default-card>
</template>

<script>
import TableDefault from "@/view/components/shard/tabes/TableDefault";

export default {
  name: "ProductTable",
  components: {TableDefault},
  props: {
    products: {
      type: [Array, Object],
      required: true
    }
  },
  data() {
    return {
      productHeaders: [
        {text: 'image', value: 'image', image: true},
        {text: 'Référence', value: 'sku'},
        {text: 'Produit', value: 'name'},
        {text: 'Option', value: 'options'},
        {text: 'Prix', value: 'price'},
        {text: 'Qte', value: 'qte'},
        {text: 'Total', value: 'total'},
      ],
    }
  }
}
</script>

<style scoped>
tr {
  border-bottom: 1px solid red;
}
</style>
