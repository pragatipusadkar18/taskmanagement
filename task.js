document.addEventListener("DOMContentLoaded", function() {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
    let editingTask = false; // Flag to track if we are editing a task
    let editedRowIndex = null; // Index of the edited task row

    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();

        if (editingTask) {
            // If editingTask is true, it means we are editing an existing task
            updateTask();
        } else {
            // Otherwise, it's a new task
            createTask();
        }

        taskForm.reset();
        editingTask = false; // Reset the editingTask flag
    });

    function createTask() {
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const dueDate = document.getElementById("dueDate").value;
        const assignedUser = document.getElementById("assignedUser").value;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${title}</td>
            <td>${description}</td>
            <td>${dueDate}</td>
            <td>${assignedUser}</td>
            <td>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            </td>
        `;

        const editButton = row.querySelector(".edit-button");
        const deleteButton = row.querySelector(".delete-button");

        editButton.addEventListener("click", function() {
            editTask(row);
        });

        deleteButton.addEventListener("click", function() {
            deleteTask(row);
        });

        taskList.appendChild(row);
    }

    function editTask(row) {
        const cells = row.cells;
        const title = cells[0].textContent;
        const description = cells[1].textContent;
        const dueDate = cells[2].textContent;
        const assignedUser = cells[3].textContent;

        document.getElementById("title").value = title;
        document.getElementById("description").value = description;
        document.getElementById("dueDate").value = dueDate;
        document.getElementById("assignedUser").value = assignedUser;

        // Save the index of the edited task row
        editedRowIndex = Array.from(taskList.children).indexOf(row);
        editingTask = true; // Set editingTask flag to true
    }

    function updateTask() {
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const dueDate = document.getElementById("dueDate").value;
        const assignedUser = document.getElementById("assignedUser").value;

        const row = taskList.children[editedRowIndex];
        const cells = row.cells;
        cells[0].textContent = title;
        cells[1].textContent = description;
        cells[2].textContent = dueDate;
        cells[3].textContent = assignedUser;

        // Reset the editedRowIndex and editingTask flag
        editedRowIndex = null;
        editingTask = false;
    }

    function deleteTask(row) {
        row.remove();
    }
});
