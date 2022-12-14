import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from '../style/RecipeDetails.module.css';

const copy = require('clipboard-copy');

function ShareButton() {
  const history = useHistory();
  const mealsOrDrinkId = useParams('/meals/:id');
  const { id } = mealsOrDrinkId;
  const [linkMsg, setLinkMsg] = useState('');
  const { location: { pathname } } = history;

  const handleButton = () => {
    if (pathname.includes('meal')) {
      setLinkMsg('Link copied!');
      copy(`http://localhost:3000/meals/${id}`);
    } else {
      setLinkMsg('Link copied!');
      copy(`http://localhost:3000/drinks/${id}`);
    }
  };
  return (
    <div>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ handleButton }
        className={ style.header_button }
      >
        <FontAwesomeIcon
          className={ style.header_button_image }
          icon={ solid('share-nodes') }
          size="3x"
        />
      </button>
      <div>{linkMsg}</div>
    </div>
  );
}

export default ShareButton;
