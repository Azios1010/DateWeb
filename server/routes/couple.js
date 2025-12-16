const express = require('express');
const router = express.Router();
const Couple = require('../models/Couple');
const { v4: uuidv4 } = require('uuid');

// 1. TẠO LINK MỚI (Landing Page)
router.post('/create', async (req, res) => {
  try {
    const { boyName, girlName } = req.body;
    const linkId = uuidv4(); // Tạo mã ngẫu nhiên (VD: 8a2b-4c...)

    const newCouple = new Couple({
      linkId,
      boyName,
      girlName,
      status: 'waiting'
    });

    await newCouple.save();
    res.json({ success: true, linkId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. LẤY DỮ LIỆU (Khi vào web)
router.get('/:id', async (req, res) => {
  try {
    const couple = await Couple.findOne({ linkId: req.params.id });
    if (!couple) return res.status(404).json({ message: "Không tìm thấy cặp đôi" });
    res.json(couple);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. NỮ GỬI YÊU CẦU (GirlSelectionPage)
router.post('/submit', async (req, res) => {
  try {
    const { linkId, date, foods, snacks, places } = req.body;

    const couple = await Couple.findOne({ linkId });
    if (!couple) return res.status(404).json({ message: "Lỗi ID" });

    // Lưu dữ liệu
    couple.requestData = { date, foods, snacks, places };
    couple.status = 'sent'; // Chuyển trạng thái

    await couple.save();
    res.json({ success: true, message: "Gửi thành công!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. NAM CHỐT ĐƠN (BoyReviewPage)
router.post('/accept', async (req, res) => {
  try {
    const { linkId } = req.body;
    
    const couple = await Couple.findOne({ linkId });
    if (!couple) return res.status(404).json({ message: "Lỗi ID" });

    couple.status = 'accepted'; // Chốt đơn

    await couple.save();
    res.json({ success: true, message: "Đã chốt đơn!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;