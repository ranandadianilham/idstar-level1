const taskList = document.getElementById("taskList");
const newTaskInput = document.getElementById("newTask");
const unfinishedCount = document.getElementById("unfinishedCount");

function updateUnfinishedCount() {
  const unfinishedItems = taskList.querySelectorAll("li:not(.completed)");
  unfinishedCount.innerText = unfinishedItems.length;
}

function areAllCheckboxesChecked() {
  const checkboxInputs = taskList.querySelectorAll("input[type=checkbox]");

  const checkboxInputsArray = Array.from(checkboxInputs);

  return checkboxInputsArray.every((checkbox) => checkbox.checked);
}

function addTask() {
  const newTaskValue = newTaskInput.value.trim();

  if (!newTaskValue) {
    return;
  }

  const newListItem = document.createElement("li");
  newListItem.textContent = newTaskValue;
  newListItem.id = "list-item";

  const completeCheck = document.createElement("input");
  completeCheck.type = "checkbox";
  completeCheck.addEventListener("change", function () {
    newListItem.classList.toggle("strikethrough", this.checked);
    updateUnfinishedCount();

    const allChecked = areAllCheckboxesChecked();
    if (allChecked) {
      alert("All tasks are completed!");
    }
  });

  const completeButton = document.createElement("button");
  completeButton.textContent = "Complete";
  completeButton.onclick = function () {
    newListItem.classList.toggle("completed");
    updateUnfinishedCount();
  };

  const removeButton = document.createElement("button");
  removeButton.textContent = "Hapus";
  removeButton.onclick = function () {
    taskList.removeChild(newListItem);
    updateUnfinishedCount();
  };

  const removeAllButton = document.getElementById("removeAll");
  removeAllButton.onclick = function () {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    updateUnfinishedCount();
  };

  const completeAllButton = document.getElementById("completeAll");
  completeAllButton.onclick = function () {
    const checkboxInputs = taskList.querySelectorAll("input[type=checkbox]");
    checkboxInputs.forEach((checkbox) => {
      checkbox.checked = true;
      const listItem = checkbox.parentElement;
      if (listItem && listItem.tagName === "LI") {
        listItem.classList.add("strikethrough");
      }
    });
    updateUnfinishedCount();
    const allChecked = areAllCheckboxesChecked();
    if (allChecked && checkboxInputs.length > 0) {
      alert("All tasks are completed!");
    }
  };

  newListItem.prepend(completeCheck);
  newListItem.appendChild(removeButton);
  taskList.appendChild(newListItem);
  newTaskInput.value = "";

  updateUnfinishedCount();
}
