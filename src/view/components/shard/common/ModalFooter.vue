<template>
  <div class="modal-footer" :class="{'flex-center' : flexCenter}">
    <div class="btn btn-light" @click="$emit('reset-form')">
      Reset
    </div>
    <div class="btn" @click="$emit('submit-form')" :class="btnClass" :disabled="disabledSaveBtn">
      {{ btnText }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalFooter",
  props: {
    isCreate: {
      type: Boolean,
      default: true
    },
    flexCenter: {
      type: Boolean,
      default: true
    },
    disabledSaveBtn: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    btnText() {
      return this.isCreate ? 'save' : 'update'
    },
    btnClass() {
      return this.isCreate ? 'btn-primary' : 'btn-success'
    }
  },
}
</script>

<style scoped>

</style>
