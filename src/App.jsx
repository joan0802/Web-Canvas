import { useState } from 'react';
import './App.css';
import React from 'react';
import { addText, resetCanva, changeCursor, changeColor, downloadCanva, undo, redo, uploadImage} from './function';
import { SketchPicker } from 'react-color';
import { ToolButton } from './ToolButton';

function App() {
    const [pickedColor, setPickedColor] = useState('#000000');
    const [theme, setTheme] = useState('dark');

    const handleTheme = (theme) => {
        setTheme(theme);
        if (theme === 'dark') {
            document.body.style.backgroundColor = "#56667A";
        }
        else {
            document.body.style.backgroundColor = "#AFC2D5";
        }
    }
    const handleColorChange = (color) => {
        setPickedColor(color.hex);
        changeColor(color.hex);
    };
    const handleText = () => {
        changeCursor("text");
        addText();
    }
    const handleDrawing = () => {
        // document.getElementById("paint").style.cursor = "url('pencil.cur'), auto";
        changeCursor("pencil");
    }
    const handleErasing = () => {
        changeCursor("eraser");
    }
    const handleShape = (shape) => {
        changeCursor(shape);
    }


    return (

        <div className="mr-20 ml-20 my-3 h-screen overflow-auto">
            <div className='flex justify-center'>
                <p className={`yeseva-one-regular title ${theme} flex items-center font-bold text-6xl mt-5 mb-5 rounded-lg`}>Web Canva</p>
            </div>

            {/* Tools */}
            <div className='flex justify-center items-center h-5/6 gap-5'>
                <div className='relative h-full'>
                    <canvas
                        id='paint'
                        className={`border-8 ${theme} flex bg-white border-8`}
                        width={600}
                        height={480}
                    >
                    </canvas>
                    <div className='absolute bottom-0 left-0'>
                        <img onClick={() => undo()} className="hover: cursor-pointer" width="80px" height="80px" src='undo.png' alt="undo"></img>
                    </div>
                    <div className='flex jusify-center items-center absolute bottom-0 left-40 gap-6'>
                        <img onClick={() => handleTheme('dark')} width="80px" height="80px" src='night-mode.png' className='hover: cursor-pointer'></img>
                        <img onClick={() => handleTheme('light')} width="80px" height="80px" src='light-mode.png' className='hover: cursor-pointer'></img>
                        <img onClick={() => changeCursor("painter")} width={80} height={80} src="paint-bucket.png" className='hover: cursor-pointer'/>
                    </div>
                    <div className='absolute bottom-0 right-0'>
                        <img onClick={() => redo()} className='hover: cursor-pointer' width="80px" height="80px" src='../public/redo.png' alt="redo"></img>
                    </div>
                </div>

                <div className={`border-8 ${theme} bg-white w-2/6 h-full grid grid-cols-6`}>
                    <div id="colorPicker" className='ml-5 col-span-3 flex justify-center items-center'>
                        {/* <ColorSelect id="colorSelect" onColorChange={handleColorChange}/> */}
                        <SketchPicker
                            presetColors={[]}
                            width='180px'
                            color={pickedColor}
                            onChangeComplete={handleColorChange}
                        />
                    </div>

                    <div className='col-span-3 flex flex-col justify-center gap-2 mx-10 mt-2 rounded-md'>
                        <p className='yeseva-one-regular text-lg font-bold'>Font Size:</p>
                        <form className="max-w-sm">
                            <select id="fontSize" className="bg-sky-900 text-white text-sm rounded-md block w-full p-1.5">
                                <option value="8">8</option>
                                <option defaultValue="16">16</option>
                                <option value="20">20</option>
                                <option value="28">28</option>
                                <option value="36">36</option>
                                <option value="54">54</option>
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
                        <div className='flex gap-4 space-between'>
                            <p className='yeseva-one-regular text-lg font-bold'>Fill Shape:</p>
                            <input id="fillShape" type='checkbox' defaultValue="" className=''></input>
                        </div>
                    </div>
                    <ToolButton func={handleDrawing} img={'../public/pencil.png'} />
                    <ToolButton func={handleErasing} img={'../public/eraser.png'} />
                    <ToolButton func={handleText} img={'../public/text.png'} />
                    <ToolButton func={() => handleShape("circle")} img={'../public/circle.png'} />
                    <ToolButton func={() => handleShape("rectangle")} img={'../public/rectangle.png'} />
                    <ToolButton func={() => handleShape("triangle")} img={'../public/triangle.png'} />
                    <ToolButton func={downloadCanva} img={'../public/download.png'} />
                    <ToolButton func={resetCanva} img={'../public/reset.png'} />
                    <ToolButton func={uploadImage} img={'../public/upload.png'} />
                    <input type="file" id="uploadFile"></input>
                </div>
            </div>
        </div>
    );
}

export default App;
