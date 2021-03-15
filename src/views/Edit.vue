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

    // const params = this.$route.params.user;

    // if (params) {
    //   this.user = this.$route.params.user;
    // } else {
    //   const user = {};
    //   this.getValues.forEach((element) => {
    //     user[element] = "";
    //   });
    //   this.user = user;
    //   console.log(this.user);
    // }
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