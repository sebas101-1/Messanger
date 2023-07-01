import { useState,  } from "react"

const characters: string[] = ["q","w","e","r","t","y","u","i","o"];
let codelength = 9
let Generate = false
let txt=""
console.log(window.URL)
function Splash() {
    function goto(){
      // const params = new URLSearchParams(window.location.search);
      // params.set("code",txt)
      // console.log(params.get("code"))
      window.location.href = window.location.href+"chat/?code="+txt;
    }
    let [code, setCode] = useState("Generate a code")

    function genCode(): void {
      if(!Generate){
        let tempcode = "";
        Generate = true
        for (let i = 0; i < codelength; i++) {
          tempcode += characters[Math.floor(Math.random() * characters.length)];
          console.log(tempcode);
        }
        tempcode += " Copy"
        setCode(tempcode); 
      }
      else{
        let tempcode = ""
        for (let i = 0; i<codelength; i++){
          tempcode += code[i]
        }
        navigator.clipboard.writeText(tempcode);
        setCode("Copied")
      }
    }
  
  return (
    <>
      <div className=" w-screen h-screen text-center bg-gradient-to-r from-blue to-orange">
        <h1 className="pt-[20rem] text-[4rem]">Join a Chat</h1>
        <input onChange={(e) => txt = e.target.value} placeholder="Enter Your Code Here" className=" w-52 h-8 focus:bg-black focus:text-white focus:h-12 focus:w-72 m-2 border-2 border-black text-black text-center bg-white " type="text" />
        <button   onClick={genCode} className=" h-8 w-52 transition-all m-2 text-grab text-center border-none bg-slate-800 rounded-full" >{code}</button>
        <button   onClick={goto} className=" h-8 w-52 m-auto  transition-all block text-grab text-center border-none bg-slate-800 rounded-full" >Enter</button>
      </div>
    </>
  )
}

export default Splash
