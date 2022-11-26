<template>
  <div class="card card-custom " :class="{'body-root' : bodyCard}">
    <card-header :title="title" v-if="false"/>

    <div class="card-header" v-if="title  || hasCardHeaderSlot">
      <div class="card-title">
        <slot name="card-header"></slot>
        <h3 class="card-label" v-if="title">{{ title }}</h3>
      </div>

      <div class="card-toolbar">
        <slot name="card-toolbar"></slot>
      </div>
    </div>

    <div class="card-body">
      <slot name="card-body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "DefaultCard",
  props: {
    title: {
      type: String,
      default: null
    },
    bodyCard: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    hasCardHeaderSlot() {
      return !!this.$slots['card-header']
    }
  }
}
</script>

<style scoped>
.card-header {
  border: 0 !important;
}

.card.card-custom > .card-header .card-title .card-label {
  font-weight: 600 !important;
}

.card.card-custom > .card-body {
  padding: 0 2.25rem 2.25rem;
}
</style>
