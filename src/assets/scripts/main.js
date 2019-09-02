import React from 'react';
import { render } from 'react-dom';
import '../style/main.styl';
import App from './app';
import '../../../reactotron-config';

render(<App />, document.getElementById('app'));
