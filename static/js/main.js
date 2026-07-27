// Vellikkeel Waves — language toggle + WhatsApp enquiry
(function () {
  // Language: persist choice across pages/visits
  var saved = null;
  try { saved = localStorage.getItem("vw-lang"); } catch (e) {}
  if (saved === "ml") document.body.classList.add("ml");
  if (saved === "en") document.body.classList.remove("ml");

  var btn = document.getElementById("langToggle");
  if (btn) {
    btn.addEventListener("click", function () {
      var ml = document.body.classList.toggle("ml");
      document.documentElement.lang = ml ? "ml" : "en";
      try { localStorage.setItem("vw-lang", ml ? "ml" : "en"); } catch (e) {}
    });
  }
  if (document.body.classList.contains("ml")) document.documentElement.lang = "ml";

  // Enquiry form → WhatsApp
  var form = document.getElementById("enquiryForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = function (id) {
        var el = form.querySelector("#" + id);
        return el ? el.value.trim() : "";
      };
      var lines = ["Enquiry from vellikkeelwaves.in", "Name: " + v("f-name"), "Phone: " + v("f-phone")];
      if (v("f-date")) lines.push("Date: " + v("f-date"));
      if (v("f-guests")) lines.push("Guests: " + v("f-guests"));
      lines.push("Cruise: " + v("f-cruise"));
      if (v("f-msg")) lines.push("Message: " + v("f-msg"));
      window.open("https://wa.me/" + (window.VW && window.VW.wa) + "?text=" + encodeURIComponent(lines.join("\n")), "_blank");
    });
  }
})();

// ─── Hero background video: nudge autoplay on browsers that stall it ───
(function () {
  var v = document.querySelector(".hero-video");
  if (!v) return;
  var tryPlay = function () {
    var p = v.play();
    if (p && p.catch) p.catch(function () { /* blocked — poster stays visible */ });
  };
  if (v.readyState >= 2) tryPlay();
  v.addEventListener("loadeddata", tryPlay);
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden && v.paused) tryPlay();
  });
})();

// ─── Gallery videos: click any video tile to load and play it (delegated) ───
(function () {
  document.addEventListener("click", function (e) {
    if (!e.target.closest) return;
    var tile = e.target.closest(".g-video");
    if (!tile || tile.classList.contains("playing")) return;
    var id = tile.getAttribute("data-yt");
    if (!id) return;
    var frame = document.createElement("iframe");
    frame.src = "https://www.youtube-nocookie.com/embed/" + id +
      "?autoplay=1&rel=0&modestbranding=1&playsinline=1";
    frame.title = "Vellikkeel Waves video";
    frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    frame.allowFullscreen = true;
    tile.classList.add("playing");
    tile.textContent = "";
    tile.appendChild(frame);
  });
})();

// ─── Bento grid: shuffle in other gallery items at random ───
(function () {
  var grid = document.getElementById("bentoGrid");
  var poolEl = document.getElementById("galleryPool");
  if (!grid || !poolEl || grid.getAttribute("data-rotate") !== "on") return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var pool = Array.prototype.map.call(poolEl.querySelectorAll("i"), function (n) {
    return { img: n.getAttribute("data-img"), alt: n.getAttribute("data-alt") || "", yt: n.getAttribute("data-yt") || "" };
  });
  var tiles = Array.prototype.slice.call(grid.querySelectorAll(".g-item"));
  if (!tiles.length || pool.length <= tiles.length) return;

  var shown = tiles.map(function (t) { return parseInt(t.getAttribute("data-idx"), 10); });
  var hovered = null;
  tiles.forEach(function (t) {
    t.addEventListener("mouseenter", function () { hovered = t; });
    t.addEventListener("mouseleave", function () { if (hovered === t) hovered = null; });
  });

  var pick = function (arr) { return arr[Math.floor(Math.random() * arr.length)]; };
  var secs = parseFloat(grid.getAttribute("data-interval")) || 7;

  function render(tile, item) {
    tile.textContent = "";
    var img = document.createElement("img");
    img.src = item.img;
    img.alt = item.alt;
    img.loading = "lazy";
    tile.appendChild(img);
    if (item.yt) {
      tile.classList.add("g-video");
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "g-play";
      btn.setAttribute("aria-label", "Play video: " + item.alt);
      btn.appendChild(document.createElement("span"));
      tile.appendChild(btn);
    } else {
      tile.classList.remove("g-video");
    }
    tile.setAttribute("data-yt", item.yt);
  }

  function tick() {
    if (document.hidden) return;
    var free = tiles.filter(function (t) {
      return t !== hovered && !t.classList.contains("playing");
    });
    if (!free.length) return;
    var tile = pick(free);
    var spare = [];
    for (var i = 0; i < pool.length; i++) { if (shown.indexOf(i) === -1) spare.push(i); }
    if (!spare.length) return;
    var idx = pick(spare);
    var item = pool[idx];

    var pre = new Image();
    pre.onload = pre.onerror = function () {
      tile.classList.add("swapping");
      setTimeout(function () {
        shown[tiles.indexOf(tile)] = idx;
        tile.setAttribute("data-idx", idx);
        render(tile, item);
        tile.classList.remove("swapping");
      }, 400);
    };
    pre.src = item.img;
  }

  setTimeout(function () { setInterval(tick, secs * 1000); }, secs * 1000);
})();
