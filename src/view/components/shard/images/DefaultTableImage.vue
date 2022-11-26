<template>
  <div>
    <div class="symbol symbol-45 symbol-circle" v-if="type==='user'">
      <div class="symbol-label  fs-6 font-weight-bold" :class="getBackground">
        {{ name.charAt(0).toUpperCase() }}
      </div>
    </div>

    <div class="symbol symbol-50 " v-else-if="type==='product'">
      <span class="symbol-label">
        <img :src="src" @error="getDefaultImg" class="align-self-end" :alt="alt"/>
      </span>
    </div>

  </div>


</template>

<script>
export default {
  name: "DefaultTableImage",
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: 'image'
    },
    type: {
      type: String,
      default: 'product'
    },
    name: {
      type: String,
    },
    index: {
      type: Number,
    }
  },
  data() {
    return {
      bg: ["bg-light-primary", 'bg-light-danger', 'bg-light-success', 'bg-light-warning'],
      textColor: ["text-primary", 'text-danger', 'text-success', 'text-warning'],

    }
  },
  computed: {
    getBackground() {
      return this.bg[this.index % this.bg.length] + ' ' + this.textColor[this.index % this.bg.length]
    },
  },
  methods: {
    getDefaultImg(event) {
      if (this.type === 'product')
          //return event.target.src = "https://preview.keenthemes.com/metronic8/demo1/assets/media//stock/ecommerce/1.gif"
        return event.target.src = require('@/assets/media/images/1.jpg')

      //event.target.src = "https://preview.keenthemes.com/metronic8/demo1/assets/media/avatars/300-14.jpg"
      event.target.src = require('@/assets/media/images/4.png')
    }
  },
}
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
  padding: 5px;
  border-radius: 5px;
}

.symbol-45 {
  width: 45px !important;
  height: 45px !important;
}
</style>
