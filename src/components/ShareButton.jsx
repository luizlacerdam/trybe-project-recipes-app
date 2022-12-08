import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton() {
  const history = useHistory();
  const [linkMsg, setLinkMsg] = useState('');
  const { location: { pathname } } = history;

  const handleButton = () => {
    setLinkMsg('Link copied!');
    copy(`http://localhost:3000${pathname}`);
  };
  return (
    <div>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ handleButton }
      >
        <img src={ shareIcon } alt="share-icon" />

      </button>
      <div>{linkMsg}</div>
    </div>
  );
}

export default ShareButton;
