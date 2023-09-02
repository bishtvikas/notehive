const noteArr = [];

const updateLSData = () => {
  const textAreaData = document.querySelectorAll("textarea");
  const notes = [];

  textAreaData.forEach((note) => {
    return notes.push(note.value);
  });

  localStorage.setItem("noteKey", JSON.stringify(notes));
};

const addButton = document.querySelector("#addnotebtn");

// defining addNewNotes() funtion
//noteArray = it is the data being received by localstorage
function addNewNotes(text = '') {
  // console.log(text);
  // 1. create a div element
  const note = document.createElement("div");

  // 2. add a class to that element so that it can have a predefined css
  note.classList.add("notesarea");

  //3. a variable , that will have our html code which we will insert inside our newly created div
  const htmlData = `<div class="button-area">
            <button id="edit-toggle"><i class="ri-pencil-fill"></i></button>
            <button id="delete-btn"><i class="ri-delete-bin-3-fill"></i></button>
        </div>
        
            <p class="mainDiv ${text ? "" : "hidden"} "></p>
            <!-- <div class="mainDiv ${text ? "" : "hidden"}"><p></p></div>  -->
            <textarea class="written-area ${text ? "hidden" : ""}"></textarea>
            

        `;
  // 4.write html to be place inside our newly created div
  note.insertAdjacentHTML("afterbegin", htmlData);

  // taking reference of all the buttons and other elements
  const editButton = note.querySelector("#edit-toggle");
  const delButton = note.querySelector("#delete-btn");
  const mainDiv = note.querySelector(".mainDiv");
  const textArea = note.querySelector(".written-area");

  //  deleteBtn = when user click on this, note should be deleted
  delButton.addEventListener("click", function () {
    note.remove();
    updateLSData();
  });

  // toggle using edit button
  textArea.value = text;
  mainDiv.innerHTML = text;

  editButton.addEventListener("click", function () {
    mainDiv.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("change", (event) => {
    const value = event.target.value;
    mainDiv.innerHTML = value;

    updateLSData();
  });
  //5. now our new div element created , a class is added , we have also added html inside our div element
  //   Now, lets add that div to our html document.
  document.body.querySelector(".hero").appendChild(note);
}

// getting data back from localStorage

const notes = JSON.parse(localStorage.getItem("noteKey"));
if (notes) {
  notes.forEach((note) => {
    addNewNotes(note);
    console.log(note);
  });
}

// when user will click on addnotebtn, a  function names addNewNotes() will be called.
addButton.addEventListener("click", function () {
  addNewNotes();
});
