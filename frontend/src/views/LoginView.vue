<template>
  <div class="flex justify-center items-center w-full h-screen">
    <div class="bg-primary-middle px-8 py-3 rounded-md shadow-md">
      <div class="flex flex-col gap-4">
        <div class="text-2xl font-bold text-blue-400 text-center mt-2">
          Todo-Crypt
        </div>
        <form class="mt-3 flex flex-col gap-3" @submit.prevent="submitLogin">
          <div class="flex flex-col">
            <span class="text-primary-text-light mb-1">Brugernavn:</span>
            <input
              type="text"
              v-model="form.username"
              name="username"
              placeholder="Indtast Brugernavn"
              class="bg-primary-dark px-3 py-2 w-64 text-primary-text-light rounded-md outline-none focus:border-2 border-blue-500"
            />
          </div>
          <div class="flex flex-col">
            <span class="text-primary-text-light mb-1">Kodeord:</span>
            <input
              type="password"
              v-model="form.password"
              name="username"
              placeholder="Indtast Kodeord"
              class="bg-primary-dark px-3 py-2 w-64 text-primary-text-light rounded-md outline-none focus:border-2 border-blue-500"
            />
          </div>
          <button
            class="bg-blue-500 py-2 rounded-md font-bold text-white"
            type="submit"
          >
            Login
          </button>
          <router-link class="text-blue-500 text-center my-2" to="/register"
            >Har ikke en bruger?</router-link
          >
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

var store = useStore();
var router = useRouter();

let form = reactive({
  username: "",
  password: "",
  error: false,
  errorMessage: "",
});

function submitLogin() {
  if (form.password === "") {
    form.error = true;
    form.errorMessage = "Adgangskode er tom!";
    return console.log("Adgangskoder er tom!");
  }

  axios
    .post("http://localhost:3000/user/login", {
      username: form.username,
      password: form.password,
    })
    .then((res) => {
      store.dispatch('changeUser', res.data.token)
      store.dispatch('changeLoginState', true)
      router.push('/todo');
    });
}
</script>

<style></style>
