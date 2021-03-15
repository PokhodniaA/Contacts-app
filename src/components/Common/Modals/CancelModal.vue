<template>
  <Modal @close="close" :showButton="false">
    <template v-slot:header>
      <span>Do you really want to cancel?</span>
    </template>
    <template v-slot:body>
      <button class="modal__buttons" @click="cancel">Yes</button>
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
    cancel() {
      this.$emit("cancel");
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