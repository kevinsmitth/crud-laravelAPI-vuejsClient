<template>
  <b-container>
    <div class="text-center my-3">
      <router-link class="btn btn-outline-success" :to="{ name: 'register' }"
        >Criar um Usuário Novo</router-link
      >
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">E-mail</th>
          <th scope="col">Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td class="text-center">
            <b-button-group class="">
              <b-button
                class="btn-sm"
                @click="$bvModal.show('edit-user-' + user.id)"
              >
                <b-icon icon="tools"></b-icon>
              </b-button>
              <b-button
                class="btn-sm"
                @click="$bvModal.show('delete-user-' + user.id)"
              >
                <b-icon icon="x-circle"></b-icon>
              </b-button>
            </b-button-group>
          </td>
          <b-modal v-bind:id="'edit-user-' + user.id" hide-footer>
            <template #modal-title> Editar dados do {{ user.name }} </template>
            <div class="d-block">
              <form ref="editForm" @submit.stop.prevent="editUser(user.id)">
                <input type="hidden" name="userId" v-model="user.id" />
                <p>Nome atual: {{ user.name }}</p>
                <div class="form-floating mb-3">
                  <input
                    class="form-control"
                    type="text"
                    v-model="formEdit.name"
                    id="edit-user-input"
                    placeholder="Nome"
                  />
                  <label for="edit-user-input">Nome</label>
                </div>
                <p>E-mail atual: {{ user.email }}</p>
                <div class="form-floating mb-3">
                  <input
                    class="form-control"
                    type="email"
                    v-model="formEdit.email"
                    id="edit-user-input"
                    placeholder="E-mail"
                  />
                  <label for="edit-user-input">E-mail</label>
                </div>
                <div class="text-center">
                  <b-button
                    class="mx-2"
                    block
                    @click="$bvModal.hide('edit-user-' + user.id)"
                    >Cancelar</b-button
                  >
                  <button class="mx-2 btn btn-success" type="submit">
                    Editar
                  </button>
                </div>
              </form>
            </div>
          </b-modal>
          <b-modal :id="'delete-user-' + user.id" hide-footer>
            <template #modal-title>
              Tem certeza que deseja deletar o usuario "{{ user.name }}"?
            </template>
            <div class="d-block text-center">
              <form @submit.stop.prevent="deleteUser(user.id)">
                <b-button
                  class="mx-2"
                  block
                  @click="$bvModal.hide('delete-user-' + user.id)"
                  >Cancelar</b-button
                >
                <button class="mx-2 btn btn-danger" type="submit">
                  Deletar
                </button>
              </form>
            </div>
          </b-modal>
        </tr>
      </tbody>
    </table>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";

export default {
  name: "UsersPage",
  data() {
    return {
      users: null,
      formEdit: {
        name: "",
        email: "",
      },
    };
  },
  methods: {
    ...mapActions({
      getUsers: "user/index",
    }),
    async editUser(userId) {
      await axios
        .post("users/update/" + userId, this.formEdit)
        .then(() => {
          this.getUsers().then((response) => {
            this.users = response.data;
          });

          this.formEdit = {
            name: "",
            email: "",
          };
          this.$bvModal.hide("edit-user-" + userId);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async deleteUser(userId) {
      await axios
        .post("users/destroy/" + userId)
        .then(() => {
          this.getUsers().then((response) => {
            this.users = response.data;
          });
          this.$bvModal.hide("delete-user-" + userId);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getUsers()
      .then((response) => {
        this.users = response.data;
      })
      .catch(() => {
        console.log("failed");
      });
  },
};
</script>
    