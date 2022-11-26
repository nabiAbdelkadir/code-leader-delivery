
<template>
  <div class="input-group input-group-solid" :class="{'w-50' : width50}">
    <div class="input-group-prepend"><span class="input-group-text">
          <i class="fa fa-search fa-sm mr-2" v-if="showIcon"></i>
    </span>
    </div>
    <input type="search"
           v-on:keyup.enter="$emit('eventEnter')"
           class="form-control"
           :placeholder="placeholder"
           v-model="inputVal"/>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
    placeholder: {
      type: String,
      default: 'Rechercher ...'
    },
    width50: {
      type: Boolean,
      default: true
    },
    showIcon:{
      type: Boolean,
      default: true
    },
    value: {
      type: String,
      required: true
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
