<template>
  <Modal @close="close">
    <template v-slot:header>
      <span
        >Add new field. <br /><small>Example: E-mail:test@test.com</small></span
      >
    </template>
    <template v-slot:body>
      <input
        type="text"
        class="modal__input"
        @keyup.enter="add"
        v-model="input"
      />
      <span v-if="error" class="modal__error">Uncorrect data.</span>
    </template>
    <template v-slot:footer>
      <button class="modal__button" @click="add">Add</button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Common/Modal.vue";

export default {
  data: () => ({
    input: "",
    error: false,
  }),

  methods: {
    add() {
      const obj = this.parse(this.input);
      if (obj) {
        const key = Object.keys(obj)[0];
        this.$set(this.user, key, obj[key]);
        this.update();
        this.close();
      }
    },
    parse(str) {
      const arr = str.split(":");

      if (arr.length == 2 && arr[0]) {
        return { [arr[0].trim().toLowerCase()]: arr[1].trim().toLowerCase() };
      } else {
        this.showError();
        return null;
      }
    },
    update() {
      this.$emit("update");
    },
    close() {
      this.$emit("close");
    },
    showError() {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 2000);
    },
  },
  props: {
    showModal: Boolean,
    user: Object,
  },
  components: { Modal },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/var.scss";
@import "@/assets/style/mixins.scss";

.modal {
  &__input {
    width: 100%;
    padding: 5px;

    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: $text-color;

    border: 1px solid $border-color;
    border-radius: 5px;

    transition: 0.2s;

    &:focus {
      border: 1px solid $main-color;
      border-radius: 5px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
      outline: none;
    }
  }

  &__button {
    @include main-button;

    margin: 5px;
  }

  &__error {
    color: $error-color;
    font-weight: 600;
  }
}
</style>