import { useCallback, useEffect, useState } from "react"

export default function App() {

  const [password, setPassword] = useState("random@123");
  const [length, setLength] = useState(8);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharacterAllowed, setIsCharacterAllowed] = useState(false);

  const generatePassword = useCallback(() => {
    let main_str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num_str = "1234567890";
    let char_str = "!@#$%^&*()_-+={}[]\|:;'\"<>,.?/";

    let str = main_str;
    if(isNumberAllowed) str += num_str;
    if(isCharacterAllowed) str += char_str;

    let pass = "";
    for(let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length);
      const char = str.charAt(index);
      pass += char;
    }

    setPassword(pass);

  }, [length, isNumberAllowed, isCharacterAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, isNumberAllowed, isCharacterAllowed]);

  function handleClick() {
    window.navigator.clipboard.writeText(password);
    const textField = document.getElementById("text-field");
    textField.select();
  }

  return (
    <div className="w-full h-screen bg-slate-400 flex justify-center items-center text-white">
      <div className="bg-slate-500 p-10 flex flex-col rounded-lg items-center">
        <h1 className="text-2xl text-white text-center mb-3">Random Password Generator</h1>
        <div className="mb-3 w-full" id="grid">
          <input type="text" id="text-field" readOnly className="rounded-md rounded-r-none p-2 outline-none text-black" value={password} onChange={function(ev) {setPassword(ev.target.value)}} />
          <button className="bg-purple-500 rounded-md rounded-l-none p-2 hover:bg-purple-600" onClick={handleClick}>copy</button>
        </div>
        <div className="flex flex-col items-start w-full mb-3">
          <input type="range" min={6} max={20} value={length} className="accent-lime-100 w-full" onChange={function(ev) {setLength(ev.target.value)}} />
          <p>Length: {length}</p>
        </div>
        <div className="flex gap-2 items-center justify-start w-full">
          <input type="checkbox" id="number" onChange={function() {setIsNumberAllowed((prev) => !prev)}} />
          <label htmlFor="#number">Include numbers</label>
        </div>
        <div className="flex gap-2 justify-start w-full">
          <input type="checkbox" id="character" onChange={function() {setIsCharacterAllowed((prev) => !prev)}} />
          <label htmlFor="#character">Include special characters</label>
        </div>
      </div>
    </div>
  )
}