// 都道府県の地理座標（緯度・経度）→ SVG座標変換用データ
// SVG変換式: x = (lon - 129) * 46,  y = (45.5 - lat) * 46
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

const SCALE = 46;
const LON0  = 129;
const LAT0  = 45.5;

function toSVG(lat, lon) {
  return {
    x: (lon - LON0) * SCALE,
    y: (LAT0 - lat) * SCALE,
  };
}

// 天気コード → 背景グラデ色
function weatherColor(code) {
  if (!code) return ['#94a3b8', '#64748b'];
  const c = parseInt(code);
  if (c === 100 || c === 101)            return ['#fde68a', '#f59e0b']; // 晴れ
  if (c >= 102 && c <= 119)             return ['#bfdbfe', '#60a5fa']; // 晴れ時々くもり
  if (c === 200 || c === 201)            return ['#cbd5e1', '#94a3b8']; // くもり
  if (c >= 202 && c <= 219)             return ['#bfdbfe', '#93c5fd']; // くもり時々晴れ
  if ((c >= 130 && c <= 139) || (c >= 300 && c <= 319)) return ['#93c5fd', '#3b82f6']; // 雨
  if (c >= 400 && c <= 419)             return ['#e0e7ff', '#a5b4fc']; // 雪
  return ['#e2e8f0', '#94a3b8'];
}

// ポップアップHTMLを生成
function buildPopupHTML(pref, days) {
  if (!days || days.length === 0) {
    return `<p style="color:#94a3b8;text-align:center;">データ取得中...</p>`;
  }
  return days.map((d, i) => `
    <div class="popup-day ${i === 0 ? 'popup-today' : ''}">
      <div class="popup-day-label">${d.label.replace('\n', '<br>')}</div>
      <div class="popup-day-icon">${d.icon}</div>
      <div class="popup-day-weather">${d.weather}</div>
      <div class="popup-day-temp">
        ${d.tempHigh !== null ? `<span class="temp-high">${d.tempHigh}°</span>` : ''}
        ${d.tempLow  !== null ? `<span class="temp-low">${d.tempLow}°</span>`  : ''}
      </div>
    </div>
  `).join('');
}

// 地図SVGを生成してDOMに挿入
function renderMap(weatherMap) {
  const container = document.getElementById('map-container');
  if (!container) return;

  // SVG viewBox
  const VW = 800, VH = 680;

  // 沖縄はインセット表示
  const OKINAWA_INSET = { x: 20, y: VH - 120, w: 120, h: 110 };

  let circles = '';
  for (const pref of MAP_PREFS) {
    const days = weatherMap[pref.name] || [];
    const todayCode = days[0] ? (days[0].icon === '☀️' ? 100 : days[0].icon === '☁️' ? 200 : days[0].icon === '🌧️' ? 300 : 100) : null;
    const [c1, c2] = weatherColor(todayCode);
    const icon = days[0] ? days[0].icon : '…';

    let cx, cy;
    if (pref.inset) {
      cx = OKINAWA_INSET.x + OKINAWA_INSET.w / 2;
      cy = OKINAWA_INSET.y + OKINAWA_INSET.h / 2;
    } else {
      const pos = toSVG(pref.lat, pref.lon);
      cx = pos.x;
      cy = pos.y;
    }

    const gradId = `grad-${pref.id}`;
    circles += `
      <defs>
        <radialGradient id="${gradId}" cx="40%" cy="35%" r="60%">
          <stop offset="0%"   stop-color="${c1}"/>
          <stop offset="100%" stop-color="${c2}"/>
        </radialGradient>
      </defs>
      <g class="pref-dot" data-id="${pref.id}" data-name="${pref.name}"
         transform="translate(${cx},${cy})" style="cursor:pointer">
        <circle r="22" fill="url(#${gradId})" stroke="white" stroke-width="1.5"
                class="pref-circle" filter="url(#dropshadow)"/>
        <text class="pref-icon-text" text-anchor="middle" dominant-baseline="central"
              dy="-4" font-size="14">${icon}</text>
        <text class="pref-name-text" text-anchor="middle" dominant-baseline="central"
              dy="11" font-size="7" fill="#1e293b" font-weight="600">${pref.name}</text>
      </g>`;
  }

  // 沖縄インセット枠
  const insetBox = `
    <rect x="${OKINAWA_INSET.x - 10}" y="${OKINAWA_INSET.y - 14}"
          width="${OKINAWA_INSET.w + 20}" height="${OKINAWA_INSET.h + 10}"
          rx="10" fill="white" fill-opacity="0.8" stroke="#bae6fd" stroke-width="1.5"/>
    <text x="${OKINAWA_INSET.x + OKINAWA_INSET.w / 2}" y="${OKINAWA_INSET.y - 4}"
          text-anchor="middle" font-size="9" fill="#0369a1" font-weight="700">沖縄（拡大表示）</text>`;

  container.innerHTML = `
    <svg viewBox="0 0 ${VW} ${VH}" xmlns="http://www.w3.org/2000/svg"
         style="width:100%;max-width:${VW}px;height:auto;display:block;margin:0 auto">
      <defs>
        <filter id="dropshadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.15"/>
        </filter>
      </defs>
      <!-- 背景 -->
      <rect width="${VW}" height="${VH}" fill="transparent"/>
      ${insetBox}
      ${circles}
    </svg>`;

  // クリックイベント
  container.querySelectorAll('.pref-dot').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const name = el.dataset.name;
      const days = weatherMap[name] || [];
      showPopup(name, days, e.clientX, e.clientY);
    });
    el.addEventListener('mouseenter', () => {
      el.querySelector('.pref-circle').setAttribute('r', '25');
    });
    el.addEventListener('mouseleave', () => {
      el.querySelector('.pref-circle').setAttribute('r', '22');
    });
  });
}

// ポップアップ表示
function showPopup(prefName, days, clientX, clientY) {
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
      <button class="popup-close" onclick="document.getElementById('map-popup').classList.add('hidden')">✕</button>
    </div>
    <div class="popup-days">${buildPopupHTML(prefName, days)}</div>`;

  popup.classList.remove('hidden');

  // 位置調整
  const pw = 280, ph = 160;
  let left = clientX + 12;
  let top  = clientY + 12;
  if (left + pw > window.innerWidth  - 16) left = clientX - pw - 12;
  if (top  + ph > window.innerHeight - 16) top  = clientY - ph - 12;
  popup.style.left = `${left}px`;
  popup.style.top  = `${top}px`;
}

// 外クリックで閉じる
document.addEventListener('click', () => {
  const popup = document.getElementById('map-popup');
  if (popup) popup.classList.add('hidden');
});
