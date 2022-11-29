import React from 'react';

function Login() {
  return (
    <div>
      <form action="">
        <label htmlFor="input__email">
          <input
            data-testid="email-input"
            type="text"
            name="email"
            id="input__email"
          />
        </label>
      </form>
    </div>
  );
}

export default Login;
