<template>

  <div class="text-center">
      <div class="image-input image-input-outline" id="kt_image_1" v-if="false">
        <div class="image-input-wrapper "
             :style="{
              'background-image': `url(${require('@/assets/media/images/blank-image.svg')})`,
              width: '100px',
              height: '100px',
            }"
        ></div>


        <label class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="change"
               data-toggle="tooltip" title="" data-original-title="Change avatar">
          <i class="fa fa-pen icon-sm text-muted"></i>


          <input type="file" name="profile_avatar" accept=".png, .jpg, .jpeg"/>
          <input type="hidden" name="profile_avatar_remove"/>
        </label>

        <span class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="cancel"
              data-toggle="tooltip" title="Cancel avatar">
      <i class="ki ki-bold-close icon-xs text-muted"></i>
     </span>
      </div>


      <div class="shadow  bg-body img-card text-center">

        <el-tooltip content="Top center" placement="top">
          <div class="btn btn-icon btn-circle  bg-body shadow  edite-icon">
            <i class="fa fa-pen icon-sm  text-muted"></i>
          </div>
        </el-tooltip>


        <img :src="require('@/assets/media/images/blank-image.svg')" alt=""/>

      </div>
      <p class="text-muted fs-7 text-center mt-4 fs-7">
        Set the product thumbnail image. Only *.png, *.jpg and *.jpeg image files are accepted
      </p>
  </div>


</template>

<script>
export default {
  name: "UploadDefault",
  mounted() {
    // var avatar1 = new KTImageInput('kt_image_1');
  }
}
</script>

<style scoped>

img {
  width: 100%;
  height: 100%;
}

.img-card {
  width: 155px;
  height: 155px;
  margin: 0 auto;
  position: relative;
  border-radius: 5px;
  border: 3px solid #ffffff;
}

.edite-icon {
  position: absolute;
  top: -14px;
  right: -19px;
  background: white;
  width: 27px;
  height: 27px;
  transition: color .5s ease-in-out;
}

.edite-icon:hover i {
  color: #009ef7 !important;
}

.fs-7 {
  font-size: 13px!important;
}
</style>
