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

// Gallery videos: click a thumbnail to load and play the YouTube embed
(function () {
  document.querySelectorAll(".g-video").forEach(function (tile) {
    tile.addEventListener("click", function () {
      if (tile.classList.contains("playing")) return;
      var id = tile.getAttribute("data-yt");
      if (!id) return;
      var frame = document.createElement("iframe");
      frame.src = "https://www.youtube-nocookie.com/embed/" + id +
        "?autoplay=1&rel=0&modestbranding=1&playsinline=1";
      frame.title = "Vellikkeel Waves video";
      frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      frame.allowFullscreen = true;
      frame.loading = "lazy";
      tile.classList.add("playing");
      tile.innerHTML = "";
      tile.appendChild(frame);
    });
  });
})();
