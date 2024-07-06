import './App.css';
import AutoSuggest from './components/AutoSuggest/AutoSuggest';
import { Provider } from 'react-redux';
import { store } from './shared/store';
import SavedStories from './components/SavedStories/SavedStories';

function App() {
  return (
    <Provider store={store}>
      <h1>Hacker News Explorer</h1>
      <AutoSuggest />
      <SavedStories />
    </Provider>
  );
}

export default App;
