const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// 1. Cấu hình
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000; // Render thường dùng port 10000, nhưng để 3000 local vẫn ok

// 2. Middleware
// Cấu hình CORS mở rộng để tránh lỗi khi deploy lên Render/Vercel
app.use(cors({
    origin: '*', // Cho phép tất cả các tên miền truy cập (hoặc bạn thay bằng link Vercel của bạn)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

// 3. Kết nối MongoDB
const mongoURI = process.env.MONGODB_URI;
if(!mongoURI) {
    console.error('❌ MONGODB_URI không được định nghĩa trong .env');
    // Không exit process để server vẫn chạy, chỉ báo lỗi thôi
} else {
    mongoose.connect(mongoURI)
      .then(() => console.log('✅ Đã kết nối MongoDB Atlas!'))
      .catch(err => console.error('❌ Lỗi kết nối DB:', err));
}

// 4. Định tuyến (Routes)
// Gọi file logic xử lý Couple mà chúng ta đã tách ra
// LƯU Ý: Bạn phải chắc chắn đã tạo file routes/couple.js như hướng dẫn trước
const coupleRoutes = require('./routes/couple'); 

// Mọi API bắt đầu bằng /api/couple sẽ được xử lý ở file routes/couple.js
app.use('/api/couple', coupleRoutes);


// 5. Route kiểm tra server sống hay chết (Health check)
app.get('/', (req, res) => {
    res.send("🚀 Server Dating App đang chạy ngon lành!");
});

// 6. Khởi động Server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});