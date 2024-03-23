import React from 'react';
import { useState } from 'react';

var isDrawing = false;
var tool;
// const [tool, setTool] = useState("0");var mouse_x=0;

export function changeCursor(type) {
    // setTool(type);
    tool = type;
    var canva = document.getElementById("paint");
    if (type == "pencil") {
        canva.style.cursor = "url('pencil32.png'), auto";
        console.log(canva.style.cursor);
    }
    else if (type == "eraser") {
        canva.style.cursor = "url('eraser32.png'), auto";
    }
    else if (type == "circle") {
        canva.style.cursor = "url('circle32.png'), auto";
    }
    else if (type == "rectangle")
        canva.style.cursor = "url('rectangle32.png'), auto";
    else if (type == "text")
        canva.style.cursor = "text";
    else
        canva.style.cursor = "auto";
    console.log("tool = " + tool);
}

export function getMousePos(evt) {
    var pos = document.getElementById("paint").getBoundingClientRect();
    return {
        x: evt.clientX - pos.left,
        y: evt.clientY - pos.top
    };
}

export function addText(color) {
    // console.log("add text box");
    const canva = document.getElementById("paint");
    const ctx = canva.getContext("2d");
    canva.style.cursor = "text";
    canva.addEventListener("click", handleClick);
    function handleClick(evt) {
        // console.log("click again");
        const outer = document.getElementById("outer-canva");
        canva.style.cursor = "auto";
        const mousePos = getMousePos(evt);
        const input = document.createElement("input");
        
        ctx.fillStyle = color;
        ctx.font = "bold 18px Arial";
        ctx.fillText("Text", 30, 80);
        canva.removeEventListener("click", handleClick);
    }
    canva.style.cursor = "text";
}


export function resetCanva() {
    const canva = document.getElementById("paint");
    const ctx = canva.getContext("2d");
    ctx.clearRect(0, 0, canva.width, canva.height);
    canva.innerHTML = "";
    console.log("reset");
}

export function readyToDraw(color) {
    if(tool == "pencil") {
        var canva = document.getElementById("paint");
        console.log("drawing func");
        canva.addEventListener("mousedown", (e) => {
            canva.addEventListener("mousemove", () => drawing(e, color));
        });
    }
    else if(tool == "eraser") {

    }
    else
        return;
}

function drawing(e, color) {
    // console.log("drawing");
    const mousePos = getMousePos(e);
    const canva = document.getElementById('paint');
    const ctx = canva.getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineWidth = "5px";
    ctx.lineCap = "round";
    ctx.lineTo(0, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(getMousePos.x, getMousePos.y);
    document.getElementById("paint").addEventListener("mouseup", () => {
        isDrawing = false;
        ctx.closePath();
        document.getElementById("paint").removeEventListener("mousemove", readyToDraw(color));
    });
}