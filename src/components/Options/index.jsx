import React from 'react'
import './style.css';

function Options(previousPage) {
  // add go to page feature
  // update scale?
  // change colors?
  return (
    <section>
      <button className="btn" id='prev-page' onClick={() => previousPage()} >
        <i className='fas fa-arrow-circle-left'></i> Prev Page
      </button>
      <button className="btn" id='prev-page' onClick={() => previousPage()} >
        <i className='fas fa-arrow-circle-left'></i> Prev Page
      </button>
    </section>
  )
}

export default Options
