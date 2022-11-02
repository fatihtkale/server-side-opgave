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
            class="bg-primary-light mt-3 px-8 py-4 rounded-md text-primary-text-light flex flex-col gap-2"
          >
            <div
              class="cursor-pointer"
              v-for="todo in todos"
              :key="todo.id"
            >
              <div @click="todo.show = !todo.show" class="flex flex-row items-center justify-center gap-96 bg-primary-middle p-3"
              :class="todo.show == true ? 'rounded-t-md' : 'shadow-md rounded-md'">
                <div></div>
                <span class="text-xl">{{ todo.date }}</span>
                <ChevronDownIcon
                  @click="editTodo(0)"
                  class="w-8"
                  :class="todo.show == true ? 'rotate-180' : ''"
                />
              </div>
              <div v-if="todo.show" class="bg-primary-middle p-3" :class="todo.show == true ? 'rounded-b-md shadow-md' : ''">
                <div class="" v-for="todolist in todo.list" :key="todolist.length">
                  <input type="checkbox" v-model="todolist.status">
                  <span>{{todolist.title}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="bg-blue-500 flex flex-row mb-5 gap-4 py-3 px-5 rounded-md items-center cursor-pointer hover:bg-blue-600">
        <PlusIcon class="w-8 text-primary-text-light" />
        <span class="text-primary-text-light font-bold">New Todo</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ChevronDownIcon, PlusIcon } from "@heroicons/vue/24/outline";
import { onMounted, ref } from "@vue/runtime-core";
import axios from "axios";
import { useStore } from "vuex";
import jwt_decode from "jwt-decode";

var store = useStore()

onMounted(async () => {
  
  var token = jwt_decode(store.state.user.token)
  console.log(token);
  var todos = await axios.get(`http://localhost:3000/todo/${token.result.id}`)
  console.log(todos)
  await prepareData(todos.data);
});

let todos = ref([]);

async function prepareData(list: []) {
  // sorter med dato
  list.sort(function(a,b){
    return new Date(a.date) - new Date(b.date);
  })

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
