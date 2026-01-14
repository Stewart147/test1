// create an array of objects
const ProfileCard = () => {
  const users = [
    {
      id: 1,
      image: "/Images/cat1.png",
      name: "Dave Smith",
      jobTitle: "Accountant",
      bio: "Dave is an Accountant at Grx",
      skills: "Financial Analysis, Company projections",
    },

   {
      id: 2,
      image: "/Images/dog1.png",
      name: "Kevin Martin",
      jobTitle: "Production Supervisor",
      bio: "Kevin is a Production Supervisor at Yikes",
      skills: "Team building, motivation, production efficiency",
    },

    {
      id: 3,
      image: "/Images/fox1.png",
      name: "Brian Watson",
      jobTitle: "Safety Officer",
      bio: "Brian is a Health and Safety Officer at Safezone",
      skills: "HSS standards, procedures, implementation and review",
    },

    {
      id: 4,
      image: "/Images/monkey1.png",
      name: "Steve Davis",
      jobTitle: "Financial Advisor",
      bio: "Steve is a Financial Advisor at ABC Accounts Ltd",
      skills: "Wealth growth, market analysis, projection forecasting",
    },

    {
      id: 5,
      image: "/Images/owl1.png",
      name: "Bill Rattrey",
      jobTitle: "Plumber",
      bio: "Bill is a Plumber at Healy Plumbing services",
      skills: "Bathroom utility fitting, kitchen utility fitting, heating and boiler fitting ",
    },

  ];

  // map out object values to webpage

    return (
      <div className='card'>

        {users.map(user => (
          <div className='list' key={user.id}><br></br>
           <div className="wrap">
            <img src={user.image} alt={user.name} />
             <h2>  Name: {user.name} </h2>
             <p> <h4>Job Title:</h4> {user.jobTitle} </p>
             <p> <h4> About:</h4> {user.bio} </p>
             <p> <h4>Skills:</h4> {user.skills} </p>
           </div>
          </div>
        ))}
        </div>
    
    );
  }


export default ProfileCard;
