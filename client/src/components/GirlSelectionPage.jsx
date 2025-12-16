import { useState, useEffect } from 'react';

// Đảm bảo đường dẫn ảnh đúng với cấu trúc thư mục của bạn
import cayThongNoel from '../assets/Tree.png'; 
import musicFile from '../assets/MerryChristmasSong.mp3';

// SỬA LỖI 1: Nhận props { girlName, onFinish }
function GirlSelectionPage({ girlName, onFinish }) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('');
  
  // Các state lưu trữ lựa chọn
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [selectedSnacks, setSelectedSnacks] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  
  // Các state custom (nhập tay)
  const [customFood, setCustomFood] = useState('');
  const [customSnack, setCustomSnack] = useState('');
  const [customPlace, setCustomPlace] = useState('');

  // SỬA LỖI 2: Logic Audio sạch sẽ hơn
  const [audio] = useState(new Audio(musicFile));

  useEffect(() => {
    audio.loop = true;
    audio.volume = 0.5;
    
    // Thử phát nhạc
    const audioPromise = audio.play();
    if (audioPromise !== undefined) {
      audioPromise.catch(err => {
        console.log("⚠️ Chờ người dùng tương tác mới phát nhạc");
      }); 
    }

    // Cleanup: Dừng nhạc khi component bị hủy
    return () => {  
      audio.pause();
    };
  }, []); // Chỉ chạy 1 lần


  const handleStart = () => {
    setStep(2);
    // Khi bấm nút, chắc chắn nhạc sẽ phát
    if(audio.paused) {
      audio.play();
    }
  };

  // --- DỮ LIỆU ---
  const foods = [
    { name: 'Fine Dining', image: 'https://lasinfoniavietnam.com/wp-content/uploads/2025/04/Fine-dining-4.jpg' },
    { name: 'Jollibee', image: 'https://upload.urbox.vn/strapi/Jollibee_003_b6c3642178.jpg' },
    { name: 'Sushi', image: 'https://lavenderstudio.com.vn/wp-content/uploads/2017/03/chup-san-pham.jpg' },
    { name: 'Cơm Tấm', image: 'https://sakos.vn/wp-content/uploads/2024/10/bia-4.jpg' },
    { name: 'Mỳ Cay', image: 'https://cdn.tgdd.vn/Files/2019/09/24/1201263/2-cach-nau-mi-cay-hai-san-chuan-cong-thuc-han-quoc-202112301425006195.jpg'},
    { name: 'Dookki', image: 'https://latravel.com.vn/wp-content/uploads/2025/01/3-60.png'},
    { name: 'Steak', image: 'https://vegconomist.com/wp-content/uploads/sites/3/Ohayo-Valley.jpg'},
    { name: 'Pizza', image: 'https://pizzahut.vn/_next/image?url=https%3A%2F%2Fcdn.pizzahut.vn%2Fimages%2FWeb_V3%2FProducts_MenuTool%2FPesto%20H%E1%BA%A3i%20S%E1%BA%A3n._20250317172201GL5.webp&w=1170&q=75'}
  ];

  const snacks = [
    { name: 'Trà Sữa', image: 'https://file.hstatic.net/1000135323/file/tra_sua_ngon_0e87236e4d7442fb826c502798ec6f7e_1024x1024.jpg' },
    { name: 'Matcha Latte', image: 'https://lypham.vn/wp-content/uploads/2024/10/cach-pha-matcha-latte-nong.jpg'},
    { name: 'Kem', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Ice_cream_with_whipped_cream%2C_chocolate_syrup%2C_and_a_wafer_%28cropped%29.jpg/250px-Ice_cream_with_whipped_cream%2C_chocolate_syrup%2C_and_a_wafer_%28cropped%29.jpg' },
    { name: 'Croissant', image: 'https://i.ex-cdn.com/vntravellive.com/files/maidp/2024/03/15/1857-cach-thuong-thuc-banh-sung-bo-croissant-cua-nguoi-phap-net-tinh-te-trong-van-hoa-am-thuc-171807.jpg'},
    { name: 'Pastry', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTJrpFR3x--_DIY1u98WRrJWRZqvxvlUuHfw&s'},
    { name: 'Affogato', image: 'https://simexcodl.com.vn/wp-content/uploads/2024/07/affogato-la-gi-3.jpg'},
    { name: 'Cafe', image: 'https://premier-village-danang.com/wp-content/uploads/sites/48/2025/06/La%E2%80%99s-Cafe.jpg' },
    { name: 'Panna Cotta', image: 'https://www.recipetineats.com/tachyon/2025/09/Panna-cotta_8-close-up.jpg'}
  ];

  const places = [
    { name: 'Xem Phim', image: 'https://media.timeout.com/images/105819546/image.jpg' },
    { name: 'Công Viên', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Halleyparknovember_b.jpg/1200px-Halleyparknovember_b.jpg' },
    { name: 'Bowling', image: 'https://torq03.com/wp-content/uploads/2024/11/PowerClip-Rectangle-2.webp' },
    { name: 'Dạo Phố', image: 'https://media.istockphoto.com/id/1435326326/photo/young-couple-walking-through-the-city-in-stockholm.jpg?s=612x612&w=0&k=20&c=GlvWlTo8BWDSxJG9ZRx8DPqiSguSFoNEHu6Zc4pE4b8=' },
    { name: 'Bi A', image: 'https://thegioibida.net/wp-content/uploads/2023/01/luat-choi-bida-lo.jpg'},
    { name: 'Thủy Cung', image: 'https://asset.japan.travel/image/upload/v1648108505/okinawa/H_00376_001.jpg'},
    { name: 'Bảo Tàng', image: 'https://nld.mediacdn.vn/291774122806476800/2023/5/11/3433181592007833794482663525031341058830058n-16837797531331415615886.jpg'},
    { name: 'Láo Loạn Hồ Gươm', image: 'https://nld.mediacdn.vn/thumb_w/640/291774122806476800/2025/8/10/33-1754797751999434454712.jpg'},
    { name: 'Ôn Thi cùng SV FTU', image: 'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/hoc_phi_dai_hoc_ngoai_thuong_2025_39bbf2e01a.jpg'},
    { name: 'Giải Tích cùng SV HUST', image: 'https://i.pinimg.com/736x/2d/53/27/2d53279fa89505884625227905b490a3.jpg'},
    { name: 'Chill cùng SV NEU', image: 'https://media-efl.neu.edu.vn/uploads/2025/10/04/0c94748c-5c13-4671-ae06-fb7646e7c1a9-1759545233.jpg'},
    { name: 'Đi dạy cùng SV HNUE', image: 'https://vcdn1-vnexpress.vnecdn.net/2024/01/27/HNUE-jpeg-2094-1706327030.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=54vZnPKYcJpDZI-hGK9dqw'}
  ];

  // Hàm chọn/bỏ chọn
  const toggleItem = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  // Hàm thêm món tùy chọn
  const handleAddCustomItem = (customItem, setCustomItem, selectedItems, setSelectedItems) => {
    if (customItem.trim() && !selectedItems.includes(customItem.trim())) {
      setSelectedItems([...selectedItems, customItem.trim()]);
    }
    setCustomItem('');
  };

  // SỬA LỖI 3: Gọi hàm onFinish từ props để gửi dữ liệu ra App.jsx
  const handleFinish = () => {
    if (onFinish) {
        onFinish({
            date: date || "Chưa chọn ngày",
            foods: selectedFoods,
            snacks: selectedSnacks,
            places: selectedPlaces
        });
        setStep(7);
    } else {
        alert("Lỗi: Không tìm thấy hàm gửi dữ liệu!");
    }
  };

  return (
    <>
      {/* Hiệu ứng tuyết và cây thông */}
      <div className="snow"></div>
      <img src={cayThongNoel} className="corner-tree tree-left" alt="Tree Left"/>
      <img src={cayThongNoel} className="corner-tree tree-right" alt="Tree Right"/>

      <div className="container">
        <img src="https://media2.giphy.com/media/3o6wrbKc0dpygGk9fW/giphy.gif" className="main-gif" alt="Cute Gif" />
        
        {/* Step 1: Lời mời */}
        {step === 1 && (
          <div className="fade-in">
            {/* Hiện tên bạn gái ở đây */}
            <h1>Chào {girlName || "Công chúa"}, em đã sẵn sàng cho một ngày hoàn hảo chưa nè!</h1>
            <button className="btn-yes" onClick={handleStart}>Rồi nha</button>
            <button onClick={() => alert("Bao giờ em bán được 1 tỷ gói mè thì mới được từ chối anh <3")}>K Ó</button>
          </div>
        )}

        {/* Step 2: Chọn thời gian */}
        {step === 2 && (
          <div className="fade-in">
            <h1>Công chúa muốn đi lúc nào vậy!!!</h1>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ padding: '20px', margin: '30px', fontSize: '18px', borderRadius: '10px' }}
            />
            <br />
            <button className="btn-back" onClick={() => setStep(1)}>Quay lại</button>
            <button className="btn-yes" onClick={() => setStep(3)} disabled={!date}>Tiếp theo</button>
          </div>
        )}

        {/* Step 3: Chọn món ăn */}
        {step === 3 && (
          <div className="fade-in">
            <h1>Mời công chúa chọn món</h1>
            <div className="custom-add">
              <input
                type="text"
                value={customFood}
                onChange={(e) => setCustomFood(e.target.value)}
                placeholder="Thêm món khác..."
                className="custom-input"
              />
              <button onClick={() => handleAddCustomItem(customFood, setCustomFood, selectedFoods, setSelectedFoods)} className="custom-button">Thêm</button>
            </div>
            <div className="grid">
              {foods.map(m => (
                <div key={m.name} className={`item ${selectedFoods.includes(m.name) ? 'active' : ''}`} onClick={() => toggleItem(m.name, selectedFoods, setSelectedFoods)}>
                  <img src={m.image} alt={m.name} className="item-image" />
                  <div>{m.name}</div>
                </div>
              ))}
            </div>
            <p><strong>Đã chọn:</strong> {selectedFoods.join(', ') || 'Chưa có gì'}</p>
            <button className="btn-back" onClick={() => setStep(2)}>Quay lại</button>
            <button className="btn-yes" onClick={() => setStep(4)} disabled={selectedFoods.length === 0}>Tiếp theo</button>
          </div>
        )}

        {/* Step 4: Chọn đồ ăn vặt */}
        {step === 4 && (
          <div className="fade-in">
            <h1>Một chút nhẹ nhàng...</h1>
            <div className="custom-add">
              <input
                type="text"
                value={customSnack}
                onChange={(e) => setCustomSnack(e.target.value)}
                placeholder="Thêm món khác..."
                className="custom-input"
              />
              <button onClick={() => handleAddCustomItem(customSnack, setCustomSnack, selectedSnacks, setSelectedSnacks)} className="custom-button">Thêm</button>
            </div>
            <div className="grid">
              {snacks.map(m => (
                <div key={m.name} className={`item ${selectedSnacks.includes(m.name) ? 'active' : ''}`} onClick={() => toggleItem(m.name, selectedSnacks, setSelectedSnacks)}>
                  <img src={m.image} alt={m.name} className="item-image" />
                  <div>{m.name}</div>
                </div>
              ))}
            </div>
            <p><strong>Đã chọn:</strong> {selectedSnacks.join(', ') || 'Chưa có gì'}</p>
            <button className="btn-back" onClick={() => setStep(3)}>Quay lại</button>
            <button className="btn-yes" onClick={() => setStep(5)} disabled={selectedSnacks.length === 0}>Tiếp theo</button>
          </div>
        )}

        {/* Step 5: Chọn địa điểm */}
        {step === 5 && (
          <div className="fade-in">
            <h1>Công chúa muốn đi tiếp đâu ạ...</h1>
            <div className="custom-add">
              <input
                type="text"
                value={customPlace}
                onChange={(e) => setCustomPlace(e.target.value)}
                placeholder="Thêm chỗ khác..."
                className="custom-input"
              />
              <button onClick={() => handleAddCustomItem(customPlace, setCustomPlace, selectedPlaces, setSelectedPlaces)} className="custom-button">Thêm</button>
            </div>
            <div className="grid">
              {places.map(m => (
                <div key={m.name} className={`item ${selectedPlaces.includes(m.name) ? 'active' : ''}`} onClick={() => toggleItem(m.name, selectedPlaces, setSelectedPlaces)}>
                  <img src={m.image} alt={m.name} className="item-image" />
                  <div>{m.name}</div>
                </div>
              ))}
            </div>
            <p><strong>Đã chọn:</strong> {selectedPlaces.join(', ') || 'Chưa có gì'}</p>
            <button className="btn-back" onClick={() => setStep(4)}>Quay lại</button>
            <button className="btn-yes" onClick={() => setStep(6)} disabled={selectedPlaces.length === 0}>Tiếp theo</button>
          </div>
        )}

        {/* Step 6: Xem lại */}
        {step === 6 && (
          <div className="fade-in">
            <h1>Đơn hàng của công chúa, anh sẽ có mặt trước 15 phút nha</h1>
            <div className="review-section">
              <p><strong>Thời gian:</strong> {date ? new Date(date).toLocaleString('vi-VN') : 'Chưa chọn'}</p>
              <p><strong>Món chính:</strong> {selectedFoods.join(', ') || 'Không ăn'}</p>
              <p><strong>Điểm tâm:</strong> {selectedSnacks.join(', ') || 'Không ăn'}</p>
              <p><strong>Giải trí:</strong> {selectedPlaces.join(', ') || 'Ở nhà'}</p>
            </div>
            
            <button className="btn-back" onClick={() => setStep(5)}>Quay lại</button>
            <button className="btn-yes" onClick={handleFinish}>Chốt đơn</button>
          </div>
        )}

        {step === 7 && (
            <div className="fade-in">
                <h1>Yêu em! Cảm ơn vì đã đến 🥰</h1>
                <p>Đã gửi yêu cầu cho anh ấy...</p>
            </div>
        )}
      </div>
    </>
  );
}

export default GirlSelectionPage;