// 都道府県データ（気象庁エリアコード対応）
const REGIONS = [
  {
    name: '北海道・東北',
    prefectures: [
      { name: '北海道（札幌）', code: '016000' },
      { name: '北海道（函館）', code: '017000' },
      { name: '北海道（旭川）', code: '012000' },
      { name: '北海道（釧路）', code: '014030' },
      { name: '青森', code: '020000' },
      { name: '岩手', code: '030000' },
      { name: '宮城', code: '040000' },
      { name: '秋田', code: '050000' },
      { name: '山形', code: '060000' },
      { name: '福島', code: '070000' },
    ]
  },
  {
    name: '関東',
    prefectures: [
      { name: '茨城', code: '080000' },
      { name: '栃木', code: '090000' },
      { name: '群馬', code: '100000' },
      { name: '埼玉', code: '110000' },
      { name: '千葉', code: '120000' },
      { name: '東京', code: '130000' },
      { name: '神奈川', code: '140000' },
    ]
  },
  {
    name: '中部',
    prefectures: [
      { name: '新潟', code: '150000' },
      { name: '富山', code: '160000' },
      { name: '石川', code: '170000' },
      { name: '福井', code: '180000' },
      { name: '山梨', code: '190000' },
      { name: '長野', code: '200000' },
      { name: '岐阜', code: '210000' },
      { name: '静岡', code: '220000' },
      { name: '愛知', code: '230000' },
    ]
  },
  {
    name: '近畿',
    prefectures: [
      { name: '三重', code: '240000' },
      { name: '滋賀', code: '250000' },
      { name: '京都', code: '260000' },
      { name: '大阪', code: '270000' },
      { name: '兵庫', code: '280000' },
      { name: '奈良', code: '290000' },
      { name: '和歌山', code: '300000' },
    ]
  },
  {
    name: '中国・四国',
    prefectures: [
      { name: '鳥取', code: '310000' },
      { name: '島根', code: '320000' },
      { name: '岡山', code: '330000' },
      { name: '広島', code: '340000' },
      { name: '山口', code: '350000' },
      { name: '徳島', code: '360000' },
      { name: '香川', code: '370000' },
      { name: '愛媛', code: '380000' },
      { name: '高知', code: '390000' },
    ]
  },
  {
    name: '九州・沖縄',
    prefectures: [
      { name: '福岡', code: '400000' },
      { name: '佐賀', code: '410000' },
      { name: '長崎', code: '420000' },
      { name: '熊本', code: '430000' },
      { name: '大分', code: '440000' },
      { name: '宮崎', code: '450000' },
      { name: '鹿児島', code: '460100' },
      { name: '沖縄（那覇）', code: '472000' },
    ]
  }
];

// 天気コードをアイコンに変換
function weatherIcon(code) {
  if (!code) return '❓';
  const c = parseInt(code);
  if (c === 100 || c === 101) return '☀️';
  if (c >= 102 && c <= 109) return '🌤️';
  if (c >= 110 && c <= 119) return '⛅';
  if (c >= 120 && c <= 129) return '🌦️';
  if (c >= 130 && c <= 139) return '🌧️';
  if (c >= 140 && c <= 149) return '🌨️';
  if (c === 200 || c === 201) return '☁️';
  if (c >= 202 && c <= 209) return '🌥️';
  if (c >= 210 && c <= 219) return '🌦️';
  if (c >= 218 && c <= 228) return '🌧️';
  if (c >= 230 && c <= 249) return '❄️';
  if (c >= 300 && c <= 309) return '🌧️';
  if (c >= 310 && c <= 319) return '🌧️';
  if (c >= 320 && c <= 329) return '🌨️';
  if (c >= 400 && c <= 409) return '❄️';
  if (c >= 410 && c <= 419) return '🌨️';
  return '🌈';
}

// 日付フォーマット
function formatDate(dateStr, index) {
  const date = new Date(dateStr);
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dow = days[date.getDay()];
  if (index === 0) return `今日\n${month}/${day}(${dow})`;
  if (index === 1) return `明日\n${month}/${day}(${dow})`;
  return `${month}/${day}(${dow})`;
}

// 天気カードHTMLを生成
function buildCard(prefName, forecastDays) {
  const daysHTML = forecastDays.map((d, i) => `
    <div class="day ${i === 0 ? 'today' : ''}">
      <div class="day-label">${d.label.replace('\n', '<br>')}</div>
      <div class="day-icon">${d.icon}</div>
      <div class="day-weather">${d.weather}</div>
      <div class="day-temp">
        ${d.tempHigh !== null ? `<span class="temp-high">${d.tempHigh}°</span>` : ''}
        ${d.tempLow !== null ? `<span class="temp-low"> ${d.tempLow}°</span>` : ''}
      </div>
    </div>
  `).join('');

  return `
    <div class="pref-card">
      <div class="pref-header">
        <div class="pref-name">${prefName}</div>
      </div>
      <div class="forecast-days">${daysHTML}</div>
    </div>
  `;
}

// 気象庁APIからデータ取得
async function fetchForecast(code) {
  const url = `https://www.jma.go.jp/bosai/forecast/data/forecast/${code}.json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// 予報データをパース（3日分）
function parseForecast(data, prefName) {
  try {
    const timeSeries = data[0].timeSeries;

    // 天気コード系列
    const weatherSeries = timeSeries[0];
    const timeDefines = weatherSeries.timeDefines.slice(0, 3);
    const area = weatherSeries.areas[0];
    const weatherCodes = area.weatherCodes || [];
    const weathers = area.weathers || [];

    // 気温系列（存在する場合）
    let temps = null;
    for (const ts of timeSeries) {
      if (ts.areas[0] && ts.areas[0].temps) {
        temps = ts.areas[0].temps;
        break;
      }
    }

    const days = timeDefines.map((dateStr, i) => {
      let tempHigh = null, tempLow = null;
      if (temps) {
        // temps配列: [最低0日, 最高0日, 最低1日, 最高1日, ...] または [最高0日, 最低1日, 最高1日, ...]
        if (i === 0) {
          // 今日は最高のみのことが多い
          if (temps.length >= 2) {
            tempHigh = temps[1] !== '' ? temps[1] : null;
            tempLow = temps[0] !== '' ? temps[0] : null;
          }
        } else {
          const base = i * 2;
          if (temps[base] !== undefined && temps[base] !== '') tempLow = temps[base];
          if (temps[base + 1] !== undefined && temps[base + 1] !== '') tempHigh = temps[base + 1];
        }
      }

      return {
        label: formatDate(dateStr, i),
        icon: weatherIcon(weatherCodes[i]),
        weather: (weathers[i] || '').replace(/　/g, ' ').trim().substring(0, 12),
        tempHigh,
        tempLow,
      };
    });

    return { prefName, days };
  } catch (e) {
    return { prefName, days: [] };
  }
}

// メイン処理
async function main() {
  const loadingEl  = document.getElementById('loading');
  const regionsEl  = document.getElementById('regions');
  const errorEl    = document.getElementById('error');
  const updateEl   = document.getElementById('update-time');
  const mapSection = document.getElementById('map-section');
  const listSection = document.getElementById('list-section');

  try {
    // 地域別カード + 地図用の全都道府県を並列取得
    const allPrefs = [
      ...REGIONS.flatMap(r => r.prefectures),
      // 地図専用（地域一覧にないもの）
      ...MAP_PREFS
        .filter(mp => !REGIONS.flatMap(r => r.prefectures).some(p => p.code === mp.code))
        .map(mp => ({ name: mp.name, code: mp.code }))
    ];

    // 重複排除
    const uniquePrefs = [...new Map(allPrefs.map(p => [p.code, p])).values()];

    const results = await Promise.all(
      uniquePrefs.map(p =>
        fetchForecast(p.code)
          .then(data => parseForecast(data, p.name))
          .catch(() => ({ prefName: p.name, days: [] }))
      )
    );

    const resultMap = Object.fromEntries(results.map(r => [r.prefName, r.days]));

    // 地図用: MAP_PREFS の name でも引けるように補完
    for (const mp of MAP_PREFS) {
      if (!resultMap[mp.name]) {
        // 地域一覧と名前が違う場合（例: "北海道（札幌）" → "北海道"）
        const match = results.find(r =>
          REGIONS.flatMap(rg => rg.prefectures).find(p => p.code === mp.code && p.name === r.prefName)
        );
        if (match) resultMap[mp.name] = match.days;
      }
    }

    // 更新日時
    const now = new Date();
    updateEl.textContent = `更新: ${now.toLocaleDateString('ja-JP')} ${now.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}`;

    loadingEl.classList.add('hidden');

    // 地図レンダリング
    mapSection.classList.remove('hidden');
    renderMap(resultMap);

    // 地域別一覧
    listSection.classList.remove('hidden');
    for (const region of REGIONS) {
      const section = document.createElement('section');
      section.className = 'region-section';
      section.innerHTML = `<h2 class="region-title">${region.name}</h2><div class="prefecture-grid"></div>`;
      const grid = section.querySelector('.prefecture-grid');

      for (const pref of region.prefectures) {
        const days = resultMap[pref.name] || [];
        if (days.length > 0) {
          grid.innerHTML += buildCard(pref.name, days);
        } else {
          grid.innerHTML += `
            <div class="pref-card">
              <div class="pref-header"><div class="pref-name">${pref.name}</div></div>
              <div class="forecast-days" style="justify-content:center;color:#a0aec0;font-size:0.8rem;padding:1rem;">取得できませんでした</div>
            </div>`;
        }
      }
      regionsEl.appendChild(section);
    }
  } catch (err) {
    loadingEl.classList.add('hidden');
    errorEl.classList.remove('hidden');
    errorEl.textContent = `天気情報の取得に失敗しました: ${err.message}`;
  }
}

main();
