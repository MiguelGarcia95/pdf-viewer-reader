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

  previousPage = () => {
    if (this.state.pageNum <= 1) return;
    let {pageNum} = this.state;
    pageNum--;

    this.setState({pageNum: pageNum});
    if (this.state.pageIsRendering) {
      this.setState({pageNumIsPending: false});
    } else {
      this.renderPage(pageNum);
    }
  }

  nextPage = () => {    
    if (this.state.pageNum >= this.state.pageCount) return;
    let {pageNum} = this.state;
    pageNum++;
    this.setState({pageNum: pageNum});
    if (this.state.pageIsRendering) {
      this.setState({pageNumIsPending: false});
    } else {
      this.renderPage(pageNum);
    }
  }

  getDocument = async () => {
    try {
      const pdfDoc = await pdfjsLib.getDocument(this.state.url).promise;
      this.setState({
        pageCount: pdfDoc.numPages,
        pdfDoc: pdfDoc
      })
      this.renderPage(this.state.pageNum)
    } catch (error) {
      console.log(error);
    }
  }

  renderPage = async pageNum => {
    const canvas = document.getElementById('pdf-render');
    this.setState({pageIsRendering: true});

    try {
      const page = await this.state.pdfDoc.getPage(pageNum);
      // set scale
      const viewport = page.getViewport({scale: this.state.scale})
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderCtx = {
        canvasContext: canvas.getContext('2d'),
        viewport: viewport
      }
      
      await page.render(renderCtx).promise
      // page render false
      this.setState({pageIsRendering: false});
      if (this.state.pageNumIsPending !== null) {
        this.renderPage(this.state.pageNumIsPending);
        this.setState({pageNumIsPending: null});
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    console.log(this.state.pageNumIsPending);
    return (
      <div className="App">
        <section className="top-bar">
          <button className="btn" id='prev-page' onClick={this.previousPage} >
            <i className='fas fa-arrow-circle-left'></i> Prev Page
          </button>
          <button className="btn" id='next-page' onClick={this.getDocument} >
            Load
          </button>
          <button className="btn" id='next-page' onClick={this.nextPage} >
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
