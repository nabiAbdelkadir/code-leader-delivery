<template>
  <div class="parent">
    <div>
      <img :src="require('@/assets/media/1.svg')" alt="">
    </div>
    <p class="font-weight-bold text-center " v-if="false">Empty Chart </p>
  </div>
</template>

<script>
export default {
  name: "EmptyData"
}
</script>

<style scoped lang="scss">
div.parent {
  height: 100%;

  div {
    width: 45%;
    margin: 0 auto;

    img {
      width: 100%;
      height: 100%;
    }
  }

  p {
    font-size: 1rem;
  }
}
</style>
