import React from 'react';
import './BoyReviewPage.css';

function BoyReviewPage({ data, onAccept }) {

   const formatDate = (isoString) => {
    if (!isoString) return "Chưa chốt thời gian";
    
    const date = new Date(isoString);
    
    // Lấy ngày, tháng, năm (thêm số 0 đằng trước nếu nhỏ hơn 10)
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0 nên phải +1
    const year = date.getFullYear();

    // Lấy giờ, phút
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Ghép lại theo format bạn muốn
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  };

  return (
    <div className="boy-review fade-in">
      <div className="bill-paper">
         <h2>Có thư từ nàng nè...nhanh chóng phản hồi nàng nhé!</h2>
         <div className="bill-content">
            <div className="bill-row">
               <span>Thời gian nàng chọn:</span>
               <strong>{formatDate(data.date)}</strong>
            </div>
            
            <div className="bill-section">
               <h3>Món ăn:</h3>
               <ul>
                  {data.foods && data.foods.map((f, i) => <li key={i}>{f}</li>)}
               </ul>
            </div>

            <div className="bill-section">
               <h3>Điểm tâm:</h3>
               <ul>
                  {data.snacks && data.snacks.map((d, i) => <li key={i}>{d}</li>)}  
               </ul>
            </div>

            <div className="bill-section">
               <h3>Chilling:</h3>
               <ul>
                  {data.places && data.places.map((p, i) => <li key={i}>{p}</li>)}
               </ul>
            </div>
         </div>

         <button className="btn-accept" onClick={onAccept}>
            Chốt! Qua đón bé nào!!!
         </button>
      </div>
    </div>
  );
}

export default BoyReviewPage;