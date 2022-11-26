<template>
  <div>
    <div class="d-flex flex-column pt-12 bgi-size-cover bgi-no-repeat rounded-top"
         :style="{ backgroundImage: `url(${backgroundImage})` }"
    >
      <h4 class="d-flex flex-center rounded-top">
        <span class="text-white">Notifications</span>
        <span class="btn btn-text btn-success btn-sm font-weight-bold btn-font-md ml-2" v-if="notificationsCount > 0">
          {{ notificationsCount }}  nouveau
        </span>
      </h4>
    </div>

    <perfect-scrollbar class="navi navi-hover scroll my-4" style="max-height: 40vh; position: relative;">
      <template v-for="(item, i) in notifications">
        <a href="#" class="navi-item mb-2" :key="i"
           :class="{bg : !item.isRead}"
           @click.prevent="clickNotification(i , item)">

          <div class="navi-link">
            <div class="navi-icon mr-2">
              <i :class="getImage(item)"></i>
            </div>
            <div class="navi-text">
              <div class="font-weight-bold font-size-lg">
                {{ `${item.ref}(#${item.id})` }}
              </div>
              <div class="font-weight-bold font-size-xs text-muted">
                {{ item.description }}
              </div>

              <div class="text-muted font-size-xs font-weight-700">
                {{ item.createdAt }}
              </div>
            </div>
          </div>
        </a>
      </template>
    </perfect-scrollbar>
  </div>
</template>

<style lang="scss">
.bg {
  background: #F3F6F9;
}

/* hide default vue-bootstrap tab links */
.hide-tabs > div:not(.tab-content) {
  display: none;
}
</style>

<script>
import {mapGetters} from "vuex";

export default {
  name: "KTDropdownNotification",
  data() {
    return {
      notifications: [],
      options: {
        showError: false,
        showSuccess: false
      }
    };
  },
  computed: {
    backgroundImage() {
      return process.env.BASE_URL + "media/misc/bg-1.jpg";
    },
    ...mapGetters(["notificationsCount"])
  },

  methods: {
    clickNotification(index, {id, ref}) {
      this.notifications[index].isRead = true
      this.$api.putItem(`/notification/${id}`, {isRead: true}, {}, this.options)

      const subString = ref.substr(0, 3);
      if (subString === 'CMD')
        return this.$router.push({path: '/orders/97'})
      if (subString === 'PRD')
        return this.$router.push({path: '/products/28/details'})
    },
    getImage({ref}) {
      const subString = ref.substr(0, 3);
     // console.log('sub ' + subString)
      if (subString === 'PRD')
        return 'flaticon2-user flaticon2-line- text-success'
      if (subString === 'CMD')
        return 'flaticon2-paper-plane text-danger'


    },
  },
  async created() {
    this.notifications = await this.$api.getItems('/notification')
  }
};
</script>
<style scoped>

</style>
