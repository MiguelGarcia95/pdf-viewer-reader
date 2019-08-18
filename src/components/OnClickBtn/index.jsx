import React from 'react'
// import './style.css';

function OnClickBtn({onBtnClick, btnText, btnIcon}) {
  return (
    <button className="btn" onClick={onBtnClick} >
      {btnText} <i className={btnIcon}></i>
    </button>
  )
}

export default OnClickBtn