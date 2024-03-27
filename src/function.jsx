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
    }

    const onMouseUp = (e) => {
        isDrawing = false;
        // ctx.stroke();
        ctx.beginPath();
        e.preventDefault();

        while (step < undoArray.length - 1) {
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

        switch (tool) {
            case "pencil":
                ctx.strokeStyle = pickedColor;
                ctx.lineWidth = bSize;
                ctx.lineCap = "round";
                ctx.lineTo(e.offsetX - canva.offsetLeft, e.offsetY - canva.offsetTop);
                ctx.stroke();
                break;
            case "eraser":
                ctx.clearRect(e.offsetX - canva.offsetLeft, e.offsetY, bSize * 1.3, bSize * 1.3);
                break;
            case "circle":
                ctx.putImageData(tmpCanva, 0, 0);
                ctx.beginPath();
                var radius = Math.sqrt(Math.pow(e.offsetX - canva.offsetLeft - startX, 2) + Math.pow(e.offsetY - canva.offsetTop - startY, 2));
                ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
                ctx.fillStyle = pickedColor;
                ctx.fill();
                break;
            case "rectangle":
                ctx.putImageData(tmpCanva, 0, 0);
                ctx.fillStyle = pickedColor;
                ctx.fillRect(startX, startY, e.offsetX - canva.offsetLeft - startX, e.offsetY - canva.offsetTop - startY);
                break;
            case "triangle":
                ctx.putImageData(tmpCanva, 0, 0);
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(e.offsetX - canva.offsetLeft, e.offsetY - canva.offsetTop);
                ctx.lineTo(startX * 2 - e.offsetX + canva.offsetLeft, e.offsetY - canva.offsetTop);
                ctx.lineTo(startX, startY);
                ctx.fillStyle = pickedColor;
                ctx.fill();
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
    var tmp = new Image();
    tmp.src = canva.toDataURL();
    undoArray.push(tmp);
    step++;
    console.log("upload step = " + step);
    e.target.value = null;
}

export function addText() {
    const canva = document.getElementById("paint");
    const ctx = canva.getContext("2d");
    const inputText = document.createElement("input");

    canva.addEventListener("click", (e) => handleClick(e));
    function handleClick(e) {
        inputText.style.position = "absolute";
        inputText.style.left = e.offsetX;
        inputText.style.top = e.offsetY;
    }
    canva.removeEventListener("click", handleClick);

    // 将输入框添加到页面
    document.body.appendChild(inputText);
    inputText.focus();

    // 添加输入框事件监听器
    inputText.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            const text = inputText.value;
            ctx.fillStyle = pickedColor;
            ctx.font = "bold 18px Arial";
            ctx.fillText(text, e.offsetX, e.offsetY); // 将输入的文字绘制到画布上
            inputText.style.display = "none"; // 隐藏输入框
            document.body.removeChild(inputText); // 从页面中移除输入框
        }
    });
}