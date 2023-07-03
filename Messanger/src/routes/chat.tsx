import React, { useEffect, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, DatabaseReference, onChildAdded, onValue, DataSnapshot, get } from "firebase/database";
let colors = ["red","green","purple","yellow"]
let name = ""
let temp = []
let numMes = 0
const color = colors[Math.round(Math.random()*colors.length-1)]
let classy
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
.catch((error: any) => {
  // The write failed...
  console.log(error)
});
console.log(snapshot.val().users[code].length)
numMes = snapshot.val().users[code].length-1
// Initialize Firebase
function Log({ log }: any) {
  return (
    <>
      {log.map((item: any, index: any) => {

        classy =  "selector border-l-8 h-8 mt-0 m-6 border-"+item[2]+"-300"
        console.log(item[2])
        return (
          <div key={index}>
            <h1 className="text-left mb-0 ml-6">{item[0]}</h1>
            <div className={classy}>
              <p className="text-left m-6 mt-0 ml-[10%]">{item[1]}</p>
            </div>
          </div>
        )
      })}
    </>
  );
}


function Chat() {
  const [popup, setPopup] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [log, setLog] = useState([["Admin", "Hello World", color]]);
  const logsElement = useRef<HTMLDivElement>(null);
  function Change(data:any){
    temp = []
    data = snapshot.val()
  
    for(let i = 0; i <numMes; i++){
      temp.push([data.users[code][i].username, data.users[code][i].Message, data.users[code][i].Color])
    }
    console.log("shot")
    console.log(snapshot.val().users[code])
    console.log(":snap")
    setLog(temp)
    console.log(logsElement)

  }
  async function update(){
    snapshot = await get(ref(db));
    Change("hi")
  }
  useEffect(() => {
    if (logsElement.current) {
      logsElement.current.scrollTop = logsElement.current.scrollHeight;
    }
  })
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

        console.log(numMes+" numMes")


        set(ref(db, 'users/'+code + "/" + numMes), {
          username: name,
          Message: inputValue,
          Color: color
        })
        .then(() => {
          console.log('-----------------------------------------------------------------')
          console.log(ref(db, 'users/'+code + "/" + numMes)+" HI")
          update()
          console.log(numMes+"num");
          numMes  = numMes+1

        })
        .catch((error: any) => {
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
      <div id="logs" ref={logsElement} className="h-[90vh] overflow-x-hidden overflow-y-scroll">
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

