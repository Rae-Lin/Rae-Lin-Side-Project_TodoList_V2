<template>
  <!-- <ul class="todo-lists"> -->
    <!-- <li
      v-for="item in sortTodos"
      :key="item.id"
      :class="{ 'todo-item-pinned': item.pinned }"
    > -->
    <li :class="{ 'todo-item-pinned': item.pinned }">
      <!-- 每個item的資料 -->
      <div class="todo-lists-item" v-if="item.id !== isOpenEdit">
        <div class="todo-item-title">
          <p class="input-title">
            <input type="checkbox" v-model="item.completed" :id="item.id" />
            <label :for="item.id" :class="{ completed: item.completed }">{{ item.title }}</label>
          </p>
          <p>
            <span>
              <a
                target="_blank"
                :href="item.link"
                :class="{ linkDisabled: item.link === '' }">
                <font-awesome-icon
                  :icon="['fas', 'external-link-square-alt']"
                  :class="{ '-active': item.link }"/>
              </a>
            </span>
            <span class="icon" @click="openEdit(item.id)">
              <font-awesome-icon :icon="['fas', 'pen']" />
            </span>
            <span class="icon" @click="pinTodo(item)">
              <font-awesome-icon :icon="['fas', 'heart']" v-if="item.pinned" />
              <font-awesome-icon :icon="['far', 'heart']" v-else />
            </span>
            <span class="icon" @click="deleteTodo(item)">
              <font-awesome-icon :icon="['far', 'trash-alt']" />
            </span>
          </p>
        </div>
        <div class="todo-lists-detail">
          <p><font-awesome-icon :icon="['fas', 'user-edit']" /> {{ item.memo }}</p>
          <p><font-awesome-icon :icon="['far', 'calendar-check']" />{{ item.date }}</p>
        </div>
      </div>
      <!-- item的編輯框 -->
      <todo-edit
        v-else
        :item="item"
        @close-edit="closeEdit"
        @edit-todo="updateTodo"
      ></todo-edit>
    </li>
  <!-- </ul> -->
</template>

<script>
import TodoEdit from "@/components/TodoEdit.vue";

export default {
  name: "TodoItem",
  components: { TodoEdit },
  // props: ["todolist", "visibility"],
  props: {
    item: {
      type: Object,
      default() {
        return {}
      },
    },
    todolist: {
      type: Array,
      default() {
        return [];
      },
    },
    visibility: {
      type: String,
      default: "",
    },
    isAddTodoShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      cacheTodo: {},
      cacheTitle: "",
      isOpenEdit: this.isAddTodoShow,
    };
  },
  methods: {
    pinTodo(item) {
      item.pinned = !item.pinned;
    },
    deleteTodo(list) {
      let vm = this;
      let newIndex = vm.todolist.findIndex((item) => list.id === item.id);
      this.todolist.splice(newIndex, 1);
    },
    closeEdit() {
      this.isOpenEdit = 0;
    },
    // 點擊編輯圖案
    openEdit(id) {
      this.isOpenEdit = id;
    },
    // 更新編輯
    updateTodo(data) {
      let index = this.todolist.findIndex((item) => item.id === data.id);
      this.todolist.splice(index, 1, data);
      this.closeEdit();
    },
  },
  // computed: {
  //   // Tab分類的清單
  //   filteredTodos() {
  //     let status = null;
  //     switch (this.visibility) {
  //       case "all":
  //         return this.todolist;
  //       case "active":
  //         status = false;
  //         break;
  //       case "completed":
  //         status = true;
  //         break;
  //     }
  //     return this.todolist.filter((item) => item.completed === status);
  //   },
  //   // 加到最愛之清單
  //   sortTodos() {
  //     return this.filteredTodos.sort((itemA, itemB) => {
  //       return Number(itemA.pinned) > Number(itemB.pinned) ? -1 : 1;
  //     });
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.todo-lists {
  li {
    box-shadow: 1px 1px 3px 1px map-get($theme-colors, primary-shadow);
    border-radius: 5px;
    margin-bottom: 20px;
    padding: 18px 15px 15px;
  }
  .todo-item-pinned {
    background-color: #f0fffd;
  }
  .todo-item-title {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    .input-title {
      flex: 1;
      font-weight: 600;
      .completed {
        text-decoration: line-through;
        color: map-get($theme-colors, primary-gray);
      }
      input {
        margin-right: 10px;
      }
    }
    .icon {
      position: relative;
      margin-left: 16px;
      cursor: pointer;
      &::before {
        content: "";
        position: absolute;
        width: 1px;
        height: 100%;
        background-color: map-get($theme-colors, primary-gray);
        left: -8.5px;
      }
    }
  }
  a:visited {
    color: unset;
  }
  a.linkDisabled {
    pointer-events: none;
    cursor: default;
  }
  .todo-lists-detail {
    font-size: 0.9rem;
    color: map-get($theme-colors, primary-gray);
    padding-left: 22px;
    p:first-child {
      margin-bottom: 7px;
    }
    svg {
      width: 0.9rem;
      margin-right: 2px;
    }
  }
}

@media screen and (max-width: 800px) {
  .todo-lists {
    .todo-item-title {
      flex-direction: column-reverse;
      align-items: flex-start;
      margin-bottom: 10px;
      .input-title {
        flex: unset;
        width: calc(100% - 45px);
        padding: 3px;
        input {
          margin-right: 8px;
        }
      }
      p:last-child {
        text-align: right;
        margin-bottom: 10px;
        width: 100%;
      }
    }
    li {
      padding: 10px;
    }
  }
}
</style>
