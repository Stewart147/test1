  // Array to store tasks

        let tasks = [];

 

        // Function to add a new task

        function addTask() {

            const taskInput = document.querySelector('#taskInput').value;
            if (taskInput) {
                tasks.push(taskInput);
                document.querySelector('#taskInput').value = '';
                displayTasks();
            } else {
                alert('Please enter a task.');
            }
        }

 

        // Function to display tasks

        function displayTasks() {
            const taskList = document.querySelector('#taskList');
            taskList.innerHTML = ''; // Clear the current list

           

            tasks.forEach((task, index) => {
                const newLi = document.createElement('li');

                // Create container for checkbox, label, and task text

                const taskContent = document.createElement('div');
                taskContent.className = 'task-content';

                // Create checkbox

                const newCheck = document.createElement("input");
                newCheck.type = "checkbox";
                newCheck.id = "myCheck" + index; // Unique ID for each checkbox

               

                // Create label

                const label = document.createElement('label');
                label.textContent = "INCOMPLETE";
                label.htmlFor = "myCheck" + index;

               

                // Create task text span

                const taskText = document.createElement('span');
                taskText.className = 'task-text';
                taskText.textContent = task;

                // Create delete button

                const removeButton = document.createElement('button');
                removeButton.textContent = 'Delete';
                removeButton.onclick = () => removeTask(index);

                

                // Checkbox click handler

                newCheck.onclick = function() {

                    if (newCheck.checked) {
                        label.textContent = "COMPLETE";
                        label.style.backgroundColor = "lightgreen";
                    } else {
                        label.textContent = "INCOMPLETE";
                        label.style.backgroundColor = "";
                    }

                };

               

                // Assemble elements in order: checkbox, label, task text

                taskContent.appendChild(newCheck);
                taskContent.appendChild(label);
                taskContent.appendChild(taskText);

               
                // Add to list item: task content, then delete button

                newLi.appendChild(taskContent);
                newLi.appendChild(removeButton);

                // Add to list

                taskList.appendChild(newLi);

            });

        }

 

        // Function to remove a task

        function removeTask(index) {
            tasks.splice(index, 1);
            displayTasks();
        }

 

        // Allow Enter key to add task

        document.querySelector('#taskInput').addEventListener('keypress', function(e) {

            if (e.key === 'Enter') {
                addTask();
            }
        });