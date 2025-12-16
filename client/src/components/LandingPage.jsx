import React, { useState } from 'react';
import './LandingPage.css';
import cayThongNoel from '../assets/Tree.png';
function LandingPage({ onCreateLink }) {
  const [boyName, setBoyName] = useState("");
  const [girlName, setGirlName] = useState("");

  return (
    <div className="landing-container fade-in">
      {/* 1. Hiệu ứng tuyết (Nằm dưới cùng) */}
      <div className="snow"></div>
      <img src={cayThongNoel} className="corner-tree tree-left" alt="Tree Left"/>
      <img src={cayThongNoel} className="corner-tree tree-right" alt="Tree Right"/>

      {/* 2. Nội dung chính (Bọc trong div content để nổi lên trên tuyết) */}
      <div className="landing-page">
        <h1>Hãy tạo không gian dành riêng cho hai bạn</h1>
        <p>Nhập tên hai bạn để bắt đầu nhé</p>

        <input 
          placeholder="Tên bạn nam..." 
          value={boyName}
          onChange={e => setBoyName(e.target.value)}
        />
        <input 
          placeholder="Tên bạn nữ..." 
          value={girlName}
          onChange={e => setGirlName(e.target.value)}
        />
        <button 
          className="btn-create" 
          onClick={() => onCreateLink(boyName, girlName)}
        >
          Tạo Link Bí Mật
        </button>
      </div>
    </div>
  );
}

export default LandingPage;