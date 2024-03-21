import { useState } from 'react';
import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="mr-20 ml-20 mb-20 h-screen">
      <div className='flex justify-center'>
        <p className='flex items-center font-bold text-4xl text-cyan-50 mt-5 mb-5'>Web Canva</p>
      </div>
      <div className='flex justify-center items-center h-5/6'>
        <div className="bg-white mr-4 w-3/5 h-full">HAHA</div>
        <div className="bg-gray-200 w-2/5 h-full flex flex-col justify-center items-center">
          {/* 工具栏内容 */}
          <p>工具1</p>
          <p>工具2</p>
          <p>工具3</p>
          {/* 可以根据需要添加更多工具 */}
        </div>
      </div>
    </div>
    
  );
}

export default App;
