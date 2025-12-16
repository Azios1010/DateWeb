import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import cayThongNoel from './assets/Tree.png';
// Import các component con
import LandingPage from './components/LandingPage';
import GirlSelectionPage from './components/GirlSelectionPage';
import BoyReviewPage from './components/BoyReviewPage';
import SuccessPage from './components/SuccessPage';
import CoupleHeader from './components/CoupleHeader';

// Link API (nhớ đổi thành link Render của bạn nếu deploy)
//const API_URL = 'https://date-require-website.onrender.com/api/couple';

const API_URL = 'https://date-require-website.onrender.com/api/couple';

function App() {
  const [coupleId, setCoupleId] = useState(null);
  const [coupleData, setCoupleData] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- LOGIC 1: KHỞI TẠO & CHECK ID ---
  useEffect(() => {
    // 1. Tìm ID trên URL (ưu tiên)
    const params = new URLSearchParams(window.location.search);
    const urlId = params.get('id');
    
    // 2. Tìm ID trong bộ nhớ máy
    const localId = localStorage.getItem('my_couple_id');
    
    const finalId = urlId || localId;

    if (finalId) {
      setCoupleId(finalId);
      // Nếu ID đến từ URL (do bạn gái click), lưu lại vào máy luôn
      if (urlId) localStorage.setItem('my_couple_id', urlId);
      
      fetchData(finalId);

      // Tự động cập nhật 3 giây/lần (Polling)
      const interval = setInterval(() => fetchData(finalId), 3000);
      return () => clearInterval(interval);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!coupleId) {
      return;
    }
    const interval = setInterval(() => fetchData(coupleId), 2000);
    return () => clearInterval(interval);
  }, [coupleId]);

  // Hàm tải dữ liệu
  const fetchData = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      setCoupleData(prev => {
        if (JSON.stringify(prev) !== JSON.stringify(res.data)) {
          return res.data;
        }
        return prev;
      }
      );
    } catch (err) {
      console.error("Lỗi tải data", err);
      // Nếu lỗi (ví dụ ID sai), chỉ reset nếu đang loading lần đầu
      if (loading) {
         localStorage.removeItem('my_couple_id');
         setCoupleId(null);
      }
    } finally {
      setLoading(false);
    }
  };

  // --- LOGIC 2: CÁC HÀNH ĐỘNG ---

  // A. Bạn Nam tạo phòng
  const handleCreateLink = async (boyName, girlName) => {
    try {
      if (!boyName || !girlName) return alert("Nhập đủ tên 2 người nhé!");
      
      const res = await axios.post(`${API_URL}/create`, { boyName, girlName });
      const newId = res.data.linkId;
      
      // Quan trọng: Đánh dấu máy này là CHỦ PHÒNG (Nam)
      localStorage.setItem('is_owner', 'true');
      localStorage.setItem('my_couple_id', newId);
      
      setCoupleId(newId);
      fetchData(newId);
    } catch (err) {
      alert("Lỗi tạo phòng: " + err.message);
    }
  };

  // B. Bạn Nữ gửi món
  const handleGirlSubmit = async (data) => {
    await axios.post(`${API_URL}/submit`, { linkId: coupleId, ...data });
    fetchData(coupleId);
  };

  // C. Bạn Nam chốt đơn
  const handleBoyAccept = async () => {
    await axios.post(`${API_URL}/accept`, { linkId: coupleId });
    fetchData(coupleId);
  };

  // D. Nút thoát/làm lại
  const handleReset = () => {
    localStorage.removeItem('my_couple_id');
    localStorage.removeItem('is_owner');
    window.history.pushState({}, document.title, "/"); // Xóa ID trên URL
    window.location.reload();
  };


  // --- LOGIC 3: HIỂN THỊ GIAO DIỆN ---

  if (loading) return <div className="loading-screen">Đang kết nối trái tim...❤️</div>;

  // 1. Nếu chưa có Link -> Hiện Landing Page (Cho bạn Nam nhập tên)
  if (!coupleId) {
    return <LandingPage onCreateLink={handleCreateLink} />;
  }

  // 2. Nếu đã có Link -> Kiểm tra dữ liệu
  if (!coupleData) return <div className="loading-screen">Đang tải dữ liệu...</div>;

  // Kiểm tra xem ai đang xem (Nam hay Nữ?)
  const isOwner = localStorage.getItem('is_owner') === 'true';
  
  const showResetButton = coupleId && coupleData && (
    isOwner &&
    !(coupleData.status == 'sent' && isOwner)
  );
  // Tạo link để share: Domain hiện tại + /?id= + ID
  const shareLink = `${window.location.origin}/?id=${coupleId}`;

  return (
    <div className="app-container">
      {showResetButton && (
      <button className="btn-reset" onClick={handleReset}>🔄 Reset</button>
      )}
      
      <div className="snow"></div>
      <img src={cayThongNoel} className="corner-tree tree-left" alt="Tree Left"/>
      <img src={cayThongNoel} className="corner-tree tree-right" alt="Tree Right"/>
      
      <CoupleHeader boy={coupleData.boyName} girl={coupleData.girlName} />

      {/* --- TRƯỜNG HỢP 1: THÀNH CÔNG (Accepted) --- */}
      {coupleData.status === 'accepted' && (<SuccessPage isOwner={isOwner}/>)}

      {/* --- TRƯỜNG HỢP 2: BẠN NỮ ĐÃ GỬI (Sent) --- */}
      {coupleData.status === 'sent' && (
         isOwner ? (
            // Nam: Thấy đơn hàng -> Duyệt
            <BoyReviewPage data={coupleData.requestData} onAccept={handleBoyAccept} />
         ) : (
            // Nữ: Chờ Nam duyệt
            <div className="waiting-box fade-in">
               <h2>Đã gửi đến chàng rồi nhé!</h2>
               <p>Chờ anh {coupleData.boyName} chốt đơn nhé...</p>
               <div className="loader"></div>
            </div>
         )
      )}

      {/* --- TRƯỜNG HỢP 3: ĐANG CHỜ CHỌN MÓN (Waiting) --- */}
      {coupleData.status === 'waiting' && (
         isOwner ? (
            // NAM (Chủ phòng): Hiện giao diện chờ & Link share
            <div className="waiting-box fade-in">
               <h2>Phòng đã tạo thành công!</h2>
               <p>Hãy gửi link này cho {coupleData.girlName} để cô ấy chọn nhé!</p>
               
               <div className="link-box">{shareLink}</div>
               
               <button className="btn-copy" onClick={() => {
                  navigator.clipboard.writeText(shareLink);
                  alert("Đã copy link! Gửi cho nàng đi nào.");
               }}>
                  Copy Link Ngay
               </button>

               <div className="status-divider"></div>
               <p className="status-text">⏳ Đang chờ cô ấy chọn món...</p>
               <p className="sub-text">(Giao diện sẽ tự động đổi khi cô ấy bấm Gửi)</p>
               <div className="loader"></div>
            </div>
         ) : (
            // NỮ (Khách): Hiện giao diện chọn món
            <GirlSelectionPage 
               girlName={coupleData.girlName} 
               onFinish={handleGirlSubmit} 
            />
         )
      )}
    </div>
  );
}

export default App;