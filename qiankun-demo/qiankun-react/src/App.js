import { BrowserRouter, Route, Link } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <BrowserRouter basename="/react">
      <div>
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
      </div>
      <Route path="/" exact render={() => (<h1>react-首页</h1>)} />
      <Route path="/about" exact render={() => (<h1>react-关于</h1>)} />
    </BrowserRouter>
  );
}

export default App;
