import React from 'react';

export default function IconAdd() {
  return (
    <div
      style={{
        position: 'relative',
        width: '14px',
        height: '14px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '14px',
          height: '2px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#0D6EFF',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '2px',
          height: '14px',
          background: '#0D6EFF',
        }}
      ></div>
    </div>
  );
}
