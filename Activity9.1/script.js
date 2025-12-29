 
 // create an empty array
 let tasks = [];

         // function to add a task

         function addTask() {
          const taskInput = document.getElementById('taskInput').value;
            if (taskInput) {
                tasks.push(taskInput);
                document.getElementById('taskInput').value = '';
                displayTasks();
            } else {
                alert('Please enter a task.');
            }
         }

         // function to display tasks

          function displayTasks() {
            const taskOutput = document.getElementById("taskOutput");
            taskOutput.innerHTML = "";                                                       

            tasks.forEach((task, index )=> {
               const li = document.createElement('li');
               const removeButton = document.createElement('button');
               removeButton.textContent = 'Delete';
               removeButton.onclick = () => removeTask(index);
               removeButton.className = "removeBtn";
        
              li.innerHTML = task;
              taskOutput.appendChild(li);
              li.appendChild(removeButton);
             
            
           });

           // Function to remove a task

           function removeTask(index) {
             tasks.splice(index, 1);
             displayTasks();
        }

     }
