import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { saveUser } from '../redux/actions';
import { saveEmailLocalStorage } from '../services/LocalStorage';
import '../style/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(saveUser({ email, password }));
    saveEmailLocalStorage({ email });
    history.push('/meals');
  };

  useEffect(() => {
    const validateEmail = () => {
      const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      return regexEmail.test(email);
    };

    const validatePassword = () => {
      const minCharacters = 7;
      return password.length >= minCharacters;
    };
    if (validateEmail() && validatePassword()) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  return (
    <form action="">
      <div className="login-inputs">
        <label className="login-label" htmlFor="input__email">
          Email
          <input
            data-testid="email-input"
            type="text"
            name="email"
            id="input__email"
            placeholder="Email"
            className="login-input"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label className="login-label" htmlFor="input__password">
          Password
          <input
            data-testid="password-input"
            type="password"
            name="password"
            id="input__password"
            placeholder="Password"
            className="login-input"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        <button
          data-testid="login-submit-btn"
          type="button"
          onClick={ handleClick }
          disabled={ isDisabled }
          className="login-button"
        >
          Enter
        </button>
      </div>
    </form>
  );
}

export default Login;
