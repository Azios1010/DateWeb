const mongoose = require('mongoose');

const CoupleSchema = new mongoose.Schema({
  // Mã định danh (Link bí mật)
  linkId: { type: String, required: true, unique: true },
  
  // Thông tin 2 người
  boyName: { type: String, required: true },
  girlName: { type: String, required: true },

  // Trạng thái: 'waiting' (chưa chọn) -> 'sent' (nữ đã gửi) -> 'accepted' (nam đã chốt)
  status: { type: String, default: 'waiting' },

  // Dữ liệu đơn hàng tình yêu
  requestData: {
    date: String,
    foods: [String],  // Danh sách món ăn
    snacks: [String], // Danh sách trà sữa/ăn vặt
    places: [String], // Địa điểm
    message: String
  },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Couple', CoupleSchema);