<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <label>Nom (Français) <span class="text-danger">*</span> </label>
        <el-input
            class="custom-el"
            v-model="productOptionItem.nameFr"
            placeholder="Nom (Français)"/>
      </div>
      <div class="col-lg-12">
        <label>Nom (Arab) <span class="text-danger">*</span> </label>
        <el-input
            class="custom-el"
            v-model="productOptionItem.nameAr"
            placeholder="Nom (Arab)"/>
      </div>

      <div class="col-lg-12">
        <label>Type</label>
        <el-select class="custom-el" v-model="productOptionItem['productOptionId']" placeholder="Select type" clearable>
          <el-option
              v-for="item in types"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="row mt-3">
        <div class="col-lg-12">
          <b-check-box
              title="Etat des options"
              v-model="productOptionItem.isActive"/>
        </div>
      </div>

    </div>
    <div class="modal-footer flex-center">
      <button class="btn btn-success " @click="submitForm()" :disabled="disabledSubmitButton">
        Modifier
      </button>
      <div class="btn btn-light-primary " @click="$bvModal.hide('product-option-item')">
        Annuler
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OptionsItemForm",
  props: {
    productOptionItem: {
      type: [Object, Array],
      required: true
    },
    types: {
      type: [Object, Array],
      required: true
    },
  },
  computed: {
    disabledSubmitButton() {
      const {nameFr, nameAr, productOptionId} = this.productOptionItem
      return nameFr.length === 0 || nameAr.length === 0 || !Number.isInteger(productOptionId)
    },
  },
  methods: {
    submitForm() {
      console.log('update ' + JSON.stringify(this.productOptionItem))
      this.$store.dispatch('updateProductOptionsItems', this.productOptionItem)
          .then(r => this.$bvModal.hide('product-option-item'))
    }
  },
}
</script>

<style scoped>

</style>
