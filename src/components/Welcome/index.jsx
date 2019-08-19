import React from 'react';
import './style.css';

function Options({uploadPdf, pdfDoc, loadPdf}) {
  return (
    <section className={`welcome ${pdfDoc ? 'open' : 'close'}`}>
      <section className="welcome-btn upload">
        <input id='uploadedPdf' type='file' name='file' onChange={() => uploadPdf()} />
        <p> Upload <i className="fas fa-file-upload"></i></p>
      </section>
      <section className='welcome-btn load' >
        <p onClick={() => loadPdf('sample/sample.pdf')} >Load Sample PDF</p>
      </section>
    </section>
  )
}

export default Options
