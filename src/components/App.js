import React from 'react';
import Options from './Options';

const pdfjsLib = window.pdfjsLib

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      url: '',
      pdfDoc: null,
      pageNum: 1,
      pageCount: '',
      pageIsRendering: false,
      pageNumIsPending: null,
      scale: 1.5,
      error: '',
    }
  }

  previousPage = () => {
    let {pageNum} = this.state;
    if (pageNum <= 1) return;
    pageNum--;

    this.setState({pageNum});
    if (this.state.pageIsRendering) {
      this.setState({pageNumIsPending: false});
    } else {
      this.renderPage(pageNum);
    }
  }

  nextPage = () => {    
    let {pageNum} = this.state;
    if (pageNum >= this.state.pageCount) return;
    pageNum++;

    this.setState({pageNum});
    if (this.state.pageIsRendering) {
      this.setState({pageNumIsPending: false});
    } else {
      this.renderPage(pageNum);
    }
  }

  loadPdf = async (url) => {
    try {
      const pdfDoc = await pdfjsLib.getDocument(url).promise;
      this.setState({
        pageCount: pdfDoc.numPages,
        pdfDoc: pdfDoc
      })
      this.renderPage(this.state.pageNum)
    } catch (error) {
      this.setState({error})
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

  uploadPdf = () => {
    const file = document.getElementById('uploadedPdf').files[0]
    const url = URL.createObjectURL(file);
    this.setState({url});
    this.loadPdf(url);
  }

  render() {
    // add go to page feature
    // add bookmark option
    // make it pwa
    // update scale?
    // change colors?
    return (
      <div className="App">
        <Options previousPage={this.previousPage} nextPage={this.nextPage} loadPdf={this.loadPdf} url={this.state.url} uploadPdf={this.uploadPdf} />
        {this.state.pageIsRendering && <h2>Loading</h2>}
        <section className="pages">
          Page <span id="page-num">{this.state.pageNum}</span> of <span id="page-count">{this.state.pageCount}</span>
        </section>
        <canvas id="pdf-render"></canvas>
      </div>
    );
  }
}

export default App;
