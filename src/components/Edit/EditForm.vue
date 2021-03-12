<template>
  <form class="editForm">
    <button class="editForm__addButton" @click="undo">Undo</button>

    <div v-for="(key, index) in keys" :key="index" class="editForm__field">
      <label class="editForm__label">{{ toUpperCase(key) }}</label>
      <input
        @change="toCache"
        :placeholder="key"
        v-model="currentUser[key]"
        class="editForm__input"
      />
      <button v-if="!keys.includes(key)" class="editForm__addButton">
        Delete
      </button>
    </div>

    <button class="editForm__mainButton" @click="setUser">Edit</button>
    <button class="editForm__mainButton" @click="toMainPage">Cancel</button>
    <button class="editForm__mainButton">Add new field</button>
  </form>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import routerMixins from "@/mixins/routerMixin";
import formatMethods from "@/mixins/formatMethods.js";
import validateForms from "@/mixins/validateForms";

export default {
  data: () => ({
    currentUser: {},
    keys: [],
    cache: [],
    isNewUser: false,
  }),
  methods: {
    ...mapMutations([""]),
    setUser() {
      const filledForm = this.isCorrectData(this.getValues, this.user);
      if (filledForm && !this.isNewUser) {
        localStorage.setItem("users", JSON.stringify(this.getUsers));
        this.toMainPage();
      } else if (filledForm && this.isNewUser) {
        this.createNewUser();
      } else {
        alert("Fill all fields correctly"); // Сделать через модалку
      }
    },
    createNewUser() {
      this.pushUser(this.user, this.getUsers);
      this.showNewUsers(this.getUsers);
    },
    toCache() {
      this.cache.push({ ...this.currentUser });
      console.log(this.cache);
    },
    undo() {
      if (this.cache.length > 1) {
        this.cache.pop();
        const lastIndex = this.cache.length - 1;

        console.log(lastIndex, this.cache, "pop");
        this.currentUser = { ...this.cache[lastIndex] };
      }
    },
  },
  computed: mapGetters(["getUsers", "getValues"]),
  props: {
    user: Object,
  },
  components: {},
  mixins: [routerMixins, formatMethods, validateForms],
  created() {
    const userKeys = Object.keys(this.user);
    const isEmptyObject = userKeys.length;

    this.currentUser = this.user;

    if (!isEmptyObject) {
      this.isNewUser = true;
      this.keys = this.getValues;
      this.cache.push(
        Object.assign(...this.getValues.map((item) => ({ [item]: "" })))
      );
      console.log(this.cache, "new");
    } else {
      this.keys = userKeys.filter((item) => item !== "id");
      this.cache.push({ ...this.user });
    }

    // this.keys.forEach((key) => (this.cache[key] = ""));
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/var.scss";
@import "@/assets/style/mixins.scss";

.editForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__field {
    display: flex;
    justify-content: flex-end;
    padding: 5px;
    min-width: 70%;

    @media screen and (max-width: 700px) {
      width: 90%;
    }
  }
  &__label {
    text-align: start;
    padding: 5px;
    flex: 1;
  }
  &__input {
    flex: 4; //  поправить адаптивность
    margin-bottom: 10px;
    min-width: 40%;
    padding: 5px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    border: 1px solid #2c3e50;
    border-radius: 5px;
    transition: 0.2s;
    &:focus {
      outline: none;
      border: 1px solid #ec407a;
      border-radius: 5px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    }
  }

  &__mainButton {
    @include main-button(#fff, #ec407a, #fff);
    margin: 10px;
  }

  &__addButton {
    @include additional-button;

    margin: 0 5px;
    height: 30px;
    flex: 1;
  }
}
</style>
