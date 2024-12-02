import React from 'react';

function Key({ keyVal, bigKey, disabled, handleKeyPress }) {
  const keyClass = bigKey ? 'key big' : 'key';

  return (
    <button 
      className={keyClass}
      onClick={() => handleKeyPress(keyVal)} 
      disabled={disabled}
    >
      {keyVal}
    </button>
  );
}

export default Key;
