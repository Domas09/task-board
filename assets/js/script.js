// Retrieve tasks and nextId from localStorage
if (!taskList){
  taskList = [];
}
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const formModalEl = $("#formModal");
const titleInputEl = $("#titleInput");
const dateEl = $("#datepicker");
const taskDescriptionEl = $("#taskDescription");

// Todo: create a function to generate a unique task id
function generateTaskId() {
  return crypto.randomUUID();
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const taskCard = $("<div>").addClass("card task-card draggable my-3").attr("data-task-id", task.id);
  const taskHeader = $("<div>").addClass("card-header h4").text(task.title);
  const taskBody = $("<div>").addClass("card-body");
  const taskDueDate = $("<p>").addClass("card-text").text(task.date);
  const taskDescription = $("<p>").addClass("card-text").text(task.description);
  const taskDeleteButton = $("<button>").addClass("btn btn-danger delete").text("Remove").attr("data-task-id", task.id);
  taskDeleteButton.on("click", handleAddTask);
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

  const tasksArray = JSON.parse(localStorage.getItem("tasks"));
  tasksArray.push(tasks);
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  renderTaskList();

  titleInputEl.val("");
  dateEl.val("");
  taskDescriptionEl.val("");
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

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
