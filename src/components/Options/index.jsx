import React from 'react';
import OnClickBtn from '../OnClickBtn';
import './style.css';

function Options({previousPage, nextPage, loadPdf, uploadPdf, onPageSubmit, zoomPage, scale}) {
  // change colors?
  return (
    <section className='options-bar'>
      <section className="container">
        <OnClickBtn className='btn sm' onBtnClick={() => zoomPage(scale + 0.1)} btnIcon='fas fa-search-plus' />
        <OnClickBtn className='btn sm' onBtnClick={() => zoomPage(1.5)} btnIcon='fas fa-search' />
        <OnClickBtn className='btn sm' onBtnClick={() => zoomPage(scale - 0.1)} btnIcon='fas fa-search-minus' />
        <OnClickBtn className='btn sm' onBtnClick={() => previousPage()} btnIcon='fas fa-chevron-circle-left' />
        <OnClickBtn className='btn sm' onBtnClick={() => nextPage()} btnIcon='fas fa-chevron-circle-right' />
        <OnClickBtn className='btn sm' onBtnClick={() => console.log('save bookmark')} btnIcon='fas fa-bookmark' />
        <section className="uploadContainer btn md">
          <input id='uploadedPdf' type='file' name='file' onChange={() => uploadPdf()} />
          <p> Upload <i className="fas fa-file-upload"></i></p>
        </section>
        <section className='btn btn-pg-search md'>
          <input placeholder='Go To Page' onKeyDown={onPageSubmit} />
        </section>
        <OnClickBtn className='btn md' onBtnClick={() => loadPdf('sample/sample.pdf')} btnText='Sample PDF' btnIcon='fas fa-file-pdf' />
        <OnClickBtn className='btn sm dark' onBtnClick={() => nextPage()} btnIcon='fa fas fa-palette' />
      </section>
    </section>
  )
}

export default Options
