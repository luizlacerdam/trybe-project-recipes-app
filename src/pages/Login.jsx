import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { saveUser } from '../redux/actions';
import { saveEmailLocalStorage } from '../services/LocalStorage';

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
    <div>
      <form action="">
        <label htmlFor="input__email">
          <input
            data-testid="email-input"
            type="text"
            name="email"
            id="input__email"
            placeholder="Email"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="input__password">
          <input
            data-testid="password-input"
            type="password"
            name="password"
            id="input__password"
            placeholder="password"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        <button
          data-testid="login-submit-btn"
          type="button"
          onClick={ handleClick }
          disabled={ isDisabled }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
