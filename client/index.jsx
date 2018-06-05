import React from 'react';
import ReactDOM from 'react-dom';

const axios = require('axios');

class BuyingModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
      </div>
    );
  }
}

ReactDOM.render(<BuyingModule />, document.getElementById('buying-module'));
