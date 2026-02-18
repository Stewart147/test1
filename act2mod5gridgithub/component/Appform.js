import React from 'react'



export const Appform = () => {


  // submit form function  e.preventDefault stops default refresh
  const handleSubmit = (e) => {
    e.preventDefault();
  };



  return (

 <div className='container' >

<form class="form-container">

  {/* Input */}

   <div className="A">
  <input type="text" placeholder="Enter text here" />
  </div>

  {/* Middle Buttons */}
  
  <div className="B">
    <button type="button" className='tag'>Read Emails</button>
    </div>

    <div className="C">
    <button type="button" className='tag'>Web Parsing</button>
    </div>

    <div className="D">
    <button type="button" className='tag'>Send Emails</button>
    </div>
    
  

  {/* Bottom job status */}

    <div className="E">
            <select class='job-status'>
              <option value="start">Start Process</option>
              <option value="Stopped">Stop Process</option>
              <option value="Completed">Completed Process</option>
            </select>
    </div>

    {/* Bottom submit button */}

  <div className="F">
     <button type="submit" className="submit-data">Submit</button>
  </div>

</form>

</div>



 
  );
};
