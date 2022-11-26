<template>
  <div class="d-flex align-items-center  rounded p-3 bg-white"
       :class="{'border border-dashed ': border }"
  >
    <router-link :to="`/products/${product.id}`">

      <template>
        <default-table-image :src="product.image ? product.image : '' "/>
      </template>

    </router-link>

    <div class="ml-3" style="flex: 1">
      <router-link :to="`/products/${product.id}`" class="fs-15 font-weight-500 ">
        {{ product.nameFr }}
      </router-link>
      <div class="fw-bold fs-12">Prix {{ product.sellingPrice }} DZD</div>
      <div class="text-muted fs-13">SKU: {{ product.sku }}</div>
    </div>

    <div class="" v-if="show">
      <i class="fas fa-chevron-up" @click="product.qte++"></i>
      <div class="font-weight-bold font-size-18 text-center">{{ product.qte }}</div>
      <i class="fas fa-chevron-down" @click="decrement"></i>
    </div>

  </div>
</template>

<script>

export default {
  name: "productItem",
  props: {
    border: {
      type: Boolean,
      default: true
    },
    product: {
      type: Object,
      required: true
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    decrement() {
      if (this.product.qte > 0)
        this.product.qte--
    }
  }
}
</script>

<style scoped>
.fs-12 {
  font-size: 12px !important;
}

.fs-13 {
  font-size: 13px !important;
}

.fs-15 {
  font-size: 15px !important;
}

.font-size-18 {
  font-size: 20px;
}
</style>
