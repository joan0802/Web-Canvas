import React from 'react';
import ReactDOM from 'react-dom';

export default function Tool({src, onClick}){
  return (
    <div onClick={onClick}>
        <img src={src} alt="Tools Icon"></img>
    </div>
  );
}