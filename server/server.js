// File: server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Cho phép React gọi vào
app.use(express.json());

const mongoURI = process.env.MONGODB_URI;
if(!mongoURI) {
    console.error('❌ MONGODB_URI không được định nghĩa trong .env');
    process.exit(1);
}

// Kết nối MongoDB
mongoose.connect(mongoURI || 'mongodb://localhost:27017/')
  .then(() => console.log('✅ Đã kết nối MongoDB!'))
  .catch(err => console.error('❌ Lỗi DB:', err));

// Schema Database
const DateSchema = new mongoose.Schema({
    partnerResponse: String,
    date: String,
    foodChoices: [String],
    snackChoices: [String],
    placeChoices: [String],
    dateCreated: { type: Date, default: Date.now }
});
const DateModel = mongoose.model('DateInvite', DateSchema);

// API nhận dữ liệu
app.post('/api/submit', async (req, res) => {
    try {
        const { response, date, foods, snacks, places } = req.body;
        const newDate = new DateModel({
            partnerResponse: response,
            date,
            foodChoices: foods,
            snackChoices: snacks,
            placeChoices: places
        });
        await newDate.save();
        console.log("💌 Có đơn mới:", { date, foods, snacks, places });
        res.status(200).json({ message: "Thành công" });
    } catch (error) {
        res.status(500).json({ error });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});