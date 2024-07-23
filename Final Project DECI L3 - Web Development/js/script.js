// Gets all scetions and puts them in a nodelist
const sections = document.querySelectorAll('section');

// Loops over all sections caught by the the query selector
sections.forEach((section, index) => {

    // creates the li element and anchor element that will smooth scroll to the section
    const liElement = document.createElement('li');
    const navButton = document.createElement('a');

    // names all sections and names the comments section
    const sectionName = index == 4 ? 'Comments' : `Section ${index + 1}`
    
    // labels the button as the button that will scroll to the corresponding section
    navButton.innerHTML = sectionName;

    // links anchor to the corresponding section
    navButton.href = `#${index+1}`;

    // appends anchor element to the list elemeent
    liElement.appendChild(navButton);

    // appends the whole thing to the navbar
    document.getElementById('navbar__list').appendChild(liElement);
    
    // event listeners that listen to a click of the anchor element and scrolls smoothly to the corresponding section
    navButton.addEventListener('click', event => {
        section.scrollIntoView({
            behavior: 'smooth',
        })
    })
});

// function that gets position of the section given as an argument
function getPosition(section) {
    return section.getBoundingClientRect();
}
  
// Function that checks if the element is currently in view of the viewer
function isActive(section) {
    const screenMidPoint = window.innerHeight / 2;
    const position = getPosition(section);
    return position.top <= screenMidPoint && position.bottom >= screenMidPoint;
}

// uses the isActive function to check if the function is in view to add the active class to it
function activate(section) {
    if (isActive(section)) {
        section.classList.add('active');
    } else {
        section.classList.remove('active');
    }
}

// listens for user scroll to determine wether an element can be activated or not  
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(activate);
});

function postComment() {     
    
    // gets the user input to use in the comment later
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const comment = document.getElementById('comment').value;
    
    // checks if name, email and comment are actually written or not
    if (email && name && comment) {   
        // checks if email includes '@' and '.com'
        if (email.includes('@') && email.includes('.com')) {
            // makes a new date object to get the current time
            const date = new Date();

            // gets time details such as hours and minutes etc..
            let hour = date.getHours();
            let minutes = date.getMinutes();
            const month = date.getMonth()+1;
            const day = date.getDate();
            const year = date.getFullYear();
            
            // changes the 24 hour format of the date method to 12 hour
            let ampm = hour > 12? 'PM' : 'AM';
            hour = hour > 12 ? hour - 12 : hour;
            
            // fixes an issue where the time turns to 0 when its 12 am
            hour = hour === 0 ? 12 : hour;

            // fixes an issue where the minutes are single digits
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            
            // creates a new div where all the user input will be put in and displayed on the webpage 
            const newComment = document.createElement('div');
            
            // gives the new div a unique id
            newComment.id = Date.now();

            //gives the new div the comment box class so it can be given correct styling by css selector
            newComment.className = "commentbox";
            
            // puts all data into the div
            newComment.innerHTML = `
            <form>
              <h2 id="commenterName">${name}</h2> <br>
              <code>${email}</code>
              <p>${comment}</p>
              <code>${hour}:${minutes} ${ampm} ${month}/${day}/${year}</code>
            </form>  
            `;

            // gets the section that has the comments
            const commentsBox = document.getElementById('comments');   
            
            // appends the new comment to the comments list
            commentsBox.appendChild(newComment);
    
            //scrolls to the new comment after it is posted (created)
            newComment.scrollIntoView({
                behavior: 'smooth'
            });
    
            // empties the input form after the comment has been posted
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('comment').value = '';
        
    // Error handelers if something in the input is missing  
        } else {
            alert('Please Enter Correct Email')
        }    
    } else if (!name) {
        alert('Please Enter Name');
    } else if (!email) {
        alert('Please Enter Email');
    } else if (!comment) {
        alert('Please Enter Comment');
    }
}
