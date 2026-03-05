// SVG座標変換: x = (lon - 129) * 46,  y = (45.5 - lat) * 46
const MAP_PREFS = [
  { id: 'hokkaido',   name: '北海道',   code: '016000', lat: 43.2, lon: 142.8 },
  { id: 'aomori',     name: '青森',     code: '020000', lat: 40.8, lon: 140.7 },
  { id: 'iwate',      name: '岩手',     code: '030000', lat: 39.7, lon: 141.2 },
  { id: 'miyagi',     name: '宮城',     code: '040000', lat: 38.3, lon: 141.0 },
  { id: 'akita',      name: '秋田',     code: '050000', lat: 39.7, lon: 140.1 },
  { id: 'yamagata',   name: '山形',     code: '060000', lat: 38.4, lon: 140.3 },
  { id: 'fukushima',  name: '福島',     code: '070000', lat: 37.4, lon: 140.5 },
  { id: 'ibaraki',    name: '茨城',     code: '080000', lat: 36.3, lon: 140.4 },
  { id: 'tochigi',    name: '栃木',     code: '090000', lat: 36.6, lon: 139.8 },
  { id: 'gunma',      name: '群馬',     code: '100000', lat: 36.4, lon: 139.1 },
  { id: 'saitama',    name: '埼玉',     code: '110000', lat: 35.9, lon: 139.5 },
  { id: 'chiba',      name: '千葉',     code: '120000', lat: 35.5, lon: 140.2 },
  { id: 'tokyo',      name: '東京',     code: '130000', lat: 35.7, lon: 139.7 },
  { id: 'kanagawa',   name: '神奈川',   code: '140000', lat: 35.4, lon: 139.5 },
  { id: 'niigata',    name: '新潟',     code: '150000', lat: 37.5, lon: 139.0 },
  { id: 'toyama',     name: '富山',     code: '160000', lat: 36.7, lon: 137.2 },
  { id: 'ishikawa',   name: '石川',     code: '170000', lat: 36.6, lon: 136.6 },
  { id: 'fukui',      name: '福井',     code: '180000', lat: 36.1, lon: 136.2 },
  { id: 'yamanashi',  name: '山梨',     code: '190000', lat: 35.7, lon: 138.6 },
  { id: 'nagano',     name: '長野',     code: '200000', lat: 36.2, lon: 138.2 },
  { id: 'gifu',       name: '岐阜',     code: '210000', lat: 35.5, lon: 136.7 },
  { id: 'shizuoka',   name: '静岡',     code: '220000', lat: 34.9, lon: 138.4 },
  { id: 'aichi',      name: '愛知',     code: '230000', lat: 35.1, lon: 137.2 },
  { id: 'mie',        name: '三重',     code: '240000', lat: 34.7, lon: 136.5 },
  { id: 'shiga',      name: '滋賀',     code: '250000', lat: 35.2, lon: 136.2 },
  { id: 'kyoto',      name: '京都',     code: '260000', lat: 35.1, lon: 135.8 },
  { id: 'osaka',      name: '大阪',     code: '270000', lat: 34.7, lon: 135.5 },
  { id: 'hyogo',      name: '兵庫',     code: '280000', lat: 34.9, lon: 135.2 },
  { id: 'nara',       name: '奈良',     code: '290000', lat: 34.4, lon: 135.8 },
  { id: 'wakayama',   name: '和歌山',   code: '300000', lat: 34.0, lon: 135.5 },
  { id: 'tottori',    name: '鳥取',     code: '310000', lat: 35.5, lon: 134.2 },
  { id: 'shimane',    name: '島根',     code: '320000', lat: 35.5, lon: 133.0 },
  { id: 'okayama',    name: '岡山',     code: '330000', lat: 34.7, lon: 134.0 },
  { id: 'hiroshima',  name: '広島',     code: '340000', lat: 34.4, lon: 132.5 },
  { id: 'yamaguchi',  name: '山口',     code: '350000', lat: 34.2, lon: 131.5 },
  { id: 'tokushima',  name: '徳島',     code: '360000', lat: 34.1, lon: 134.6 },
  { id: 'kagawa',     name: '香川',     code: '370000', lat: 34.3, lon: 134.1 },
  { id: 'ehime',      name: '愛媛',     code: '380000', lat: 33.8, lon: 132.8 },
  { id: 'kochi',      name: '高知',     code: '390000', lat: 33.6, lon: 133.5 },
  { id: 'fukuoka',    name: '福岡',     code: '400000', lat: 33.6, lon: 130.5 },
  { id: 'saga',       name: '佐賀',     code: '410000', lat: 33.2, lon: 130.3 },
  { id: 'nagasaki',   name: '長崎',     code: '420000', lat: 32.9, lon: 129.9 },
  { id: 'kumamoto',   name: '熊本',     code: '430000', lat: 32.8, lon: 130.7 },
  { id: 'oita',       name: '大分',     code: '440000', lat: 33.2, lon: 131.6 },
  { id: 'miyazaki',   name: '宮崎',     code: '450000', lat: 32.0, lon: 131.4 },
  { id: 'kagoshima',  name: '鹿児島',   code: '460100', lat: 31.6, lon: 130.6 },
  { id: 'okinawa',    name: '沖縄',     code: '472000', lat: 26.2, lon: 127.7, inset: true },
];

// 日本の主要島 SVGパス (簡略化した輪郭, viewBox "0 0 800 700")
// 座標変換: x=(lon-129)*46, y=(45.5-lat)*46
const ISLAND_PATHS = [
  // 北海道
  'M 565 8 L 610 8 L 660 20 L 754 28 L 748 72 L 698 98 L 655 128 L 608 156 L 570 184 L 555 178 L 538 165 L 543 142 L 555 118 L 562 90 L 565 8 Z',
  // 本州 (太平洋岸→紀伊半島→瀬戸内→山陰→能登→東北)
  'M 522 186 L 564 222 L 576 272 L 582 322 L 574 390 L 548 462 L 518 476 L 502 480 L 456 502 L 432 504 L 380 506 L 354 524 L 338 536 L 316 556 L 298 542 L 284 536 L 272 498 L 258 498 L 230 498 L 194 508 L 162 528 L 88 530 L 92 510 L 115 510 L 156 460 L 200 460 L 262 460 L 298 460 L 304 436 L 350 414 L 352 395 L 380 368 L 358 392 L 350 414 L 416 390 L 460 348 L 500 268 L 514 226 L 522 186 Z',
  // 四国
  'M 162 526 L 198 514 L 258 516 L 270 532 L 242 566 L 184 590 L 140 566 L 139 542 L 162 526 Z',
  // 九州
  'M 68 540 L 84 534 L 122 538 L 122 572 L 112 646 L 80 670 L 58 642 L 36 590 L 40 558 L 68 540 Z',
];

// 天気コード → 背景色
function weatherColor(icon) {
  if (!icon || icon === '…') return ['#cbd5e1', '#94a3b8'];
  if (icon === '☀️')  return ['#fde68a', '#f59e0b'];
  if (icon === '🌤️')  return ['#fef3c7', '#fbbf24'];
  if (icon === '⛅')   return ['#dbeafe', '#93c5fd'];
  if (icon === '🌥️')  return ['#e2e8f0', '#94a3b8'];
  if (icon === '☁️')  return ['#cbd5e1', '#64748b'];
  if (icon === '🌦️')  return ['#bfdbfe', '#60a5fa'];
  if (icon === '🌧️')  return ['#bfdbfe', '#3b82f6'];
  if (icon === '🌨️' || icon === '❄️') return ['#e0e7ff', '#818cf8'];
  return ['#e2e8f0', '#94a3b8'];
}

// ポップアップ内容
function buildPopupHTML(days) {
  if (!days || days.length === 0) {
    return '<p style="text-align:center;color:#94a3b8;padding:1rem;">データ取得中...</p>';
  }
  return `<div class="popup-days">${days.map((d, i) => `
    <div class="popup-day ${i === 0 ? 'popup-today' : ''}">
      <div class="popup-day-label">${d.label.replace('\n', '<br>')}</div>
      <div class="popup-day-icon">${d.icon}</div>
      <div class="popup-day-weather">${d.weather}</div>
      <div class="popup-day-temp">
        ${d.tempHigh !== null ? `<span class="temp-high">${d.tempHigh}°</span>` : ''}
        ${d.tempLow  !== null ? `<span class="temp-low">${d.tempLow}°</span>`  : ''}
      </div>
    </div>`).join('')}</div>`;
}

// 地図SVGを生成
function renderMap(weatherMap) {
  const container = document.getElementById('map-container');
  if (!container) return;

  const VW = 800, VH = 700;
  // 沖縄インセット枠
  const IX = 18, IY = 580, IW = 130, IH = 100;

  // 島の輪郭
  const islandsSVG = ISLAND_PATHS.map(d =>
    `<path d="${d}" fill="#dbeafe" stroke="#93c5fd" stroke-width="1.2" stroke-linejoin="round"/>`
  ).join('');

  // 都道府県ドット
  let dotsSVG = '';
  for (const pref of MAP_PREFS) {
    const days  = weatherMap[pref.name] || [];
    const icon  = days[0] ? days[0].icon : '…';
    const [c1, c2] = weatherColor(icon);
    const gradId = `g${pref.id}`;

    let cx, cy;
    if (pref.inset) {
      cx = IX + IW / 2;
      cy = IY + IH / 2;
    } else {
      cx = Math.round((pref.lon - 129) * 46);
      cy = Math.round((45.5 - pref.lat) * 46);
    }

    dotsSVG += `
      <defs><radialGradient id="${gradId}" cx="38%" cy="32%" r="62%">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </radialGradient></defs>
      <g class="pref-dot" data-name="${pref.name}" style="cursor:pointer"
         transform="translate(${cx},${cy})">
        <circle r="20" fill="url(#${gradId})" stroke="white" stroke-width="1.8"
                class="pref-circle" filter="url(#sh)"/>
        <text text-anchor="middle" dominant-baseline="central"
              dy="-4" font-size="13" style="pointer-events:none;user-select:none">${icon}</text>
        <text text-anchor="middle" dominant-baseline="central"
              dy="11" font-size="6.5" fill="#1e293b" font-weight="700"
              style="pointer-events:none;user-select:none;font-family:sans-serif">${pref.name}</text>
      </g>`;
  }

  // 沖縄インセット枠
  const insetSVG = `
    <rect x="${IX-6}" y="${IY-16}" width="${IW+12}" height="${IH+16}"
          rx="10" fill="white" fill-opacity="0.9" stroke="#93c5fd" stroke-width="1.5"/>
    <text x="${IX + IW/2}" y="${IY-4}" text-anchor="middle"
          font-size="9" fill="#0369a1" font-weight="700"
          style="font-family:sans-serif">沖縄（拡大）</text>`;

  container.innerHTML = `
    <svg viewBox="0 0 ${VW} ${VH}" xmlns="http://www.w3.org/2000/svg"
         style="width:100%;max-width:${VW}px;height:auto;display:block;margin:0 auto">
      <defs>
        <filter id="sh" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="2" flood-opacity="0.2"/>
        </filter>
      </defs>
      <!-- 海の背景 -->
      <rect width="${VW}" height="${VH}" fill="#f0f9ff" rx="12"/>
      <!-- 島の輪郭 -->
      ${islandsSVG}
      <!-- 沖縄インセット枠 -->
      ${insetSVG}
      <!-- 都道府県ドット -->
      ${dotsSVG}
    </svg>`;

  // クリック・ホバーイベント
  container.querySelectorAll('.pref-dot').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      const name = el.dataset.name;
      showPopup(name, weatherMap[name] || [], e.clientX, e.clientY);
    });
    const circle = el.querySelector('.pref-circle');
    el.addEventListener('mouseenter', () => circle.setAttribute('r', '23'));
    el.addEventListener('mouseleave', () => circle.setAttribute('r', '20'));
  });
}

// ポップアップ表示
function showPopup(prefName, days, cx, cy) {
  let popup = document.getElementById('map-popup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'map-popup';
    popup.className = 'map-popup';
    document.body.appendChild(popup);
  }

  popup.innerHTML = `
    <div class="popup-header">
      <span class="popup-title">${prefName}</span>
      <button class="popup-close"
        onclick="document.getElementById('map-popup').classList.add('hidden')">✕</button>
    </div>
    ${buildPopupHTML(days)}`;

  popup.classList.remove('hidden');

  const pw = 310, ph = 170;
  let left = cx + 14;
  let top  = cy + 14;
  if (left + pw > window.innerWidth  - 12) left = cx - pw - 14;
  if (top  + ph > window.innerHeight - 12) top  = cy - ph - 14;
  popup.style.left = `${Math.max(8, left)}px`;
  popup.style.top  = `${Math.max(8, top)}px`;
}

// 地図外クリックでポップアップを閉じる
document.addEventListener('click', () => {
  const p = document.getElementById('map-popup');
  if (p) p.classList.add('hidden');
});
