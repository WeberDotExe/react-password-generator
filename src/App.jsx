import { useCallback, useState ,useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numallow, setNumallow] = useState(false);
  const [charallow, setCharallow] = useState(false);
  const [password, setPassword] = useState("");
  const passref = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";

    if (numallow) str += "1234567890";
    if (charallow) str += "~!@#$%^&*(_+=`";

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numallow, charallow, setPassword]);

  const copytoclip = useCallback(()=>{
    passref.current?.select(); 
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numallow,charallow,passwordGenerator])
return (
<>
<div className="w-full max-w-md mx-auto shadow-xl rounded-md px-4 py-3 mt-48 bg-gray-800 text-white">
<h1 className="text-xl my-3 text-center text-white">password generator</h1>
<div className="flex rounded-sm shadow-lg overflow-hidden mb-4">
  <input className="outline-none w-full px-3 py-1 rounded-sm text-black" type="text" value={password} placeholder="password" readOnly ref={passref} />
<button className="outline-none bg-yellow-500 text-white px-3 py-1 shrink-0 rounded-sm" onClick={copytoclip}>copy</button>
</div>
<div className="flex text-sm gap-x-2">
<div className="flex items-center gap-x-1">
  <input id="passwordholder" className="cursor-pointer" type="range" min={6} max={20} value={length} onChange={(e) => {setLength(e.target.value)}}/>
<label htmlFor="passwordholder">Length: {length}</label>
</div>
<div className="flex items-center gap-x-1">
<input id="numcheck" type="checkbox" defaultChecked={numallow} onChange={() => {setNumallow((prev) => !prev)}}/>
<label htmlFor="numcheck">Numbers</label>
</div>
<div className="flex items-center gap-x-1">
<input type="checkbox" id="charcheck" defaultChecked={charallow} onChange={() => {setCharallow((prev) => !prev)}}/>
<label htmlFor="charcheck">Characters</label>
      </div>
    </div>
  </div>
    </>
  );
}

export default App;
