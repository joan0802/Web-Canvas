import { useState } from 'react';
import './App.css';
import React from 'react';
import { addText } from './function';
import { SketchPicker } from 'react-color';


function App() {

    return (

        <div className="mr-20 ml-20 mb-20 h-screen overflow-auto">
            <div className='flex justify-center'>
                <p className='flex items-center font-bold text-4xl text-cyan-50 mt-5 mb-5'>Web Canva</p>
            </div>

            {/* Tools */}
            <div className='flex justify-center items-center h-5/6'>
                <div id='canvas' className="bg-white mr-4 w-3/6 h-full border-8"></div>
                <div className="border-8 bg-white w-2/6 h-full grid grid-cols-6">
                    <div className='ml-5 col-span-3 flex justify-center items-center'>
                        <SketchPicker
                            presetColors={[]}
                            className='colorSelect'
                        />
                    </div>
                    <div className='col-span-3 flex flex-col justify-center gap-2 mx-10'>

                        <p className='font-bold'>Font Size:</p>
                        <form className="max-w-sm mt-1">
                            <select id="fontSize" className="bg-sky-900 text-white text-sm rounded-md block w-full p-1.5">
                                <option defaultValue="8">8</option>
                                <option value="10">10</option>
                                <option value="12">12</option>
                                <option value="16">16</option>
                                <option value="20">20</option>
                                <option value="24">24</option>
                            </select>
                        </form>
                        <p className='font-bold'>Font Type:</p>
                        <form className="max-w-sm mt-1">
                            <select id="fontType" className="bg-sky-900 text-white text-sm rounded-md block w-full p-1.5">
                                <option defaultValue="Arial">Arial</option>
                                <option value="Helvetica">Helvetica</option>
                                <option value="Times New Roman">Times New Roman</option>
                                <option value="Verdana">Verdana</option>
                            </select>
                        </form>
                    </div>

                    <div className='col-span-2 flex justify-center items-center'>
                        <img onClick={() => console.log("hello")} className='hover:bg-sky-100 cursor-pointer' src='../public/pencil.png' width="80" height="80" alt="eraser"></img>
                    </div>
                    <div className='col-span-2 flex justify-center items-center'>
                        <img className='hover:bg-sky-100 cursor-pointer' src='../public/eraser.png' width="80" height="80" alt="eraser"></img>
                    </div>
                    <div className='col-span-2 flex justify-center items-center'>
                        <img onClick={() => addText()} className='hover:bg-sky-100 cursor-pointer' src='../public/text.png' width="80" height="80" alt="eraser"></img>
                    </div>
                    <div className='col-span-2 flex justify-center items-center'>
                        <img onClick={() => console.log("hello")} className='hover:bg-sky-100 cursor-pointer' src='../public/cut.png' width="80" height="80" alt="eraser"></img>
                    </div>
                    <div className='col-span-2 flex justify-center items-center' onClick={() => console.log("hello")}>
                        <img onClick={() => console.log("hello")} className='hover:bg-sky-100 cursor-pointer' src='../public/glue-stick.png' width="80" height="80" alt="eraser"></img>
                    </div>
                    <div className='col-span-2 flex justify-center items-center' onClick={() => console.log("hello")}>
                        <img onClick={() => console.log("hello")} className='hover:bg-sky-100 cursor-pointer' src='../public/files.png' width="80" height="80" alt="eraser"></img>
                    </div>
                    <div className='col-span-2 flex justify-center items-center' onClick={() => console.log("hello")}>
                        <img onClick={() => console.log("hello")} className='hover:bg-sky-100 cursor-pointer' src='../public/circle.png' width="80" height="80" alt="eraser"></img>
                    </div>
                    <div className='col-span-2 flex justify-center items-center' onClick={() => console.log("hello")}>
                        <img onClick={() => console.log("hello")} className='hover:bg-sky-100 cursor-pointer' src='../public/rectangle.png' width="80" height="80" alt="eraser"></img>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
