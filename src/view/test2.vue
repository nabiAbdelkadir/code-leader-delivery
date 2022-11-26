<template>
  <div class="container-80">

    <default-card title="test" :body-card="false" class="mb-7">
      <template #card-body class="mb-7">

        <div class="center">

          <vs-tooltip shadow interactivity>
            <vs-avatar>
              <img src="https://vuesax.com/avatars/avatar-5.png" alt="">
            </vs-avatar>
            <template #tooltip>
              <div class="content-tooltip">
                <div class="body">
                  <div class="text">
                    Cosed Tasks
                  </div>
                </div>
              </div>
            </template>
          </vs-tooltip>


        </div>
      </template>

    </default-card>


  </div>
</template>

<script>

export default {
  data() {
    return {
      activeTooltip1: false
    };
  },
  methods: {}
};
</script>

<style lang="stylus">

</style>

