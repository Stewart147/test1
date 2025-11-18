
     // Select the toggle button
 
    const toggleButton = document.getElementById('toggleButton');

    // Function to switch between light and dark modes

    function toggleMode() {
    const body = document.body;
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo');
    const navs = document.querySelectorAll('.navTop');
    const h1 = document.querySelector('h1');
    const intros = document.querySelectorAll('.intro')
    const footer = document.querySelector('footer');
    const links = document.querySelector('.links');
    const social = document.querySelector('.social');


     // Toggle the dark mode class on body and header
    body.classList.toggle('dark-mode');
    header.classList.toggle('dark-mode');
    logo.classList.toggle('dark-mode');
    h1.classList.toggle('dark-mode');
   // navs.classList.toggle('dark-mode');
    //intro.classList.toggle('dark-mode');
    footer.classList.toggle('dark-mode');
    toggleButton.classList.toggle('dark-mode');
   // links.classList.toggle('dark-mode');
   // social.classList.toggle('dark-mode');

      // Loop through all intro paragraphs

    intros.forEach(intro => {
        intro.classList.toggle('dark-mode');

    });

     navs.forEach(nav => {
        nav.classList.toggle('dark-mode');

    });

   

    // Toggle links and social
    if (links) links.classList.toggle('dark-mode');
    if (social) social.classList.toggle('dark-mode');

 

     // Update button text
    if (body.classList.contains('dark-mode')) {
        toggleButton.textContent = 'Light Mode';   
    } else {
        toggleButton.textContent = 'Dark Mode';  
    }
}


// Add event listener to the toggle button
toggleButton.addEventListener('click', toggleMode);


