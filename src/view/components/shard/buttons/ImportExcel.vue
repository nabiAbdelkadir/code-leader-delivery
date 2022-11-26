<template>
  <div>
    <label for="file-upload" class="">
      <div class=" btn btn-light-primary">
        <i class="fa fa-upload"></i> Import
      </div>
    </label>
    <input id="file-upload" type="file" @change="onFileChanged" accept=".xlsx,.xls,.csv"/>
  </div>


</template>

<script>
import axios from "axios";

export default {
  name: "ImportExcel",
  methods: {
    onFileChanged(event) {
      console.log('change  '+ this.selectedFile)
      this.selectedFile = event.target.files[0]
      this.onUpload()
    },

    onUpload() {
      const formData = new FormData()
      //formData.append('file', this.selectedFile, this.selectedFile.name)
      formData.append('file', this.selectedFile)
      const headers = {'Content-Type': 'multipart/form-data'};
      axios.post('/client/import', formData, {headers})
          .then(res => {
            //console.log('response ' + JSON.stringify(res))
            this.$sweet.successInsert()
            this.selectedFile = null
            this.$emit('import', true)
          })
          .catch(err => {
            //console.log('err ' + JSON.stringify(err))
            this.$sweet.errorMessages()
          })
    },
  }
}
</script>

<style scoped>
input[type="file"] {
  display: none;
}
</style>
