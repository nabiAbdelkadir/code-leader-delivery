<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <label>Nom <span class="text-danger">*</span> </label>
        <el-input
            class="custom-el"
            clearable
            v-model="charge.name"
        />
      </div>
      <div class="col-lg-12">
        <label>value <span class="text-danger">*</span> </label>
        <el-input
            class="custom-el"
            clearable
            type="number"
            :min="0"
            v-model="charge.value"/>

      </div>

      <!--
      <div class="row mt-3" v-if="false">
        <div class="col-lg-12">
          <b-check-box
              title="Etat des options"
              v-model="charge.isActive"/>
        </div>
      </div>
      -->

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
  name: "ChargesForm",
  props: {
    charge: {
      type: [Object, Array],
      required: true
    }
  },
  computed: {
    disabledSubmitButton() {
      const {name, value} = this.charge
      return name?.length === 0 || value <= 0
    },
  },
  methods: {
    async submitForm() {
      await this.$api.putItem(`shops/charge/${this.charge['id']}`, this.charge)
      this.$bvModal.hide('form')
    }
  }
}
</script>

<style scoped>

</style>
