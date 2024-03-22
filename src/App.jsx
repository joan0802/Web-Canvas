import { useState } from 'react';
import Tool from './Tool';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="mr-20 ml-20 mb-20 h-screen overflow-auto">
      <div className='flex justify-center'>
        <p className='flex items-center font-bold text-4xl text-cyan-50 mt-5 mb-5'>Web Canva</p>
      </div>
      <div className='flex justify-center items-center h-5/6'>
        <div className="bg-white mr-4 w-3/6 h-full border-8"></div>
        <div className="border-8 bg-white w-2/6 h-full grid grid-cols-4">
          <button className='col-span-2 flex justify-center items-center' onClick={() => console.log("hello")}>
            <img src='../public/pencil.png' width="100" height="100" alt="eraser"></img>
            {/* <p>Pencil</p> */}
          </button>
          <button className='col-span-2 flex justify-center items-center' onClick={() => console.log("hello")}>
            <img src='../public/eraser.png' width="100" height="100" alt="eraser"></img>
          </button>
          <button className='col-span-2 flex justify-center items-center' onClick={() => console.log("hello")}>
            <img src='../public/cut.png' width="100" height="100" alt="eraser"></img>
          </button>
          <button className='col-span-2 flex justify-center items-center' onClick={() => console.log("hello")}>
            <img src='../public/glue-stick.png' width="100" height="100" alt="eraser"></img>
          </button>
          <button className='col-span-2 flex justify-center items-center' onClick={() => console.log("hello")}>
            <img src='../public/files.png' width="100" height="100" alt="eraser"></img>
          </button>
          <button className='col-span-2 flex justify-center items-center' onClick={() => console.log("hello")}>
            <img src='../public/circle.png' width="100" height="100" alt="eraser"></img>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
