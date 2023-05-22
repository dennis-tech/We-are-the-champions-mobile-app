import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-46bf3-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorseListInDB = ref(database, 'endorseList');

const endorseInputEl = document.getElementById("endorseInputField");
const publishBtnEl = document.getElementById("publishBtn");
const endorseListEl = document.getElementById("endorseList");

publishBtnEl.addEventListener("click", function() {
    let endorseInput = endorseInputEl.value;
    if (endorseInput) {
        push(endorseListInDB, endorseInput);
        clearEndorseInputEl();
    }
})
onValue(endorseListInDB, (snapshot) => {
    if(snapshot.exists()){
        let endorseList = Object.entries(snapshot.val());
        clearEndorseListEl();
        
        for(let i = 0; i < endorseList.length; i++){
            let currentEndorse = endorseList[i];

            appendEndorseToDOM(currentEndorse);
        }
    } else {
        endorseListEl.innerHTML = '<span>No items here... yet</span>';

    }
});
function clearEndorseListEl(){
    endorseListEl.innerHTML = '';
}
function appendEndorseToDOM(endorse){
    let endorseID = endorse[0];
    let endorseValue = endorse[1];

    let endorseEl = document.createElement('li');
    endorseEl.textContent = endorseValue;
    endorseListEl.append(endorseEl);
}
function clearEndorseInputEl() {
    endorseInputEl.value = '';
}

