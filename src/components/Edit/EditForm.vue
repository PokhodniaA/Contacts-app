<template>
  <form class="editForm">
    <div class="editForm__buttonsWrapper">
      <button class="editForm__undoButton" @click="undo">
        <img src="@/assets/img/icons/undo-arrow.svg" alt="Undo" />
      </button>
    </div>

    <div v-for="(value, key) in user" :key="key" class="editForm__field">
      <div v-if="key != 'id'" class="editForm__wrapper">
        <label class="editForm__label">{{ toUpperCase(key) }}</label>
        <input
          @change="toCache()"
          :placeholder="key"
          v-model="user[key]"
          class="editForm__input"
        />
        <button
          v-if="!getValues.includes(key)"
          @click="openModal('delete', key)"
          class="editForm__iconButton"
        >
          <img src="@/assets/img/icons/delete.svg" alt="Delete" />
        </button>
      </div>
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

    <DeleteModal
      v-if="showModal.delete"
      @close="closeModal('delete')"
      @remove="removeField()"
    />

    <AddField
      v-if="showModal.add"
      @close="closeModal('add')"
      @update="toCache"
      :user="user"
    />
  </form>
</template>

<script>
import CancelModal from "@/components/Common/Modals/CancelModal";
import ErrorModal from "@/components/Common/Modals/ErrorModal";
import DeleteModal from "@/components/Common/Modals/DeleteModal";
import AddField from "@/components/Edit/AddField";

import { mapGetters, mapMutations } from "vuex";

import routerMixins from "@/mixins/routerMixin";
import formatMethods from "@/mixins/formatMethods.js";
import validateForms from "@/mixins/validateForms";
import modal from "@/mixins/modal";

export default {
  data: () => ({
    user: {},
    cache: [],
    isNewUser: false,
    showModal: {
      cancel: false,
      error: false,
      delete: false,
      add: false,
      args: [],
    },
    errorMessage: "",
  }),
  methods: {
    ...mapMutations(["updateUser"]),

    // Apply users

    setUser() {
      const filledForm = this.isCorrectData(this.getValues, this.user); // Test on the completion of all fields

      if (filledForm && !this.isNewUser) {
        localStorage.setItem("users", JSON.stringify(this.getUsers));
        this.toMainPage();
      } else if (filledForm && this.isNewUser) {
        this.createNewUser();
      } else {
        this.errorMessage = "Fill in all the fields";
        this.openModal("error");
      }
    },
    createNewUser() {
      this.pushUser(this.user, this.getUsers); // Push user in users array
      this.showNewUsers(this.getUsers); // Set new data in localStorage and show main page
    },

    // Cache

    toCache() {
      this.cache.push({ ...this.user });
    },
    undo() {
      const cache = this.cache;

      if (cache.length > 1) {
        cache.pop();
        this.updateUser();
      }
    },

    // Delete field

    removeField() {
      const key = this.showModal.args[0];
      this.deleteField(key);
      this.closeModal("delete");
    },
    deleteField(key) {
      this.$delete(this.user, key);
      this.toCache();
    },

    // Update Data

    updateUser() {
      const cache = this.cache;
      const lastData = cache[cache.length - 1];

      const userKeys = this.getAllKeyNames(this.user, userKeys); // unique keys of user
      const dataKeys = this.getAllKeyNames(lastData, dataKeys); // unique keys of lastData

      // get a list of all the keys that are in user, but not in lastData
      const userDiff = [...userKeys].filter((x) => !dataKeys.has(x));

      // iterate of lastData, and replace all keys what have lastData.
      for (let key in lastData) {
        if (this.user[key] && lastData[key]) {
          this.user[key] = lastData[key];
        } else if (!this.user[key] && lastData[key]) {
          this.$set(this.user, key, lastData[key]);
        }
      }

      // if lastData haven't keys but the user has it, then delete this keys from the user
      if (userDiff.length > 0) {
        for (let key of userDiff) {
          this.$delete(this.user, key);
        }
      }
    },
    getAllKeyNames(obj) {
      const res = new Set();

      Object.keys(obj).forEach(function (k) {
        res.add(k);
      });

      return res;
    },
  },
  computed: mapGetters(["getUsers", "getValues"]),
  props: {
    currentUser: Object,
  },
  components: { CancelModal, ErrorModal, DeleteModal, AddField },
  mixins: [routerMixins, formatMethods, validateForms, modal],

  mounted() {
    const userKeys = Object.keys(this.currentUser);
    const userLength = userKeys.length;

    if (userLength) {
      this.user = this.currentUser;
      this.toCache();
    } else {
      this.isNewUser = true;
      this.user = Object.assign(
        ...this.getValues.map((item) => ({ [item]: "" }))
      );
    }
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

  // Fields

  &__field {
    display: flex;
    justify-content: center;

    width: 100%;
  }

  &__wrapper {
    position: relative;
    display: flex;
    justify-content: flex-end;

    padding: 5px;
    min-width: 70%;

    @media screen and (max-width: 700px) {
      width: 90%;
    }

    @media screen and (max-width: 500px) {
      flex-direction: column;
      justify-content: flex-start;
    }
  }

  &__label {
    padding: 5px;
    flex: 1;

    text-align: start;
  }

  &__input {
    flex: 4;

    margin-bottom: 10px;
    min-width: 40%;
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

  // Buttons

  &__buttonsWrapper {
    display: flex;
    justify-content: flex-start;

    width: 70%;

    @media screen and (max-width: 700px) {
      width: 90%;
    }
  }

  &__mainButton {
    @include main-button;

    margin: 10px;
  }

  &__undoButton {
    @include icon-button;

    margin: 0 5px;
    height: 30px;
  }

  &__iconButton {
    @include icon-button;

    position: absolute;

    transform: translateX(32px);

    &:hover {
      transform: translateX(32px) scale(1.2);
    }

    @media screen and (max-width: 500px) {
      right: 10px;

      transform: none;

      &:hover {
        transform: scale(1.2);
      }
    }
  }
}
</style>
