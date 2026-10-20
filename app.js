import { lessons, groups, CONTENT_REVISION } from './data/lessons.js';
import { quizGuides } from './data/quiz-guides.js';

const main = document.querySelector('#main');
const KEY = 'lingolab.v1';
const esc = (value = '') => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const normalize = text => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
let storageAvailable = true;
let contentUpdated = false;
let state = { contentRevision: CONTENT_REVISION, progress: {}, last: null };
try {
  const loaded = JSON.parse(localStorage.getItem(KEY) || 'null');
  if (loaded && typeof loaded === 'object') {
    const sameContent = loaded.contentRevision === CONTENT_REVISION;
    for (const lesson of lessons) {
      const saved = loaded.progress?.[lesson.id];
      if (!saved || typeof saved !== 'object') continue;
      const done = Array.isArray(saved.done) ? saved.done.filter(x => activityKeys(lesson).includes(x) && (sameContent || (x !== 'quiz' && !(lesson.group === 'textbook' && x === 'reading')))) : [];
      if (!sameContent) contentUpdated = true;
      const seen = Array.isArray(saved.seen) ? [...new Set(saved.seen.filter(x => Number.isInteger(x) && x >= 0 && x < lesson.vocabulary.length))] : [];
      const drafts = Object.fromEntries(['enVi', 'viEn'].map(k => [k, typeof saved.drafts?.[k] === 'string' ? saved.drafts[k].slice(0, 12000) : '']));
      const validAnswers = sameContent && Array.isArray(saved.answers) ? lesson.quiz.map((question, i) => Number.isInteger(saved.answers[i]) && saved.answers[i] >= 0 && saved.answers[i] < question.options.length ? saved.answers[i] : null) : lesson.quiz.map(() => null);
      const submitted = sameContent && saved.submitted === true && validAnswers.every(x => x !== null);
      state.progress[lesson.id] = { done: [...new Set(done)], seen, drafts, answers: validAnswers, submitted,
        attempts: sameContent && Number.isInteger(saved.attempts) && saved.attempts >= 0 ? saved.attempts : 0,
        best: sameContent && Number.isInteger(saved.best) && saved.best >= 0 && saved.best <= lesson.quiz.length ? saved.best : null };
    }
    if (lessons.some(l => l.id === loaded.last?.id)) {
      const lesson = lessons.find(l => l.id === loaded.last.id);
      state.last = { id: lesson.id, tab: activityKeys(lesson).includes(loaded.last.tab) ? loaded.last.tab : 'reading' };
    }
  }
} catch { storageAvailable = false; }

let route = {};
let catalogFilter = 'all';
let catalogSearch = '';
let flashIndex = 0;
let flashFlipped = false;
let showReference = false;
let focusTab = false;

function activityKeys(lesson) { return lesson.group === 'reading' ? ['reading', 'vocab', 'enVi', 'viEn', 'quiz'] : ['reading', 'vocab', 'quiz']; }
function getProgress(id) { return state.progress[id] || { done: [], seen: [], drafts: {}, answers: [], submitted: false, attempts: 0, best: null }; }
function ensureProgress(id) { return state.progress[id] ||= { done: [], seen: [], drafts: {}, answers: [], submitted: false, attempts: 0, best: null }; }
function percent(lesson) { return Math.round(getProgress(lesson.id).done.length / activityKeys(lesson).length * 100); }
function save() {
  if (!storageAvailable) return;
  try { localStorage.setItem(KEY, JSON.stringify(state)); }
  catch { storageAvailable = false; showStorageNotice(); }
}
function announce(message) { document.querySelector('#announcer').textContent = message; }
function showStorageNotice() {
  if (storageAvailable || main.querySelector('.storage-notice')) return;
  main.insertAdjacentHTML('afterbegin', '<div class="shell"><p class="storage-notice" role="status">Trình duyệt chưa cho phép lưu tiến độ. Bạn vẫn có thể học trong phiên này; kết quả có thể mất khi tải lại trang.</p></div>');
}
function markDone(lesson, key) {
  const progress = ensureProgress(lesson.id);
  if (!progress.done.includes(key)) progress.done.push(key);
  save();
  updateLessonProgress(lesson);
}
function progressBar(value) { return `<div class="mini-progress" role="progressbar" aria-label="Tiến độ bài học" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${value}"><span style="width:${value}%"></span></div>`; }
function icon(name) {
  const paths = { book: '<path d="M3 5c3-1 6-1 9 1 3-2 6-2 9-1v15c-3-1-6-1-9 1-3-2-6-2-9-1zM12 6v15"/>', globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>', check: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="m7 12 3 3 7-7"/>', device: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 18h4"/>', search: '<circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/>' };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${paths[name] || paths.book}</svg>`;
}

function artwork(type) {
  const art = {
    egypt: '<circle cx="145" cy="47" r="25" fill="#e5b34c"/><path d="m24 120 57-83 58 83z" fill="#c8975d"/><path d="m81 37 7 83h51z" fill="#a57448"/><path d="m100 120 40-58 41 58z" fill="#dfbe7c"/><path d="m140 62 5 58h36z" fill="#bc955c"/><path d="M14 121h177M33 131h143" stroke="#8e9e78"/>',
    rivers: '<path d="M28 13c60 15 7 47 56 65s4 38 48 61M94 9c58 26 7 39 51 64s-1 44 36 67" stroke="#7eaa9c" stroke-width="14"/><path d="M22 13c60 15 7 47 56 65s4 38 48 61M88 9c58 26 7 39 51 64s-1 44 36 67" stroke="#e2eee1" stroke-width="2"/><path d="M89 83h44v35H89zM96 67h30v16H96zM103 54h17v13h-17z" fill="#c5a177" stroke="#88794e"/><circle cx="38" cy="108" r="7" fill="#94a975"/>',
    city: '<path d="M24 124V66h36v58M67 124V43h49v81M123 124V75h48v49" fill="#caa77b" stroke="#9c865f"/><path d="M18 124h163M67 52h49M67 63h49M67 74h49M67 85h49M78 43v81M91 43v81M104 43v81" stroke="#967d53"/><path d="M34 82h15v15H34zM135 90h20v18h-20z" fill="#ede6c9"/><circle cx="158" cy="40" r="18" fill="#e5bf70"/>',
    wall: '<path d="m23 116 38-48 42 28 36-48 42 31v50H23z" fill="#bdcaa8"/><path d="m22 88 32-12 28 11 37-23 35 12 29-20v26l-29 20-35-12-37 23-28-11-32 12z" fill="#b89a70" stroke="#8c7956"/><path d="M48 60h23v24H48zM109 48h24v22h-24zM151 50h22v23h-22z" fill="#d2b68a" stroke="#8c7956"/><path d="M48 60v-9h7v9h8v-9h8v9M109 48v-8h7v8h9v-8h8v8" stroke="#8c7956" fill="none"/>',
    columns: '<path d="m29 52 71-32 71 32z" fill="#c1a073"/><path d="M24 55h153v9H24zM21 124h160v10H21z" fill="#b89b6b"/><path d="M38 65h18v59H38zM73 65h18v59H73zM108 65h18v59h-18zM143 65h18v59h-18z" fill="#ddc8a1" stroke="#b89b6b"/><path d="M47 70v49M82 70v49M117 70v49M152 70v49" stroke="#bdab86"/>',
    compass: '<circle cx="100" cy="77" r="57" fill="#f7f3df" stroke="#82967b"/><circle cx="100" cy="77" r="46" stroke="#c2cbb0"/><path d="m100 30 10 37 35 10-35 10-10 37-10-37-35-10 35-10z" fill="#244b3e"/><path d="m100 30 10 37-10 10-10-10z" fill="#dc764d"/><circle cx="100" cy="77" r="5" fill="#e8cc7f"/><path d="M28 27 18 17m154 110 10 10M27 128l-10 9" stroke="#9aa78b"/>',
    factory: '<circle cx="154" cy="41" r="25" fill="#e7c779"/><path d="M29 123V82l40-23v23l40-23v23l40-23v64z" fill="#b6b898" stroke="#7c8f76"/><path d="M142 88V33h15v90" fill="#73927d"/><path d="M45 95h13v17H45zM78 95h13v17H78zM111 95h13v17h-13z" fill="#eef0df"/><path d="M148 21c-17-6 2-17-11-23" stroke="#a6b6a0" stroke-width="6"/>',
    vietnam: '<circle cx="100" cy="77" r="56" fill="#d8bf8f" stroke="#9c885e"/><circle cx="100" cy="77" r="43" stroke="#9c885e"/><circle cx="100" cy="77" r="26" stroke="#9c885e"/><path d="m100 53 5 15 15-2-10 12 8 14-16-5-12 12 1-17-15-8 17-4z" fill="#9f8050"/><path d="m66 25 8 13m52 0 8-13M47 77h14m78 0h14M65 127l9-13m51 0 9 13" stroke="#9f8050" stroke-width="3"/>',
    book: '<path d="M99 36C76 22 47 24 25 35v86c25-11 49-9 74 4 25-13 50-15 76-4V35c-25-11-53-13-76 1z" fill="#fffaf0" stroke="#927b5b" stroke-width="1.5"/><path d="M99 36v89M39 49h41M39 60h41M39 71h32M116 49h43M116 60h43M116 91h43M116 102h30" stroke="#b9ab8c" stroke-width="2"/><rect x="39" y="86" width="40" height="23" fill="#d1dab4"/><path d="M139 28v36l8-6 8 6V29" fill="#d97c53"/>',
    notes: '<rect x="43" y="17" width="112" height="119" rx="3" fill="#fffaf0" stroke="#aa9774"/><path d="M60 39h70M60 48h46M60 66h79M60 77h79M60 89h55M60 115h65" stroke="#c1b190" stroke-width="2"/><path d="M58 65h84" stroke="#ddc37a" stroke-width="8" opacity=".5"/><path d="m139 113 35-63 7 4-35 63-9 8z" fill="#c3825e" stroke="#8f7555"/>',
    plan: '<rect x="44" y="25" width="110" height="111" rx="5" fill="#fffaf0" stroke="#aa9774"/><rect x="77" y="18" width="46" height="16" rx="4" fill="#8ca27b"/><path d="M78 55h58M78 79h58M78 103h43" stroke="#b5aa8f" stroke-width="3"/><path d="m57 53 5 5 8-9m-13 28 5 5 8-9m-13 28 5 5 8-9" stroke="#6b8a58" stroke-width="2"/>',
    kwl: '<rect x="16" y="35" width="167" height="90" rx="4" fill="#fffaf0" stroke="#a99572"/><path d="M16 63h167M71 35v90M127 35v90" stroke="#a99572"/><text x="37" y="55" font-size="18" font-family="Georgia" fill="#244b3e">K</text><text x="89" y="55" font-size="18" font-family="Georgia" fill="#b15b36">W</text><text x="148" y="55" font-size="18" font-family="Georgia" fill="#244b3e">L</text><path d="M27 79h32M27 91h24M82 79h33M82 91h20M138 79h32M138 91h24M138 103h28" stroke="#c1b394" stroke-width="2"/>',
    jigsaw: '<path d="M49 26h45v18c22-14 27 20 0 13v20H73c12 23-21 27-14 0H39V35a9 9 0 0 1 10-9z" fill="#8da681" stroke="#687e60"/><path d="M109 30h44a9 9 0 0 1 10 9v40h-19c12 24-20 27-14 0h-21V60c24 10 27-20 0-14z" fill="#d5b780" stroke="#a89061"/><path d="M39 91h20c-7 26 26 22 14 0h21v20c23-11 26 22 0 14v18H49a10 10 0 0 1-10-10z" fill="#d79c79" stroke="#ad7959"/>',
    flipped: '<rect x="35" y="29" width="128" height="85" rx="5" fill="#fffaf0" stroke="#9a8c6d"/><rect x="44" y="38" width="110" height="65" fill="#d5ddc3"/><circle cx="99" cy="70" r="21" fill="#244b3e"/><path d="m94 59 16 11-16 11z" fill="#e6edb8"/><path d="m26 122 147 0 9 9H17z" fill="#a6b89a"/><path d="M20 61C10 13 123-7 162 15m0 0-5-13m5 13-15 3" stroke="#b77c51" stroke-width="2"/>'
  };
  return `<svg viewBox="0 0 200 150" fill="none" aria-hidden="true">${art[type] || art.book}</svg>`;
}

function card(lesson) {
  const index = lessons.filter(l => l.group === lesson.group).findIndex(l => l.id === lesson.id) + 1;
  const value = percent(lesson);
  return `<a class="course-card" href="#/lesson/${lesson.id}" aria-label="${esc(lesson.title)} — ${esc(lesson.subtitle)}${value ? `, tiến độ ${value}%` : ''}">
    <div class="card-art ${lesson.group}"><span class="lesson-number">LESSON ${String(index).padStart(2, '0')}</span>${artwork(lesson.art)}<span class="art-tag">${lesson.group === 'reading' ? 'Read & discover' : 'Learn how to learn'}</span></div>
    <div class="card-body"><div class="card-topic">${esc(lesson.topic)}</div><h3>${esc(lesson.title)}</h3><p class="card-subtitle">${esc(lesson.subtitle)}</p><div class="card-footer"><span>${lesson.minutes} phút · ${lesson.vocabulary.length} từ · ${lesson.quiz.length} câu hỏi</span><strong>${value === 100 ? 'Đã hoàn thành ✓' : value ? `Tiếp tục ${value}% →` : 'Vào học ↗'}</strong></div>${value ? progressBar(value) : ''}</div></a>`;
}

function libraryMarkup(full = false) {
  return `<section class="library ${full ? '' : 'section'}" id="library" aria-labelledby="library-title"><div class="section-heading"><div><div class="eyebrow">THƯ VIỆN BÀI HỌC</div><h2 id="library-title">Hôm nay, bạn muốn khám phá gì?</h2></div>${full ? '' : '<a class="text-link" href="#/courses">Xem tất cả bài học <span aria-hidden="true">↗</span></a>'}</div>
    <div class="library-toolbar"><div class="filters" role="group" aria-label="Lọc nhóm bài học"><button class="filter" data-filter="all">Tất cả</button><button class="filter" data-filter="reading">Tiếng Anh qua bài đọc</button><button class="filter" data-filter="textbook">Khám phá sách giáo khoa</button></div><label class="search-wrap"><span class="sr-only">Tìm bài học theo tên hoặc chủ đề</span>${icon('search')}<input type="search" id="search" placeholder="Tìm một chủ đề…" value="${esc(catalogSearch)}" autocomplete="off"></label></div>
    <p class="catalog-meta" id="catalog-meta" role="status"></p><div class="cards" id="cards"></div></section>`;
}

function homeMarkup() {
  const count = lessons.length;
  return `<div class="shell"><section class="hero"><div class="hero-copy"><div class="eyebrow">A LITTLE ENGLISH. A BIGGER WORLD.</div><h1>Học tiếng Anh.<br>Mở thêm một<br><em>thế giới.</em></h1><p class="hero-description">Từ những nền văn minh đầu tiên đến từng trang sách. Học từ vựng, luyện dịch và đọc hiểu qua những điều đáng để khám phá.</p><div class="hero-actions"><a class="button" href="#/lesson/egypt">Bắt đầu khám phá <span aria-hidden="true">↗</span></a><a class="text-link" href="#/courses">Xem bài học <span aria-hidden="true">→</span></a></div><div class="hero-bottom"><div class="tiny-squares" aria-hidden="true"><span>A</span><span>文</span><span>α</span></div><span>${count} bài học · 2 lộ trình · Theo nhịp độ của bạn</span></div></div><div class="hero-art"><img src="./assets/learning-world.svg" width="680" height="590" alt="Sách mở ra thế giới lịch sử với kim tự tháp, la bàn và thẻ từ vựng."></div></section></div>
    <div class="ribbon"><div class="shell ribbon-inner"><span>${icon('book')}Từ tài liệu đến bài học</span><span>${icon('globe')}Luyện dịch Anh ↔ Việt</span><span>${icon('check')}Quiz có giải thích</span><span>${icon('device')}Lưu tiến độ trên thiết bị</span></div></div>
    <div class="shell"><section class="section" aria-labelledby="pathways-title"><div class="section-heading"><div><div class="eyebrow">CHỌN LỐI ĐI CỦA BẠN</div><h2 id="pathways-title">Hai lộ trình. Một sự tò mò.</h2></div><p>Học một ngôn ngữ mới, cũng là học cách nhìn thế giới bằng một góc khác.</p></div><div class="pathways">${Object.entries(groups).map(([key, group]) => `<a class="pathway" href="#/courses?group=${key}"><div class="pathway-top"><span class="pathway-number">${group.folder} /</span><span class="pill">${lessons.filter(l => l.group === key).length} bài học</span></div><h3>${group.label}</h3><p>${group.description}</p><div class="pathway-bottom"><span>${key === 'reading' ? 'Đọc hiểu · Từ vựng · Dịch hai chiều' : 'Thuật ngữ · Cấu trúc · Phương pháp học'}</span><span class="circle-arrow" aria-hidden="true">↗</span></div></a>`).join('')}</div></section>
    ${libraryMarkup()}
    <section class="method" aria-labelledby="method-title"><div class="method-intro"><div class="eyebrow">MỖI BÀI HỌC, MỘT HÀNH TRÌNH</div><h2 id="method-title">Hiểu sâu hơn.<br>Nhớ tự nhiên hơn.</h2><p>Không chỉ ghi nhớ một từ. Hãy gặp từ đó trong câu chuyện, thử dùng nó, rồi tự kiểm tra điều mình hiểu.</p></div><div class="method-steps"><div><div class="step-number">01.</div><h3>Đọc & khám phá</h3><p>Bắt đầu từ một chủ đề có ngữ cảnh và nguồn tài liệu rõ ràng.</p></div><div><div class="step-number">02.</div><h3>Học & thực hành</h3><p>Lật thẻ từ vựng. Luyện dịch hai chiều ở lộ trình bài đọc.</p></div><div><div class="step-number">03.</div><h3>Thử & hiểu lại</h3><p>Làm quiz, đọc giải thích và quay lại những điều cần ôn.</p></div></div></section>
    <section class="study-banner"><span class="banner-symbol" aria-hidden="true">✳</span><div class="banner-copy"><h2>Một chút mỗi ngày, một bước xa hơn.</h2><p>Góc học tập giúp bạn tiếp nối bài đang học. Tiến độ được lưu trên trình duyệt của thiết bị này.</p></div><a class="button button-light" href="#/progress">Góc học tập của tôi <span aria-hidden="true">↗</span></a></section></div>`;
}

function updateCatalog() {
  const target = document.querySelector('#cards');
  if (!target) return;
  const search = normalize(catalogSearch.trim());
  const matches = lessons.filter(l => (catalogFilter === 'all' || l.group === catalogFilter) && normalize(`${l.title} ${l.subtitle} ${l.topic} ${l.description} ${groups[l.group].short}`).includes(search));
  target.innerHTML = matches.length ? matches.map(card).join('') : '<div class="empty"><h3>Chưa tìm thấy chủ đề này</h3><p>Thử tên tiếng Anh, tiếng Việt hoặc chọn một lộ trình khác.</p><button class="button button-outline" data-action="clear-search">Xóa bộ lọc</button></div>';
  document.querySelector('#catalog-meta').textContent = `${matches.length} / ${lessons.length} bài học${catalogFilter === 'all' ? ' · Hai lộ trình để khám phá' : ` · ${groups[catalogFilter].short}`}`;
  document.querySelectorAll('[data-filter]').forEach(button => { button.classList.toggle('active', button.dataset.filter === catalogFilter); button.setAttribute('aria-pressed', button.dataset.filter === catalogFilter); });
}

function tabLabel(lesson, key) { return ({ reading: lesson.group === 'reading' ? 'Bài đọc' : 'Khám phá', vocab: 'Từ vựng', enVi: 'Anh → Việt', viEn: 'Việt → Anh', quiz: 'Trắc nghiệm' })[key]; }
function tabMarkup(lesson) {
  return activityKeys(lesson).map(key => `<a role="tab" id="tab-${key}" class="tab" href="#/lesson/${lesson.id}/${key}" aria-controls="activity" aria-selected="${route.tab === key}" tabindex="${route.tab === key ? '0' : '-1'}">${tabLabel(lesson, key)}${getProgress(lesson.id).done.includes(key) ? '<span class="done" aria-label="đã hoàn thành">✓</span>' : ''}</a>`).join('');
}
function lessonMarkup(lesson) {
  const groupLessons = lessons.filter(l => l.group === lesson.group);
  return `<div class="shell"><div class="page-top"><div class="breadcrumb"><a href="#/courses">Bài học</a><span aria-hidden="true">/</span><a href="#/courses?group=${lesson.group}">${groups[lesson.group].short}</a><span aria-hidden="true">/</span><span>${esc(lesson.title)}</span></div></div>
    <div class="lesson-layout"><aside class="lesson-sidebar" aria-label="Các bài cùng lộ trình"><div class="sidebar-label">LỘ TRÌNH ${groups[lesson.group].folder}</div><div class="sidebar-links">${groupLessons.map((l, i) => `<a href="#/lesson/${l.id}" class="${l.id === lesson.id ? 'active' : ''}" ${l.id === lesson.id ? 'aria-current="page"' : ''}><span>${String(i + 1).padStart(2, '0')}</span>${esc(l.title)}</a>`).join('')}</div><div class="sidebar-progress" id="sidebar-progress"></div></aside>
    <article class="lesson-main"><div class="lesson-title-row"><div><div class="eyebrow">${esc(lesson.topic)}</div><h1>${esc(lesson.title)}</h1><p>${esc(lesson.subtitle)}</p></div><div class="lesson-visual">${artwork(lesson.art)}</div></div><div class="lesson-meta"><span>◷ ${lesson.minutes} phút</span><span>${lesson.vocabulary.length} từ vựng</span><span>${lesson.quiz.length} câu hỏi</span><span id="lesson-percent"></span></div><div class="tabs" role="tablist" aria-label="Các hoạt động trong bài">${tabMarkup(lesson)}</div><section id="activity" class="panel" role="tabpanel" aria-labelledby="tab-${route.tab}" tabindex="0"></section>${sourceMarkup(lesson)}</article></div></div>`;
}
function sourceMarkup(lesson) {
  return `<details class="source-details"><summary>Nguồn bài học & cách biên soạn</summary><p>Nội dung và câu hỏi được biên soạn lại cho mục đích học ngôn ngữ; các bản dịch là tham khảo, không phải đáp án duy nhất.</p><ul>${lesson.sources.map(s => `<li><strong>${esc(s.file)}</strong>${s.pages ? ` · ${esc(s.pages)}` : ''}${s.section ? `<br>${esc(s.section)}` : ''}</li>`).join('')}</ul><a class="text-link" href="#/sources">Xem phạm vi tài liệu →</a></details>`;
}
function updateLessonProgress(lesson) {
  const value = percent(lesson);
  const sidebar = document.querySelector('#sidebar-progress');
  if (sidebar) sidebar.innerHTML = `<p><span>Tiến độ bài này</span><strong>${value}%</strong></p>${progressBar(value)}<p class="small" style="margin-top:12px">Lưu trên thiết bị hiện tại.</p>`;
  const label = document.querySelector('#lesson-percent');
  if (label) label.textContent = `${value}% hoàn thành`;
  const tabs = document.querySelector('.tabs');
  if (tabs) tabs.innerHTML = tabMarkup(lesson);
}
function readingMarkup(lesson) {
  const done = getProgress(lesson.id).done.includes('reading');
  const support = lesson.readingSupport ? `<details class="reading-support"><summary>Hỗ trợ đọc bằng tiếng Việt</summary><div lang="vi">${lesson.readingSupport.map(p => `<p>${esc(p)}</p>`).join('')}</div></details>` : '';
  return `<div class="panel-heading"><h2 lang="en">${lesson.group === 'reading' ? 'Read the story' : 'Explore the concepts'}</h2><span class="pill">${lesson.group === 'reading' ? 'ENGLISH READING' : 'ENGLISH IN EDUCATION'}</span></div><div class="reading-text" lang="en">${lesson.reading.map(p => `<p>${esc(p)}</p>`).join('')}</div>${support}${lesson.group === 'textbook' ? '<div class="content-note">Đọc phần tiếng Anh trước; mở hỗ trợ tiếng Việt khi cần. Mỗi thẻ từ vựng giải thích nghĩa, chức năng và ví dụ. Bài trắc nghiệm dùng tiếng Anh để luyện nhận diện và vận dụng thuật ngữ.</div>' : ''}<div class="panel-actions"><button class="button button-outline" data-action="read-done">${done ? 'Đã đọc xong ✓' : 'Tôi đã đọc xong ✓'}</button><a class="text-link" href="#/lesson/${lesson.id}/vocab">Khám phá từ vựng →</a></div>`;
}
function vocabMarkup(lesson) {
  const word = lesson.vocabulary[flashIndex];
  const seen = getProgress(lesson.id).seen;
  const allSeen = seen.length === lesson.vocabulary.length;
  return `<div class="panel-heading"><h2>Gặp một từ, hiểu một ý.</h2><span class="pill">${seen.length}/${lesson.vocabulary.length} THẺ ĐÃ XEM</span></div><button id="flashcard" class="flashcard ${flashFlipped ? 'flipped' : ''}" data-action="flip" aria-label="${flashFlipped ? 'Xem lại từ tiếng Anh' : `Lật thẻ để xem nghĩa của ${esc(word.term)}`}" aria-pressed="${flashFlipped}"><span class="flash-label">${flashFlipped ? 'NGHĨA & NGỮ CẢNH' : esc(word.type)}</span><span class="flash-term" ${flashFlipped ? '' : 'lang="en"'}>${esc(flashFlipped ? word.meaning : word.term)}</span><span class="flash-example" lang="en">${esc(word.example)}</span>${flashFlipped && word.note ? `<span class="flash-note">${esc(word.note)}</span>` : ''}<span class="small muted" style="margin-top:22px">${flashFlipped ? 'Nhấn để xem lại từ' : 'Nhấn để lật thẻ ↻'}</span></button><div class="flash-controls"><button class="icon-button" data-action="prev-card" aria-label="Thẻ trước">←</button><span class="small muted" aria-live="polite">Thẻ ${flashIndex + 1} / ${lesson.vocabulary.length} ${seen.includes(flashIndex) ? '· Đã xem ✓' : ''}</span><button class="icon-button" data-action="next-card" aria-label="Thẻ tiếp theo">→</button></div>${allSeen ? '<p class="content-note" role="status">Bạn đã xem nghĩa của tất cả thẻ. Hoạt động từ vựng đã được ghi nhận ✓</p>' : '<p class="small muted">Lật từng thẻ để xem nghĩa và ghi nhận tiến độ. Dùng ← / → khi đang chọn thẻ để chuyển từ.</p>'}<details class="word-list"><summary>Xem danh sách ${lesson.vocabulary.length} từ và ví dụ</summary>${lesson.vocabulary.map(w => `<div class="vocab-item"><div><strong lang="en">${esc(w.term)}</strong><div class="word-type">${esc(w.type)}</div></div><div><b class="small">${esc(w.meaning)}</b><p lang="en">${esc(w.example)}</p>${w.note ? `<p class="muted">${esc(w.note)}</p>` : ''}</div></div>`).join('')}</details><div class="panel-actions"><a class="text-link" href="#/lesson/${lesson.id}/${lesson.group === 'reading' ? 'enVi' : 'quiz'}">${lesson.group === 'reading' ? 'Thử dịch Anh → Việt' : 'Làm trắc nghiệm'} →</a></div>`;
}
function referenceMarkup(lesson, key) {
  const data = lesson[key];
  const done = getProgress(lesson.id).done.includes(key);
  return `<div class="reference"><h3>Bản dịch tham khảo</h3><p ${key === 'viEn' ? 'lang="en"' : ''}>${esc(data.reference)}</p><ul>${data.notes.map(n => `<li>${esc(n)}</li>`).join('')}</ul><p class="small muted">Có nhiều cách dịch đúng. Hãy đối chiếu ý nghĩa, thì và cách dùng từ; bản dịch của bạn không cần giống từng chữ.</p><button class="button button-outline" data-action="translation-done">${done ? 'Đã tự đối chiếu ✓' : 'Tôi đã tự đối chiếu ✓'}</button></div>`;
}
function translationMarkup(lesson, key) {
  const data = lesson[key];
  const draft = getProgress(lesson.id).drafts[key] || '';
  return `<div class="panel-heading"><h2>${key === 'enVi' ? 'Từ câu chuyện đến tiếng Việt' : 'Thử diễn đạt bằng tiếng Anh'}</h2><span class="pill">${key === 'enVi' ? 'ANH → VIỆT' : 'VIỆT → ANH'}</span></div><p class="translation-prompt ${key === 'viEn' ? 'vi' : ''}" ${key === 'enVi' ? 'lang="en"' : ''}>${esc(data.prompt)}</p><label class="field-label" for="translation">Bản dịch ${key === 'enVi' ? 'tiếng Việt' : 'tiếng Anh'} của bạn</label><textarea class="translation-input" id="translation" maxlength="12000" placeholder="Viết bản dịch của bạn tại đây…" ${key === 'viEn' ? 'lang="en" spellcheck="true"' : ''}>${esc(draft)}</textarea><p class="input-status" id="draft-status">${storageAvailable ? 'Bản nháp được lưu trên trình duyệt này.' : 'Bản nháp chỉ được giữ trong phiên này.'}</p><div class="panel-actions"><div class="translation-actions"><button class="button" data-action="show-reference" ${draft.trim() ? '' : 'disabled'}>Xem bản dịch tham khảo <span aria-hidden="true">↗</span></button><button class="button button-outline" data-action="retry-translation">Làm lại <span aria-hidden="true">↻</span></button></div><span class="small muted">Tự đối chiếu · Không chấm điểm tự động</span></div><div id="reference">${showReference && draft.trim() ? referenceMarkup(lesson, key) : ''}</div><div class="panel-actions"><a class="text-link" href="#/lesson/${lesson.id}/${key === 'enVi' ? 'viEn' : 'quiz'}">${key === 'enVi' ? 'Tiếp tục Việt → Anh' : 'Làm bài đọc hiểu'} →</a></div>`;
}

function optionOrder(lesson, questionIndex) {
  const order = lesson.quiz[questionIndex].options.map((_, i) => i);
  const seed = [...lesson.id].reduce((sum, c) => sum + c.charCodeAt(0), 0) + questionIndex * 13 + getProgress(lesson.id).attempts * 7;
  // Rotate and sometimes reverse options to avoid a fixed answer-position pattern.
  const rotated = order.slice(seed % order.length).concat(order.slice(0, seed % order.length));
  return seed % 3 === 0 ? rotated.reverse() : rotated;
}

function feedbackMarkup(lesson, question, index, order) {
  const guide = quizGuides[question.prompt];
  const selected = getProgress(lesson.id).answers[index];
  const correct = selected === question.answer;
  const letter = optionIndex => String.fromCharCode(65 + order.indexOf(optionIndex));
  const correctText = question.options[question.answer];
  const remaining = order.filter(optionIndex => optionIndex !== question.answer && optionIndex !== selected);
  const paragraphs = [...new Set(guide.evidence.map(item => item.paragraph))].join(', ');
  return `<div class="feedback ${correct ? '' : 'wrong'}" lang="vi">
    <div class="feedback-status"><strong>${correct ? `Đúng ✓ · Đáp án ${letter(question.answer)}` : `Chưa đúng · Đáp án đúng: ${letter(question.answer)}`}</strong></div>
    <div class="answer-reason"><h3>Vì sao chọn ${letter(question.answer)}?</h3><p>${esc(guide.options[correctText].reason)}</p></div>
    ${correct ? '' : `<div class="chosen-reason"><h3>Bạn đã chọn ${letter(selected)}. Chỗ cần phân biệt:</h3><p>${esc(guide.options[question.options[selected]].reason)}</p></div>`}
    <details class="other-reasons"><summary>Vì sao ${remaining.length} lựa chọn còn lại chưa phù hợp?</summary><div class="reason-list">${remaining.map(optionIndex => `<div class="reason-item" data-option-index="${optionIndex}"><p class="reason-option"><b>${letter(optionIndex)}.</b> <span lang="en">${esc(question.options[optionIndex])}</span></p><p>${esc(guide.options[question.options[optionIndex]].reason)}</p></div>`).join('')}</div></details>
    <details class="evidence-details"><summary>Xem căn cứ trong bài · Đoạn ${paragraphs}</summary><div class="evidence-list">${guide.evidence.map(item => `<div class="evidence-item"><p class="evidence-label">Đoạn ${item.paragraph}</p><blockquote lang="en">${esc(item.quote)}</blockquote><p class="evidence-meaning">${esc(item.meaning)}</p></div>`).join('')}<a class="text-link" href="#/lesson/${lesson.id}/reading">Đọc lại ${lesson.group === 'reading' ? 'bài đọc' : 'phần khám phá'} →</a></div></details>
    <div class="language-support"><h3>Từ & cách diễn đạt cần nhớ</h3><dl>${guide.language.map(item => `<div><dt lang="en">${esc(item.term)}</dt><dd>${esc(item.meaning)}</dd></div>`).join('')}</dl></div>
  </div>`;
}

function questionMarkup(lesson, question, index) {
  const progress = getProgress(lesson.id);
  const guide = quizGuides[question.prompt];
  const order = optionOrder(lesson, index);
  return `<fieldset class="question"><legend lang="en"><span class="question-number">${String(index + 1).padStart(2, '0')}.</span>${esc(question.prompt)}</legend>
    ${progress.submitted ? `<p class="question-meaning" lang="vi"><strong>Nghĩa câu hỏi:</strong> ${esc(guide.questionMeaning)}</p>` : ''}
    <div class="options" lang="en">${order.map((optionIndex, position) => {
      const text = question.options[optionIndex];
      const isCorrect = optionIndex === question.answer;
      const isSelected = progress.answers[index] === optionIndex;
      const tag = isCorrect ? `Đáp án đúng${isSelected ? ' · Bạn chọn' : ''}` : isSelected ? 'Bạn chọn · Chưa phù hợp' : 'Lựa chọn chưa phù hợp';
      return `<label class="option ${progress.submitted && isCorrect ? 'correct' : progress.submitted && isSelected ? 'incorrect' : ''}" data-option-index="${optionIndex}">
        <input type="radio" name="question-${index}" value="${optionIndex}" ${isSelected ? 'checked' : ''} ${progress.submitted ? 'disabled' : ''}>
        <span class="option-letter">${String.fromCharCode(65 + position)}.</span><span class="option-content"><span class="option-english">${esc(text)}</span>${progress.submitted ? `<span class="option-meaning" lang="vi">${esc(guide.options[text].meaning)}</span><span class="option-tag" lang="vi">${tag}</span>` : ''}</span></label>`;
    }).join('')}</div>${progress.submitted ? feedbackMarkup(lesson, question, index, order) : ''}</fieldset>`;
}

function quizMarkup(lesson) {
  const progress = getProgress(lesson.id);
  const correct = lesson.quiz.reduce((sum, question, i) => sum + (progress.answers[i] === question.answer ? 1 : 0), 0);
  const score = progress.submitted ? `<div class="quiz-score" role="status"><div><strong>${correct} / ${lesson.quiz.length}</strong><p>${correct === lesson.quiz.length ? 'Bạn đã trả lời đúng tất cả. Tiếp tục khám phá nhé!' : 'Đọc giải thích bên dưới và thử lại khi sẵn sàng.'}</p></div><button class="button button-light" data-action="retry-quiz">Làm lại ↻</button></div>` : '';
  const action = progress.submitted ? '<a class="button button-outline" href="#/progress">Xem tiến độ học tập →</a>' : '<button class="button" type="submit">Kiểm tra đáp án <span aria-hidden="true">↗</span></button><p class="error-text" id="quiz-error" role="alert"></p>';
  return `<div class="panel-heading"><h2>${lesson.group === 'reading' ? 'Bạn đã hiểu câu chuyện đến đâu?' : 'Nhận diện đúng, hiểu chức năng.'}</h2><span class="pill">${lesson.quiz.length} CÂU HỎI</span></div>
    <p class="quiz-intro">Chọn một đáp án cho mỗi câu tiếng Anh. Sau khi nộp, bạn sẽ thấy nghĩa câu hỏi, nghĩa từng lựa chọn, lý do chọn/loại và căn cứ trong bài. Bạn có thể quay lại ${lesson.group === 'reading' ? 'Bài đọc' : 'Khám phá'} để tìm thông tin.${progress.best !== null ? ` Điểm tốt nhất: ${progress.best}/${lesson.quiz.length}.` : ''}</p>
    ${score}<form id="quiz-form">${lesson.quiz.map((question, i) => questionMarkup(lesson, question, i)).join('')}${action}</form>`;
}

function renderActivity() {
  const lesson = lessons.find(l => l.id === route.id);
  if (!lesson) return;
  const panel = document.querySelector('#activity');
  panel.setAttribute('aria-labelledby', `tab-${route.tab}`);
  panel.innerHTML = route.tab === 'reading' ? readingMarkup(lesson) : route.tab === 'vocab' ? vocabMarkup(lesson) : route.tab === 'quiz' ? quizMarkup(lesson) : translationMarkup(lesson, route.tab);
}

function progressMarkup() {
  const completed = lessons.filter(l => percent(l) === 100);
  const started = lessons.filter(l => state.progress[l.id]);
  const quizzes = lessons.filter(l => getProgress(l.id).best !== null);
  const average = quizzes.length ? Math.round(quizzes.reduce((sum, l) => sum + getProgress(l.id).best / l.quiz.length, 0) / quizzes.length * 100) : null;
  const last = lessons.find(l => l.id === state.last?.id);
  return `<div class="shell"><div class="page-top"><div class="eyebrow">GÓC HỌC TẬP CỦA BẠN</div><h1>Từng bước nhỏ, thêm một điều hay.</h1><p>Tiến độ và bản dịch nháp được lưu trên trình duyệt của thiết bị này. Bạn không cần đăng nhập để bắt đầu.</p></div><div class="stats"><div class="stat"><strong>${completed.length}<span style="display:inline;font-size:18px"> / ${lessons.length}</span></strong><span>Bài đã hoàn thành</span></div><div class="stat"><strong>${started.filter(l => percent(l) < 100).length}</strong><span>Bài đang khám phá</span></div><div class="stat"><strong>${average === null ? '—' : `${average}%`}</strong><span>Trung bình điểm quiz tốt nhất${quizzes.length ? ` · ${quizzes.length} bài` : ''}</span></div></div>${last ? `<div class="continue-box"><div><div class="eyebrow">TIẾP NỐI LẦN TRƯỚC</div><h3>${esc(last.title)}</h3><p>${esc(last.subtitle)} · ${percent(last)}% hoàn thành</p></div><a class="button" href="#/lesson/${last.id}/${state.last.tab}">Tiếp tục học →</a></div>` : '<div class="empty"><h3>Hành trình của bạn bắt đầu từ đây.</h3><p>Chọn một chủ đề yêu thích. Mỗi hoạt động hoàn thành sẽ được ghi lại.</p><a class="button" href="#/courses">Khám phá bài học ↗</a></div>'}<div class="progress-list">${started.map(l => `<div class="progress-row"><div><h3>${esc(l.title)}</h3><p>${getProgress(l.id).done.length}/${activityKeys(l).length} hoạt động${getProgress(l.id).best !== null ? ` · Quiz tốt nhất ${getProgress(l.id).best}/${l.quiz.length}` : ''}</p></div>${progressBar(percent(l))}<span>${percent(l)}%</span><a href="#/lesson/${l.id}">${percent(l) === 100 ? 'Ôn lại' : 'Tiếp tục'} →</a></div>`).join('')}</div><div class="content-note">Một bài hoàn thành khi bạn đã đọc nội dung, lật hết thẻ từ vựng và làm quiz. Với lộ trình bài đọc, hãy tự đối chiếu thêm cả hai bài dịch. Điểm quiz phản ánh kết quả trắc nghiệm, không dùng để chấm bài dịch.</div>${started.length ? '<div class="reset-row"><p>Xóa tiến độ cũng xóa bản dịch nháp và kết quả trên trình duyệt này.</p><button class="button button-outline button-small" data-action="reset-progress">Xóa dữ liệu học tập</button></div>' : ''}</div>`;
}

const sourceNotes = [
  ['1/Unit 1_EARLY CIVILIZATIONS_Text.docx', 'Các mục Mesopotamia, Ancient Egypt, Ancient India, Ancient China và phần thành bang Hy Lạp trong Ancient Greece and Rome. Biên soạn thành 5 bài. Đoạn nguồn về Hy Lạp không cung cấp bài riêng về La Mã.'],
  ['1/UNIT 2- EXPLORATIONS AND REVOLUTIONS - text.pdf', 'Trang PDF 1–3: Geography Explorations và Industrial Revolution in England. Biên soạn thành 2 bài đọc.'],
  ['1/Week 6-9_ Lesson 1_History of Vietnam.pdf', 'Trang PDF 1–2: chọn các đoạn về truyền thuyết nguồn gốc, Hai Bà Trưng, Ngô Quyền và Đinh Bộ Lĩnh. Biên soạn thành 1 bài; chưa dùng các chi tiết niên đại thiếu nhất quán khác trong bản nguồn.'],
  ['2/Macmillan_history7.pdf', 'Đã trích xuất 30 trang; bài cấu trúc chương sử dụng trang PDF 1–3 (trang in 177–179). Chưa chuyển toàn bộ nội dung lịch sử của sách thành bài học.'],
  ['2/McGrawHillGlencoe textbook.pdf', 'Đã trích xuất 14 trang; bài công cụ đọc dùng trang PDF 1–2 và 10 (trang in 294–295, 303).'],
  ['2/Lesson plan_Egypt.docx', 'Các mục Learning Outcome, SWBAT, Hook, Materials, Assessment và Closure, đặc biệt Lessons 1–2.'],
  ['2/kwl_chart.pdf', 'Trang PDF 1–3: mục đích, các bước dạy KWL và ví dụ. Các biến thể của KWL ở phần sau chưa được biên soạn riêng.'],
  ['2/FABJigsaw_Tipsheet.pdf', 'Trang PDF 1: khái niệm, mục đích và quy trình nhóm gốc/nhóm chuyên gia.'],
  ['2/The Flipped Classroom.pdf', 'Trang PDF 1–3: Flipped Class 101, lợi ích, nhịp độ học, phân hóa và cách theo dõi việc tương tác với video.']
];
function sourcesMarkup() {
  return `<div class="shell"><div class="sources-page"><div class="page-top"><div class="eyebrow">TÀI LIỆU & CÁCH BIÊN SOẠN</div><h1>Học có ngữ cảnh.<br>Nội dung có nguồn.</h1><p>LingoLab hiện có ${lessons.length} bài được biên soạn từ 9 tài liệu đã cung cấp. Đây là tuyển chọn phục vụ học tiếng Anh và hiểu thuật ngữ giáo dục, chưa phải bản chuyển đổi toàn bộ các sách.</p></div><h2>Hai lộ trình, hai mục đích</h2><p>Nhóm 1 dùng lịch sử làm ngữ cảnh để đọc, học từ và dịch hai chiều. Nhóm 2 phân tích các thành phần của sách, giáo án và phương pháp dạy học; phân biệt rõ cấu trúc sách với kỹ thuật tổ chức hoạt động.</p><h2>Tài liệu đã sử dụng</h2>${sourceNotes.map(([file, note]) => `<div class="source-entry"><strong>${esc(file)}</strong><p>${esc(note)}</p></div>`).join('')}<h2>Về bài đọc, bản dịch và câu hỏi</h2><p>Các bài đọc được biên soạn lại ở độ dài phù hợp; các ví dụ, bản dịch và câu hỏi được viết cho hoạt động luyện tập. Bản dịch tham khảo không phải cách diễn đạt đúng duy nhất. Quiz được chấm theo lựa chọn và luôn có giải thích.</p><div class="notice">Tài liệu lịch sử Việt Nam có một số chi tiết niên đại và cách diễn đạt cần đối chiếu. Bài hiện tại dùng các đoạn được chọn, phân biệt truyền thuyết với tường thuật lịch sử, và không sử dụng các chi tiết chưa thống nhất để đặt câu hỏi.</div><h2>Về tiến độ của bạn</h2><p>Dữ liệu học tập chỉ được lưu trong trình duyệt này. Xóa dữ liệu duyệt web, đổi trình duyệt hoặc đổi thiết bị có thể làm mất tiến độ. Website không có chức năng đăng nhập hoặc đồng bộ giữa các thiết bị.</p><div class="panel-actions"><a class="button" href="#/courses">Chọn một bài học ↗</a></div></div></div>`;
}

function parseRoute() {
  const [path, query = ''] = (location.hash.slice(1) || '/').split('?');
  const parts = path.split('/').filter(Boolean);
  return { page: parts[0] || 'home', id: parts[1], tab: parts[2] || 'reading', group: new URLSearchParams(query).get('group') };
}
function render() {
  const previous = route;
  route = parseRoute();
  const lesson = lessons.find(l => l.id === route.id);
  const sameLesson = route.page === 'lesson' && previous.page === 'lesson' && previous.id === route.id;
  if (route.page === 'lesson' && lesson) {
    if (!activityKeys(lesson).includes(route.tab)) { location.replace(`#/lesson/${lesson.id}/reading`); return; }
    if (!sameLesson) flashIndex = 0;
    flashFlipped = false;
    showReference = false;
    ensureProgress(lesson.id);
    state.last = { id: lesson.id, tab: route.tab };
    save();
    main.innerHTML = lessonMarkup(lesson);
    updateLessonProgress(lesson);
    renderActivity();
    document.title = `${lesson.title} · ${tabLabel(lesson, route.tab)} — LingoLab`;
  } else if (route.page === 'home') {
    catalogFilter = 'all'; catalogSearch = '';
    main.innerHTML = homeMarkup();
    updateCatalog();
    document.title = 'LingoLab — Một ngôn ngữ, nhiều thế giới';
  } else if (route.page === 'courses') {
    catalogFilter = groups[route.group] ? route.group : 'all'; catalogSearch = '';
    main.innerHTML = `<div class="shell"><div class="page-top"><div class="eyebrow">MỞ MỘT TRANG MỚI</div><h1>Một chủ đề hay.<br>Một lý do để học.</h1><p>Chọn một trong ${lessons.length} bài học. Bắt đầu từ điều bạn tò mò và học theo nhịp độ riêng.</p></div>${libraryMarkup(true)}<div class="content-note" style="margin-top:30px;margin-bottom:50px">Bài học được biên soạn từ tài liệu đã cung cấp. <a class="text-link" href="#/sources">Xem nguồn và phạm vi nội dung →</a></div></div>`;
    updateCatalog();
    document.title = 'Thư viện bài học — LingoLab';
  } else if (route.page === 'progress') {
    main.innerHTML = progressMarkup();
    document.title = 'Góc học tập — LingoLab';
  } else if (route.page === 'sources') {
    main.innerHTML = sourcesMarkup();
    document.title = 'Nội dung & tài liệu — LingoLab';
  } else {
    main.innerHTML = '<div class="shell loading-error"><h1>Trang này chưa có trong sổ.</h1><p class="muted" style="margin:25px 0">Bạn có thể quay lại thư viện để chọn một bài học.</p><a class="button" href="#/courses">Đến thư viện →</a></div>';
    document.title = 'Không tìm thấy bài học — LingoLab';
  }
  const currentNav = route.page === 'home' ? 'home' : ['courses', 'lesson'].includes(route.page) ? 'courses' : route.page;
  document.querySelectorAll('[data-nav]').forEach(link => { if (link.dataset.nav === currentNav) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current'); });
  showStorageNotice();
  if (contentUpdated) main.insertAdjacentHTML('afterbegin', '<div class="shell"><p class="content-note" role="status">Nội dung học đã được cập nhật. Hãy làm lại quiz và đọc lại phần khám phá của lộ trình sách giáo khoa. Bản dịch nháp và tiến độ từ vựng đã được giữ.</p></div>');
  if (!sameLesson) { window.scrollTo({ top: 0, behavior: 'instant' }); main.focus({ preventScroll: true }); }
  else if (focusTab) { document.querySelector(`#tab-${route.tab}`)?.focus(); focusTab = false; }
  else document.querySelector('#activity')?.focus({ preventScroll: true });
}

main.addEventListener('input', event => {
  if (event.target.id === 'search') { catalogSearch = event.target.value; updateCatalog(); }
  if (event.target.id === 'translation') {
    const lesson = lessons.find(l => l.id === route.id);
    const progress = ensureProgress(lesson.id);
    progress.drafts[route.tab] = event.target.value;
    // Editing a completed draft requires a fresh self-review.
    if (progress.done.includes(route.tab)) { progress.done = progress.done.filter(k => k !== route.tab); updateLessonProgress(lesson); }
    save();
    document.querySelector('#draft-status').textContent = storageAvailable ? 'Đã lưu bản nháp trên thiết bị này.' : 'Bản nháp chỉ được giữ trong phiên này.';
    document.querySelector('[data-action="show-reference"]').disabled = !event.target.value.trim();
    showReference = false;
    document.querySelector('#reference').innerHTML = '';
  }
});
main.addEventListener('change', event => {
  if (event.target.matches('input[type=radio]')) {
    const lesson = lessons.find(l => l.id === route.id);
    if (!lesson || getProgress(lesson.id).submitted) return;
    ensureProgress(lesson.id).answers[Number(event.target.name.split('-')[1])] = Number(event.target.value);
    save();
    const error = document.querySelector('#quiz-error'); if (error) error.textContent = '';
  }
});
main.addEventListener('submit', event => {
  if (event.target.id !== 'quiz-form') return;
  event.preventDefault();
  const lesson = lessons.find(l => l.id === route.id);
  const progress = ensureProgress(lesson.id);
  const missing = lesson.quiz.findIndex((_, i) => !Number.isInteger(progress.answers[i]));
  if (missing !== -1) {
    document.querySelector('#quiz-error').textContent = `Bạn chưa chọn đáp án cho câu ${missing + 1}. Hãy hoàn thành tất cả ${lesson.quiz.length} câu để kiểm tra.`;
    document.querySelector(`input[name="question-${missing}"]`)?.focus(); return;
  }
  progress.submitted = true;
  const correct = lesson.quiz.reduce((sum, question, i) => sum + (progress.answers[i] === question.answer ? 1 : 0), 0);
  progress.best = Math.max(progress.best || 0, correct);
  markDone(lesson, 'quiz');
  renderActivity();
  document.querySelector('#activity').focus({ preventScroll: true });
  announce(`Kết quả: ${correct} trên ${lesson.quiz.length} câu đúng. Đã hiển thị giải thích.`);
});
main.addEventListener('click', event => {
  const filter = event.target.closest('[data-filter]');
  if (filter) { catalogFilter = filter.dataset.filter; updateCatalog(); return; }
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const action = button.dataset.action;
  if (action === 'clear-search') { catalogFilter = 'all'; catalogSearch = ''; document.querySelector('#search').value = ''; updateCatalog(); document.querySelector('#search').focus(); return; }
  if (action === 'reset-progress') {
    if (confirm('Xóa toàn bộ tiến độ, bản dịch nháp và kết quả học tập trên trình duyệt này?')) {
      state = { contentRevision: CONTENT_REVISION, progress: {}, last: null }; contentUpdated = false; save(); render(); announce('Đã xóa dữ liệu học tập trên trình duyệt này.');
    }
    return;
  }
  const lesson = lessons.find(l => l.id === route.id);
  if (!lesson) return;
  if (action === 'read-done') { markDone(lesson, 'reading'); button.textContent = 'Đã đọc xong ✓'; announce('Đã ghi nhận hoạt động đọc.'); }
  if (action === 'flip') {
    flashFlipped = !flashFlipped;
    const progress = ensureProgress(lesson.id);
    if (flashFlipped && !progress.seen.includes(flashIndex)) {
      progress.seen.push(flashIndex);
      if (progress.seen.length === lesson.vocabulary.length) markDone(lesson, 'vocab'); else save();
    }
    renderActivity(); document.querySelector('#flashcard').focus({ preventScroll: true });
  }
  if (action === 'next-card' || action === 'prev-card') {
    flashIndex = (flashIndex + (action === 'next-card' ? 1 : -1) + lesson.vocabulary.length) % lesson.vocabulary.length;
    flashFlipped = false; renderActivity(); document.querySelector(`[data-action="${action}"]`).focus({ preventScroll: true });
  }
  if (action === 'show-reference') {
    if (!getProgress(lesson.id).drafts[route.tab]?.trim()) return;
    showReference = true;
    document.querySelector('#reference').innerHTML = referenceMarkup(lesson, route.tab);
    announce('Đã hiển thị bản dịch tham khảo và gợi ý diễn đạt.');
  }
  if (action === 'translation-done') {
    if (!showReference || !getProgress(lesson.id).drafts[route.tab]?.trim()) return;
    markDone(lesson, route.tab); button.textContent = 'Đã tự đối chiếu ✓'; announce('Đã ghi nhận hoạt động tự đối chiếu bản dịch.');
  }
  if (action === 'retry-translation' && ['enVi', 'viEn'].includes(route.tab)) {
    const progress = ensureProgress(lesson.id);
    progress.drafts[route.tab] = '';
    progress.done = progress.done.filter(key => key !== route.tab);
    showReference = false;
    save();
    updateLessonProgress(lesson);
    renderActivity();
    document.querySelector('#translation').focus({ preventScroll: true });
    announce('Đã xóa bản dịch và ẩn đáp án tham khảo. Bạn có thể dịch lại từ đầu.');
  }
  if (action === 'retry-quiz') {
    const progress = ensureProgress(lesson.id);
    progress.answers = []; progress.submitted = false; progress.attempts += 1;
    save(); renderActivity(); document.querySelector('#activity').focus({ preventScroll: true });
    announce('Đã bắt đầu lượt làm lại. Điểm tốt nhất vẫn được giữ.');
  }
});
main.addEventListener('keydown', event => {
  const tab = event.target.closest('[role=tab]');
  if (tab && ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
    event.preventDefault();
    const lesson = lessons.find(l => l.id === route.id);
    const keys = activityKeys(lesson);
    const index = keys.indexOf(route.tab);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? keys.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + keys.length) % keys.length;
    focusTab = true; location.hash = `/lesson/${lesson.id}/${keys[next]}`;
  }
  if (event.target.id === 'flashcard' && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
    event.preventDefault();
    const lesson = lessons.find(l => l.id === route.id);
    flashIndex = (flashIndex + (event.key === 'ArrowRight' ? 1 : -1) + lesson.vocabulary.length) % lesson.vocabulary.length;
    flashFlipped = false; renderActivity(); document.querySelector('#flashcard').focus({ preventScroll: true });
  }
});
window.addEventListener('hashchange', render);
render();
