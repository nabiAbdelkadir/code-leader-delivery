<template>
  <div class="card-title">
    <h3 class="card-label">
      {{ title }}
      <span class="text-muted pt-2 font-size-sm d-block">
            {{ description }}
      </span>
    </h3>
  </div>
</template>

<script>
export default {
  name: "CardTitle",
  props: ['title', 'description']
}
</script>
