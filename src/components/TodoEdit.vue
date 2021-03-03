<template>
  <div class="todo-item">
    <div class="todo-item-title">
      <input
        type="text"
        placeholder="標題"
        v-model.trim="todoItem.title"
        @keyup.enter="checkType"
      />
    </div>
    <div class="todo-item-detail">
      <p class="title">
        <span>
          <font-awesome-icon :icon="['fas', 'external-link-square-alt']" />
          參考連結
        </span>
        <input type="url" v-model="todoItem.link" />
      </p>
      <p class="title">
        <span> <font-awesome-icon :icon="['fas', 'user-edit']" /> 備註 </span>
        <textarea placeholder="做點筆記吧" v-model="todoItem.memo"></textarea>
      </p>
      <p class="title">
        <span>
          <font-awesome-icon :icon="['far', 'calendar-check']" /> 購買日期
        </span>
        <input type="date" v-model="todoItem.date" />
      </p>
    </div>
    <div class="todo-item-footer">
      <button class="cancel" @click="cancelTodo">取消</button>
      <button class="add" @click="checkType">加入我的待購清單!</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "todoEdit",
  props: {
    item: {
      type: Object,
      default() {
        return undefined;
      },
    },
    todolist: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      // 輸入的值
      newTodo: {
        id: 0,
        title: "",
        date: "",
        link: "",
        memo: "",
        completed: false,
        pinned: false,
      },
      editTodo: {},
      // 要傳回App新增的物件
      newTodoAdd: {},
      editTodoAdd: {},
    };
  },
  methods: {
    checkType() {
      if (this.todoItem.title === "") return alert("請輸入標題");
      !this.todoItem.id ? this.addTodo() : this.updateTodo();
    },
    addTodo() {
      // 獲取輸入的值 給到新的物件(newTodoAdd)傳回App (直接給this.newTodo會被清空title)
      // this.newTodo.id = !this.newTodo.id ? 0 : this.todoListLength;
      this.newTodo.id = this.todoListLength;
      this.newTodoAdd = { ...this.newTodo };
      this.$emit("add-todo", this.newTodoAdd);
      this.defaultTodo();
      // this.newTodo = {
      //   id: 0,
      //   title: "",
      //   date: "",
      //   link: "",
      //   memo: "",
      //   completed: false,
      //   pinned: false,
      // };
    },
    updateTodo() {
      this.$emit("edit-todo", this.editTodo);
    },
    cancelTodo() {
      this.newTodo.title = "";
      this.$emit("close-edit");
    },
    defaultTodo() {
      Object.keys(this.newTodo).forEach((key) => {
        if (typeof this.newTodo[key] !== "boolean") {
          this.newTodo[key] = "";
        }
      });
      this.newTodo["id"] = 0;
    },
  },
  computed: {
    todoItem() {
      // 若回傳進來有值就是update, 若沒有就是new
      return this.item ? this.editTodo : this.newTodo;
    },
    todoListLength() {
      return Math.max(...this.todolist.map((val) => val.id)) + 1;
      // return this.todolist.length;
    },
  },
  mounted() {
    this.editTodo = { ...this.item };
  },
};
</script>

<style lang="scss" scoped>
.todo-item {
  border-radius: 5px;
  box-shadow: 1px 1px 3px 1px map-get($theme-colors, primary-shadow);
  background-color: #ece9e995;
  overflow: hidden;
  input,
  textarea {
    width: calc(100% - 10px);
    font-size: 1rem;
  }
}

.todo-item-title {
  padding: 10px;
  border-bottom: 1px solid map-get($theme-colors, primary-shadow);
  input[type="text"] {
    font-size: 1rem;
  }
}

.todo-item-detail {
  padding: 15px 10px 0;
  margin: 0 auto;
  .title {
    margin: 0px 0 18px;
    color: #007188;
    span {
      display: block;
      margin-bottom: 5px;
      font-weight: 600;
    }
    svg {
      color: #007188;
      font-size: 0.9rem;
      padding-bottom: 0.05rem;
    }
  }
  textarea {
    height: 60px;
  }
}

.todo-item-footer {
  display: flex;
  button {
    width: 100%;
    background-color: #fff;
    border: none;
    outline: none;
    padding: 10px 0;
    cursor: pointer;
    transition: all 0.3s;
    &.cancel {
      color: map-get($theme-colors, primary-red);
      border-right: 1px solid rgb(230, 230, 230);
      &:hover {
        background-color: map-get($theme-colors, primary-red);
        color: white;
        font-weight: 600;
      }
    }
    &.add:hover {
      background-color: map-get($theme-colors, primary-green);
      color: white;
      font-weight: 600;
    }
  }
}

@media screen and (max-width: 800px) {
  .todo-item-footer button {
    &.cancel {
      background-color: map-get($theme-colors, primary-red);
      color: white;
      font-weight: 600;
    }
    &.add {
      background-color: map-get($theme-colors, primary-green);
      color: white;
      font-weight: 600;
    }
  }
}
</style>
