<template>
  <div class="buttons">
    <button class="buttons__button" @click="openModal">Delete</button>
    <button class="buttons__button" @click="toEditPage({ user })">Edit</button>

    <Modal v-if="showModal" @close="closeModal">
      <template v-slot:header>
        <span>Do you really want to delete?</span>
      </template>
      <template v-slot:body>
        <button class="modal__buttons" @click="removeUser">Yes</button>
        <button class="modal__buttons" @click="closeModal">No</button>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/Common/Modal.vue";

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
  components: { Modal },
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

.modal {
  &__buttons {
    @include main-button;
    margin: 5px;
  }
}
</style>
