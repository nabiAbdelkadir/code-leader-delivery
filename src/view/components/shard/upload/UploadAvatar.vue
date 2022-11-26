<template>
  <div class="image-input image-input-outline" id="kt_image_1">
    <div class="image-input-wrapper" :style="{
              'background-image': `url(${getSrc})`,
              width: '144px',
              height: '144px',
            }"></div>

    <label class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="change"
           data-toggle="tooltip" title="" data-original-title="Change avatar">
      <i class="fa fa-pen icon-sm text-muted"></i>
      <input type="file" name="profile_avatar" accept=".png, .jpg, .jpeg" @change="onFileChanged" ref="myFiles"/>
      <input type="hidden" name="profile_avatar_remove"/>
    </label>

    <span class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="cancel"
          data-toggle="tooltip" title="Cancel avatar">
          <i class="ki ki-bold-close icon-xs text-muted"></i>
     </span>

  </div>
</template>

<script>
import KTImageInput from "@/assets/js/components/image-input";

export default {
  name: "UploadAvatar",
  props: {
    src: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      avatar: null,
      selectedFile: '',
    }
  },
  computed: {
    getSrc() {
      //return require('@/assets/media/images/blank-image.svg')
      return this.src ? this.src : require('@/assets/media/images/blank-image.svg')
    }
  },
  methods: {
    onFileChanged() {
      //console.log('change  ' + event)
      this.selectedFile = this.$refs.myFiles.files[0]
    },
  },
  mounted() {
    this.avatar = new KTImageInput('kt_image_1');

    this.avatar.on('cancel', function (imageInput) {
      //console.log('cancel')
    });

    this.avatar.on('change', function (imageInput) {
      //console.log('change 2 ' + JSON.stringify(imageInput))
    });

    this.avatar.on('remove', function (imageInput) {
      //console.log('remove  ')
    });
  },
  watch: {
    'src'(newValue) {
      console.log('watch product image ' + newValue)
      //this.src ? this.initSrc = this.src : require('@/assets/media/images/blank-image.svg')
    }
  }
}
</script>

<style scoped>

</style>
