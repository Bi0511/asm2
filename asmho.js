const sp = [
{
    id : 1,
    name : "BoBui Tshirt",
    price : 500000,
    size : 100,
    image : "https://bizweb.dktcdn.net/thumb/large/100/343/638/products/striped-bw-12-1758653712613.jpg?v=1758653727670"
},
{
    id : 2,
    name : "BoBui Liwi",
    price : 1500000,
    size : 200,
    image : "https://tse1.mm.bing.net/th/id/OIP.kylEKYpE4F5STSJ0EO1ITAHaHa?cb=12&w=1280&h=1280&rs=1&pid=ImgDetMain&o=7&rm=3"

},
{
    id : 3,
    name : "Bobui sampoche",
    price : 200000,
    size : 50,
    image : "https://media-photos.depop.com/b1/23499024/1715542151_df30bd2ad9f246b9a56b3e2d58f57eb1/P0.jpg"
},
{
    id : 4,
    name : "Bobui culusaichi",
    price : 150000,
    size : 50,
    image : "https://cf.shopee.vn/file/c8afcf3c04c4686e4179d6258bff85d6"
},
{
    id : 5,
    name : "Bobui Limited",
    price : 250000,
    size : 50,
    image : "https://tse1.mm.bing.net/th/id/OIP.FEBRwCGTjLi7GOQq1N4rngHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
},
];
const rendercart = document.getElementById("sp");

rendercart.innerHTML = ``;

sp.map((e) => {
  rendercart.innerHTML += `
        <div class="product-item">
    <div class="product-image">
        <img src="${e.image}" alt="${e.image}">
    </div>
    
    <div class="product-details">
        <p class="product-brand">BO ANGELS</p>
        
        <a href ="ctspasmhi.html?id=${e.id}" class="product-title">${e.name}</h2>
        
        <p class="product-price">${e.price.toLocaleString('vi-VN')}VNĐ</p>
    </div>
</div>
   `;
});
localStorage.setItem("sp", JSON.stringify(sp));

