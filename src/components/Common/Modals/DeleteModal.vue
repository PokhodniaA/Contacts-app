<template>
  <Modal @close="close">
    <template v-slot:header>
      <span>Do you really want to delete?</span>
    </template>
    <template v-slot:body>
      <button class="modal__buttons" @click="remove">Yes</button>
      <button class="modal__buttons" @click="close">No</button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Common/Modal.vue";

export default {
  methods: {
    close() {
      this.$emit("close");
    },
    remove() {
      this.$emit("remove");
    },
  },
  props: {
    showModal: Boolean,
  },
  components: { Modal },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/var.scss";
@import "@/assets/style/mixins.scss";

.modal {
  &__buttons {
    @include main-button;
    margin: 5px;
  }
}
</style>