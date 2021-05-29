//global notes array
var notes = [];

//accessing the elements
let noteText = document.querySelector('#note_text');
let noteTitle = document.querySelector('#note_title');
let formButtons = document.querySelector('.form_button');
let addBtn = document.querySelector('#addBtn');
let cancelBtn = document.querySelector('#cancelBtn');
let form = document.querySelector('#form');
let notesList = document.querySelector('#notes');
let singleNote = document.querySelector('.note');
let modalForm = document.querySelector('#form-modal');
let deleteNoteModal = document.querySelector('.modal-deleteBtn');
let modal = document.querySelector('.backdrop');

//note Input handler

noteText.addEventListener('click',event=>{
    console.log("noteText",event);
    noteTitle.style.display="block";
    formButtons.style.display="block";
})

form.addEventListener('submit',event=>{
    event.preventDefault();
    let obj = {
        id:notes.length+1,
        noteTitle:event.target.note_title.value,
        noteText:event.target.note_text.value,
        color:""
    }
    notes.push(obj);
    console.log(notes);
    event.target.note_title.value = "";
    event.target.note_text.value = "";
    noteTitle.style.display="none";
    formButtons.style.display="none";
    displayNotes();
});

//note card handlers
cancelBtn.addEventListener("click",event=>{
    noteTitle.style.display="none";
    formButtons.style.display="none";
     noteTitle.value="";
    formButtons.value="";
})

document.addEventListener("click",event=>{
    if(event.target && event.target.className==='deleteBtn'){
        let parentNote = event.target.parentElement.parentElement.parentElement;
        let id = parentNote.getAttribute('data-id');
        let noteIndex = notes.findIndex(note=>note.id == id);
        deleteNote(noteIndex);
    }
})

document.addEventListener("click",event=>{
    if(event.target && event.target.className==='editBtn'){
        let parentNote = event.target.parentElement.parentElement.parentElement;
        let id = parentNote.getAttribute('data-id');
        let noteObject = notes.find(note=>note.id == id);
        console.log("selectedNote", noteObject)
        let modalContent = document.querySelector('.modal-content');
        modalContent.innerHTML = fillModal(noteObject);
        modal.style.display="block";
        modal.childNodes[1].style.backgroundColor = noteObject.color;
    }
})

function fillModal(note){
    return `
        <div>
            <div class="${note.noteTitle} modal-note-title"><input data-id="${note.id}" type="text" placeholder="Title" value="${note.noteTitle}" /></div>
            <div class="modal-note-text"><textarea onInput="this.parentNode.dataset.replicatedValue = this.value" 
                class="modal-textarea">${note.noteText}</textarea></div>
        </div>
    `
}


//modal form handlers
deleteNoteModal.addEventListener('click',event=>{
    let form = event.target.parentElement.parentElement;
    let noteID = form.elements[0].getAttribute('data-id');
    let noteIndex = notes.findIndex(note=>note.id == noteID);
    deleteNote(noteIndex);
})

document.addEventListener('submit',event=>{
    if(event.target && event.target.id==='modal-form'){
        event.preventDefault();
        let modalForm = event.target;
        let noteTitle = event.target.elements[0].value;
        let noteText = event.target.elements[1].value;
        let id = event.target.elements[0].getAttribute('data-id');
        let formParent = modalForm.parentElement;
        let color = formParent.style.backgroundColor;
        let newNote = {
            id,
            noteTitle,
            noteText,
            color
        }
        updateNote(newNote);
        modal.style.display = 'none';
        displayNotes();
    }
})


//note color modifier
document.addEventListener('click',event=>{
    if(event.target && event.target.classList.contains('solid-color')){
        console.log("inside modal colo changer", event.target);
        let ele = event.target.classList;
        let color = event.target.style.backgroundColor;
        console.log("color:: ",color);
        let modal = document.querySelector('.modal');
        
        let element = event.target.parentElement;
        
        while("modal-form" !== element.id){
            element = element.parentElement;
        }
        let id = element.elements[0].getAttribute('data-id');
        let noteIndex = notes.findIndex(note=>note.id == id);
        let noteObj = notes[noteIndex];
        noteObj.color = color;
        modal.style.backgroundColor = color; 
        updateNote(noteObj);
        displayNotes();

    }
})



function deleteNote(noteIndex){
    notes.splice(noteIndex,1);
    modal.style.display ='none';
    displayNotes();
}

function updateNote(newNote){
    let { id } = newNote;
    let noteIndex = notes.findIndex(note=>note.id == id);
    notes[noteIndex] = newNote;   
}

function displayNotes(){
    if(notes.length >= 0){
        notesList.innerHTML = [...notes].map(note=>{
            return  `
                <div style="background-color: ${note.color};" class="note" data-id="${
                note.id
                }">
                    <div class="${note.noteTitle} note-title">${note.noteTitle}</div>
                    <div class="note_text">${note.noteText}</div>
                    <div class="toolbar">
                    <div class="delContainer">
                    <img src="./media/delete-button.svg" class="deleteBtn">
                    </div>
                    <div>
                    <img src="./media/edit.png" class="editBtn">
                    </div>
                    </div>
                </div>
                </div>
                </div>
                `
        }).join('');
    }
};
