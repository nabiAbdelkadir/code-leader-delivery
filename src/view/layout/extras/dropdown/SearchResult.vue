<template>
  <perfect-scrollbar
      class="quick-search-wrapper scroll"
      style="max-height: 40vh; position: relative;"
      v-bind:options="{ suppressScrollX: true }"
  >
    <div class="quick-search-result">
      <!--begin::Message-->


      <template v-for="(item, i) in data">
        <!--begin::Section-->
        <div
            v-if="item.type === 0"
            :key="i"
            class="font-size-sm text-primary font-weight-bolder text-uppercase mb-2"
        >
          {{ `${item.text}  (${item.count})` }}
        </div>
        <!--end::Section-->

        <div
            v-if="item.type === 1"
            :key="i"
            class="d-flex align-items-center flex-grow-1 mb-2"
        >
          <div v-if="item.class" class="symbol symbol-30 flex-shrink-0">
            <i :class="item.class"></i>
          </div>


          <div class="d-flex flex-column ml-3 mt-2 mb-2" style="flex: 1">
            <a href="#" class="font-weight-bold text-dark text-hover-primary"
               @click.prevent="$router.push({ path: '/orders' ,
               query: { ref : item.ref , status : item.status ,id : item.id}})">
              {{ item.text }}
            </a>

            <div v-if="item.desc" class="font-size-sm font-weight-bold text-muted"> {{ item.desc }}</div>
          </div>
          <div v-if="item.status">
            <span class="badge badge-light fw-bolder">{{ item.status }}</span>
          </div>


        </div>
      </template>

      <div class="text-muted text-center mt-2 font-weight-500" v-if="data.length < 2">
        Utilisateur non trouvé
      </div>
      <!--end::Message-->
    </div>
  </perfect-scrollbar>
</template>

<script>
export default {
  name: "KTSearchResult",
  props: {
    data: Array
  }
};
</script>
