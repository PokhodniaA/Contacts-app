<template>
  <div class="userTable">
    <Table>
      <template v-slot:thead>
        <tr>
          <th v-for="(name, index) in getValues" :key="name + index">
            {{ toUpperCase(name) }}
          </th>
          <th v-if="isButtons" />
        </tr>
      </template>

      <template v-slot:tbody>
        <tr v-for="user in getUsers" :key="user.id">
          <td v-for="key in getValues" :key="key + user.id" :data-label="key">
            {{
              key === "name" || key === "surname"
                ? toUpperCase(user[key])
                : user[key]
            }}
          </td>
          <td v-if="isButtons">
            <TableButtons :user="user" />
          </td>
        </tr>
      </template>
    </Table>
  </div>
</template>

<script>
import Table from "./Table";
import TableButtons from "./TableButtons";

import { mapGetters } from "vuex";

export default {
  methods: {
    toUpperCase(word) {
      return word[0].toUpperCase() + word.slice(1);
    },
  },
  computed: mapGetters(["getUsers", "getValues"]),
  props: {
    isButtons: Boolean,
  },
  components: {
    Table,
    TableButtons,
  },
};
</script>

<style lang="scss" scoped>
.userTable {
  margin: 50px;
  display: flex;
  justify-content: center;
}
</style>
