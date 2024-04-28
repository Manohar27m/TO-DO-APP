document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function displayTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            // Check if task is completed, add 'completed' class if true
            const completedClass = task.completed ? 'completed' : '';
            li.innerHTML = `
                <span class="${completedClass}">${task.title}</span>
                <button class="complete-btn" data-index="${index}" ${task.completed ? 'disabled' : ''}>Complete</button>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function handleTaskListClick(event) {
        const index = event.target.dataset.index;
        if (event.target.classList.contains('delete-btn')) {
            tasks.splice(index, 1);
        } else if (event.target.classList.contains('edit-btn')) {
            const newTitle = prompt('Enter new title:', tasks[index].title);
            if (newTitle !== null) {
                tasks[index].title = newTitle.trim();
            }
        } else if (event.target.classList.contains('complete-btn')) {
            tasks[index].completed = true;
            event.target.disabled = true; // Disable the complete button after completing
        }
        saveTasks();
        displayTasks();
    }

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = taskInput.value.trim();
        if (title !== '') {
            tasks.push({ title, completed: false });
            saveTasks();
            displayTasks();
            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', handleTaskListClick);

    displayTasks();
});
