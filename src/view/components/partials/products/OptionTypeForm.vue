<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <label>Nom (Français) <span class="text-danger">*</span> </label>
        <el-input
            v-model="productOptionType.nameFr"
            placeholder="Nom (Français)"/>
      </div>
      <div class="col-lg-12">
        <label>Nom (Arab) <span class="text-danger">*</span> </label>
        <el-input
            v-model="productOptionType.nameAr"
            placeholder="Nom (Arab)"/>
      </div>

      <div class="row mt-3">
        <div class="col-lg-12">
          <b-check-box
              title="Etat des options"
              v-model="productOptionType.isActive"/>
        </div>
      </div>

    </div>
    <div class="modal-footer flex-center">
      <button class="btn btn-success " @click="submitForm()" :disabled="disabledSubmitButton">
        Modifier
      </button>
      <div class="btn btn-light-primary " @click="$bvModal.hide('form')">
        Annuler
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OptionTypeForm",

  props: {
    productOptionType: {
      type: [Object, Array],
      required: true
    }
  },
  computed: {
    disabledSubmitButton() {
      const {nameFr, nameAr} = this.productOptionType
      return nameFr?.length === 0 || nameAr?.length === 0
    },
  },
  methods: {
    submitForm() {
      this.$store.dispatch('updateProductOptionsType', this.productOptionType).then(r => this.$bvModal.hide('form'))
    }
  }
}
</script>

<style scoped>

</style>
