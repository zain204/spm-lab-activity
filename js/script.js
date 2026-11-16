// ---------- Shared header and footer ----------
const pages = [
  ["index.html", "Home"],
  ["about.html", "About"],
  ["services.html", "Services"],
  ["portfolio.html", "Portfolio"],
  ["contact.html", "Contact"]
];
const current = location.pathname.split("/").pop() || "index.html";

const links = pages.map(function (p) {
  return '<a href="' + p[0] + '"' + (p[0] === current ? ' class="active"' : "") + ">" + p[1] + "</a>";
}).join("");

document.getElementById("site-header").innerHTML =
  '<header><div class="container header-inner">' +
  '<a href="index.html" class="logo">BrightWeb</a>' +
  '<nav id="nav-menu">' + links + '<button id="theme-btn" aria-label="Toggle dark mode">&#9790;</button></nav>' +
  '<button id="menu-btn" aria-label="Toggle menu">&#9776;</button>' +
  "</div></header>";

document.getElementById("site-footer").innerHTML =
  '<footer><div class="container footer-grid">' +
  '<div><h4>BrightWeb Solutions</h4><p>Simple, clean and affordable websites for small businesses.</p></div>' +
  "<div><h4>Quick Links</h4>" + links + "</div>" +
  "<div><h4>Contact</h4><p>info@brightweb.com<br>+92 300 1234567<br>Lahore, Pakistan</p></div>" +
  '</div><p class="copy">&copy; 2026 BrightWeb Solutions. All rights reserved.</p></footer>' +
  '<button id="top-btn" aria-label="Back to top">&#8593;</button>';

// ---------- Mobile menu ----------
const navMenu = document.getElementById("nav-menu");
document.getElementById("menu-btn").addEventListener("click", function () {
  navMenu.classList.toggle("open");
});
navMenu.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navMenu.classList.remove("open");
  });
});

// ---------- Dark mode ----------
if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark");
document.getElementById("theme-btn").addEventListener("click", function () {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

// ---------- Back to top ----------
const topBtn = document.getElementById("top-btn");
window.addEventListener("scroll", function () {
  topBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
topBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ---------- Animated counters (Home) ----------
document.querySelectorAll(".counter").forEach(function (el) {
  const target = +el.dataset.target;
  let count = 0;
  const step = Math.max(1, Math.ceil(target / 50));
  const timer = setInterval(function () {
    count = Math.min(count + step, target);
    el.textContent = count;
    if (count >= target) clearInterval(timer);
  }, 30);
});

// ---------- FAQ accordion (Services) ----------
document.querySelectorAll(".faq-q").forEach(function (btn) {
  btn.addEventListener("click", function () {
    btn.parentElement.classList.toggle("open");
  });
});

// ---------- Portfolio filter ----------
document.querySelectorAll(".filter-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".project").forEach(function (p) {
      p.classList.toggle("hide", filter !== "all" && p.dataset.category !== filter);
    });
  });
});

// ---------- Contact form validation ----------
const form = document.getElementById("contact-form");
if (form) {
  const fields = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    subject: document.getElementById("subject"),
    message: document.getElementById("message")
  };
  const successMsg = document.getElementById("success-msg");

  fields.message.addEventListener("input", function () {
    document.getElementById("counter").textContent = fields.message.value.length + "/300";
  });

  function setError(key, text) {
    document.getElementById(key + "-error").textContent = text;
    fields[key].classList.toggle("invalid", text !== "");
    return text === "";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    successMsg.textContent = "";
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.value.trim());

    const results = [
      setError("name", fields.name.value.trim() === "" ? "Please enter your name." : ""),
      setError("email", emailOk ? "" : "Please enter a valid email address."),
      setError("subject", fields.subject.value === "" ? "Please select a subject." : ""),
      setError("message", fields.message.value.trim().length < 10 ? "Message must be at least 10 characters." : "")
    ];

    if (results.every(Boolean)) {
      successMsg.textContent = "Thank you! Your message has been sent.";
      form.reset();
      document.getElementById("counter").textContent = "0/300";
    }
  });
}