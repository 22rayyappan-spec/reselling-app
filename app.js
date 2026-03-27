// ============================================
// Mobile Resale — Application Logic
// ============================================

// ---------- Mobile Data ----------
const mobiles = [
  {
    id: 1,
    name: "iPhone 12",
    price: "₹30,000",
    priceNum: 30000,
    image: "images/mobiles/iphone12.png",
    condition: "Good",
    description: "Well-maintained iPhone 12 in Blue. Comes with 128GB storage, excellent battery health at 87%, and includes original charger. Minor scratches on the back panel, screen is flawless with no cracks or dead pixels.",
    specs: {
      storage: "128 GB",
      battery: "87% Health",
      color: "Blue",
      warranty: "30 Days"
    }
  },
  {
    id: 2,
    name: "Samsung Galaxy S21",
    price: "₹25,000",
    priceNum: 25000,
    image: "images/mobiles/samsung_s21.png",
    condition: "Excellent",
    description: "Samsung Galaxy S21 in Phantom Gray, barely used for 6 months. 128GB storage with 8GB RAM. All features working perfectly — camera, fingerprint sensor, wireless charging. Comes with box and accessories.",
    specs: {
      storage: "128 GB",
      battery: "92% Health",
      color: "Phantom Gray",
      warranty: "30 Days"
    }
  },
  {
    id: 3,
    name: "OnePlus 9 Pro",
    price: "₹28,000",
    priceNum: 28000,
    image: "images/mobiles/oneplus9pro.png",
    condition: "Good",
    description: "OnePlus 9 Pro with Hasselblad camera system. 256GB storage, 12GB RAM. Fast Warp Charge 65T included. Screen has a minor scratch near the edge, otherwise in great condition. Runs OxygenOS smoothly.",
    specs: {
      storage: "256 GB",
      battery: "85% Health",
      color: "Morning Mist",
      warranty: "15 Days"
    }
  },
  {
    id: 4,
    name: "Google Pixel 6",
    price: "₹22,000",
    priceNum: 22000,
    image: "images/mobiles/pixel6.png",
    condition: "Like New",
    description: "Google Pixel 6 in Sorta Seafoam. 128GB, Google Tensor chip. Incredible camera with Magic Eraser. Phone has been in a case since day one — no scratches, no dents. Battery health excellent.",
    specs: {
      storage: "128 GB",
      battery: "95% Health",
      color: "Sorta Seafoam",
      warranty: "30 Days"
    }
  },
  {
    id: 5,
    name: "Samsung Galaxy A52",
    price: "₹15,000",
    priceNum: 15000,
    image: "images/mobiles/samsung_a52.png",
    condition: "Good",
    description: "Budget-friendly Samsung Galaxy A52 in Awesome Blue. 128GB storage, Super AMOLED display, IP67 water resistance. Great everyday phone with solid camera performance. Minor wear on corners.",
    specs: {
      storage: "128 GB",
      battery: "88% Health",
      color: "Awesome Blue",
      warranty: "15 Days"
    }
  },
  {
    id: 6,
    name: "iPhone 13 Pro",
    price: "₹52,000",
    priceNum: 52000,
    image: "images/mobiles/iphone13pro.png",
    condition: "Excellent",
    description: "Premium iPhone 13 Pro in Sierra Blue. 256GB storage, ProMotion 120Hz display, triple camera system with LiDAR. Battery health at 90%. Comes with MagSafe case and original box. No scratches.",
    specs: {
      storage: "256 GB",
      battery: "90% Health",
      color: "Sierra Blue",
      warranty: "30 Days"
    }
  }
];

// ---------- WhatsApp Configuration ----------
const WHATSAPP_NUMBER = "9750766542"; // Replace with your number

// ---------- Auth ----------
function checkAuth() {
  const isLoggedIn = localStorage.getItem("mobileResale_loggedIn");
  if (!isLoggedIn) {
    window.location.href = "index.html";
  }
}

function login(event) {
  event.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const errorEl = document.getElementById("login-error");

  if (!email || !password) {
    errorEl.textContent = "Please fill in all fields.";
    errorEl.classList.add("show");
    return;
  }

  // Simple login — accept any non-empty credentials
  localStorage.setItem("mobileResale_loggedIn", "true");
  localStorage.setItem("mobileResale_user", email);
  window.location.href = "home.html";
}

function logout() {
  localStorage.removeItem("mobileResale_loggedIn");
  localStorage.removeItem("mobileResale_user");
  window.location.href = "index.html";
}

// ---------- Home Page ----------
function renderMobiles() {
  const grid = document.getElementById("mobiles-grid");
  if (!grid) return;

  grid.innerHTML = mobiles
    .map(
      (mobile) => `
    <div class="mobile-card" onclick="viewProduct(${mobile.id})" id="card-${mobile.id}">
      <div class="card-image">
        <img src="${mobile.image}" alt="${mobile.name}" loading="lazy" />
      </div>
      <div class="card-body">
        <h3>${mobile.name}</h3>
        <span class="price">${mobile.price}</span>
        <span class="condition">${mobile.condition}</span>
      </div>
    </div>
  `
    )
    .join("");
}

function viewProduct(id) {
  window.location.href = `product.html?id=${id}`;
}

// ---------- Product Page ----------
function renderProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const mobile = mobiles.find((m) => m.id === id);

  if (!mobile) {
    document.getElementById("product-container").innerHTML = `
      <div style="text-align:center; padding:4rem 0;">
        <h2>Product not found</h2>
        <p style="color:var(--text-secondary); margin-top:1rem;">The product you're looking for doesn't exist.</p>
        <a href="home.html" class="btn-back" style="margin-top:2rem; display:inline-flex;">← Back to Home</a>
      </div>
    `;
    return;
  }

  const specIcons = {
    storage: "💾",
    battery: "🔋",
    color: "🎨",
    warranty: "🛡️"
  };

  const specsHtml = Object.entries(mobile.specs)
    .map(
      ([key, value]) => `
    <li>
      <span class="spec-icon">${specIcons[key] || "📋"}</span>
      <div>
        <div class="spec-label">${key.charAt(0).toUpperCase() + key.slice(1)}</div>
        <div class="spec-value">${value}</div>
      </div>
    </li>
  `
    )
    .join("");

  document.getElementById("product-container").innerHTML = `
    <a href="home.html" class="btn-back" id="btn-back">← Back to all phones</a>

    <div class="product-detail">
      <div class="product-image-wrapper">
        <img src="${mobile.image}" alt="${mobile.name}" />
      </div>

      <div class="product-info">
        <span class="badge">${mobile.condition} Condition</span>
        <h1>${mobile.name}</h1>
        <div class="price">${mobile.price}</div>
        <p class="description">${mobile.description}</p>

        <ul class="specs-list">${specsHtml}</ul>

        <button class="btn-whatsapp" onclick="orderNow('${mobile.name}', '${mobile.price}')" id="btn-order">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Order via WhatsApp
        </button>
      </div>
    </div>
  `;
}

// ---------- WhatsApp Order ----------
function orderNow(productName, productPrice) {
  const message = `Hi, I'm interested in buying *${productName}* listed at *${productPrice}* on your website. Is it still available?`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
