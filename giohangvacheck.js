// Khi trang load xong thì hiển thị giỏ hàng
document.addEventListener("DOMContentLoaded", () => {
    renderGioHang();
});

function renderGioHang() {
    const giohang = JSON.parse(localStorage.getItem("giohang")) || [];
    const list = document.getElementById("product_item");
    list.innerHTML = "";

    // Nếu giỏ trống
    if (giohang.length === 0) {
        list.innerHTML = `<p style="text-align:center; padding:20px;">Giỏ hàng của bạn đang trống.</p>`;
        
        // 🔥 Reset tổng tiền về 0 khi giỏ trống
        const finalPrice = document.querySelector(".final-price");
        const checkoutBtn = document.querySelector(".checkout-button");
        if (finalPrice) finalPrice.textContent = "0₫";
        if (checkoutBtn) checkoutBtn.textContent = "THANH TOÁN (0₫)";
        return;
    }

    let tongtien = 0;

    giohang.forEach((sp, index) => {
        const thanhtien = sp.price * sp.soluong;
        tongtien += thanhtien;

        list.innerHTML += `
        <div class="product-item">
            <div class="product-details">
                <div class="product-thumbnail">
                    <img src="${sp.image}" alt="${sp.name}">
                </div>
                <div class="product-info">
                    <p><strong>${sp.name}</strong></p>
                    <span>Size: ${sp.size || "XL"}</span>
                    <p style="margin-top: 5px;">Giá: ${sp.price.toLocaleString('vi-VN')}₫</p>
                </div>
            </div>

            <div class="quantity-control">
                <button class="qty-btn" onclick="thayDoiSL(${index}, -1)">-</button>
                <input type="text" value="${sp.soluong}" class="qty-input" readonly>
                <button class="qty-btn" onclick="thayDoiSL(${index}, 1)">+</button>
            </div>

            <div class="subtotal">${thanhtien.toLocaleString('vi-VN')}₫</div>

            <button class="remove-btn" onclick="xoaSP(${index})">Xóa</button>
        </div>
        `;
    });

    capNhatTongTien(tongtien);
}

function capNhatTongTien(tongtien) {
    const finalPrice = document.querySelector(".final-price");
    const checkoutBtn = document.querySelector(".checkout-button");

    if (finalPrice) {
        finalPrice.textContent = tongtien.toLocaleString("vi-VN") + "₫";
    }

    if (checkoutBtn) {
        checkoutBtn.textContent = `THANH TOÁN (${tongtien.toLocaleString("vi-VN")}₫)`;
    }
}

// ============================
//  HÀM TĂNG / GIẢM SỐ LƯỢNG
// ============================
function thayDoiSL(index, delta) {
    let giohang = JSON.parse(localStorage.getItem("giohang")) || [];

    if (!giohang[index]) return;

    giohang[index].soluong += delta;
    if (giohang[index].soluong < 1) giohang[index].soluong = 1;

    localStorage.setItem("giohang", JSON.stringify(giohang));
    renderGioHang(); // Gọi lại để cập nhật giao diện & tổng tiền
}

// ============================
//  HÀM XÓA SẢN PHẨM
// ============================
function xoaSP(index) {
    let giohang = JSON.parse(localStorage.getItem("giohang")) || [];

    if (confirm("Anh Minh đẹp trai có chắc muốn xóa sản phẩm này không? 😢")) {
        giohang.splice(index, 1);
        localStorage.setItem("giohang", JSON.stringify(giohang));
        renderGioHang(); // Cập nhật lại ngay sau khi xóa
    }
}
