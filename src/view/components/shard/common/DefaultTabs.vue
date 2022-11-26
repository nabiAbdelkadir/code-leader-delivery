<template>
  <div>

    <ul class="nav nav-dark nav-bold nav-tabs nav-tabs-line pl-0" role="tablist">
      <li class="nav-item" v-for="tab in tabs" :key="tab.header">
        <a
            :class="{'nav-link' :true, active :tab.isActive}"
            v-on:click="setActiveTab"
            style="font-size: 18px"
            :data-tab="tab.dataTab"
            data-toggle="tab"
            class="cursor-pointer"
            role="tab"
        >
          {{ tab.header }}
        </a>
      </li>
    </ul>

    <b-tabs class="hide-tabs" v-model="tabIndex">
      <slot name="tab-items"></slot>
    </b-tabs>
  </div>
</template>

<script>
export default {
  name: "DefaultTabs",
  props: {
    tabs: {
      type: [Array, Object],
      required: true
    }
  },
  data() {
    return {
      tabIndex: 0,
    }
  },
  methods: {
    setActiveTab(event) {
      const tab = event.target.closest('[role="tablist"]');
      const links = tab.querySelectorAll(".nav-link");
      for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
      }
      this.tabIndex = parseInt(event.target.getAttribute("data-tab"));
      event.target.classList.add("active");
    },
  }
}
</script>
