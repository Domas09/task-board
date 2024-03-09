// Retrieve tasks and nextId from localStorage
let nextId = JSON.parse(localStorage.getItem("nextId"));
const formModalEl = $("#formModal");
const titleInputEl = $("#titleInput");
const dateEl = $("#datepicker");
const taskDescriptionEl = $("#taskDescription");

// Todo: create a function to generate a unique task id
function generateTaskId() {
  return crypto.randomUUID();
}

function readTasksFromStorage() {
  let taskList = JSON.parse(localStorage.getItem("tasks"));
  if (!taskList){
    taskList = [];
  }
  return taskList;
}

function saveTasksToStorage(tasks){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const taskCard = $("<div>").addClass("card task-card draggable my-3").attr("data-task-id", task.id);
  const taskHeader = $("<div>").addClass("card-header h4").text(task.title);
  const taskBody = $("<div>").addClass("card-body");
  const taskDueDate = $("<p>").addClass("card-text").text(task.date);
  const taskDescription = $("<p>").addClass("card-text").text(task.description);
  const taskDeleteButton = $("<button>").addClass("btn btn-danger delete").text("Remove").attr("data-task-id", task.id);
  taskDeleteButton.on("click", handleDeleteTask);

  if (task.date && task.status !== "done"){
    const day = dayjs();
    const dueDate = dayjs(task.date, "DD/MM/YYYY");

    if (day.isSame(dueDate, "day")) {
      taskCard.addClass("task-today text-white");
    } else if (day.isAfter(dueDate)){
      taskCard.addClass("task-late text-white");
      taskDeleteButton.addClass("border-light");
    }
  }
  taskBody.append(taskDueDate, taskDescription, taskDeleteButton);
  taskCard.append(taskHeader, taskBody);

  return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  const tasks = readTasksFromStorage();
  const todoList = $("#todo-cards");
  todoList.empty();
  const inProgressList = $("#in-progress-cards");
  inProgressList.empty();
  const doneList = $("#done-cards");
  doneList.empty();

  for (let task of tasks){
    if(task.status === "to-do"){
      todoList.append(createTaskCard(task));
    } else if (task.status === "in-progress"){
      inProgressList.append(createTaskCard(task));
    } else if (task.status === "done") {
      doneList.append(createTaskCard(task));
    }
  }


}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  event.preventDefault();

  const taskName = titleInputEl.val().trim();
  const taskDate = dateEl.val();
  const taskDesc = taskDescriptionEl.val();

  const tasks = {
    id: generateTaskId(),
    title: taskName,
    date: taskDate,
    description: taskDesc,
    status: "to-do"
  };

  const tasksArray = readTasksFromStorage();
  tasksArray.push(tasks);
  saveTasksToStorage(tasksArray);
  renderTaskList();

  titleInputEl.val("");
  dateEl.val("");
  taskDescriptionEl.val("");
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
  const taskId = $(this).attr("data-task-id");
  const tasks = readTasksFromStorage();

  tasks.forEach((task) => {
    if (task.id === taskId) {
      tasks.splice(projects.indexOf(task), 1);
    }
  });
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    $( function() {
        $( "#datepicker" ).datepicker();
      } );
});

formModalEl.on("submit", handleAddTask);
