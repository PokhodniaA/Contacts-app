<template>
  <div class="editPage">
    <div class="editPage__form">
      <EditForm :currentUser="user" />
    </div>
  </div>
</template>

<script>
import EditForm from "@/components/Edit/EditForm";

export default {
  data() {
    return {
      user: {},
    };
  },
  components: {
    EditForm,
  },
  created() {
    this.user = this.$route.params.user || {};
  },
};
</script>

<style lang="scss" scoped>
.editPage {
  &__form {
    margin: 50px auto;
  }
}
</style>