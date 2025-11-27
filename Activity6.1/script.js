// Array to store elements
let array = [];

 // Function to add a new film

        function addElement() {

            const elementinput = document.querySelector('#elementinput').value;
            if (elementinput !== "") {
                array.push(elementinput);
                document.querySelector('#elementinput').value = '';
                displayArray();
            } else {
                alert('Please enter an element.');
            }
        }

        // Function to add an element to the start

        function addFirst() {

            const elementinput = document.querySelector('#elementinput').value;
            if (elementinput !== "") {
                array.unshift(elementinput);
                document.querySelector('#elementinput').value = '';
                displayArray();
            } else {
                alert('Please enter an element.');
            }
        }




        // Function to remove an element from start

         function removeFirst() {
              array.shift(elementinput);
              document.querySelector('#elementinput').value = '';
              displayArray();
        }

        // Function to remove an element from end 

        function removeLast() {
              array.pop(elementinput);
              document.querySelector('#elementinput').value = '';
              displayArray();
        }

    

        // Function to splice an element and remove from indexed position

        function arraySplice() {
              const index = Number(document.getElementById("startIndex").value);
              const count = Number(document.getElementById("deleteCount").value);
              const removedItems = array.splice(index, count);
              displayArray();
        }

        // Function to display output of elements

        function displayArray() {
            const list = document.getElementById("arrayElements");
            list.innerHTML = "";  
                                                           
            array.forEach( element => {
              
            const div = document.createElement("div");
            div.textContent = "Element List: " + element;
            list.appendChild(div);
            }); 
         } 
