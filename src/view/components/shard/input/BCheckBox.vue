<template>
  <div :class="{'form-group' : formGroup}">
    <label v-if="title" class="font-weight-bold">{{ title }}</label>

    <div class="checkbox-inline">
      <label class="checkbox " :class="{'checkbox-lg':size==='lg'}">
        <input type="checkbox" v-model="inputVal" @change="enCheck"/>
        <span></span>
        {{ label }}
      </label>
    </div>
    <span v-if="description" class="text-muted fa-sm">{{ description }}</span>
  </div>
</template>

<script>
export default {
  name: "BCheckBox",
  props: {
    label: {
      type: String,
      default: 'Active'
    },
    title: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: 'lg'
    },
    value: {
      type: Boolean,
      required: true
    },
    formGroup: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    enCheck() {
      this.$emit('enCheck', this.inputVal);
    },
    test() {
      console.log('change from child ')
    }
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  }
}
</script>

<style scoped>

</style>
