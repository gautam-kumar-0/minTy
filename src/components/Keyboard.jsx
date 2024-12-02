import React, { useState, useEffect } from 'react';

// Key Component
const Key = React.memo(({ keyName, isActive }) => {
  
  const style = {
    backgroundColor: isActive ? 'rgba(250,200,200,0.5)' : 'transparent',
    border: '1px solid black',
    padding: '10px 15px',
    margin: '5px',
    display: 'inline-block',
    borderRadius: '10px',
    transition: 'background-color 100ms ease-in'
  };
  
  return <div style={style}>{keyName}</div>;
});

// Parent Component
const Keyboard = () => {
  const [activeKey, setActiveKey] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      setActiveKey(e.key);
      setTimeout(() => setActiveKey(''), 100); // Reset after 500ms for feedback
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

  return (
    <div>
      {keys.map((key) => (
        <Key key={key} keyName={key} isActive={key === activeKey} />
      ))}
    </div>
  );
};

export default Keyboard;
