<template>
  <div class="container mx-auto">
    <div class="flex justify-center items-center h-screen">
      <div class="w-full">
        <span class="text-4xl font-bold text-blue-500 text-center"
          >Todo Crypt</span
        >
        <div class="bg-primary-middle px-4 py-3 rounded-md shadow-md mt-3">
          <span class="text-primary-text-light font-bold text-xl"
            >Todo-list:</span
          >
          <div
            class="bg-primary-light mt-3 px-8 py-4 rounded-md text-primary-text-light flex flex-col"
          >
            <div v-if="todos.length > 0">
              <div class="cursor-pointer my-3" v-for="todo in todos" :key="todo.id">
                <div
                  @click="todo.show = !todo.show"
                  class="flex flex-row items-center justify-evenly gap-96 py-4 bg-primary-middle p-3"
                  :class="
                    todo.show == true ? 'rounded-t-md' : 'shadow-md rounded-md'
                  "
                >
                  <div></div>
                  <span class="text-xl">{{ todo.date }}</span>
                  <ChevronDownIcon
                    @click="editTodo(0)"
                    class="w-8"
                    :class="todo.show == true ? 'rotate-180' : ''"
                  />
                </div>
                <div
                  v-if="todo.show"
                  class="bg-primary-middle p-3"
                  :class="todo.show == true ? 'rounded-b-md shadow-md' : ''"
                >
                  <div
                    class="px-3 flex flex-row justify-evenly gap-96"
                    v-for="todolist in todo.Todos"
                    :key="todolist.length"
                  >
                    <input
                      type="checkbox"
                      v-model="todolist.status"
                      class="w-4 bg-blue-500 items-center"
                    />
                    <span class="text-xl">{{ todolist.title }}</span>
                    <PencilSquareIcon class="w-8" />
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center text-2xl font-bold" v-else>
              Du har ikke oprettet nogle todo's
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <div
        @click="toggleModal = !toggleModal"
        class="bg-blue-500 flex flex-row mb-5 gap-4 py-3 px-5 rounded-md items-center cursor-pointer hover:bg-blue-600"
      >
        <PlusIcon
          class="w-8 text-primary-text-light"
          :class="toggleModal == true ? 'rotate-45' : ''"
        />
        <span class="text-primary-text-light font-bold">{{
          toggleModal == true ? "Luk Todo" : "Ny Todo"
        }}</span>
      </div>
    </div>
  </div>
  <div
    v-if="toggleModal"
    class="absolute transform -translate-x-1/2 left-1/2 z-50 top-1/2"
  >
    <div
      class="bg-primary-dark text-primary-text-light p-4 rounded shadow-md w-96"
    >
      <span class="text-xl font-bold">Opret ny Todo</span>
      <div class="flex flex-col gap-3">
        <div class="flex flex-row gap-4 justify-between items-center mt-5">
          <span>Vælg dato:</span>
          <input class="bg-primary-middle px-3 py-2 rounded-md" type="date" />
        </div>
        <div class="flex flex-row gap-4 justify-between items-center mt-5">
          <span>Indtast task:</span>
          <input
            class="bg-primary-middle px-3 py-2 rounded-md"
            placeholder="Køb Mælk..."
            type="text"
          />
        </div>
        <div class="bg-blue-500 text-center py-3 rounded-md shadow-md cursor-pointer">
          Opret
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ChevronDownIcon,
  PlusIcon,
  PencilSquareIcon,
} from "@heroicons/vue/24/outline";
import { onMounted, ref } from "@vue/runtime-core";
import axios from "axios";
import { useStore } from "vuex";
import jwt_decode from "jwt-decode";

var store = useStore();
var todos = ref([]);
var toggleModal = ref(false);

onMounted(async () => {
  var token = jwt_decode(store.state.user.token);
  var todos = await axios.get(`http://localhost:3000/todo/${token.result.id}`);
  await prepareData(todos.data);
});

async function prepareData(list: []) {
  // sorter med dato
  list.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });

  list.forEach((element) => {
    todos.value.push({ ...element, show: false });
  });
}

function editTodo(editIndex: number) {
  console.log("hello");
}

function expandTodo() {
  console.log("hello");
}
</script>
