<template>
  <div class="buttons">
    <button class="buttons__button" @click="removeUser">Delete</button>
    <button class="buttons__button" @click="console.log('toEditPage')">
      Edit
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

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
};
</script>

<style lang="scss" scoped>
.buttons {
  &__button {
    min-width: 60px;
    padding: 3px;
    margin: 5px;
    background: #fff;
    border: 1px solid #2c3e50;
    &:hover {
      background: #fafafa;
      border: 1px solid #ec407a;
      cursor: pointer;
    }
  }
}
</style>
