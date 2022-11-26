<template>
  <VueFileAgent
      :deletable="true"
      :meta="true"
      :accept="'image/*'"
      :maxSize="'10MB'"
      :maxFiles="1"
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
</template>

<script>
export default {
  name: "SingleUpload",
  props: {},
  data() {
    return {
      fileRecords: [
        /*
            *
            * {
                "name": "",
                "size": 262,
                "type": "image/jpg",
                "ext": "PNG",
                "url": "https://cdn.pixabay.com/photo/2017/10/10/00/03/kids-2835430_960_720.jpg",
            },*/
      ],
      uploadUrl: 'https://www.mocky.io/v2/5d4fb20b3000005c111099e3',
      uploadHeaders: {'X-Test-Header': 'vue-file-agent'},
      fileRecordsForUpload: [], // maintain an upload queue
    }
  },
  methods: {
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
