import store from "@/store";
import axios from "axios";

store.subscribe((mutation) => {
  switch (mutation.type) {
    case "auth/SET_TOKEN":
      if (mutation.payload) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${mutation.payload}`;

        localStorage.setItem("token", mutation.payload);
      } else {
        axios.defaults.headers.common["Authorization"] = null;
        localStorage.removeItem("token");
      }
      break;

    case "auth/SET_USER":
      if (mutation.payload.status) {
        axios.defaults.headers.common["Authorization"] = null;
        localStorage.removeItem("token");
        this.$router.replace({
          name: "home",
        });
      }
      break;

    default:
      break;
  }
});
