<template>
  <div class="topbar-item">
    <div
        class="btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2"
        id="kt_quick_user_toggle"
    >
      <span class="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1">
        Hi,
      </span>
      <span class="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3">
         {{ userAuth.name }}
      </span>
      <span class="symbol symbol-35 symbol-light-success">
        <img v-if="false" alt="Pic" :src="currentUserPersonalInfo.photo"/>
        <span v-if="true" class="symbol-label font-size-h5 font-weight-bold">
          {{ firstChar }}
        </span>
      </span>
    </div>

    <div
        id="kt_quick_user"
        ref="kt_quick_user"
        class="offcanvas offcanvas-right p-10"
    >
      <!--begin::Header-->
      <div
          class="offcanvas-header d-flex align-items-center justify-content-between pb-5"
      >
        <h3 class="font-weight-bold m-0">
          User Profile
          <small class="text-muted font-size-sm ml-2" v-if="false">12 messages</small>
        </h3>
        <a
            href="#"
            class="btn btn-xs btn-icon btn-light btn-hover-primary"
            id="kt_quick_user_close"
        >
          <i class="ki ki-close icon-xs text-muted"></i>
        </a>
      </div>
      <!--end::Header-->

      <!--begin::Content-->
      <perfect-scrollbar
          class="offcanvas-content pr-5 mr-n5 scroll"
          style="max-height: 90vh; position: relative;"
      >
        <!--begin::Header-->
        <div class="d-flex align-items-center mt-5">

          <div class="symbol symbol-100 mr-5 symbol-light-success">
         <span v-if="true" class="symbol-label font-size-2 font-weight-bold" style="font-size: 2.5rem">
          {{ firstChar }}
        </span>

            <img
                v-if="false"
                class="symbol-label"
                :src="require('@/assets/media/images/4.png')"
                alt=""
            />
            <i class="symbol-badge bg-success"></i>
          </div>
          <div class="d-flex flex-column">
            <span
                class="font-weight-bold font-size-h5 text-dark-75 text-hover-primary"
            >
              {{ userAuth.name }}
            </span>
            <div class="text-muted mt-1">Agent</div>
            <div class="navi mt-2">
              <span class="navi-item">
                <span class="navi-link p-0 pb-2">
                  <span class="navi-icon mr-1" v-if="false">
                    <span class="svg-icon svg-icon-lg svg-icon-primary">
                      <!--begin::Svg Icon-->
                      <inline-svg src="media/svg/icons/Communication/Mail-notification.svg"/>
                      <!--end::Svg Icon-->
                    </span>
                  </span>
                  <span class="navi-text text-muted text-hover-primary" v-if="false">
                    {{ userAuth.login }}
                  </span>
                </span>
              </span>
            </div>
            <button class="btn btn-light-primary btn-bold" @click="onLogout">
              Sign out
            </button>
          </div>
        </div>
        <!--end::Header-->
        <div class="separator separator-dashed mt-8 mb-5" v-if="false"></div>

        <!--begin::Nav-->
        <div class="navi navi-spacer-x-0 p-0" v-if="false">
          <!--begin::Item-->
          <router-link
              to="/builder"
              @click.native="closeOffcanvas"
              href="#"
              class="navi-item"
          >
            <div class="navi-link">
              <div class="symbol symbol-40 bg-light mr-3">
                <div class="symbol-label">
                  <span class="svg-icon svg-icon-md svg-icon-success">
                    <!--begin::Svg Icon-->
                    <inline-svg
                        src="media/svg/icons/General/Notification2.svg"
                    />
                    <!--end::Svg Icon-->
                  </span>
                </div>
              </div>
              <div class="navi-text">
                <router-link to="/custom-pages/profile">
                  <div class="font-weight-bold">My Profile</div>
                </router-link>
                <div class="text-muted">
                  Account settings and more
                  <span
                      class="label label-light-danger label-inline font-weight-bold"
                  >
                    update
                  </span>
                </div>
              </div>
            </div>
          </router-link>
          <!--end:Item-->
          <!--begin::Item-->
          <router-link
              to="/builder"
              @click.native="closeOffcanvas"
              href="#"
              class="navi-item"
          >
            <div class="navi-link">
              <div class="symbol symbol-40 bg-light mr-3">
                <div class="symbol-label">
                  <span class="svg-icon svg-icon-md svg-icon-warning">
                    <!--begin::Svg Icon-->
                    <inline-svg src="media/svg/icons/Shopping/Chart-bar1.svg"/>
                    <!--end::Svg Icon-->
                  </span>
                </div>
              </div>
              <div class="navi-text">
                <div class="font-weight-bold">My Messages</div>
                <div class="text-muted">Inbox and tasks</div>
              </div>
            </div>
          </router-link>
          <!--end:Item-->
          <!--begin::Item-->
          <router-link
              to="/builder"
              @click.native="closeOffcanvas"
              href="#"
              class="navi-item"
          >
            <div class="navi-link">
              <div class="symbol symbol-40 bg-light mr-3">
                <div class="symbol-label">
                  <span class="svg-icon svg-icon-md svg-icon-danger">
                    <!--begin::Svg Icon-->
                    <inline-svg src="media/svg/icons/Files/Selected-file.svg"/>
                    <!--end::Svg Icon-->
                  </span>
                </div>
              </div>
              <div class="navi-text">
                <div class="font-weight-bold">My Activities</div>
                <div class="text-muted">Logs and notifications</div>
              </div>
            </div>
          </router-link>
          <!--end:Item-->
          <!--begin::Item-->
          <router-link
              to="/builder"
              @click.native="closeOffcanvas"
              href="#"
              class="navi-item"
          >
            <div class="navi-link">
              <div class="symbol symbol-40 bg-light mr-3">
                <div class="symbol-label">
                  <span class="svg-icon svg-icon-md svg-icon-primary">
                    <!--begin::Svg Icon-->
                    <inline-svg
                        src="media/svg/icons/Communication/Mail-opened.svg"
                    />
                    <!--end::Svg Icon-->
                  </span>
                </div>
              </div>
              <div class="navi-text">
                <div class="font-weight-bold">My Tasks</div>
                <div class="text-muted">latest tasks and projects</div>
              </div>
            </div>
          </router-link>
          <!--end:Item-->
        </div>
        <!--end::Nav-->

        <div class="separator separator-dashed my-7" v-if="false"></div>
        <!--begin::Notifications-->
        <div v-if="false">
          <!--begin:Heading-->
          <h5 class="mb-5">Recent Notifications</h5>
          <!--end:Heading-->
          <template v-for="(item, i) in list">
            <!--begin::Item -->
            <div
                class="d-flex align-items-center rounded p-5 gutter-b"
                v-bind:class="`bg-light-${item.type}`"
                v-bind:key="i"
            >
              <span
                  class="svg-icon mr-5"
                  v-bind:class="`svg-icon-${item.type}`"
              >
                <span class="svg-icon svg-icon-lg">
                  <!--begin::Svg Icon-->
                  <inline-svg :src="item.svg"/>
                  <!--end::Svg Icon-->
                </span>
              </span>
              <div class="d-flex flex-column flex-grow-1 mr-2">
                <a
                    href="#"
                    class="font-weight-normal text-dark-75 text-hover-primary font-size-lg mb-1"
                >
                  {{ item.title }}
                </a>
                <span class="text-muted font-size-sm">
                  {{ item.desc }}
                </span>
              </div>
              <span
                  class="font-weight-bolder py-1 font-size-lg"
                  v-bind:class="`text-${item.type}`"
              >
                {{ item.alt }}
              </span>
            </div>
            <!--end::Item -->
          </template>
        </div>
        <!--end::Notifications-->
      </perfect-scrollbar>
      <!--end::Content-->
    </div>
  </div>
</template>

<style lang="scss" scoped>
#kt_quick_user {
  overflow: hidden;
}
</style>

<script>
import {mapGetters} from "vuex";
import {LOGOUT} from "@/core/services/store/auth.module";
import KTLayoutQuickUser from "@/assets/js/layout/extended/quick-user.js";
import KTOffcanvas from "@/assets/js/components/offcanvas.js";
import {getUser} from "@/core/services/auth";

export default {
  name: "KTQuickUser",
  data() {
    return {
      userAuth: {},
      list: [
        {
          title: "Another purpose persuade",
          desc: "Due in 2 Days",
          alt: "+28%",
          svg: "media/svg/icons/Home/Library.svg",
          type: "warning"
        },
        {
          title: "Would be to people",
          desc: "Due in 2 Days",
          alt: "+50%",
          svg: "media/svg/icons/Communication/Write.svg",
          type: "success"
        },
        {
          title: "Purpose would be to persuade",
          desc: "Due in 2 Days",
          alt: "-27%",
          svg: "media/svg/icons/Communication/Group-chat.svg",
          type: "danger"
        },
        {
          title: "The best product",
          desc: "Due in 2 Days",
          alt: "+8%",
          svg: "media/svg/icons/General/Attachment2.svg",
          type: "info"
        }
      ]
    };
  },
  mounted() {
    this.userAuth = getUser()
    // Init Quick User Panel
    KTLayoutQuickUser.init(this.$refs["kt_quick_user"]);
  },
  methods: {
    onLogout() {
      this.$store.commit('destroySession')
      this.$router.push({name: "login"})
    },
    closeOffcanvas() {
      new KTOffcanvas(KTLayoutQuickUser.getElement()).hide();
    }
  },
  computed: {
    ...mapGetters(["currentUserPersonalInfo"]),
    firstChar() {
      return this.userAuth?.name?.charAt(0).toUpperCase()
    }
  }
};
</script>
