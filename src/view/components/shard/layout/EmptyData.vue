<template>
  <div class="parent">
    <div>
      <img :src="require('@/assets/media/sketchy/16-dark.png')" alt="">
    </div>
    <p class="font-weight-bold text-center " v-if="false">Empty Data </p>
  </div>
</template>

<script>
export default {
  name: "EmptyData",
}
</script>

<style scoped lang="scss">
div.parent {
  div {
    width: 45%;
    margin: 0 auto;

    img {
      width: 100%;
      height: 100%;
    }
  }

  p {
    font-size: 1.8rem;
  }
}
</style>
