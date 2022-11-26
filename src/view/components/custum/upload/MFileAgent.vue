<template>
  <div>
    <VueFileAgent
        :deletable="true"
        :multiple="maxFiles > 1"
        :meta="true"
        :accept="'image/*'"
        :maxSize="maxSize"
        :maxFiles="maxFiles"
        :helpText="'Choose more images'"
        :errorText="{
              type: 'Invalid file type. Only images',
              size: 'Files should not exceed 10MB in size',
                }"
        @select="filesSelected($event)"
        @beforedelete="onBeforeDelete($event)"
        @delete="fileDeleted($event)"
        v-model="fileRecords"
    ></VueFileAgent>
    <p class="text-muted fs-7 text-center mt-2" v-if="description">
      {{ description }}
    </p>
  </div>
</template>

<script>
export default {
  name: "MFileAgent",
  props: {
    maxSize: {
      type: String,
      default: '10MB'
    },
    maxFiles: {
      type: [Number, String],
      default: 1
    },
    description: {
      type: String,
      default: null
    },
  },
  data() {
    return {
      fileRecords: [],
      uploadUrl: 'https://www.mocky.io/v2/5d4fb20b3000005c111099e3',
      uploadHeaders: {'X-Test-Header': 'vue-file-agent'},
      fileRecordsForUpload: [], // maintain an upload queue
    }
  },
  mounted() {
    this.$root.$on('change-file-record', (arg) => {
      console.log("message  " + arg)
    })
  },
  methods: {
    clickFromParent() {
      console.log("click from parent ")
    },
    deleteUploadedFile: function (fileRecord) {
      this.$refs.vueFileAgent.deleteUpload(this.uploadUrl, this.uploadHeaders, fileRecord);
    },
    filesSelected: function (fileRecordsNewlySelected) {
      let validFileRecords = fileRecordsNewlySelected.filter((fileRecord) => !fileRecord.error);
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(validFileRecords);
    },
    onBeforeDelete: function (fileRecord) {
      let i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
        let k = this.fileRecords.indexOf(fileRecord);
        if (k !== -1) this.fileRecords.splice(k, 1);
      } else {
        if (confirm('Are you sure you want to delete?')) {
          this.$refs.vueFileAgent.deleteFileRecord(fileRecord);
        }
      }
    },
    fileDeleted: function (fileRecord) {
      let i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
    },
  }
}
</script>
