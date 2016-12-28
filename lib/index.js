import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match } from 'react-router';
import App from './components/App';

const Root = () => {
  return(
    <BrowserRouter>
      <div>
        <Match exactly pattern='/public/' component={ App }/>
      </div>
    </BrowserRouter>
  )
}

render(<Root/>, document.querySelector('#app'))
