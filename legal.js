// Legal pages: German or English, chosen like on the landing page (link "#en"/"#de", the saved switch, then German for
// Germany, Austria, Switzerland and Liechtenstein by time zone or browser language, else English). Links between the
// pages carry the shown language along.
(function () {
  var dach = ["DE", "AT", "CH", "LI"], zones = ["Europe/Berlin", "Europe/Busingen", "Europe/Vienna", "Europe/Zurich", "Europe/Vaduz"];
  function guess() {
    var h = location.hash.slice(1); if (h === "de" || h === "en") return h;
    try { var s = localStorage.getItem("tc-lang"); if (s === "de" || s === "en") return s; } catch (e) {}
    try { if (zones.indexOf(Intl.DateTimeFormat().resolvedOptions().timeZone) >= 0) return "de"; } catch (e) {}
    var langs = navigator.languages || [navigator.language || ""];
    for (var i = 0; i < langs.length; i++) { var r = (langs[i].split("-")[1] || "").toUpperCase(); if (dach.indexOf(r) >= 0) return "de"; }
    return "en";
  }
  function apply(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-lang-block]").forEach(function (el) { el.hidden = el.getAttribute("data-lang-block") !== lang; });
    document.querySelectorAll(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === lang)); });
    document.querySelectorAll("a[data-page]").forEach(function (a) { a.href = a.getAttribute("data-page") + "#" + lang; });
    var t = document.querySelector("title"); if (t && t.dataset[lang]) t.textContent = t.dataset[lang];
  }
  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { apply(b.dataset.lang); try { localStorage.setItem("tc-lang", b.dataset.lang); } catch (e) {} });
  });
  apply(guess());
})();
