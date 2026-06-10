function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

function highlight(text, query) {
  if (!query) return escapeHtml(text);
  const escaped = escapeHtml(text);
  const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return escaped.replace(new RegExp(`(${safeQuery})`, "gi"), "<mark>$1</mark>");
}

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

function render(query) {
  const content = document.getElementById("content");
  const days = (ARTICLES_DATA.days || []).slice().sort((a, b) => b.date.localeCompare(a.date));

  if (days.length === 0) {
    content.innerHTML = '<div class="empty-state">Aucun article pour le moment. La veille s\'exécute chaque matin et remplira cette page automatiquement.</div>';
    return;
  }

  const q = (query || "").trim().toLowerCase();
  let html = "";

  for (const day of days) {
    const items = (day.items || []).filter((item) => {
      if (!q) return true;
      const haystack = `${item.title} ${item.summary} ${item.source || ""}`.toLowerCase();
      return haystack.includes(q);
    });

    if (q && items.length === 0) continue;

    html += `<section class="day-block">`;
    html += `<div class="day-header"><h2>${formatDate(day.date)}</h2></div>`;
    if (day.summary) {
      html += `<p class="day-summary">${highlight(day.summary, query)}</p>`;
    }
    for (const item of items) {
      html += `<article class="article-card">`;
      html += `<a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">${highlight(item.title, query)}</a>`;
      html += `<p class="article-meta">${escapeHtml(item.source || "")}</p>`;
      html += `<p class="article-summary">${highlight(item.summary || "", query)}</p>`;
      html += `</article>`;
    }
    html += `</section>`;
  }

  if (!html) {
    html = '<div class="empty-state">Aucun résultat pour cette recherche.</div>';
  }

  content.innerHTML = html;
}

document.getElementById("search").addEventListener("input", (e) => render(e.target.value));

const lastUpdatedEl = document.getElementById("last-updated");
if (ARTICLES_DATA.days && ARTICLES_DATA.days.length > 0) {
  const latest = ARTICLES_DATA.days.slice().sort((a, b) => b.date.localeCompare(a.date))[0];
  lastUpdatedEl.textContent = formatDate(latest.date);
}

render("");
