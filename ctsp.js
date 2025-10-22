function quantity(amount){
    const input = document.getElementById("quantity");
    let current = parseInt(input.value);
    if (isNaN(current)) current = 1;
    let newvalue = current + amount;
    if (newvalue < 1) newvalue = 1;
    input.value = newvalue;
}
const urlParams = new URLSearchParams(window.location.search);
const Spid = urlParams.get("id");
const sptest = JSON.parse(localStorage.getItem("sp"));
const dssp = sptest.find((p) => p.id == Spid);
const ctsp = document.getElementById("chitiet");
const img_chitiet = document.getElementById("img_ct");
img_chitiet.innerHTML +=`

                <img src="${dssp.image}" alt="Áo dệt kim cổ tròn tay dài">

`
ctsp.innerHTML = "";
ctsp.innerHTML = `


<p class="product-brand">BO ANGELS</p>

            <h2 class="product-title">${dssp.name}</h2>

            <p class="product-price">${dssp.price.toLocaleString('vi-VN')}</p>

            <!-- Lựa chọn Màu sắc -->
            <div class="variant-selection color-section">
                <span class="variant-label">Color: <span style="font-weight: bold;">Black White</span></span>
                <div class="color-options">
                    <!-- Black White (Active) -->
                    <div class="color-option active" style="background-color: #000;" title="Black White"></div>
                    <!-- Màu khác (Không Active) -->
                    <div class="color-option" style="background-color: #ccc;" title="Gray"></div>
                </div>
            </div>

            <!-- Lựa chọn Kích cỡ -->
            <div class="variant-selection size-section">
                <div class="size-variant-header">
                    <span class="variant-label">Size: <span style="font-weight: bold;">XL</span></span>
                    <a href="#" class="size-selection-guide">Size selection guide</a>
                </div>
                <div class="size-options">
                    <div class="size-option" title="Size S">S</div>
                    <div class="size-option" title="Size M">M</div>
                    <div class="size-option" title="Size L">L</div>
                    <div class="size-option active" title="Size XL">XL</div>
                </div>
            </div>

            <!-- Khu vực Hành động Mua hàng -->
            <div class="purchase-actions">
                <!-- Selector số lượng (chỉ hiển thị, không có chức năng tăng/giảm) -->
                <div class="quantity-selector">
                    <button class="quantity-btn" onclick="quantity(-1)" type="button" value="-">-</button>
                    <input type="text" id="quantity" class="quantity-input" value="1" readonly>
                    <button class="quantity-btn" onclick="quantity(1)" type="button" value="+">+</button>
                </div>

                <!-- Nút Mua hàng (dùng thẻ <a> để giả lập nút) -->
                <a href="giohangvacheck.html" class="btn-action btn-add-to-cart" id = "add">ADD TO CART</a>
                <a href="checkout.html" class="btn-action btn-buy-now">BUY NOW</a>

                <!-- Thông tin liên hệ -->
                <p class="contact-info">
                    Call
                    <span>08 1737 1737</span> (9:00 - 22:00)
                </p>
            </div>
`;





function giohang(dssp){
    const soluong = parseInt(document.getElementById("quantity").value) || 1;

    // Nếu chưa có giỏ hàng thì = []
    let giohang1 = [];
    try {
        giohang1 = JSON.parse(localStorage.getItem("giohang") || "[]");
    } catch (e) {
        giohang1 = [];
    }

    // Kiểm tra sản phẩm đã có trong giỏ chưa
    const kiemtra = giohang1.find((item)=> item.id === dssp.id);

    if(kiemtra){
        kiemtra.soluong += soluong;
    }else{
        giohang1.push({
            id : dssp.id,
            name : dssp.name,
            price : dssp.price,
            size : 100,
            image : dssp.image,
            soluong: soluong
        });
    }

    // Lưu lại vào localStorage
    localStorage.setItem("giohang", JSON.stringify(giohang1));
    alert("Đã thêm vào giỏ hàng!");
    window.location.href ="giohangvacheck.html";
}

// Gắn sự kiện click cho nút "ADD TO CART"
document.getElementById("add").addEventListener("click", function (event){
    event.preventDefault(); // chặn chuyển trang liền
    giohang(dssp);
    renderGioHang()
});
function renderGioHang(){
    let giohang2 = JSON.parse(localStorage.getItem("giohang")) || [];
    const list = document.getElementById("product_item");
    list.innerHTML = ``;
    giohang2.forEach(element => {
        list.innerHTML += `
         <div class="product-item">
                <div class="product-details">
                    <div class="product-thumbnail">
                        <!-- Placeholder Image (Thực tế nên dùng ảnh sản phẩm thật) -->
                        <img src="https://placehold.co/80x80/f5f5f5/000000?text=Product" alt="Áo dệt kim kẻ sọc">
                    </div>
                    <div class="product-info">
                        <p><strong>ROUND NECK KNIT LONG SLEEVE T-SHIRT</strong></p>
                        <span>Black White / XL</span>
                        <p style="margin-top: 5px;">Giá đơn vị: 490.000₫</p>
                    </div>
                </div>
                
                <div class="quantity-control">
                    <button class="qty-btn minus-btn">-</button>
                    <input type="text" value="1" class="qty-input">
                    <button class="qty-btn plus-btn">+</button>
                </div>
                
                <div class="subtotal">
                    490.000₫
                </div>
                
                <button class="remove-btn">XÓA</button>
            </div>
        `
    });
    

}


