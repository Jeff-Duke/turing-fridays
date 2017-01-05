require('./styles/main');
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match } from 'react-router';
import App from './components/App';

const Root = () => {
  return(
    <BrowserRouter>
      <section>
        <Match exactly pattern='/' component={ App }/>
      </section>
    </BrowserRouter>
  )
}

render(<Root/>, document.getElementById('app'));
