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
    const upload = document.getElementById("uploadFile");
    upload.addEventListener("change", (e) => handleUpload(e));

    var img = new Image();
    img.src = canva.toDataURL();
    undoArray.push(img);
    step = 0;
    console.log("init step = " + step);
}

function addStep() {
    const canva = document.getElementById("paint");
    var img = new Image();
    img.src = canva.toDataURL();
    undoArray.push(img);
    step++;
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
        readyToDraw();
    }
    else if (type == "rectangle") {
        canva.style.cursor = "url('rectangle32.png'), auto";
        readyToDraw();
    }
    else if (type == "triangle") {
        canva.style.cursor = "url('triangle32.png'), auto";
        readyToDraw();
    }
    else if (type == "painter") {
        canva.style.cursor = "url('paint-bucket32.png'), auto";
        readyToDraw();
    }
    else if (type == "text")
        canva.style.cursor = "text";
    else
        canva.style.cursor = "auto";
    console.log("tool = " + tool);
}


export function resetCanva() {
    const canva = document.getElementById("paint");
    const ctx = canva.getContext("2d");
    ctx.clearRect(0, 0, canva.width, canva.height);
    canva.innerHTML = "";
    canva.style.backgroundColor = "white";
    initApp();
    console.log("reset");
}

export function readyToDraw() {
    var canva = document.getElementById("paint");
    var ctx = canva.getContext("2d");
    var startX, startY;
    var tmpCanva;

    const onMouseDown = (e) => {
        isDrawing = true;
        startX = e.offsetX - canva.offsetLeft;
        startY = e.offsetY - canva.offsetTop;
        tmpCanva = ctx.getImageData(0, 0, canva.width, canva.height);
        if(tool == "painter") {
            ctx.fillStyle = pickedColor;
            ctx.fillRect(0, 0, canva.width, canva.height);
            addStep();
        }
    }

    const onMouseUp = (e) => {
        isDrawing = false;
        // ctx.stroke();
        ctx.beginPath();
        e.preventDefault();

        while (step < undoArray.length - 1) {
            undoArray.pop();
        }
        if(tool != "painter" && tool != "text")
            addStep();
        console.log("canva step = " + step);
    };

    const onMouseMove = (e) => {
        if (!isDrawing) return;
        const bSize = document.getElementById("brushSize").value;
        const isFilled = document.getElementById("fillShape").checked;
        ctx.strokeStyle = pickedColor;
        ctx.lineWidth = bSize;
        ctx.fillStyle = pickedColor;

        switch (tool) {
            case "pencil":
                ctx.lineCap = "round";
                ctx.lineTo(e.offsetX - canva.offsetLeft, e.offsetY - canva.offsetTop + 25);
                ctx.stroke();
                break;
            case "eraser":
                ctx.clearRect(e.offsetX - canva.offsetLeft, e.offsetY + 15, bSize * 1.3, bSize * 1.3);
                break;
            case "circle":
                ctx.putImageData(tmpCanva, 0, 0);
                ctx.beginPath();
                var radius = Math.sqrt(Math.pow(e.offsetX - canva.offsetLeft - startX, 2) + Math.pow(e.offsetY - canva.offsetTop - startY, 2));
                ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
                ctx.fillStyle = pickedColor;
                if(isFilled) 
                    ctx.fill();
                else 
                    ctx.stroke();
                break;
            case "rectangle":
                ctx.putImageData(tmpCanva, 0, 0);
                if(isFilled) 
                    ctx.fillRect(startX, startY, e.offsetX - canva.offsetLeft - startX, e.offsetY - canva.offsetTop - startY);
                else
                    ctx.strokeRect(startX, startY, e.offsetX - canva.offsetLeft - startX, e.offsetY - canva.offsetTop - startY);
                break;
            case "triangle":
                ctx.putImageData(tmpCanva, 0, 0);
                ctx.beginPath();
                ctx.lineCap = "round";
                ctx.moveTo(startX, startY);
                ctx.lineTo(e.offsetX - canva.offsetLeft, e.offsetY - canva.offsetTop);
                ctx.lineTo(startX * 2 - e.offsetX + canva.offsetLeft, e.offsetY - canva.offsetTop);
                ctx.lineTo(startX, startY);
                ctx.fillStyle = pickedColor;
                if(isFilled) 
                    ctx.fill();
                else 
                    ctx.stroke();
                break;
            default:
                break;
        }
    };

    if (!isListen) {
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

export function uploadImage() {
    const upload = document.getElementById("uploadFile");
    upload.click();
}

function handleUpload(e) {
    const canva = document.getElementById("paint");
    const ctx = canva.getContext("2d");
    const file = e.target.files[0];
    console.log("upload")

    var img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canva.width, canva.height);
    }
    addStep();
    console.log("upload step = " + step);
    e.target.value = null;
}

export function addText() {
    const canva = document.getElementById("paint");
    const ctx = canva.getContext("2d");
    const inputText = document.createElement("input");
    var fontSize;
    var fontType;
    var posX, posY;

    canva.addEventListener("click", (e) => handleClick(e));
    function handleClick(e) {
        posX = e.offsetX - canva.offsetLeft;
        posY = e.offsetY;
        inputText.style.position = "absolute";
        inputText.style.left = e.clientX + "px";
        inputText.style.top = e.clientY + "px";
        document.body.appendChild(inputText);
        inputText.focus();
    }
    canva.removeEventListener("click", handleClick);
    fontSize = document.getElementById("fontSize").value;
    fontType = document.getElementById("fontType").value;
    inputText.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            console.log(inputText.value);
            ctx.fillStyle = pickedColor;
            ctx.font = `${fontSize}px ${fontType}`;
            ctx.fillText(inputText.value, posX, posY);
            inputText.style.display = "none";
            document.body.removeChild(inputText);
            canva.style.cursor = "auto";
            addStep();
        }
    });
}