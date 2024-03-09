// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const taskCard = $("<div>").addClass("card task-card draggable my-3").attr("data-task-id", task.id);
  const taskHeader = $("<div>").addClass("card-header h4").text(task.title);
  const taskBody = $("<div>").addClass("card-body");
  const taskDueDate = $("<p>").addClass("card-text").text(task.date);
  const taskDescription = $("<p>").addClass("card-text").text(task.description);
  const taskDeleteButton = $("<button>").addClass("btn btn-danger delete").text("Remove").attr("data-task-id", task.id)
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

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
