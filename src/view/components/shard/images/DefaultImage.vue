<template>
  <img :src="src" :alt="alt" @error="getDefaultImg"/>
</template>

<script>
export default {
  name: "DefaultImage",
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: 'image'
    },
    errorPath: {
      type: String,
      default: require('@/assets/media/images/3333449.jpg')
    }
  },
  data() {
    return {
      applyError: false
    }
  },
  methods: {
    getDefaultImg(event) {
      event.target.src = this.errorPath
    }
  },
}
</script>

<style scoped>

</style>
