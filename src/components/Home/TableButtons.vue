<template>
  <div class="buttons">
    <button class="buttons__button" @click="openModal">Delete</button>
    <button class="buttons__button" @click="toEditPage({ user })">Edit</button>

    <DeleteModal v-if="showModal" @close="closeModal" @remove="removeUser" />
  </div>
</template>

<script>
import DeleteModal from "@/components/Common/Modals/DeleteModal.vue";

import { mapGetters } from "vuex";

import routerMixins from "@/mixins/routerMixin";
import modal from "@/mixins/modal.js";

export default {
  methods: {
    removeUser() {
      const indexToDelete = this.getUsers.indexOf(this.user);
      this.getUsers.splice(indexToDelete, 1);
      localStorage.setItem("users", JSON.stringify(this.getUsers));
    },
  },
  computed: mapGetters(["getUsers", "getValues"]),
  props: {
    user: Object,
  },
  components: { DeleteModal },
  mixins: [routerMixins, modal],
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/var.scss";
@import "@/assets/style/mixins.scss";

.buttons {
  &__button {
    @include additional-button;
    margin: 5px;
  }
}
</style>
