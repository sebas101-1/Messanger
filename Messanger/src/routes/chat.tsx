import React, { useEffect, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, get } from "firebase/database";
let colors = ["green","purple","yellow","blue","red"]
let name = ""
let temp:any = []
let numMes = 0
const color = colors[Math.round(Math.random()*colors.length-1)]
let classy: any
let firstTime = true
// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyD4Yrc88HJRwhhiHxuTXEJ2dTOUmXutBkE",
  authDomain: "chat-4da80.firebaseapp.com",
  databaseURL: "https://chat-4da80-default-rtdb.firebaseio.com",
  projectId: "chat-4da80",
  storageBucket: "chat-4da80.appspot.com",
  messagingSenderId: "819842679606",
  appId: "1:819842679606:web:5bd63de9eea73b344b6997",
  measurementId: "G-ZMX925ER21"
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
const db = getDatabase(app);
set(ref(db, 'users/'+code + "/" + numMes), {
  username: "seb",
  Message: "Hello New World",
  Color: "green"
})

// Create a new post reference with an auto-generated id
let snapshot:any 
async function  upSnap(){
  snapshot = await get(ref(db));
  console.log(snapshot.val().users[code],"snap")
  console.log("snap")
  numMes = snapshot.val().users[code].length
  console.log("fin")
}
upSnap()


// Initialize Firebase
function Loging(props: any) {
  return (
    <div>
      {props.loggingThings.map((item: any, index: number) => {
        return (
          <div key={index} className="hover:scale-105  hover:translate-x-20 transition-all">
            <h1 className="text-left mb-0 ml-6">{item[0]}</h1>
            <div className={`hover:bg-slate-400/[0.05] transition-all selector border-l-8 h-8 mt-0 m-6 border-${item[2]}-400`}
            style={{borderColor : item[2]}}>
              <p className="text-left m-6 mt-0 ml-[10%]">{item[1]}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}



function Chat() {
  const [popup, setPopup] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [theChatlog, setLog] = useState([["Admin", "Hello World", color]]);
  const logsElement = useRef<HTMLDivElement>(null);
  function Change(data:any){
    temp = theChatlog
    if(data.length != 0){
      temp = data.map((item: any) => [item.username, item.Message, item.Color]);

    setLog(temp);
    }
    else{
      temp = [["Admin","Send A Message To Start", "purple"]]
    }
    console.log(data);

  }
  async function update(snapshot:any){
    if(classy == snapshot.length){
      numMes = await snapshot.length
      console.log(classy,"classy",snapshot.length,"snap")

    }
    else{
      console.log(classy,"classy",snapshot.length,"snap","update fr")
      numMes = await snapshot.length
      Change(snapshot)

      classy = snapshot.length

    }
  }
  useEffect(() => {
    if (logsElement.current) {
      logsElement.current.scrollTop = logsElement.current.scrollHeight;
    }
  })
  const starCountRef = ref(db, 'users/' + code);
  onValue(starCountRef, (snapshot) => {
    if(firstTime){
      classy = snapshot.val().length
      firstTime = false
    }
    console.log("update")
    update(snapshot.val())
  });

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




        set(ref(db, 'users/'+code + "/" + numMes), {
          username: name,
          Message: inputValue,
          Color: color
        })
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
            <Loging help="jo" loggingThings={temp} />
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

