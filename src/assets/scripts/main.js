// import React from 'react';
// // import jsonp from 'jsonp';
// import { render } from 'react-dom';
// // import 'folhastyle/src/assets/style/forms.styl';
// import '../style/main.styl';
// import App from './app';

// render(<App />, document.getElementById('app'));


// REDUX
import store from './store/index';
import addArticle from './actions/index';

window.store = store;
window.addArticle = addArticle;
store.subscribe(() => console.log('Look ma, Redux!!'));

store.dispatch(addArticle({ title: 'React Redux Tutorial for Beginners', id: 1 }));
