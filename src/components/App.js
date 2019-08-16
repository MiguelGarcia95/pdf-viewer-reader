import React from 'react';

function App() {
  return (
    <div className="App">
      <section className="top-bar">
      <button className="btn" id='prev-page'>
        <i className='fas fa-arrow-circle-left'></i> Prev Page
      </button>
      <button className="btn" id='next-page'>
        Next Page <i className='fas fa-arrow-circle-right'></i>
      </button>
      <span className="page-info">
        Page <span id="page-num"></span> of <span id="page-count"></span>
      </span>
    </section>
    <canvas id="pdf-render"></canvas>
    </div>
  );
}

export default App;
