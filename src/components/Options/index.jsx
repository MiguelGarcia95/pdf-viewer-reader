import React from 'react';
import OnClickBtn from '../OnClickBtn';
import './style.css';

function Options({previousPage, nextPage, loadPdf, url, uploadPdf}) {
  // add go to page feature
  // update scale?
  // change colors?
  return (
    <section>
      <OnClickBtn className='btn sm' onBtnClick={() => previousPage()} btnText='' btnIcon='fas fa-lg fa-chevron-circle-left' />
      <OnClickBtn className='btn sm' onBtnClick={() => nextPage()} btnText='' btnIcon='fas fa-lg fa-chevron-circle-right' />
      <OnClickBtn className='btn' onBtnClick={() => console.log('save bookmark')} btnText='Bookmark' btnIcon='fas fa-bookmark' />
      <section className="uploadContainer btn">
        <input id='uploadedPdf' type='file' name='file' onChange={() => uploadPdf()} />
        <p> Upload PDF <i className="fas fa-file-upload"></i></p>
      </section>
      <OnClickBtn className='btn' onBtnClick={() => loadPdf('sample/sample.pdf')} btnText='Load Sample PDF' btnIcon='fas fa-file-pdf' />
    </section>
  )
}

export default Options
