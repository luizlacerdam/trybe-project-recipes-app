import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { saveUser } from '../redux/actions';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    const { dispatch } = props;
    dispatch(saveUser({ email, password }));
  };

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
        >
          login
        </button>
      </form>
    </div>
  );
}
Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
