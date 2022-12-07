import React from 'react';

function StartRecipeButton() {
  return (
    <button
      style={ {
        position: 'fixed',
        bottom: '0px',
      } }
      data-testid="start-recipe-btn"
      type="button"
    >
      Start Recipe

    </button>
  );
}

export default StartRecipeButton;
