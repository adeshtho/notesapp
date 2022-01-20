console.log('notes app')
showNotes();

let addbtn = document.getElementById('addbtn')
addbtn.addEventListener('click', buttons)

function buttons() {
    let addTitle = document.getElementById('addTitle')
    let addTxt = document.getElementById('addTxt')
    let notes = localStorage.getItem('notes')
    let notesobj
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes)
    }
    let myobj = {
        title: addTitle.value,
        text: addTxt.value,
    }
    notesobj.push(myobj)
    localStorage.setItem('notes', JSON.stringify(notesobj))
    addTxt.value = "";
    addTitle.value = "";
    // console.log(notesobj)
    showNotes();
}


function showNotes() {
    let notes = localStorage.getItem('notes')
    let notesobj
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes)
    }
    let html = "";
    notesobj.forEach(function (element, index) {
        html += ` <div class="notecard my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title" id="addTitle">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn-primary btn">Delete Note</button>
        </div>
    </div>`
    });

    let notesElm = document.getElementById('notes')
    if (notesobj.length !=0 ) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show Please Click on add Note`
    }
}

function deleteNote(index) {
    // console.log('i am deleting', index);

    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }

    notesobj.splice(index, 1)
    // confirm('Sure you want to delete')
    localStorage.setItem("notes", JSON.stringify(notesobj));
    showNotes();
}


let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})