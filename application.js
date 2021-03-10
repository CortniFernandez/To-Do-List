$(document).ready(function () {

  const createTaskForm = document.querySelector('#create-task');
  const newTaskContent = document.querySelector('#new-task-content');
  const toDoList = document.querySelector('#todo-list');

  let tasks = [];

  $(createTaskForm).on('submit', function (e) {
    e.preventDefault();
    createTask(newTaskContent.value);
  });

  function createTask(taskInput) {
    if (taskInput !== '') {
      const newTask = {
        id: Date.now(),
        name: taskInput,
        completed: false
      };
      tasks.push(newTask);
      addToLocalStorage(tasks);
      newTaskContent.value = '';
    }
  }

  function renderTasks(tasks) {
    toDoList.innerHTML = '';
    tasks.forEach(function(item) {
      $(toDoList).append('<div class="row"><p class="col-xs-8">' + item.name + '</p><input type="checkbox" class="mark-complete" data-id="' + item.id + '"' + (item.completed ? 'checked' : '') + '><button class="delete" data-id="' + item.id + '">X</button>');
    });
  }

  function addToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(tasks);
  }

  function getFromLocalStorage() {
    const reference = localStorage.getItem('tasks');
    if (reference) {
      tasks = JSON.parse(reference);
      renderTasks(tasks);
    }
  }

  function toggleComplete(id) {
    tasks.forEach(function(item) {
      if (item.id == id) {
        item.completed = !item.completed;
      }
    });
    addToLocalStorage(tasks);
    if (item.completed === true) {
      $(this).data('id').prev().addClass("strike");
    }
  }

  function deleteTask(id) {
   tasks = tasks.filter(function(item) {
     return item.id != id;
   });
   addToLocalStorage(tasks);
  }
  
  $(document).on('click', '.delete', function () {
    deleteTask($(this).data('id'));
  });

  getFromLocalStorage();

  $(document).on('change', '.mark-complete', function () {
    toggleComplete($(this).data('id'))
  });

  $(document).on('click', '#show-all', function () {
    getFromLocalStorage();
  });

  function showCompleted(id) {
    $('#todo-list').empty();
    tasks.forEach(function(item) {
      if (item.completed) {
        $('#todo-list').append('<div class="row"><p class="col-xs-8">' + item.name + '</p><input type="checkbox" class="mark-complete" data-id="' + item.id + '"' + (item.completed ? 'checked' : '') + '><button class="delete" data-id="' + item.id + '">X</button>');
      }
    });
  }
  
  $(document).on('click', '#show-completed', function () {
    showCompleted();
  });

  function showIncomplete(id) {
    $('#todo-list').empty();
    tasks.forEach(function (item) {
      if (!item.completed) {
        $('#todo-list').append('<div class="row"><p class="col-xs-8">' + item.name + '</p><input type="checkbox" class="mark-complete" data-id="' + item.id + '"' + (item.completed ? 'checked' : '') + '><button class="delete" data-id="' + item.id + '">X</button>');
      }
    });
  }

  $(document).on('click', '#show-incomplete', function () {
    showIncomplete();
  });

});