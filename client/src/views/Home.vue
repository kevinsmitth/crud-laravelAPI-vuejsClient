<template>
  <b-container>
    <div class="row">
      <div class="col-md-6">
        <form @submit.prevent="submit">
          <p class="h5">Bem-vindo de volta!</p>
          <p>Preencha seus dados para acessar o painel</p>
          <div class="form-floating mt-3">
            <input
              type="email"
              name="email"
              id="email"
              v-model="form.email"
              class="form-control"
              placeholder="E-mail"
              required
            />
            <label for="email">E-mail</label>
          </div>
          <div class="form-floating my-4">
            <input
              type="password"
              name="password"
              id="password"
              v-model="form.password"
              class="form-control"
              placeholder="Senha"
              required
            />
            <label for="password">Senha</label>
          </div>

          <div class="row">
            <div class="col-9 text-start">
              <img
                src="https://webmaniabr.com/painel/wp-content/themes/apps/images/new-site/login-page/lock.svg?v="
              />

              <span class="px-2">Esqueceu a senha?</span>
              <span><a href="#">Clique aqui</a></span>
            </div>
            <div class="col-3">
              <button
                class="btn btn-lg btn-success"
                id="submit"
                variant="success"
                type="submit"
              >
                Entrar
              </button>
            </div>
          </div>
          <div class="text-start">
            <span>Ainda não tem cadastro? </span>
            <router-link :to="{ name: 'register' }">Cadastre-se</router-link>
          </div>
        </form>
      </div>
      <div class="d-none d-md-block col-md-6">
        <img src="/images/surprise.jpg" alt="login-image" class="img-fluid" />
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "HomePage",
  components: {
    //
  },

  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
      login: "auth/login",
    }),
    submit() {
      this.login(this.form)
        .then(() => {
          this.$router.replace({
            name: "users",
          });
        })
        .catch(() => {
          console.log("failed");
        });
    },
  },
};
</script>
