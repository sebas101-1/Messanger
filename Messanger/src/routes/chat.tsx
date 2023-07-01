import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, DatabaseReference, onChildAdded, onValue, DataSnapshot, get } from "firebase/database";
let colors = ["blue","red","green","purple","yellow"]
let name = ""
let temp = []
let numMes = 0
const color = colors[Math.round(Math.random()*colors.length-1)]
// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyCz5GNgUPHRFBabDPCGTIgkouNUEpqgfAA",
  authDomain: "chat-66f54.firebaseapp.com",
  projectId: "chat-66f54",
  storageBucket: "chat-66f54.appspot.com",
  messagingSenderId: "283395189330",
  appId: "1:283395189330:web:bf28845682429c950b0d8b",
  measurementId: "G-K5N0EFV38L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const params = new URLSearchParams(window.location.search);
let code1 = params.get("code") 
let code:string = "poor"
if(code1 != null){
  code = code1
}
else{
  code = "poor"
}


// Create a new post reference with an auto-generated id
const db = getDatabase(app);
let snapshot = await get(ref(db));
set(ref(db, 'users/' + code + "/" + numMes), {
  username: "Admin",
  Message: "Test",
  Color: color
})
.then(() => {
  console.log(ref(db, 'users/' + numMes)+" HI")
})
.catch((error) => {
  // The write failed...
  console.log(error)
});
console.log(snapshot.val().users[code].length)
numMes = snapshot.val().users[code].length
// Initialize Firebase
function Log({ log, color }: any) {
  return (
    <>
      {log.map((item: any, index: any) => 
      (
        <div key={index}>
          <h1 className="text-left mb-0 ml-6">{item[0]}</h1>
          <div className="selector border-l-8 h-8 mt-0 m-6 border-${color}-300">
            <p className="text-left m-6 mt-0 ml-[10%]">{item[1]}</p>
          </div>
        </div>
      ))}
    </>
  );
}

function Chat() {
  const [popup, setPopup] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [log, setLog] = useState([["Admin", "Hello World", color]]);
  function Change(data:any){
    temp = []
    data = snapshot.val()
    console.log(snapshot.val())
    console.log(code)
    console.log(data.users[code][0].username)
    for(let i = 0; i < data.users[code].length; i++){
      temp.push([data.users[code][i].username, data.users[code][i].Message, data.users[code][i].Color])
    }
    console.log(temp)
    setLog(temp)
  }
  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if(popup){
        if(name.length < 10){
          name = inputValue
          setPopup(false)
        }
        Change(snapshot.val)
      }
      else{
        snapshot = await get(ref(db));

        set(ref(db, 'users/'+code + "/" + numMes), {
          username: name,
          Message: inputValue,
          Color: color
        })
        .then(() => {
          console.log(ref(db, 'users/'+code + "/" + numMes)+" HI")
          numMes ++
          console.log(numMes+"num");
          Change(snapshot.val())
        })
        .catch((error) => {
          // The write failed...
          console.log(error)
        });
      }
      setInputValue("");
    }
  };

  return (
    <>
      {popup ? (
        <>
          <div className="h-screen transition-all w-screen">
            <h1 className="text-center transition-all text-3xl m-60">Set Your Name</h1>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="transition-all">
        <div className="h-[90%] transition-all overflow-x-hidden overflow-y-scroll">
          <Log log={log} />
        </div>
        <input
          id="bar"
          type="text"
          className="w-[80%] transition-all border-2 text-center border-black ml-[10%] fixed bottom-6"
          value={inputValue}
          onKeyDown={handleKeyPress}
          onChange={(e) => setInputValue(e.target.value)}

      />
    </div>
    </>
  );
}

export default Chat;

