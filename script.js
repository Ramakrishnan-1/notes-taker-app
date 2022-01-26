showNotes();

// Storing Notes to the user localStorage
let addBtn = document.getElementById("addBtn");
let clearBtn = document.getElementById("clearBtn");
let alertBox = document.getElementById("alertBox");
addBtn.addEventListener("click", function(e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (notes == null){
      notesObject = [];
    }else{
      notesObject = JSON.parse(notes);
    }
    if (addTxt.value) {
        notesObject.push(addTxt.value);
        localStorage.setItem("notes", JSON.stringify(notesObject));
        addTxt.value = "";
        showNotes();
        alertBox.style.display = "none";
    } else {
        alertBox.style.display = "block";
    }
});

function showNotes() { // Show notes from localStorage
    let notes = localStorage.getItem("notes");
    if (notes == null) notesObject = [];
    else notesObject = JSON.parse(notes);
    let htmlContent = "";
    notesObject.forEach(function(element, index) {
      htmlContent += `
            <div class="rounded overflow-hidden shadow-lg">
            <div class="px-4 py-4">
                <div class="mb-2 xl:w-99">
                    <label for="addTxt" class="form-label inline-block mb-2 text-gray-700 font-bold">Note ${index + 1}</label>
                    <hr>
                    <p class="py-2 card-text break-normal ">
                        ${element}
                    </p>
                </div>
                <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" id="${index}"
                onclick="deleteNote(this.id)" class="hover:bg-red-500 bg-zinc-100 text-gray-800 font-semibold py-2 px-4 border border-zinc-300 rounded text-xs hover:text-white">
                    Delete
                </button>

            </div>
        </div>`
    });
    let notesElement = document.getElementById("notes");
    if (notesObject.length != 0) {
      notesElement.innerHTML = htmlContent;
    }else{
      notesElement.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

function deleteNote(index) { // Delete a note from localstorage
    let notes = localStorage.getItem("notes");
    if (notes == null) notesObject = [];
    else notesObject = JSON.parse(notes);
    notesObject.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObject));
    showNotes();
}
clearBtn.addEventListener("click", function(e) {
    document.getElementById("addTxt").value = "";
});