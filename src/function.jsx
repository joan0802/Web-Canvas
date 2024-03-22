import React from 'react';
import { SketchPicker } from 'react-color';

export function getMousePos(evt) {
    var pos = document.getElementById("canvas").getBoundingClientRect();
    return {
        x: evt.clientX - pos.left,
        y: evt.clientY - pos.top
    };
}

export function addText() {
    console.log("add text box");
    document.getElementById("canvas").style.cursor = "text";
    document.getElementById("canvas").addEventListener("click", handleClick);
    function handleClick(evt) {
        console.log("click again");
        document.getElementById("canvas").style.cursor = "auto";

        const mousePos = getMousePos(evt);
        const textBox = document.createElement("input");
        
        textBox.style.position = "absolute";
        textBox.style.left = mousePos.x + "px";
        textBox.style.top = mousePos.y + "px";
        textBox.style.width = "80px";
        textBox.style.fontSize = document.getElementById("fontSize").value + "px";
        textBox.style.fontFamily = document.getElementById("fontType").value;
        textBox.style.color = document.getElementById("colorPicker").color;

        document.getElementById("canvas").appendChild(textBox);
        textBox.focus();
        document.getElementById("canvas").removeEventListener("click", handleClick);
    }
    document.getElementById("canvas").style.cursor = "text";
}

export function resetCanva() {
    document.getElementById("canvas").innerHTML = "";
}