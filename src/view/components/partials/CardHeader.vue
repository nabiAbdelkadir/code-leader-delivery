<template>

  <div class="card-header">
    <div class="card-title">
        <span class="card-icon" v-if="icon">
          <i class="flaticon2-chat-1 text-primary"></i>
        </span>
      <h3 class="card-label">{{ title }}</h3>
    </div>

  </div>


</template>

<script>
export default {
  name: "CardHeader",
  props: {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    icon: {
      type: String,
      default: null
    },

  }
  //props: ['title', 'description']
}
</script>
