<template>
  <transition name="modal">
    <div class="modal__mask">
      <div class="modal__wrapper">
        <div class="modal__container">
          <div class="modal__header">
            <slot name="header"></slot>
          </div>

          <div class="modal__body">
            <slot name="body"></slot>
          </div>

          <div class="modal__footer">
            <slot name="footer"> </slot>

            <button
              class="modal__defaultButton"
              v-if="showButton"
              @click="$emit('close')"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    showButton: {
      type: Boolean,
      default: true,
    },
  },
};
</script>


<style lang="scss" scoped>
@import "@/assets/style/var.scss";
@import "@/assets/style/mixins.scss";

.modal {
  &__container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    position: relative;

    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
  }

  &__mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  &__wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  &__header {
    margin-top: 0;
    font-size: 1.2rem;
    color: #ec407a;
  }

  &__body {
    margin: 20px 0;
  }
  &__defaultButton {
    @include additional-button;

    position: absolute;
    bottom: 5px;
    right: 5px;
  }
}

// Animations

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  transform: scale(1.1);
}
</style>