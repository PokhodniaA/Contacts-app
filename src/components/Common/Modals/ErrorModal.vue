<template>
  <Modal @close="close">
    <template v-slot:header>
      <span>ERROR</span>
    </template>
    <template v-slot:body>
      <div class="modal__text">{{ message }}</div>
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
  },
  props: {
    message: String,
  },
  components: { Modal },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/var.scss";
@import "@/assets/style/mixins.scss";

.modal {
  &__text {
  }
}
</style>