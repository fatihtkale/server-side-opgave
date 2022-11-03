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
              <div class="my-3" v-for="todo in todos" :key="todo.id">
                <div
                  @click="todo.show = !todo.show"
                  class="flex flex-row items-center justify-evenly gap-96 py-4 bg-primary-middle p-3 cursor-pointer"
                  :class="
                    todo.show == true ? 'rounded-t-md' : 'shadow-md rounded-md'
                  "
                >
                  <div></div>
                  <span class="text-xl">{{ todo.date }}</span>
                  <ChevronDownIcon
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
                      @click="updateTodosStatus(todolist.id, todolist.status)"
                    />
                    <div v-if="toggleEdit" class="flex flex-row gap-2">
                      <input type="text" v-model="editTitle" :placeholder="todolist.title" class="bg-primary-light px-3 py-2 rounded-md shadow-md">
                      <div @click="updateTodosTitle(todolist.id)" class="bg-blue-500 p-3 rounded-md cursor-pointer">Opdater</div>
                    </div>
                    <span v-else class="text-xl">{{ todolist.title }}</span>
                    <PencilSquareIcon @click="toggleEditTodos" class="w-8 cursor-pointer" />
                  </div>
                  <div class="flex justify-center mt-5">
                    <div
                      v-if="toggleTodosMenu"
                      class="flex flex-row gap-3 items-center"
                    >
                      <div
                        v-if="todosCreateForm.errorCreation"
                        class="bg-red-500 px-5 py-2 rounded-md"
                      >
                        {{ todosCreateForm.errorCreationMessage }}
                      </div>
                      <input
                        v-model="todosCreateForm.title"
                        type="text"
                        placeholder="Køb Mælk..."
                        class="bg-primary-dark px-5 py-2 rounded-md text-primary-text-light"
                      />
                      <div
                        @click="createNewTodos(todo.id)"
                        class="bg-blue-500 px-5 py-2 rounded-md shadow-md font-bold cursor-pointer"
                      >
                        Opret
                      </div>
                    </div>
                    <span
                      v-else
                      @click="toggleTodos"
                      class="bg-blue-500 px-5 py-2 rounded-md shadow-md font-bold cursor-pointer"
                      >Opret Ny Todos</span
                    >
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
    <div class="fixed bottom-5 left-1/2 transform -translate-x-1/2">
      <div
        @click="toggleTodoModal = !toggleTodoModal"
        class="bg-blue-500 flex flex-row mb-5 gap-3 py-3 px-5 rounded-md items-center cursor-pointer hover:bg-blue-600"
      >
        <PlusIcon
          class="w-8 text-primary-text-light"
          :class="toggleTodoModal == true ? 'rotate-45' : ''"
        />
        <span class="text-primary-text-light font-bold">{{
          toggleTodoModal == true ? "Luk Todo" : "Ny Todo"
        }}</span>
      </div>
    </div>
  </div>
  <div
    v-if="toggleTodoModal"
    class="absolute transform -translate-x-1/2 left-1/2 z-50 top-1/2"
  >
    <div
      class="bg-primary-dark text-primary-text-light p-4 rounded shadow-md w-96"
    >
      <span class="text-xl font-bold">Opret ny Todo</span>
      <div class="flex flex-col gap-3">
        <span
          v-if="todoCreateForm.errorCreation"
          class="bg-red-500 rounded-md py-2 mt-4 px-3"
          >{{ todoCreateForm.errorCreationMessage }}</span
        >
        <div class="flex flex-row gap-4 justify-between items-center mt-2">
          <span>Vælg dato:</span>
          <input
            v-model="todoCreateForm.newTodoDate"
            class="bg-primary-middle px-3 py-2 rounded-md"
            type="date"
          />
        </div>
        <div
          @click="createNewTodo"
          class="bg-blue-500 text-center py-3 rounded-md shadow-md cursor-pointer"
        >
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
import { onMounted, reactive, ref } from "@vue/runtime-core";
import axios from "axios";
import { useStore } from "vuex";
import jwt_decode from "jwt-decode";

var store = useStore();
var todos = ref<any>([]);
var toggleTodoModal = ref(false);
var toggleTodosMenu = ref(false);
var token: any = jwt_decode(store.state.user.token);

var editTitle = ref('')

var toggleEdit = ref(false)

function toggleEditTodos () {
  toggleEdit.value = !toggleEdit.value
}

async function updateTodosTitle(id: number) {
  await axios.put('http://localhost:3000/todos/title', {
    todosId: id,
    title: editTitle.value
  }).then(() => {
    editTitle.value = ''
    toggleEdit.value = false
    fetchTodoList()
  })
}

async function updateTodosStatus(id: number, status: boolean) {
  await axios.put('http://localhost:3000/todos/status', {
    todosId: id,
    status: status
  }).then(() => {
    fetchTodoList()
  })
}

var todoCreateForm = reactive({
  newTodoDate: new Date(),
  errorCreation: false,
  errorCreationMessage: "",
});

var todosCreateForm = reactive({
  errorCreation: false,
  errorCreationMessage: "",
  title: "",
});

function toggleTodos() {
  toggleTodosMenu.value = !toggleTodosMenu.value;
}

async function createNewTodos(todoId: number) {
  console.log(todoId);
  await axios
    .post("http://localhost:3000/todos", {
      todoId,
      title: todosCreateForm.title,
    })
    .then(() => {
      fetchTodoList();
      toggleTodosMenu.value = false;
    });
}

onMounted(async () => {
  fetchTodoList();
});

async function fetchTodoList() {
  var todos = await axios.get(`http://localhost:3000/todo/${token.result.id}`);
  console.log(todos)
  await prepareData(todos.data);
}

async function prepareData(list: []) {
  // sorter med dato
  todos.value = [];
  list.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });

  list.forEach((element: any) => {
    todos.value.push({ ...element, show: false });
  });
}

async function createNewTodo() {
  await axios
    .post(`http://localhost:3000/todo`, {
      userId: token.result.id,
      date: todoCreateForm.newTodoDate,
    })
    .then((res) => {
      if (res.data.status === "error") {
        todoCreateForm.errorCreation = true;
        todoCreateForm.errorCreationMessage = "Dato eksister allerede!";
      } else {
        toggleTodoModal.value = !toggleTodoModal.value;
        fetchTodoList();
      }
    });
}
</script>
