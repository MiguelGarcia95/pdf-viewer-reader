import React from 'react';
import OnClickBtn from '../OnClickBtn';
import './style.css';

function Options({previousPage, nextPage, loadPdf, url, uploadPdf}) {
  // add go to page feature
  // update scale?
  // change colors?
  return (
    <section>
      <OnClickBtn onBtnClick={() => previousPage()} btnText='Prev Page' btnIcon='fas fa-chevron-circle-left' />
      <OnClickBtn onBtnClick={() => nextPage()} btnText='Next Page' btnIcon='fas fa-chevron-circle-right' />
      <OnClickBtn onBtnClick={() => console.log('save bookmark')} btnText='Bookmark' btnIcon='fas fa-bookmark' />
      <section className="uploadContainer btn">
        <input id='uploadedPdf' type='file' name='file' onChange={() => uploadPdf()} />
        <p> Upload PDF <i className="fas fa-file-upload"></i></p>
      </section>
      <OnClickBtn onBtnClick={() => loadPdf('sample/sample.pdf')} btnText='Load Sample PDF' btnIcon='fas fa-file-pdf' />
    </section>
  )
}

export default Options
