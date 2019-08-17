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

    this.setState({pageNum: this.state.pageNum - 1});
    if (this.state.pageIsRendering) {
      this.setState({pageNumIsPending: false});
    } else {
      this.renderPage(this.state.pageNum);
    }
  }

  nextPage = () => {
    
    if (this.state.pageNum >= this.state.pageCount) return;

    this.setState({pageNum: this.state.pageNum + 1});
    if (this.state.pageIsRendering) {
      this.setState({pageNumIsPending: false});
    } else {
      this.renderPage(this.state.pageNum);
    }
  }

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
    this.setState({pageIsRendering: true});

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
        this.setState({pageIsRendering: false});

        if (this.state.pageNumIsPending !== null) {
          this.renderPage(this.state.pageNumIsPending);
          this.setState({pageNumIsPending: null});
        }


      });
      console.log(page)
    })
  }

  render() {
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
