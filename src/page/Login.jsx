import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { saveUser } from '../redux/actions';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const handleClick = () => {
    const { dispatch } = props;
    dispatch(saveUser({ email, password }));
  };

  const validateEmail = () => {
    const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regexEmail.test(email);
  };

  const validatePassword = () => {
    const minCharacters = 7;
    return password.length >= minCharacters;
  };

  useEffect(() => {
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
Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
