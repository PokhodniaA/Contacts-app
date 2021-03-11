<template>
  <UsersTable :isButtons="true" />
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
