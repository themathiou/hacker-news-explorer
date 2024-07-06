import { Fragment } from 'react';
import './App.css';
import AutoSuggest from './components/AutoSuggest';

function App() {
  return (
    <Fragment>
      <h1>Hacker News Explorer</h1>
      <AutoSuggest />
    </Fragment>
  );
}

export default App;
