<template>
  <form class="editForm">
    <button class="editForm__undoButton" @click="undo">Undo</button>

    <div v-for="(key, index) in keys" :key="index" class="editForm__field">
      <label class="editForm__label">{{ toUpperCase(key) }}</label>
      <input
        @change="toCache(key)"
        :placeholder="key"
        v-model="user[key]"
        class="editForm__input"
      />
      <button
        v-if="!getValues.includes(key)"
        @click="deleteField(key)"
        class="editForm__addButton"
      >
        Delete
      </button>
    </div>

    <button class="editForm__mainButton" @click="setUser">Edit</button>
    <button class="editForm__mainButton" @click="openModal('cancel')">
      Cancel
    </button>
    <button class="editForm__mainButton" @click="openModal('add')">
      Add new field
    </button>

    <CancelModal
      v-if="showModal.cancel"
      @cancel="toMainPage"
      @close="closeModal('cancel')"
    />

    <ErrorModal
      v-if="showModal.error"
      @close="closeModal('error')"
      :message="errorMessage"
    />

    <AddField v-if="showModal.add" @close="closeModal('add')" :user="user" />
  </form>
</template>

<script>
import CancelModal from "@/components/Common/Modals/CancelModal";
import ErrorModal from "@/components/Common/Modals/ErrorModal";
import AddField from "@/components/Edit/AddField";

import { mapGetters, mapMutations } from "vuex";

import routerMixins from "@/mixins/routerMixin";
import formatMethods from "@/mixins/formatMethods.js";
import validateForms from "@/mixins/validateForms";
import modal from "@/mixins/modal";

export default {
  data: () => ({
    keys: [],
    cache: [],
    isNewUser: false,
    showModal: {
      cancel: false,
      error: false,
      add: false,
    },
    errorMessage: "",
  }),
  methods: {
    ...mapMutations(["updateUser"]),
    setUser() {
      const filledForm = this.isCorrectData(this.getValues, this.user);
      if (filledForm && !this.isNewUser) {
        localStorage.setItem("users", JSON.stringify(this.getUsers));
        this.toMainPage();
      } else if (filledForm && this.isNewUser) {
        this.createNewUser();
      } else {
        this.errorMessage = "Field all fields!";
        this.openModal("error");
      }
    },
    createNewUser() {
      this.pushUser(this.user, this.getUsers);
      this.showNewUsers(this.getUsers);
    },
    toCache(key) {
      console.log(key, "key");
      console.log(this.user, "user to cache");
      this.cache.push({ ...this.user });

      console.log(this.cache);
    },
    undo() {
      if (this.cache.length > 1) {
        this.cache.pop();
        const lastIndex = this.cache.length - 1;
        const data = this.cache[lastIndex];

        for (let key in this.user) {
          data[key] !== undefined
            ? (this.user[key] = data[key])
            : this.deleteField(key);
        } // v-model новой строки не обновляеться, хотя данные изменяються

        console.log(this.user, this.cache, "after");
      }
    },
    // updateData() {
    //   const userKeys = Object.keys(this.user);

    //   console.log(this.user, "user");
    //   this.keys = userKeys.filter((item) => item !== "id");
    //   // this.cache = [];
    //   this.toCache();
    // },
    deleteField(key) {
      delete this.user[key];
      const index = this.keys.indexOf(key);
      this.keys.splice(index, 1);
      this.toCache();
      console.log(this.user, this.keys, "delete");
    },
  },
  computed: mapGetters(["getUsers", "getValues"]),
  props: {
    user: Object,
  },
  components: { CancelModal, ErrorModal, AddField },
  mixins: [routerMixins, formatMethods, validateForms, modal],
  mounted() {
    const userKeys = Object.keys(this.user);
    const isEmptyObject = userKeys.length;

    // start

    if (!isEmptyObject) {
      this.isNewUser = true;
      this.keys = this.getValues;
      this.cache.push(
        Object.assign(...this.getValues.map((item) => ({ [item]: "" })))
      );
    } else {
      this.keys = userKeys.filter((item) => item !== "id");
      this.cache.push({ ...this.user });
    }

    // this.keys.forEach((key) => (this.cache[key] = ""));
  },
  beforeUpdate() {
    const userKeys = Object.keys(this.user);

    console.log(this.user, "user");
    this.keys = userKeys.filter((item) => item !== "id");
    this.toCache();
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

  &__undoButton {
    @include additional-button;

    margin: 0 5px;
    height: 30px;
  }

  &__addButton {
    @include additional-button;

    height: 30px;
    position: absolute;
  }
}
</style>
