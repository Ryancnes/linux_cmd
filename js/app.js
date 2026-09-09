(function () {
  "use strict";

  // ---------- 数据合并 ----------
  const COMMANDS = []
    .concat(DATA_FILE, DATA_TEXT, DATA_ARCHIVE, DATA_PERM, DATA_PROCESS,
      DATA_SYSTEM, DATA_NETWORK, DATA_DISK, DATA_PKG, DATA_SHELL)
    .sort((a, b) => a.name.localeCompare(b.name, "en"));

  // 分类保持首次出现的顺序
  const CATEGORIES = [];
  for (const cmd of COMMANDS) {
    if (!CATEGORIES.includes(cmd.category)) CATEGORIES.push(cmd.category);
  }

  // ---------- DOM ----------
  const els = {
    searchInput: document.getElementById("searchInput"),
    clearBtn: document.getElementById("clearBtn"),
    categoryChips: document.getElementById("categoryChips"),
    heroStats: document.getElementById("heroStats"),
    resultTitle: document.getElementById("resultTitle"),
    resultCount: document.getElementById("resultCount"),
    commandGrid: document.getElementById("commandGrid"),
    emptyState: document.getElementById("emptyState"),
    emptyTitle: document.getElementById("emptyTitle"),
    emptyDesc: document.getElementById("emptyDesc"),
    resetBtn: document.getElementById("resetBtn"),
    modal: document.getElementById("modal"),
    modalBody: document.getElementById("modalBody")
  };

  const state = {
    query: "",
    category: "全部"
  };

  // ---------- 工具函数 ----------
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function getTokens(query) {
    return query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  }

  function searchableText(cmd) {
    return [
      cmd.name,
      cmd.summary,
      cmd.description,
      cmd.category,
      (cmd.options || []).map((o) => o.join(" ")).join(" "),
      (cmd.examples || []).map((e) => e.join(" ")).join(" ")
    ].join(" ").toLowerCase();
  }

  function rankScore(cmd, tokens) {
    const name = cmd.name.toLowerCase();
    let total = 0;
    for (const token of tokens) {
      if (name === token) total += 0;
      else if (name.startsWith(token)) total += 1;
      else if (name.includes(token)) total += 2;
      else if (cmd.summary.toLowerCase().includes(token)) total += 10;
      else if (cmd.category.toLowerCase().includes(token)) total += 12;
      else if (cmd.description.toLowerCase().includes(token)) total += 20;
      else total += 30;
    }
    return total / tokens.length;
  }

  function filterCommands() {
    let list = COMMANDS;
    if (state.category !== "全部") {
      list = list.filter((c) => c.category === state.category);
    }
    const tokens = getTokens(state.query);
    if (tokens.length === 0) return list.slice();

    const ranked = [];
    for (const cmd of list) {
      const haystack = searchableText(cmd);
      if (tokens.every((t) => haystack.includes(t))) {
        ranked.push({ cmd, score: rankScore(cmd, tokens) });
      }
    }
    ranked.sort((a, b) => a.score - b.score || a.cmd.name.localeCompare(b.cmd.name, "en"));
    return ranked.map((r) => r.cmd);
  }

  function highlight(text, tokens) {
    const escaped = escapeHtml(text);
    const names = tokens.filter((t) => t && t.length > 0);
    if (names.length === 0) return escaped;
    const re = new RegExp("(" + names.map(escapeRegExp).join("|") + ")", "gi");
    return escaped.replace(re, "<mark>$1</mark>");
  }

  function trimmedSyntax(cmd) {
    const s = cmd.syntax || "";
    const max = 38;
    return s.length > max ? s.slice(0, max - 1) + "…" : s;
  }

  // ---------- 渲染 ----------
  function renderChips() {
    const chips = [["全部", COMMANDS.length], ...CATEGORIES.map((c) => [
      c, COMMANDS.filter((x) => x.category === c).length
    ])];
    els.categoryChips.innerHTML = chips.map(([name, count], i) => {
      const active = state.category === name ? " active" : "";
      return `<button class="chip${active}" data-category="${escapeHtml(name)}" type="button">
        <span>${escapeHtml(name)}</span><span class="count">${count}</span>
      </button>`;
    }).join("");
  }

  function setChipActive() {
    document.querySelectorAll(".chip").forEach((chip) => {
      chip.classList.toggle("active", chip.dataset.category === state.category);
    });
  }

  function renderGrid() {
    const list = filterCommands();
    const tokens = getTokens(state.query);

    els.resultCount.textContent = `共 ${list.length} 条结果`;
    if (state.query && state.category !== "全部") {
      els.resultTitle.textContent = `“${state.query}” · ${state.category}`;
    } else if (state.query) {
      els.resultTitle.textContent = `“${state.query}” 的搜索结果`;
    } else if (state.category !== "全部") {
      els.resultTitle.textContent = state.category;
    } else {
      els.resultTitle.textContent = "全部命令";
    }

    els.emptyState.hidden = list.length > 0;
    els.commandGrid.hidden = list.length === 0;
    if (list.length === 0) {
      els.emptyTitle.textContent = state.query ? "没有找到匹配的命令" : "该分类暂无命令";
      els.emptyDesc.textContent = state.query
        ? "试试其他关键词，也可以搜索中文功能描述，例如“压缩”“权限”“端口”。"
        : "换个分类浏览看看。";
      return;
    }

    els.commandGrid.innerHTML = list.map((cmd) => {
      const catName = cmd.category;
      return `<button class="card" type="button" data-name="${escapeHtml(cmd.name)}" aria-label="查看 ${escapeHtml(cmd.name)} 命令详情">
        <span class="card-top">
          <span class="card-name mono">${highlight(cmd.name, tokens)}</span>
          <span class="category-pill">${escapeHtml(catName)}</span>
        </span>
        <span class="card-summary">${highlight(cmd.summary, tokens)}</span>
        <span class="card-footer">
          <span class="card-cmd mono">$ ${escapeHtml(trimmedSyntax(cmd))}</span>
          <span class="card-more">查看详情 →</span>
        </span>
      </button>`;
    }).join("");
  }

  function render() {
    renderChips();
    renderGrid();
    setChipActive();
  }

  // ---------- 详情弹窗 ----------
  function optionsRows(options) {
    if (!options || options.length === 0) {
      return '<p class="tip">该命令常用参数较少，直接用默认用法即可。</p>';
    }
    const rows = options.map(([flag, desc]) =>
      `<tr><td>${escapeHtml(flag)}</td><td>${escapeHtml(desc)}</td></tr>`
    ).join("");
    return `<table class="options-table">
      <thead><tr><th>选项</th><th>说明</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
  }

  function examplesBlocks(examples) {
    if (!examples || examples.length === 0) return "";
    return `<div class="example-list">${examples.map(([cmd, desc]) =>
      `<div class="example-item">
        <div class="example-cmd">
          <code>$ ${escapeHtml(cmd)}</code>
          <button class="copy-btn" type="button" data-copy="${escapeHtml(cmd)}">复制</button>
        </div>
        <p class="example-desc">${escapeHtml(desc)}</p>
      </div>`
    ).join("")}</div>`;
  }

  function openDetail(name) {
    const cmd = COMMANDS.find((c) => c.name === name);
    if (!cmd) return;

    els.modalBody.innerHTML = `
      <div class="detail-head">
        <div>
          <h2 class="detail-name mono" id="modalName">${escapeHtml(cmd.name)}</h2>
          <p class="detail-summary">${escapeHtml(cmd.summary)}</p>
        </div>
        <span class="category-pill">${escapeHtml(cmd.category)}</span>
      </div>
      <section class="detail-section">
        <h3>简介</h3>
        <p style="margin:0;">${escapeHtml(cmd.description)}</p>
      </section>
      <section class="detail-section">
        <h3>语法</h3>
        <pre class="syntax-block">${escapeHtml(cmd.syntax)}</pre>
      </section>
      <section class="detail-section">
        <h3>常用选项</h3>
        ${optionsRows(cmd.options)}
      </section>
      ${cmd.examples && cmd.examples.length ? `<section class="detail-section">
        <h3>示例</h3>
        ${examplesBlocks(cmd.examples)}
      </section>` : ""}
      <p class="detail-note">💡 更多细节请查阅官方手册：<code>man ${escapeHtml(cmd.name)}</code></p>`;

    els.modal.classList.add("open");
    els.modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (location.hash !== `#cmd=${encodeURIComponent(name)}`) {
      history.replaceState(null, "", `#cmd=${encodeURIComponent(name)}`);
    }
    els.modalBody.scrollTop = 0;
    els.modal.querySelector(".modal-dialog").scrollTop = 0;
  }

  function closeModal() {
    els.modal.classList.remove("open");
    els.modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (location.hash.startsWith("#cmd=")) {
      history.replaceState(null, "", location.pathname + location.search);
    }
    els.searchInput.focus();
  }

  // ---------- 复制 ----------
  function copyText(text, btn) {
    const done = () => {
      const old = btn.textContent;
      btn.textContent = "已复制 ✓";
      btn.classList.add("copied");
      setTimeout(() => {
        btn.textContent = old;
        btn.classList.remove("copied");
      }, 1400);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else {
      fallbackCopy(text, done);
    }
  }

  function fallbackCopy(text, done) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); done(); } catch (e) { /* ignore */ }
    document.body.removeChild(ta);
  }

  // ---------- 事件绑定 ----------
  els.searchInput.addEventListener("input", () => {
    state.query = els.searchInput.value;
    els.clearBtn.hidden = state.query.length === 0;
    renderGrid();
  });

  els.clearBtn.addEventListener("click", () => {
    els.searchInput.value = "";
    state.query = "";
    els.clearBtn.hidden = true;
    renderGrid();
    els.searchInput.focus();
  });

  els.categoryChips.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    state.category = chip.dataset.category;
    setChipActive();
    renderGrid();
  });

  els.commandGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) openDetail(card.dataset.name);
  });

  els.modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) {
      closeModal();
      return;
    }
    const copyBtn = e.target.closest("[data-copy]");
    if (copyBtn) copyText(copyBtn.dataset.copy, copyBtn);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
      e.preventDefault();
      els.searchInput.focus();
    }
    if (e.key === "Escape") {
      if (els.modal.classList.contains("open")) {
        closeModal();
      } else if (els.searchInput.value) {
        els.clearBtn.click();
      }
    }
  });

  els.resetBtn.addEventListener("click", () => {
    els.searchInput.value = "";
    state.query = "";
    state.category = "全部";
    els.clearBtn.hidden = true;
    render();
    els.searchInput.focus();
  });

  // ---------- 初始化 ----------
  const totalCats = CATEGORIES.length;
  els.heroStats.innerHTML =
    `📦 已收录 <strong>${COMMANDS.length}</strong> 条常用命令，覆盖 ${totalCats} 个分类`;

  const hashCmd = decodeURIComponent(location.hash.replace(/^#cmd=/, ""));
  const initial = COMMANDS.find((c) => c.name === hashCmd);

  render();
  if (initial) openDetail(initial.name);
})();
