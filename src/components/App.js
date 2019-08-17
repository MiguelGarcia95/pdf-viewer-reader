import React from 'react';

const pdfjsLib = window.pdfjsLib

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      url: 'sample/sample.pdf',
      pdfDoc: null,
      pageNum: 1,
      pageCount: '',
      pageIsRendering: false,
      pageNumIsPending: null,
      scale: 1.5,
    }
    this.myCanvas = React.createRef();
  }

  getPdf = () => {console.log(this.myCanvas)}

  getDocument = () => {
    pdfjsLib.getDocument(this.state.url).promise.then(pdfDoc => {
      // console.log(pdfDoc);
      this.setState({
        pageCount: pdfDoc.numPages,
        pdfDoc: pdfDoc
      })
      this.renderPage(this.state.pageNum)
    })
  }

  renderPage = pageNum => {
    const canvas = document.getElementById('pdf-render')
    // page render true

    // get page
    this.state.pdfDoc.getPage(pageNum).then(page => {
      // set scale
      const viewport = page.getViewport({scale: this.state.scale})
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderCtx = {
        canvasContext: canvas.getContext('2d'),
        viewport: viewport
      }
      page.render(renderCtx).promise.then(() => {
        // page render false


      });
      console.log(page)
    })
  }

  render() {
    return (
      <div className="App">
        <section className="top-bar">
          <button className="btn" id='prev-page'>
            <i className='fas fa-arrow-circle-left'></i> Prev Page
          </button>
          <button className="btn" id='next-page' onClick={this.getDocument} >
            Next Page <i className='fas fa-arrow-circle-right'></i>
          </button>
          <span className="page-info">
            Page <span id="page-num">{this.state.pageNum}</span> of <span id="page-count">{this.state.pageCount}</span>
          </span>
        </section>
        <canvas ref={this.myCanvas} id="pdf-render"></canvas>
      </div>
    );
  }
}

export default App;
