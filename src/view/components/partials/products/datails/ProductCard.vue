<template>
  <default-card :title="`produit (#${product.id})`" :body-card="false">
    <template #card-body>
      <div class="d-flex">
        <div class="symbol symbol-80 ">
                <span class="symbol-label ">
                  <img :src="require('@/assets/media/images/4.png')" class="align-self-end p-2" alt=""/>
                </span>
        </div>

        <div class="ml-3">
          <router-link
              :to="`/products/10`"
              class="fs-15 font-weight-500 ">
            {{ product.nameFr }}
          </router-link>

          <div class="fw-bold fs-12">Prix {{ product.sellingPrice }} DZD</div>
          <div class="text-muted fs-13">SKU: {{ product.sku }}</div>
        </div>
      </div>

      <div class="d-flex align-items-center justify-content-between mb-2 mt-5 pb-2 border-bottom">
        <span class="font-weight-bold ">Boutique </span>
        <span class="text-muted font-weight-bold  text-hover-primary">
          {{ product.shops ? product.shops[0].name : '---' }}
        </span>
      </div>

      <div class="d-flex align-items-center justify-content-between mb-2 mt-5 pb-2 border-bottom">
        <span class="font-weight-bold">Quantity </span>
        <span class="font-weight-bold text-primary">{{ product.quantity }}</span>
      </div>


      <div class="d-flex align-items-center justify-content-between mb-2 mt-5">
        <span class="font-weight-bold ">Status </span>
        <span class="text-success font-weight-bold">Active</span>
      </div>
      <div class="text-center">
        <div class="btn btn-light-primary mt-2 " @click="$router.push(`/products/${product.id}`)">
          Voir le produit
        </div>
      </div>


    </template>
  </default-card>
</template>

<script>
export default {
  name: "ProductCard",
  data() {
    return {
      product: {}
    }
  },
  async created() {
    const {id} = this.$route.params
    this.product = await this.$api.getItems(`/products/${id}`)
  }
}
</script>

<style scoped>
img {
  width: 85px;
  height: 85px;
}
</style>
