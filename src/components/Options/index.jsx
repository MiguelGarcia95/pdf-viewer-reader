import React from 'react'
import './style.css';

function Options({previousPage, nextPage, loadPdf, url, uploadPdf}) {
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
      <button className='btn' id='bookmark'>
        Bookmark <i className="fas fa-bookmark"></i>
      </button>
      <section className="uploadContainer btn">
        <input id='uploadedPdf' type='file' name='file' onChange={() => uploadPdf()} />
        <p> Upload PDF <i className="fas fa-file-upload"></i></p>
      </section>
      {url && (
        <button className="btn" id='next-page' onClick={() => loadPdf()} >
          Load <i className='fas fas fa-hdd'></i>
        </button>
      )}
      <button className="btn" id='next-page' onClick={() => loadPdf('sample/sample.pdf')} >
        Load Sample PDF <i className='fas fas fa-file-pdf'></i>
      </button>
    </section>
  )
}

export default Options
