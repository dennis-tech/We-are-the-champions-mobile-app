import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-46bf3-default-rtdb.firebaseio.com/"
}
//database

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorseListInDB = ref(database, 'endorseList');

//from html

const endorseInputEl = document.getElementById("endorseInputField");
const inputFromEl = document.getElementById("inputFrom");
const inputToEl = document.getElementById("inputTo");
const publishBtnEl = document.getElementById("publishBtn");
const endorseListEl = document.getElementById("endorseList");

//publish btn function

publishBtnEl.addEventListener("click", function() {
    const endorseInput = endorseInputEl.value;
    const inputFrom = inputFromEl.value;
    const inputTo = inputToEl.value;
    const inputArray = [endorseInput, inputFrom, inputTo]
    if (endorseInput) {
        push(endorseListInDB, inputArray);
        clearEndorseInputEl();
    }
})

// displaying the endorsements

onValue(endorseListInDB, (snapshot) => {
    if(snapshot.exists()){
        let endorseList = Object.entries(snapshot.val()).reverse ();
        clearEndorseListEl();
        
        for(let i = 0; i < endorseList.length; i++){
            let currentEndorse = endorseList[i];

            appendEndorseToDOM(currentEndorse);
        }
    } else {
        endorseListEl.innerHTML = '<span class="noEndorse">No Endorsements here... yet</span>';

    }
});



function clearEndorseListEl(){
    endorseListEl.innerHTML = '';
}

// appending the endorsements to the DOM

function appendEndorseToDOM(endorse){
    
    let endorseValueEndorse = endorse[1][0];
    let endorseValueFrom = endorse[1][1];
    let endorseValueTo = endorse[1][2];
    let endorseEl = document.createElement('li');
    
    endorseEl.innerHTML = `
    <span class="endorseValueTo">To ${endorseValueTo}<br></span>
    <span class="endorseValueEndorse">${endorseValueEndorse}<br></span>
    <span class="endorseValueFrom">From ${endorseValueFrom}</span>
    <i class="fa fa-heart" id="fa-heart"></i>
    <p id="likesCount"></p>
    `;
    endorseListEl.append(endorseEl);
}



function clearEndorseInputEl() {
    endorseInputEl.value = "";
    inputFromEl.value = "";
    inputToEl.value = "";
}



