<template>
  <div>
    <pre>{{ shippingCompanySelected }}</pre>
    <el-select
        v-model="shippingCompanySelected"
        clearable
        placeholder="Sélectionner">
      <el-option
          v-for="item in shippingCompany"
          :key="item.id"
          :label="item.name"
          :value="item.id">
      </el-option>
    </el-select>

    <div class="modal-footer flex-center">
      <button class="btn btn-primary " @click="choice" :disabled="shippingCompanySelected.length === 0">
        Save
      </button>
      <div class="btn btn-light-primary" @click="$bvModal.hide('shipping-company')">
        Annuler
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChoiceShippingCompany",
  data() {
    return {
      shippingCompany: [],
      shippingCompanySelected: ''
    }
  },
  methods: {
    choice() {
      this.$emit('choice-shipping-company', this.shippingCompanySelected)
      this.$bvModal.hide('shipping-company')
    }
  },
  created() {
    this.$api.getItems('/shipping-company?isActive=true').then(res => {
      this.shippingCompany = res.map(({id, name}) => {
        return {
          id,
          name
        }
      })
    })
  }
}
</script>

<style scoped>

</style>
