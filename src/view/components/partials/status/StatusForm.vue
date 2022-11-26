<template>
  <el-form :model="form" :ref="formName">

    <div class="row">
      <div class="col-lg-12">
        <label>Nom (Français)<span class="text-danger">*</span> </label>
        <el-form-item
            prop="nameFr"
            :rules="validate.required">
          <el-input
              class="custom-el"
              placeholder="nom et prénom"
              v-model="form.nameFr"/>
        </el-form-item>
      </div>

      <div class="col-lg-12">
        <label>Nom (Arabe)<span class="text-danger">*</span> </label>
        <el-form-item
            prop="nameAr"
            :rules="validate.required">
          <el-input
              class="custom-el"
              placeholder="nom et prénom"
              v-model="form.nameAr"/>
        </el-form-item>
      </div>
      <div class="col-lg-12" v-if="pageType!=='cancellation'">
        <div class="form-group">
          <div class="checkbox-inline">
            <label class="checkbox checkbox-lg">
              <input type="checkbox" v-model="form.notificationSms"/>
              <span></span>
              Notification SMS
            </label>
          </div>
        </div>
      </div>

      <div class="col-lg-12" v-if="form.notificationSms">
        <label>SMS texte </label>
        <el-form-item

        >
          <el-input
              type="textarea"
              class="custom-el"
              :row="5"
              placeholder="nom et prénom"
          />
        </el-form-item>
      </div>


      <div class="col-lg-12">
        <div class="form-group">
          <div class="checkbox-inline">
            <label class="checkbox checkbox-lg">
              <input type="checkbox" v-model="form.isActive"/>
              <span></span>
              Active
            </label>
          </div>
          <span class="text-muted fa-sm">Enter the product SKU.. </span>
        </div>
      </div>

    </div>
    <div class="modal-footer flex-center">
      <div class="btn btn-primary " @click="submitForm()">
        Save
      </div>
      <div class="btn btn-light-primary " @click="resetForm()">
        Reset
      </div>
    </div>

  </el-form>
</template>

<script>
import validate from "@/core/data/validate.ts";
import ApiService from "@/core/services/api.service";


export default {
  name: "StatusForm",
  props: {
    editeId: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      validate,
      formName: "form",
      pageType: '',
      url: '/status-models',
      form: {
        nameFr: '',
        nameAr: '',
        notificationSms: false,
        isActive: true,
        type: null,
      },
    }
  },
  methods: {
    submitForm() {
      this.$refs[this.formName].validate(async (valid) => {
        if (!valid)
          return console.log('error submit!!');

        try {
          let response;
          if (this.editeId === -1)
            response = await ApiService.post(this.url, this.form)
          else
            response = await ApiService.put(`${this.url}/${this.editeId}`, this.form)

          console.log("response " + JSON.stringify(response))

          if (response)
            if (this.editeId !== -1)
              return this.$emit('update-status', this.form)

          this.$emit('insert-status', response)

        } catch (e) {
          console.log("error post" + e)
          console.log("error.response " + JSON.stringify(e.response))
        }

        this.$message({message: 'Congrats, this is a success message.', type: 'success'});
        this.resetForm()

      });
    },
    resetForm() {
      this.$refs[this.formName].resetFields();
    }
  },
  async created() {
    this.pageType = this.$route.path.split("/").pop();
    this.pageType === 'cancellation' ?
        this.url = '/cancellation-reason-model' :
        this.form.type = this.pageType === 'conformation'
    if (this.editeId !== -1)
      this.form = await ApiService.get(`${this.url}/${this.editeId}`)

  },

}
</script>

<style scoped>

</style>
