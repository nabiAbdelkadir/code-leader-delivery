<template>
  <router-view></router-view>
</template>

<style lang="scss">
// 3rd party plugins css
@import "~bootstrap-vue/dist/bootstrap-vue.css";
@import "~perfect-scrollbar/css/perfect-scrollbar.css";
@import "~socicon/css/socicon.css";
@import "~animate.css";
@import "~@fortawesome/fontawesome-free/css/all.css";
@import "~line-awesome/dist/line-awesome/css/line-awesome.css";
@import "assets/plugins/flaticon/flaticon.css";
@import "assets/plugins/flaticon2/flaticon.css";
@import "assets/plugins/keenthemes-icons/font/ki.css";

// Main demo style scss
@import "assets/sass/style.vue";
@import "assets/sass/reset";
@import "assets/sass/main";

// Check documentation for RTL css
// Update HTML with RTL attribute at public/index.html
/*@import "assets/css/style.vue.rtl";*/

.custom-el .el-input__inner, .custom-el .el-textarea__inner {
  background: #f3f6f9 !important;
  border-color: #f3f6f9 !important;
  color: #3f4254 !important;
  font-weight: 400;
  border-radius: 6px;
}

.custom-el .el-input__inner:focus, .custom-el .el-textarea__inner:focus {
  background-color: #ebedf3 !important;
  border-color: #ebedf3 !important;
  color: #3f4254 !important;
}

.dropdown-item {
  padding: 0.3rem 1rem !important;
}

</style>

<script>
import {OVERRIDE_LAYOUT_CONFIG} from "@/core/services/store/config.module";

import {mapGetters} from "vuex";
import {getRoles} from "@/core/services/auth";

export default {
  name: "MetronicVue",
  //computed: mapGetters(['userAuth', 'roles']),
  async mounted() {

    //await this.$store.commit('loadAuth')//don't remove this line (run first time -> reload the page )
    //console.log('roles is -> App.vue' + JSON.stringify(this.userAuth))
    //console.log('type  -> App.vue' + typeof getRoles())

    // console.log('userAuth -> App.vue' + JSON.stringify(this.userAuth))
    // console.log('###########################################')
    //console.log('roles is -> App.vue ' + JSON.stringify(this.roles))

    /**
     * this is to override the layout config using saved data from localStorage
     * remove this to use config only from static json (@/core/config/layout.config.json)
     */
    //this.$store.dispatch(OVERRIDE_LAYOUT_CONFIG);
  }
};
</script>
