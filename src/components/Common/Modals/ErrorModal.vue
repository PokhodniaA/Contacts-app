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
