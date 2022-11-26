<template>
  <div class="card">
    <div class="card-body">
      <div class="btn btn-primary" @click="test">click me</div>
      <div class="btn btn-primary" @click="changeFileRecords">click 2</div>
      <m-file-agent ref="single"/>
      <m-file-agent ref="custom" max-files="8"/>
    </div>
  </div>
</template>

<script>

import MFileAgent from "@/view/components/custum/upload/MFileAgent";

export default {
  name: "test",
  components: {MFileAgent},
  methods: {
    test() {
      let fileRecords = this.$refs.single.$data.fileRecords
      console.log(`fileRecords :: ${JSON.stringify(fileRecords)}`)
    },
    test2() {
      let fileRecords = this.$refs.custom.$data.fileRecords
      console.log(`fileRecords :: ${JSON.stringify(fileRecords)}`)
    },
    changeFileRecords() {
      this.$emit("change-file-record", "John");
    }
  }
}
</script>


