const listContainer = document.querySelector(`.note-list`);

const localStorageListKey = `task.list`;

const task = document.getElementById(`taskBody`);
const date = document.getElementById(`date`);
const time = document.getElementById(`time`);


let list = JSON.parse(window.localStorage.getItem(localStorageListKey)) || [];

function printTask(e){         

    e.preventDefault();
    const taskValue = task.value;
    const dateValue = date.value;
    const timeValue = time.value;
    clearelement(listContainer);
    creatNote(taskValue, dateValue, timeValue);
    list[list.length - 1].class = `new-note`;
    loadNote();
    list[list.length - 1].class = `old`;
    saveToLocalStorage();
    task.value = null;
    date.value = null;
    time.value = null;
}


loadNote()

function creatNote(a,b,c){
    const d = new Date(b);
    let newNote = {        
        id: Date.now().toString(),
        task: a,
        date: `${d.getDate()} /${d.getMonth()} /${d.getFullYear()}`,
        time: c,
        class: `old`
    }
    list.push(newNote);

}

function loadNote(){
    list.forEach(li => {
    const note = document.createElement(`div`);
        note.classList.add(`note`);
        note.classList.add(li.class);
        note.id = li.id;
        
        const delet = document.createElement(`button`);
        delet.classList.add(`btn-close`);
        delet.id = li.id;

        delet.addEventListener(`click`, () =>{
            list = list.filter((l) => l.id !== delet.id);
            saveToLocalStorage();
            clearelement(listContainer);
            loadNote();
        });   
        const task = document.createElement(`p`);
        task.classList.add(`note-content`);
        task.innerText = li.task;

        const date = document.createElement(`p`);
        date.classList.add(`note-date`);
        date.innerText = li.date;

        const time = document.createElement(`p`);
        time.classList.add(`note-time`);
        time.innerText = li.time;

        note.append(delet ,task, date, time);
        listContainer.appendChild(note);
    });
    
}



function clearelement(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

function saveToLocalStorage(){
    window.localStorage.setItem(localStorageListKey, JSON.stringify(list));
}

