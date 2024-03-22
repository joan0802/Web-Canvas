import React from 'react';
import { SketchPicker } from 'react-color';
import { useState } from 'react';

export function ColorSelect({ onColorChange }) {
    const [pickedColor, setPickedColor] = useState('#000000');

    const handleColorChange = (color) => {
        setPickedColor(color.hex); 
        onColorChange(color.hex);
    };

    return (
        <div>
            <SketchPicker
                presetColors={[]}
                width='180px'
                color={pickedColor}
                onChangeComplete={handleColorChange}
            />
        </div>
    );
}