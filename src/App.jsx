import { useState } from 'react';
import './App.css';
import React from 'react';
import { addText, resetCanva, changeCursor, changeColor, downloadCanva, undo, redo, uploadImage } from './function';
import { SketchPicker } from 'react-color';

function App() {
    const [pickedColor, setPickedColor] = useState('#000000');
    const [textHidden, setTextHidden] = useState(true);
    const [tool, setTool] = useState("auto");

    const handleColorChange = (color) => {
        setPickedColor(color.hex);
        changeColor(color.hex);
    };
    const handleText = (color) => {
        changeCursor("text");
        addText(color);
        setTool("text");
    }
    const handleDrawing = () => {
        // document.getElementById("paint").style.cursor = "url('pencil.cur'), auto";
        changeCursor("pencil");
        setTool("pencil");
    }
    const handleErasing = () => {
        changeCursor("eraser");
        setTool("eraser");
    }
    const handleShape= (shape) => {
        changeCursor(shape);
        setTool(shape);
    }


    return (

        <div className="mr-20 ml-20 mb-20 h-screen overflow-auto">
            <div className='flex justify-center'>
                <p className='yeseva-one-regular text-sky-100 flex items-center font-bold text-6xl mt-5 mb-5 rounded-lg'>Web Canva</p>
            </div>

            {/* Tools */}
            <div className='flex justify-center items-center h-5/6 gap-5'>
                <div className='relative h-full'>
                        <canvas 
                            id='paint' 
                            className="flex bg-white border-8"
                            width={600}
                            height={480}
                        >
                        </canvas>
                    <div className='absolute bottom-0 left-0'>
                        <img onClick={() => undo()} className="hover: cursor-pointer" width="80px" height="80px" src='undo.png' alt="undo"></img>
                    </div>
                    <div className='absolute bottom-0 right-0'>
                        <img onClick={() => redo()} className='hover: cursor-pointer' width="80px" height="80px" src='../public/redo.png' alt="redo"></img>
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

                    <div className='col-span-3 flex flex-col justify-center gap-2 mx-10 my-5 rounded-md'>
                        <p className='yeseva-one-regular text-lg font-bold'>Font Size:</p>
                        <form className="max-w-sm">
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
                        <form className="max-w-sm">
                            <select id="fontType" className="bg-sky-900 text-white text-sm rounded-md block w-full p-1.5">
                                <option defaultValue="Arial">Arial</option>
                                <option value="skranji">Skranji</option>
                                <option value="Times New Roman">Times New Roman</option>
                                <option value="Verdana">Verdana</option>
                            </select>
                        </form>
                        <p className='yeseva-one-regular text-lg font-bold'>Brush Size:</p>
                        <input id="brushSize" type='range' min="1" max="50" defaultValue="5" className='bg-black'></input>
                    </div>

                    <div className='col-span-2 flex justify-center items-center'>
                        <img onClick={() => {handleDrawing(pickedColor);}} className='hover:bg-sky-100 cursor-pointer' src='../public/pencil.png' width="80" height="80" alt="eraser">
                        </img>
                    </div>
                    <div className='col-span-2 flex justify-center items-center'>
                        <img onClick={() => handleErasing()} className='hover:bg-sky-100 cursor-pointer' src='../public/eraser.png' width="80" height="80" alt="eraser">
                        </img>
                    </div>
                    <div className='col-span-2 flex justify-center items-center'>
                        <img onClick={() => handleText(pickedColor)} className='hover:bg-sky-100 cursor-pointer' src='../public/text.png' width="80" height="80" alt="eraser"></img>
                    </div>
                    <div className='col-span-2 flex justify-center items-center'>
                        <img onClick={() => handleShape("circle")} className='hover:bg-sky-100 cursor-pointer' src='../public/circle.png' width="80" height="80" alt="eraser"></img>
                    </div>
                    <div className='col-span-2 flex justify-center items-center'>
                        <img onClick={() => handleShape("rectangle")} className='hover:bg-sky-100 cursor-pointer' src='../public/rectangle.png' width="80" height="80" alt="eraser"></img>
                    </div>
                    <div className='col-span-2 flex justify-center items-center'>
                        <img onClick={() => handleShape("triangle")} className='hover:bg-sky-100 cursor-pointer' src='../public/triangle.png' width="80" height="80" alt="eraser"></img>
                    </div>
                    <div className='col-span-2 flex justify-center items-center'>
                        <img onClick={() => downloadCanva()} className='hover:bg-sky-100 cursor-pointer' src='../public/download.png' width="80" height="80" alt="eraser"></img>
                    </div>
                    <div className='col-span-2 flex justify-center items-center'>
                        <img onClick={() => resetCanva()} className='hover:bg-sky-100 cursor-pointer' src='../public/reset.png' width="80" height="80" alt="eraser"></img>
                    </div>
                    <div className='col-span-2 flex justify-center items-center'>
                        <img onClick={() => uploadImage()} id="uploadBtn" className='hover:bg-sky-100 cursor-pointer' src='../public/upload.png' width="80" height="80" alt="eraser"></img>
                    </div>
                    <input type="file" id="uploadFile"></input>
                </div>
            </div>
        </div>
    );
}

export default App;
