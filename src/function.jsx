import React from 'react';
import { useState } from 'react';

var isDrawing = false;
var pickedColor = '#000000';
var tool;

export function changeColor(color) {
    pickedColor = color;
}

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

export function addText() {
    // console.log("add text box");
    const canva = document.getElementById("paint");
    const ctx = canva.getContext("2d");
    canva.style.cursor = "text";
    canva.addEventListener("click",(e) => handleClick(e));
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
    console.log("reset");
}

export function readyToDraw() {
    if (tool == "pencil") {
        var canva = document.getElementById("paint");
        var ctx = canva.getContext("2d");
        // canva.addEventListener("mousedown", (e) => drawing(e, color));
        canva.addEventListener('mousedown', (e) => {
            isDrawing = true;
        });

        canva.addEventListener('mouseup', e => {
            isDrawing = false;
            var rect = canva.getBoundingClientRect();
            ctx.stroke();
            ctx.beginPath();
            
            // ctx.moveTo(e.clientX , e.clientY);
            e.preventDefault();
        });

        canva.addEventListener('mousemove', (e) => {
            if (!isDrawing) return;

            var rect = canva.getBoundingClientRect();

            ctx.strokeStyle = pickedColor;
            ctx.fillStyle = pickedColor;
            ctx.lineWidth = document.getElementById("brushSize").value;
            ctx.lineCap = "round";
            ctx.lineTo(e.offsetX - canva.offsetLeft, e.offsetY-canva.offsetTop);
            ctx.stroke();

        });
    }
    else if (tool == "eraser") {

    }
    else
        return;
}

export function downloadCanva() {
    const image = document.getElementById("paint").toDataURL();
    const d = document.createElement('a');
    d.download = 'canvas_image.png';
    d.href = image;
    d.click();

    console.log("download")
}