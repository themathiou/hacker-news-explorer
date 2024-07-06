import { useEffect } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import AutoSuggest from './components/AutoSuggest/AutoSuggest';
import SavedStories from './components/SavedStories/SavedStories';
import { store } from './shared/store';
import { HackerNewsActions } from './shared/store/hacker-news';
import { UserInfoActions } from './shared/store/user-info';
import Login from './components/Login/Login';

function App() {
  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      store.dispatch(UserInfoActions.setUsername(username));
    }

    const savedStories = localStorage.getItem('savedStories');
    if (savedStories) {
      store.dispatch(HackerNewsActions.setSavedStories(JSON.parse(savedStories)));
    }

    return () => {
      const username = localStorage.getItem('username');
      if (!username) {
        store.dispatch(UserInfoActions.clearUsername());
        store.dispatch(HackerNewsActions.clearSavedStories());
      }
    };
  }, []);

  return (
    <Provider store={store}>
      <h1>Hacker News Explorer</h1>
      <Login />
      <AutoSuggest />
      <SavedStories />
    </Provider>
  );
}

export default App;
