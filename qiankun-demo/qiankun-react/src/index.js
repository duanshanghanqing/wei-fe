import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// 改造子应用
function render(props) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// 独立运行应用
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}
export const bootstrap = async (props) => { }
export const mount = async (props) => {
    console.log(props)
    render(props)
}
export const unmount = async (props) => {
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
}