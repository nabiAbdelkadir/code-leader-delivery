<template>
  <default-card :body-card="false" :title="`Order (#${order.id})`">
    <template #card-body>
      <p>CancellationReason</p>
    </template>
  </default-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "CancellationReason",
  computed: mapGetters(["order"]),
}
</script>

<style scoped>

</style>
