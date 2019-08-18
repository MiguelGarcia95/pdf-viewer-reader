import React from 'react';
import './style.css';

function OnClickBtn({onBtnClick, btnText = '', btnIcon, className}) {
  return (
    <button className={className} onClick={onBtnClick} >
      <p>{btnText} <i className={btnIcon}></i></p>
    </button>
  )
}

export default OnClickBtn
