
// 1. User clicks "+ Add Ticket"

// 2. TicketInfo calls props.onClick()

// 3. StatusBoard updates state

// 4. React re-renders

// 5. Updated count displays


// TicketInfo component

//const TicketInfo = ({ result, image, children }) => {

//const TicketInfo = ({ result, count, image, children, onClick }) => {
const TicketInfo = (props) => {

  // increment count onClick() this calls the function passed from StateBoard
  const handleIncrement = () => {
      props.onClick();
  }
    

  return (

   
     <div className= {props.result}> 
     {/* Implement the ticket info display here */}
     {/* } {props.image} this line not required as image is passed via children not as a prop */ }
      {props.children}
    
     {/* Separate Increment Button */}
      <button onClick={handleIncrement}>
        + Add Ticket
      </button>

        <div className="ticket-details">
          <p>Status: {props.result}</p>
          <p>Total tickets: {props.count}</p>
        </div>
    

    </div>


 );

};

export default TicketInfo;
