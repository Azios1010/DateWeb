import React from 'react';
import Confetti from 'react-confetti';
import './SuccessPage.css'; 



function SuccessPage({isOwner}) {
  const boyContent = {
    title: "Đã chốt deal thành công!",
    message: "Hãy chuẩn bị kỹ càng và tinh thần để đón công chúa nhé!",
    subMessage: "Nhớ đến sớm trước 15 phút, đừng để nàng chờ lâu nhóa!!!",
    gif:"https://media.giphy.com/media/T86i6yDyOYz7J6dPhf/giphy.gif" 
  };

  const girlContent = {
    title: "Chàng đã chốt deal rồi nha!",
    message: "Cảm ơn vì đã là người yêu của anh!",
    subMessage: "Công chúa sẽ là nhân vật chính nên anh xin phép đợi công chúa dưới nhà 15 phút a!!!",
    gif:"https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjNyYm94cTJ3bjZwbWd4cXl4ZHI2ZDRmaWcwMm50ZjZjbmNqYndseCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tttyCscPfpb9EYVwHb/giphy.gif" 
  };

  const content = isOwner ? boyContent : girlContent;

return (
    <div className="success-page fade-in">
       {/* Pháo giấy bắn tung tóe */}
       <Confetti recycle={true} numberOfPieces={400} gravity={0.2} />
       
       <div className="success-content animate-pop">
        
          <h1 style={{color: isOwner ? '#570d12ff' : '#ff4b4b', marginTop: '20px'}}>
            {content.title}
          </h1>

          {/* Ảnh GIF khác nhau */}
          <img src={content.gif} alt="happy" style={{borderRadius: '15px', maxWidth: '100%', boxShadow: '0 5px 15px rgba(0,0,0,0.2)'}} />
          
          {/* Lời nhắn khác nhau */}
          <p style={{fontSize: '18px', fontWeight: 'bold', margin: '15px 0', color: '#333'}}>
            {content.message}
          </p>
          
          <p style={{fontSize: '14px', color: '#666', fontStyle: 'italic'}}>
             {content.subMessage} ❤️
          </p>
       </div>
    </div>
  );
}

export default SuccessPage;