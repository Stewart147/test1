
import './App.css';
import List from './List.js';

//function App() {
function VariableDisplay() {

  // create variables
  let stringVar = "Welcome to React";
  let stringVar1 ="Hello";
  let numberVar = 42;
  let booleanVar = true;
  let arrayVar = ["React", "JSX", "Variables"];
  let objectVar = [ { name:"John", age:30, role:"Developer", id: 1},
                    { name:"Bill", age:40, role:"Designer", id: 2},
                    { name:"Colin", age:44, role:"Web security", id: 3},
  ];


    if(Math.random() > 0.5)
    {
      stringVar = 'Welcome to advanced React';
    }
    return (
      <div>
      <h1> { stringVar } </h1>
      <h2> { stringVar1 } </h2>
      <h2> { numberVar } </h2>
      <h2> { booleanVar } </h2>    {/* outputs nothing, cannot output boolean, no error shows */}
      <h2> { arrayVar } </h2>      {/* outputs array with no spacing */}
    {/*  <h2> { objectVar } </h2>  uncaught error cannot render object child */}


  { /* display values in Array */ }

    <div>
      <ul>
        {arrayVar.map((obj, index) => (
          <li key={index}>{obj}</li>
        ) )}
      </ul>
    </div>

    { /* create a prop to pass to List.js child */ }

    <div>
     <List objectVar={objectVar} name="Peter Rabbit !!!" /> { /* this is a prop to be passed into list.js */}
     </div> 

    </div>
    );
  
} 



//export default App;
export default VariableDisplay;
