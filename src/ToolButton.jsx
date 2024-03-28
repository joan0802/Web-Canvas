import React from "react";

export function ToolButton({ func, img }) {
    return (
        <div className='col-span-2 flex justify-center items-center'>
            <img onClick={func} className='hover:bg-sky-100 cursor-pointer' src={img} width="80" height="80" alt="eraser"></img>
        </div>
    );
}