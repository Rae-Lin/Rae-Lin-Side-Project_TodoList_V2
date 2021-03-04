<template>
  <div class="todo-item">
    <div class="todo-item-title">
      <input
        type="text"
        placeholder="標題"
        v-model.trim="newTodo.title"
        @keyup.enter="checkType"
      />
    </div>
    <div class="todo-item-detail">
      <p class="title">
        <span>
          <font-awesome-icon :icon="['fas', 'external-link-square-alt']" />
          參考連結
        </span>
        <input type="url" v-model="newTodo.link" />
      </p>
      <p class="title">
        <span> <font-awesome-icon :icon="['fas', 'user-edit']" /> 備註 </span>
        <textarea placeholder="做點筆記吧" v-model="newTodo.memo"></textarea>
      </p>
      <p class="title">
        <span>
          <font-awesome-icon :icon="['far', 'calendar-check']" /> 購買日期
        </span>
        <input type="date" v-model="newTodo.date" />
      </p>
    </div>
    <div class="todo-item-footer">
      <button class="cancel" @click="cancleEdit">取消</button>
      <button class="add" @click="checkType">加入我的待購清單!</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoEdit",
  props: {
    item: {
      type: Object,
      default() {
        return {
          id: 0,
          title: "",
          date: "",
          link: "",
          memo: "",
          img: "",
          completed: false,
          pinned: false,
        }
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
      newTodo: {},    // 新增的值
      newTodoAdd: {}, // 要傳回App新增的物件
    };
  },
  methods: {
    closeEdit() {
      this.$emit("close-edit");
    },
    cancleEdit(){
      this.defaultTodo();
      this.closeEdit();
    },
    checkType() {
      if (!this.newTodo.title) return alert("請輸入標題");
      !this.newTodo.id ? this.addTodo() : this.updateTodo();
    },
    addTodo() {
      this.newTodo.id = this.todoListLength;
      if(this.newTodo.date) this.newTodo.completed = true; // 若有給日期, 表示買完了

      // 獲取輸入的值 給到新的物件(newTodoAdd)傳回App (直接給this.newTodo會被清空title)
      this.newTodoAdd = { ...this.newTodo };
      this.$emit("add-todo", this.newTodoAdd);
      this.cancleEdit();
    },
    updateTodo() {
      if(this.newTodo.date) this.newTodo.completed = true;
      this.$emit("edit-todo", this.newTodo);
      this.closeEdit();
    },
    defaultTodo() {
      // 給回預設值
      Object.keys(this.newTodo).forEach((key) => {
        if (typeof this.newTodo[key] !== "boolean") {
          this.newTodo[key] = "";
        }
      });
      this.newTodo["id"] = 0;
    },
  },
  computed: {
    todoListLength() {
      // 因為會增刪, 不用this.todolist.length去抓
      // return this.todolist.length;
      let max = Math.max(...this.todolist.map((val) => val.id)) + 1;
      return !this.todolist.length ? 1 : max;
    },
  },
   mounted() {
    this.newTodo = { ...this.item };
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
    color:  map-get($theme-colors, primary-darkgreen);
    span {
      display: block;
      margin-bottom: 5px;
      font-weight: 600;
    }
    svg {
      color:  map-get($theme-colors, primary-darkgreen);
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
