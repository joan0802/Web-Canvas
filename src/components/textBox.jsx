import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState } from 'react';
import App from '../App.jsx'
import '../index.css'

export function TextBox() {
  const [text, setText] = useState('');

  return (
    <div className="editable-box">
      {/* <textarea
        className="textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      /> */}
    </div>
  )
}