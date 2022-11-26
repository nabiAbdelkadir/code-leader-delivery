<template>
  <p></p>
</template>

<script>
export default {
  name: "EmailVerification",
  async created() {
    const token = this.$route.params.id
    this.$api.putItem(`/email-verification/${token}`, null, null, {
      showError: true,
      showSuccess: true
    }).then(() => this.$router.push({name: 'moderators'}))
  }
}
</script>

<style scoped>

</style>

