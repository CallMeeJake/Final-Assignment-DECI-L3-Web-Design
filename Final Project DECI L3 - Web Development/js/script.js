const sections = ['Section1', 'Section2', 'Section3', 'Section4', 'Comments']

sections.forEach((section, index) => {
    const liElement = document.createElement('li');
    const navButton = document.createElement('a');
    navButton.innerHTML = section;
    navButton.href = `#${index+1}`;
    liElement.appendChild(navButton);
    document.getElementById('navbar__list').appendChild(liElement);
    
    const target = document.getElementById(section.toLowerCase().toString());
    navButton.addEventListener('click', event => {
        target.scrollIntoView({
            behavior: 'smooth',
        })
    })
});

function getPosition(section) {
    return section.getBoundingClientRect();
}
  
function isActive(section) {
    const screenMidPoint = window.innerHeight / 2;
    const position = getPosition(section);
    return position.top <= screenMidPoint && position.bottom >= screenMidPoint;
}
  
function activate(section) {
    if (isActive(section)) {
        section.classList.add('active');
    } else {
        section.classList.remove('active');
    }
}
  
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(activate);
});

function postComment() {       
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const comment = document.getElementById('comment').value;
    
    if (email && name && comment) {   
        if (email.includes('@') && email.includes('.com')) {
            const date = new Date();
            let hour = date.getHours();
            let minutes = date.getMinutes();
            const month = date.getMonth()+1;
            const day = date.getDate();
            const year = date.getFullYear();
            
            let ampm = hour > 12? 'PM' : 'AM';
            hour = hour === 0 ? 12 : hour;
            hour = hour > 12 ? hour - 12 : hour;
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            
            const newComment = document.createElement('div');
            newComment.id = Date.now()
        
            newComment.innerHTML = `
            <div class="commentbox">
                <fieldset>
                  <form>
                    <h2 id="commenterName">${name}</h2> <br>
                    <code>${email}</code>
                    <p>${comment}</p>
                    <code>${hour}:${minutes} ${ampm} ${month}/${day}/${year}</code>
                  </form>  
                </fieldset>
            </div>      
            `;
            const commentsBox = document.getElementById('comments');        
            commentsBox.appendChild(newComment);
    
            newComment.scrollIntoView({
                behavior: 'smooth'
            });
    
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('comment').value = '';
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