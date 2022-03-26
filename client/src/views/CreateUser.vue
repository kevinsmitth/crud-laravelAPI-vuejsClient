<template>
  <b-container>
    <form
      @submit.prevent="register"
      class="text-center mx-auto p-3 rounded"
      style="width: 400px; background-color: #dddddd"
    >
      <h1 class="h4 pb-2">Registre-se</h1>
      <div class="form-floating mb-3">
        <b-input
          type="text"
          name="name"
          id="name"
          v-model="form.name"
          placeholder="Nome"
          required
        ></b-input>
        <label for="name">Nome</label>
      </div>
      <div class="form-floating mb-3">
        <b-input
          type="email"
          name="email"
          id="email"
          v-model="form.email"
          placeholder="E-mail"
          required
        ></b-input>
        <label for="email">E-mail</label>
      </div>
      <div class="form-floating mb-3">
        <b-input
          type="password"
          name="password"
          id="password"
          v-model="form.password"
          placeholder="Senha"
          required
        ></b-input>
        <label for="password">Senha</label>
      </div>
      <div class="text-center mb-3">
        <button
          class="btn btn-success"
          id="submit"
          variant="success"
          type="submit"
        >
          Cadastrar
        </button>
      </div>
      <div class="text-center">
        <span>Já possui cadastro? </span>
        <router-link :to="{ name: 'home' }">Entre agora</router-link>
      </div>
    </form>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateUser",
  components: {
    //
  },

  data() {
    return {
      form: {
        name: null,
        email: null,
        password: null,
      },
    };
  },

  methods: {
    async register() {
      await axios
        .post("register", this.form)
        .then(() => {
          this.$router.replace({
            name: "users",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

