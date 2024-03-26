import React from 'react';
import { useState } from 'react';

var isDrawing = false;
var pickedColor = '#000000';
var undoArray = new Array();
var step = 0;
var tool;
var isListen = false;

window.onload = function () {
    initApp();
}

function initApp() {
    const canva = document.getElementById("paint");

    var img = new Image();
    img.src = canva.toDataURL();
    undoArray.push(img);
    step = 0;
    console.log("init step = " + step);
}

export function changeColor(color) {
    pickedColor = color;
}

export function changeCursor(type) {
    // setTool(type);
    tool = type;
    var canva = document.getElementById("paint");

    if (type == "pencil") {
        canva.style.cursor = "url('pencil32.png'), auto";
        readyToDraw();
    }
    else if (type == "eraser") {
        canva.style.cursor = "url('eraser32.png'), auto";
        readyToDraw();
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

export function addText() {
    // console.log("add text box");
    const canva = document.getElementById("paint");
    const ctx = canva.getContext("2d");
    canva.style.cursor = "text";
    canva.addEventListener("click", (e) => handleClick(e));
    function handleClick(e) {
        // console.log("click again");
        const outer = document.getElementById("outer-canva");
        canva.style.cursor = "auto";
        const input = document.createElement("input");

        ctx.fillStyle = pickedColor;
        ctx.font = "bold 18px Arial";
        ctx.fillText("Text", e.offsetX, e.offsetY);
        canva.removeEventListener("click", handleClick);
    }
    canva.style.cursor = "text";
}

export function resetCanva() {
    const canva = document.getElementById("paint");
    const ctx = canva.getContext("2d");
    ctx.clearRect(0, 0, canva.width, canva.height);
    canva.innerHTML = "";
    initApp();
    console.log("reset");
}

export function readyToDraw() {
    var canva = document.getElementById("paint");
    var ctx = canva.getContext("2d");

    const onMouseDown = (e) => {
        isDrawing = true;
    }

    const onMouseUp = (e) => {
        isDrawing = false;
        var rect = canva.getBoundingClientRect();
        ctx.stroke();
        ctx.beginPath();
        e.preventDefault();

        while(step < undoArray.length - 1) {
            undoArray.pop();
        }
        var img = new Image();
        img.src = canva.toDataURL();
        undoArray.push(img);
        step++;
        console.log("canva step = " + step);
    };

    const onMouseMove = (e) => {
        if (!isDrawing) return;

        const bSize = document.getElementById("brushSize").value;
        // const rect = canva.getBoundingClientRect();
        if (tool == "pencil") {
            ctx.strokeStyle = pickedColor;
            ctx.fillStyle = pickedColor;
            ctx.lineWidth = bSize;
            ctx.lineCap = "round";
            ctx.lineTo(e.offsetX - canva.offsetLeft, e.offsetY - canva.offsetTop);
            ctx.stroke();
        }
        else if (tool == "eraser") {
            ctx.clearRect(e.offsetX - canva.offsetLeft, e.offsetY - canva.offsetTop, bSize*1.3, bSize*1.3);

        }
    };

    if(!isListen) {
        canva.addEventListener("mousedown", onMouseDown);
        canva.addEventListener("mouseup", onMouseUp);
        canva.addEventListener("mousemove", onMouseMove);
        isListen = true;
    }
    // canva.removeEventListener("mousedown", onMouseDown);
    // canva.removeEventListener("mouseup", onMouseUp);
    // canva.removeEventListener("mousemove", onMouseMove);

}

export function downloadCanva() {
    const image = document.getElementById("paint").toDataURL();
    const d = document.createElement('a');
    d.download = 'canvas_image.png';
    d.href = image;
    d.click();

    console.log("download")
}

export function undo() {
    console.log("undo");
    const canva = document.getElementById("paint");
    const ctx = canva.getContext("2d");
    if (step > 0) {
        step--;
        ctx.clearRect(0, 0, canva.width, canva.height); 
        ctx.drawImage(undoArray[step], 0, 0);
        console.log("step = " + step);
    }
}

export function redo() {
    console.log("redo");
    const canva = document.getElementById("paint");
    const ctx = canva.getContext("2d");
    if (step < undoArray.length - 1) {
        step++;
        ctx.clearRect(0, 0, canva.width, canva.height);
        ctx.drawImage(undoArray[step], 0, 0);
        console.log("step = " + step);
    }
}