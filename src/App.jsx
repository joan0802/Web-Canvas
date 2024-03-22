import { useState } from 'react';
import './App.css';
import React from 'react';
import { addText, resetCanva } from './function';
// import { ColorSelect } from './components/colorSelect';
import { SketchPicker } from 'react-color';

function App() {
    const [pickedColor, setPickedColor] = useState('#000000');
    const handleColorChange = (color) => {
        setPickedColor(color.hex);
    };

    return (

        <div className="mr-20 ml-20 mb-20 h-screen overflow-auto">
            <div className='flex justify-center'>
                <p className='yeseva-one-regular flex items-center font-bold text-6xl text-cyan-50 mt-5 mb-5'>Web Canva</p>
            </div>

            {/* Tools */}
            <div className='flex justify-center items-center h-5/6 gap-5'>
                <div className='relative w-3/6 h-full'>
                    <div id='canvas' className="flex bg-white mr-4 w-full h-5/6 border-8"></div>
                    <div className='canva-button absolute bottom-0 left-0'>
                        <img className="hover: cursor-pointer" width="80px" height="80px" src='../public/undo.png' alt="undo"></img>
                    </div>
                    <div className='canva-button absolute bottom-0 right-0'>
                        <img className='hover: cursor-pointer' width="80px" height="80px" src='../public/redo.png' alt="redo"></img>
                    </div>
                </div>

                <div className="border-8 bg-white w-2/6 h-full grid grid-cols-6">
                    <div id="colorPicker" className='ml-5 col-span-3 flex justify-center items-center'>
                        {/* <ColorSelect id="colorSelect" onColorChange={handleColorChange}/> */}
                        <SketchPicker
                            presetColors={[]}
                            width='180px'
                            color={pickedColor}
                            onChangeComplete={handleColorChange}
                        />
                    </div>

                    <div className='col-span-3 flex flex-col justify-center gap-2 mx-10'>
                        <p className='yeseva-one-regular text-lg font-bold'>Font Size:</p>
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
                        <p className='yeseva-one-regular text-lg font-bold'>Font Type:</p>
                        <form className="max-w-sm mt-1">
                            <select id="fontType" className="bg-sky-900 text-white text-sm rounded-md block w-full p-1.5">
                                <option defaultValue="Arial">Arial</option>
                                <option value="skranji">Skranji</option>
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
                        <img onClick={() => addText(pickedColor)} className='hover:bg-sky-100 cursor-pointer' src='../public/text.png' width="80" height="80" alt="eraser"></img>
                    </div>
                    <div className='col-span-2 flex justify-center items-center'>
                        <img onClick={() => console.log("hello")} className='hover:bg-sky-100 cursor-pointer' src='../public/circle.png' width="80" height="80" alt="eraser"></img>
                    </div>
                    <div className='col-span-2 flex justify-center items-center'>
                        <img onClick={() => console.log("hello")} className='hover:bg-sky-100 cursor-pointer' src='../public/rectangle.png' width="80" height="80" alt="eraser"></img>
                    </div>
                    <div className='col-span-2 flex justify-center items-center'>
                        <img onClick={() => console.log("hello")} className='hover:bg-sky-100 cursor-pointer' src='../public/triangle.png' width="80" height="80" alt="eraser"></img>
                    </div>
                    <div className='col-span-2 flex justify-center items-center'>
                        <img onClick={() => console.log("hello")} className='hover:bg-sky-100 cursor-pointer' src='../public/download.png' width="80" height="80" alt="eraser"></img>
                    </div>
                    <div className='col-span-2 flex justify-center items-center'>
                        <img onClick={() => resetCanva()} className='hover:bg-sky-100 cursor-pointer' src='../public/reset.png' width="80" height="80" alt="eraser"></img>
                    </div>
                    <div className='col-span-2 flex justify-center items-center'>
                        <img onClick={() => console.log("hello")} className='hover:bg-sky-100 cursor-pointer' src='../public/upload.png' width="80" height="80" alt="eraser"></img>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
