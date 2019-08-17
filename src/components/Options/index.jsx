import React from 'react'
import './style.css';

function Options({previousPage, nextPage, getDocument}) {
  // add go to page feature
  // update scale?
  // change colors?
  return (
    <section>
      <button className="btn" id='prev-page' onClick={() => previousPage()} >
        <i className='fas fa-chevron-circle-left'></i> Prev Page
      </button>
      <button className="btn" id='prev-page' onClick={() => nextPage()} >
        Next Page <i className='fas fa-chevron-circle-right'></i>
      </button>
      <button className='btn' id='upload-doc'>
        Upload PDF <i className="fas fa-file-upload"></i>
      </button>
      <button className='btn' id='bookmark'>
        Bookmark <i className="fas fa-bookmark"></i>
      </button>
      <button className="btn" id='next-page' onClick={() => getDocument()} >
        Load
      </button>
    </section>
  )
}

export default Options
