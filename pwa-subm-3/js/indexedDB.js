//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || 
window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || 
window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || 
window.msIDBKeyRange

if (!window.indexedDB) {
   window.alert("Your browser doesn't support a stable version of IndexedDB.")
}


var db;
var request = window.indexedDB.open("newDatabase", 1);

request.onerror = function(event) {
   console.log("error: ");
};
request.onsuccess = function(event) {
   db = request.result;
   console.log("success: "+ db);
};
request.onupgradeneeded = function(event) {
   var db = event.target.result;
   var objectStore = db.createObjectStore("matches", {keyPath: "id"});
}

function updateCard(mId) {
   var transaction = db.transaction(["matches"]);
   var objectStore = transaction.objectStore("matches");
   var request = objectStore.get(mId);
   
   request.onerror = function(event) {
      alert("Unable to retrieve daa from database!");
   };
   
    request.onsuccess = function(event) {
        console.log(mId + " = ")
        // Do something with the request.result!
        document.querySelectorAll("#remindBtn").forEach(function (match) 
        {  
            if (match.getAttribute("matchid")==mId) 
            {
                match.innerHTML='Remind Me';
                match.setAttribute("onclick", "setMatchDB('"+mId+"')");
                console.log('update saat add');
            }
        });
        
    };
}

function getAllMatchDB(){
    document.querySelector('#watchLater').removeAttribute('onclick');
    readAll();
}

function updateCards(){
    var objectStore = db.transaction("matches").objectStore("matches");

    objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            var id = cursor.value.id;
            document.querySelectorAll("#remindBtn").forEach(function (match) 
            {  
                if (match.getAttribute("matchID")==id) 
                {
                    match.innerHTML='Remove';
                    match.setAttribute("onclick", "deleteMatchDB('"+id+"')");
                    console.log('update saat remove');
                    
                }
            });
            cursor.continue();
        } 
        else 
        {
            // console.log("read all success!");
        }
    };
}

function readAll() {
    var objectStore = db.transaction("matches").objectStore("matches");
    var matchesHTML = ' ';

    objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            var matchHTML =`
                <div class="matchCard col s12 m6" matchID="${cursor.value.id}">
                    <div class="card blue-grey darken-1 small">
                        <div class="card-content white-text">
                            <p>${cursor.value.competitions}</p>
                            <span class="card-title">${cursor.value.home}</span>
                            <span class="card-title">${cursor.value.away}</span>
                            <p>${cursor.value.date}</p>
                            <span class="card-title">${cursor.value.time}</span>
                        </div>
                        <div class="card-action">
                            <a id="deleteBtn" matchID="${cursor.value.id}" class="pointer" onclick="deleteMatchDB('${cursor.value.id}')">Remove</a>
                        </div>
                    </div>
                </div>
            `
            matchesHTML += matchHTML;
            cursor.continue();
        } 
        else 
        {
            console.log("read all success!");
        }
        document.querySelector('#watch_Later').innerHTML = matchesHTML;
    };
}

function setMatchDB(mId)
{
    add(mId);
    updateCards(); //isDelete false
    getAllMatchDB();
}

function add(mId) {
    document.querySelectorAll(".matchCard").forEach(function (match) 
    {  
        if (match.getAttribute("matchID")==mId) 
        {
            var matchElement = match.childNodes[1].childNodes[1];

            var competitions1 = matchElement.childNodes[1].innerHTML; //competitions
            var home1 = matchElement.childNodes[3].innerHTML; //home
            var away1 = matchElement.childNodes[5].innerHTML; //away
            var date1 = matchElement.childNodes[7].innerHTML; //date
            var time1 = matchElement.childNodes[9].innerHTML; //time
            console.log(mId);
            // console.log(home);

            var request = db.transaction(["matches"], "readwrite")
            .objectStore("matches")
            .add({ 
                id: mId, 
                competitions: competitions1, 
                home: home1, 
                away: away1,
                date: date1,
                time: time1
            });
            
            request.onsuccess = function(event) {
                M.toast({html: 'Match berhasil disimpan!'})
                console.log("insert data success");
            };
            
            request.onerror = function(event) {
                M.toast({html: 'Kamu sudah menyimpan match ini sebelumnya!', classes : 'bd-red'})
                console.log("data is aready exist in your database! ");
            }
        }
    });

   
}

function deleteMatchDB(mId)
{
    updateCard(mId);
    remove(mId);
    getAllMatchDB();
}

function remove(mId) {
    var request = db.transaction(["matches"], "readwrite")
    .objectStore("matches")
    .delete(mId);

    request.onsuccess = function(event) {
        M.toast({html: 'Match berhasil dihapus'})
    };
}

