// PlayNest storefront settings. Add your WhatsApp number below (country code + number, digits only).
const WHATSAPP_NUMBER = ""; // Example for India: 919876543210

const products = [
  {id:1,name:"Cuddle Bear",category:"Soft Toys",price:499,tag:"Bestseller",image:"https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=700&q=85"},
  {id:2,name:"Rainbow Building Blocks",category:"Building",price:699,tag:"Creative fun",image:"https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=700&q=85"},
  {id:3,name:"Little Learner Puzzle",category:"Learning",price:349,tag:"Learn & play",image:"https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&w=700&q=85"},
  {id:4,name:"Mini Racing Car",category:"Vehicles",price:299,tag:"Zoom zoom!",image:"https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=700&q=85"},
  {id:5,name:"Fluffy Bunny",category:"Soft Toys",price:549,tag:"Super soft",image:"https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=700&q=85"},
  {id:6,name:"Colour & Create Kit",category:"Creative",price:399,tag:"Little artist",image:"https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=700&q=85"},
  {id:7,name:"Wooden Shape Sorter",category:"Learning",price:599,tag:"Smart choice",image:"https://images.unsplash.com/photo-1560961911-ba7ef651a56c?auto=format&fit=crop&w=700&q=85"},
  {id:8,name:"Dino Building Set",category:"Building",price:799,tag:"Adventure time",image:"https://images.unsplash.com/photo-1599623560574-39d485900c95?auto=format&fit=crop&w=700&q=85"}
];
let cart = [];
let activeCategory = "All";
const productGrid = document.getElementById("productGrid");
const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");
const money = n => "₹" + n.toLocaleString("en-IN");

function renderProducts(){
  const term = document.getElementById("searchInput").value.trim().toLowerCase();
  const filtered = products.filter(p => (activeCategory==="All" || p.category===activeCategory) && (p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)));
  productGrid.innerHTML = filtered.length ? filtered.map(p => `<article class="product-card"><div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="product-tag">${p.tag}</span></div><div class="product-info"><h3>${p.name}</h3><div class="product-meta"><span class="price">${money(p.price)}</span><button class="add-btn" onclick="addToCart(${p.id})">+ Add to cart</button></div></div></article>`).join("") : '<div class="no-results">No toys found. Try another search 💛</div>';
}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});renderCart();openCart();}
function changeQty(id,delta){const item=cart.find(x=>x.id===id);if(!item)return;item.qty+=delta;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);renderCart();}
function renderCart(){
  const count=cart.reduce((s,x)=>s+x.qty,0),total=cart.reduce((s,x)=>s+x.qty*products.find(p=>p.id===x.id).price,0);
  document.getElementById("cartCount").textContent=count;document.getElementById("cartTotal").textContent=money(total);
  document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>{const p=products.find(y=>y.id===x.id);return `<div class="cart-line"><img src="${p.image}" alt=""><div><h4>${p.name}</h4><small>${money(p.price)}</small><div class="qty-controls"><button onclick="changeQty(${p.id},-1)">−</button><span>${x.qty}</span><button onclick="changeQty(${p.id},1)">+</button></div></div><b>${money(p.price*x.qty)}</b></div>`}).join(""):'<div class="empty-cart">🧸<h3>Your cart is waiting!</h3><p>Add a little joy to your bag.</p></div>';
}
function openCart(){cartDrawer.classList.add("open");overlay.classList.add("show");}
function closeCart(){cartDrawer.classList.remove("open");overlay.classList.remove("show");}
document.getElementById("cartOpen").addEventListener("click",openCart);
document.getElementById("cartClose").addEventListener("click",closeCart);
overlay.addEventListener("click",closeCart);
document.getElementById("searchInput").addEventListener("input",renderProducts);
document.querySelectorAll(".category-chip").forEach(btn=>btn.addEventListener("click",()=>{document.querySelector(".category-chip.active").classList.remove("active");btn.classList.add("active");activeCategory=btn.dataset.category;renderProducts();}));
document.getElementById("menuToggle").addEventListener("click",()=>document.querySelector(".desktop-nav").classList.toggle("show"));
document.getElementById("searchToggle").addEventListener("click",()=>{document.getElementById("searchBox").scrollIntoView({behavior:"smooth",block:"center"});document.getElementById("searchInput").focus();});
function orderOnWhatsApp(){
  if(!cart.length){alert("Your cart is empty. Add a toy first!");return;}
  if(!WHATSAPP_NUMBER){alert("Please add your WhatsApp number in script.js first. See the README file.");return;}
  const lines=cart.map(x=>{const p=products.find(y=>y.id===x.id);return `${p.name} x ${x.qty} — ${money(p.price*x.qty)}`;});
  const total=cart.reduce((s,x)=>s+x.qty*products.find(p=>p.id===x.id).price,0);
  const message=`Hello PlayNest! I would like to order:\n${lines.join("\n")}\n\nTotal: ${money(total)}\nPlease confirm availability and delivery details.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,"_blank");
}
document.getElementById("checkoutBtn").addEventListener("click",orderOnWhatsApp);
document.getElementById("contactWhatsApp").addEventListener("click",e=>{if(!WHATSAPP_NUMBER){e.preventDefault();alert("Please add your WhatsApp number in script.js first. See the README file.");}else e.currentTarget.href=`https://wa.me/${WHATSAPP_NUMBER}`;});
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();renderCart();