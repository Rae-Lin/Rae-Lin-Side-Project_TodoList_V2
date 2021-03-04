<template>
  <div id="app" class="card">
    <!-- Tab標籤 -->
    <ul class="card-head">
      <li :class="{ active: visibility == 'all' }" @click="changeTab('all')">
        好想買
      </li>
      <li
        :class="{ active: visibility == 'active' }"
        @click="changeTab('active')"
      >
        還沒買
      </li>
      <li
        :class="{ active: visibility == 'completed' }"
        @click="changeTab('completed')"
      >
        買到啦<img src="./assets/images/icon_star.png" />
      </li>
    </ul>

    <div class="card-body">
      <!--- 新增代辦 ---->
      <div
        class="todo-add"
        @click="isAddTodoShow = true"
        v-show="isAddTodoShow === false"
      >
        新增想買的清單
      </div>
      <todo-edit
        v-show="isAddTodoShow"
        @close-edit="closeEdit"
        @add-todo="addTodo"
        :todolist="todos"
      >
      </todo-edit>
        <!-- 任務表 list -->
        <todo-item :todolist="todos" :visibility="visibility"></todo-item>
      <p class="total">已經買了 : {{ completedTodos }} / {{ todos.length }}</p>
    </div>
  </div>
</template>

<script>
import TodoEdit from "@/components/TodoEdit.vue";
import TodoItem from "@/components/TodoItem.vue";

export default {
  name: "App",
  components: {
    TodoEdit,
    TodoItem,
  },
  data() {
    return {
      newTodo: {},
      todos: [
        // {
        //   id: 0,
        //   title: "Udemy 六角課程",
        //   date: "2020-05-04",
        //   link: "https://www.udemy.com/course/hexschoolcolumn/",
        //   memo: "Bobo 推薦",
        //   completed: true,
        //   pinned: false,
        // },
      ],
      isAddTodoShow: false,
      visibility: "all",
    };
  },
  computed: {
    // 已完成清單數量
    completedTodos() {
      return this.todos.filter((item) => item.completed).length;
    },
  },
  methods: {
    closeEdit() {
      this.isAddTodoShow = !this.isAddTodoShow;
      console.log(this.isAddTodoShow);
    },
    addTodo(data) {
      this.todos.push(data);
    },
    changeTab(tabName) {
      this.isAddTodoShow = false;
      this.visibility = tabName;
    },
  },
};
</script>

<style lang="scss">
.card {
  width: 75%;
  max-width: 700px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 1px 1px 3px 1px rgb(230, 230, 230);
}
.card-head {
  display: flex;
  align-items: flex-end;
  background-color: map-get($theme-colors, primary-green);
  color: white;
  font-weight: 600;
  padding: 10px 10% 0;
  margin: 0 auto;
  border-radius: 10px 10px 0 0;
  img {
    width: 1rem;
  }
  li {
    display: block;
    width: 100%;
    text-align: center;
    padding: 20px 0;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
    &::before {
      content: "";
      display: block;
      width: 1px;
      height: calc(100% - 5px);
      background-color: #fff;
      position: absolute;
      right: -0.5px;
      bottom: 0;
    }
    &.active {
      background-color: #fff;
      color: map-get($theme-colors, primary-green);
      border-radius: 5px 5px 0 0;
    }
    &:last-child::before {
      background-color: transparent;
    }
    &:hover::after {
      content: "";
      width: 100%;
      height: 4px;
      position: absolute;
      background-color: #2d4057;
      bottom: 0;
      left: 0;
    }
  }
}

.card-body {
  padding: 40px;
  > div {
    margin-bottom: 20px;
  }
}

.todo-add {
  background-color: map-get($theme-colors, primary-red);
  box-shadow: 1px 1px 3px 1px map-get($theme-colors, primary-shadow);
  padding: 10px;
  color: white;
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
  &:hover {
    text-shadow: 1px 1px 3px 1px map-get($theme-colors, primary-shadow);
    box-shadow: 2px 2px 5px 2px map-get($theme-colors, primary-shadow);
    font-weight: 600;
    transform: translate(0.5px, 0.5px);
  }
}

@media screen and (max-width: 800px) {
  .card {
    width: calc(100% - 10px);
    max-width: unset;
    margin-bottom: 20px;
  }
  .card-head {
    padding: 10px 10px 0;
    img {
      width: 0.85rem;
    }
    li:hover::after {
      background-color: transparent;
    }
  }
  .card-body {
    padding: 12px 8px 0;
    display: flex;
    flex-direction: column;
    .todo-add {
      order: 1;
      margin-bottom: 3px;
    }
    .todo-item {
      order: 2;
      margin-bottom: 0;
    }
    .total {
      order: 3;
      margin-bottom: 20px;
    }
    .todo-lists {
      order: 4;
      li {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
