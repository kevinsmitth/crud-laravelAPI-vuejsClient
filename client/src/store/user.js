import axios from "axios";
export default {
  namespaced: true,

  state: {
    users: null,
  },
  actions: {
    async index() {
      try {
        let response = await axios.get("users");

        return response;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
