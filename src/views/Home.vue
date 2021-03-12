<template>
  <div class="home">
    <div class="home__buttons">
      <button class="home__button" @click="toEditPage">Add user</button>
    </div>

    <UsersTable :isButtons="true" />
  </div>
</template>

<script>
import UsersTable from "@/components/Home/UsersTable.vue";

import { mapGetters, mapMutations } from "vuex";

import routerMixin from "@/mixins/routerMixin.js";

import defaultData from "@/assets/models/users";
import inputValues from "@/assets/models/tableHeader";

export default {
  methods: {
    ...mapMutations(["setUsers", "setValues"]),
  },
  computed: mapGetters(["getUsers", "getValues"]),
  components: { UsersTable },
  mixins: [routerMixin],
  mounted() {
    const setDefaultData = () => {
      this.setUsers(defaultData);
      localStorage.setItem("users", JSON.stringify(defaultData));
    };

    const localUsers = localStorage.getItem("users");
    localUsers ? this.setUsers(JSON.parse(localUsers)) : setDefaultData();
    this.setValues(inputValues);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/var.scss";
@import "@/assets/style/mixins.scss";

.home {
  &__buttons {
    display: flex;
    justify-content: center;
  }

  &__button {
    @include main-button(#fff, #ec407a, #fff);
  }
}
</style>
