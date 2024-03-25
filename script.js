const taskList = document.getElementById("taskList");
const liElements = document.querySelectorAll("li");
const unfinished = document.getElementById("unfinishedCount");
/* unfinished.innerText = liElements.length;
 */
function addTask() {
  const newTaskInput = document.getElementById("newTask");
  const newTaskValue = newTaskInput.value.trim();

  if (!newTaskValue) {
    return;
  }

  const newListItem = document.createElement("li");
  newListItem.textContent = newTaskValue;
  newListItem.id = "list-item";

  /*  const liElements = document.querySelectorAll("li");
  const unfinished = document.getElementById("unfinishedCount");
  unfinished.innerText = liElements.length;
   */

  const completeCheck = document.createElement("input");
  completeCheck.type = "checkbox";
  completeCheck.addEventListener("change", function () {
    newListItem.classList.toggle("strikethrough", this.checked);
  });

  const completeButton = document.createElement("button");
  completeButton.textContent = "Complete";
  completeButton.onclick = function () {
    newListItem.classList.toggle("completed");
  };

  const removeButton = document.createElement("button");
  removeButton.textContent = "Hapus";
  removeButton.onclick = function () {
    taskList.removeChild(newListItem);
  };

  const removeAllButton = document.getElementById("removeAll");
  removeAllButton.onclick = function () {
    console.log("deleting");
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  };

  const completeAllButton = document.getElementById("completeAll");
  completeAllButton.onclick = function () {
    console.log("complete all");
    const checkboxInputs = taskList.querySelectorAll("input[type=checkbox]");
    console.log(
      "s",
      checkboxInputs,
      newListItem.classList.toggle("strikethrough", true)
    );
    checkboxInputs.forEach((checkbox) => {
      checkbox.checked = true;
      const listItem = checkbox.parentElement;
      if (listItem && listItem.tagName === "LI") {
        listItem.classList.add("strikethrough");
      }
    });
  };
  newListItem.prepend(completeCheck);
  newListItem.appendChild(removeButton);
  taskList.appendChild(newListItem);
  newTaskInput.value = "";
  unfinished.innerText = liElements.length;
}
