<template>
  <div>
    <input
        v-if="false"
        placeholder="Enter name"
        class="form-control"
        v-model="inputVal">

    <el-input
        type="age"
        v-model.number="inputVal"/>

  </div>


</template>

<script>
export default {
  /*
  * <SimpleInput :value="foo" @input="foo = $event"></SimpleInput>
  * */
  name: "SimpleInput",
  props: ['value'],
  data() {
    return {
      rules: [
        {required: true, message: 'age is required'},
        {type: 'number', message: 'age must be a number'}
      ]
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
input {

}
</style>
