(() => {
  'use strict';

  let STORAGE_KEY = 'todos-vuejs';
  let todoStorage = {
    fetch: function () {
      let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      todos.forEach(function (todo, index) {
        todo.id = index;
      })
      todoStorage.uid = todos.length;
      return todos;
    },
    save: function (todos) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }

  new Vue({
    el: '#app',

    data: {
      todos: [],
      current: -1,
      options: [
        { value: -1, label: 'すべて' },
        { value: 0, label: '作業中' },
        { value: 1, label: '完了' }
      ],
      list: true,
      timer: false,
      message: 'タイマー',
    },

    computed: {
      computedTodos: function () {
        return this.todos.filter(function (el) {
          return this.current < 0 ? true : this.current === el.state;
        }, this);
      },
      labels() {
        return this.options.reduce(function (a, b) {
          return Object.assign(a, { [b.value]: b.label });
        }, {});
      },
    },

    watch: {
      todos: {
        handler: function (todos) {
          todoStorage.save(todos);
        },
        deep: true
      }
    },

    created() {
      this.todos = todoStorage.fetch();
    },

    methods: {
      doChangeMessage: function () {
        this.list === true ? this.list = false : this.list = true;
        this.timer === true ? this.timer = false : this.timer = true;
        if (this.list) {
          this.message = 'タイマー';
        } else if (this.timer) {
          this.message = 'ToDoリスト';
        }
      },
      doAdd: function () {
        let task = this.$refs.task;
        if (!task.value.length) {
          return;
        }
        this.todos.push({
          id: todoStorage.uid++,
          task: task.value,
          state: 0
        })
        task.value = '';
      },
      doChangeState: function (item) {
        item.state = !item.state ? 1 : 0;
      },
      doRemove: function (item) {
        let index = this.todos.indexOf(item);
        if (confirm('このタスクを削除しますか?')) {
          this.todos.splice(index, 1);
        }
      }
    }
  })

})();