import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../shared/store';
import { UserInfoActions, selectUsername } from '../../shared/store/user-info';
import { HackerNewsActions } from '../../shared/store/hacker-news';
import './Login.css';

const Login = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const username = useSelector(selectUsername);

  const onLogin = () => {
    if (!inputRef.current?.value) return;

    const username = inputRef.current.value;
    dispatch(UserInfoActions.setUsername(username));
  };

  const onLogout = () => {
    dispatch(UserInfoActions.clearUsername());
    dispatch(HackerNewsActions.clearSavedStories());
  };

  return username ? (
    <section className='welcome-container'>
      <p>Welcome {username}</p>
      <button className='logout-button' onClick={onLogout}>
        Logout
      </button>
    </section>
  ) : (
    <section className='login-container'>
      <article className='login-input-wrapper'>
        <input type='text' placeholder='Your name' ref={inputRef} />
        <button onClick={onLogin}>Login</button>
      </article>
      <p className='info'>*Login to persist your saved stories</p>
    </section>
  );
};

export default Login;
