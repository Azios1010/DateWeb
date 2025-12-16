import React from 'react';

function CoupleHeader({ boy, girl }) {
  return (
    <div className="couple-header">
       <div className="avatar-pill">
          <div className="avatar">♂️ <span className="name">{boy}</span></div>
          <div className="heart">❤️</div>
          <div className="avatar">♀️ <span className="name">{girl}</span></div>
       </div>
    </div>
  );
}

export default CoupleHeader;