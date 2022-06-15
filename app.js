//pulling elements from the DOM
const popUpCard = document.querySelector('.popup-card');
const addNoteButton = document.querySelector('.card.add');
const closeButton = document.querySelector('.fa-solid.fa-xmark');

const titleTag = document.querySelector('form input');
const descriptionTag = document.querySelector('form textarea');
const addButton = document.querySelector('form button');
const popUpCardTitle = document.querySelector('.content p');
//months array
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//setting notes variable to getting notes array from local storage, if no notes set it to empty array
const notes = JSON.parse(localStorage.getItem('notes') || '[]');
let isUpdated = false, updateId; //isUpdated equal to updateId, which is false
//event listener to show the pop-up card
addNoteButton.addEventListener('click', function(){
    popUpCard.classList.add('show');
    titleTag.focus();
});
//event listener to exit out of the popup card
closeButton.addEventListener('click', function(){
    titleTag.value = '';
    descriptionTag.value = '';
    addButton.innerHTML = 'Add a new note';
    popUpCardTitle.innerHTML = 'Add note';
    popUpCard.classList.remove('show');
});
//creating HTML for note card
const showNote = () => {
    document.querySelectorAll('.card.note').forEach(note => note.remove());
    notes.forEach((note, index) => {
        let noteCard = `<div class="card note">
                            <p class="date">${note.date}</p>
                            <h1 class="title">${note.title}</h1>
                            <p class="description">${note.description}</p>
                            <ul class="icons">
                                <li onclick = 'deleteNote(${index})'><i class="fa-solid fa-trash"></i></li>
                                <li onclick = 'editNote(${index}, "${note.title}", "${note.description}")'><i class="fa-solid fa-pen-to-square"></i></li>
                            </ul>
                        </div>`;
        addNoteButton.insertAdjacentHTML('afterend', noteCard);
    });
}
//deleting note from notes array in local storage
function deleteNote(noteId){
    notes.splice(noteId, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNote();
}

function editNote(noteId, title, description){
    isUpdated = true;
    updateId = noteId; 
    addNoteButton.click();
    titleTag.value = title;
    descriptionTag.value = description;
    addButton.innerHTML = 'Edit Note';
    popUpCardTitle.innerHTML = 'Edit your note';
    console.log(noteId, title, description)
}

addButton.addEventListener('click', function(e){
    e.preventDefault();
    let noteTitle = titleTag.value;
    let noteDescription = descriptionTag.value;
    
    //creating data variables if there is a title or description
    if(noteTitle || noteDescription){
        let dateObj = new Date();
        let month = months[dateObj.getMonth()];
        let day = dateObj.getDate();
        let year = dateObj.getFullYear();
        //creating note info object to hold the notes info
        let noteInfo = {
            title: noteTitle,
            description: noteDescription,
            date: `${month} ${day}, ${year}`
        }
        //if the note is not being updated, push new note to notes
        if(!isUpdated){
            notes.push(noteInfo); //adding NEW note to notes
        } else {
            notes[updateId] = noteInfo; //updating a specific note
            isUpdated = false; //so new note can be created again
        }
        //setting notes to local storage
        localStorage.setItem('notes', JSON.stringify(notes));
        closeButton.click(); //if close button clicked, close out
        showNote(); //show note
    }
})