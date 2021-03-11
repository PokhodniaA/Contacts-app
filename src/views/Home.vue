<template>
  <UsersTable :columns="columns" :isButtons="true" />
</template>

<script>
import UsersTable from "@/components/Home/UsersTable.vue";

import { mapGetters, mapMutations } from "vuex";

import routerMixin from "@/mixins/routerMixin.js";

import defaultData from "@/assets/models/users";
import tableHeader from "@/assets/models/tableHeader";

export default {
  data: () => ({
    columns: [],
  }),
  methods: {
    ...mapMutations(["setUsers"]),
  },
  computed: mapGetters(["getUsers"]),
  components: { UsersTable },
  mixins: [routerMixin],
  mounted() {
    const setDefaultData = () => {
      this.setUsers(defaultData);
      localStorage.setItem("users", JSON.stringify(defaultData));
    };

    const localUsers = localStorage.getItem("users");
    this.columns = tableHeader;
    localUsers ? this.setUsers(JSON.parse(localUsers)) : setDefaultData();
  },
};
</script>
