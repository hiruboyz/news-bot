const TelegramBot = require("node-telegram-bot-api");

// ✅ PUT YOUR BOT TOKEN HERE (from BotFather)
const TOKEN = process.env.BOT_TOKEN || "YOUR_BOT_TOKEN_HERE";

const bot = new TelegramBot(TOKEN, { polling: true });

// ============================
// 📰 HARDCODED NEWS DATA
// ============================
const NEWS = {
  default: [
    { emoji: "🗞️", title: "Global AI Summit 2026", source: "BBC News", time: "2h ago", summary: "40 nations sign new AI safety framework at landmark Geneva summit." },
    { emoji: "📈", title: "S&P 500 Hits Record High", source: "Reuters", time: "4h ago", summary: "Tech stocks surge 3.2% on strong Q1 earnings. Nvidia leads gains." },
    { emoji: "🌍", title: "UN Emergency Meeting Called", source: "CNN", time: "6h ago", summary: "Security Council convenes over escalating tensions in Eastern Europe." },
    { emoji: "🔬", title: "Alzheimer's Breakthrough", source: "Nature", time: "1d ago", summary: "New drug trial shows 60% reduction in plaque buildup in early-stage patients." },
  ],
  "ai": [
    { emoji: "🤖", title: "OpenAI Launches GPT-5", source: "The Verge", time: "1h ago", summary: "New model scores 95% on medical licensing exams and writes full apps from scratch." },
    { emoji: "🧠", title: "Google DeepMind AlphaFold 3", source: "Nature", time: "3h ago", summary: "New protein folding model solves structures 10x faster than its predecessor." },
    { emoji: "💼", title: "Microsoft Copilot Restructuring", source: "Bloomberg", time: "5h ago", summary: "Tech giant announces AI-driven restructuring across support and finance teams." },
    { emoji: "🔒", title: "EU AI Act Enforcement Begins", source: "Reuters", time: "1d ago", summary: "First fines issued under new regulation targeting high-risk AI systems." },
  ],
  "bitcoin": [
    { emoji: "₿", title: "Bitcoin Surpasses $120,000", source: "CoinDesk", time: "30m ago", summary: "Institutional buying accelerates as ETF inflows hit $2B in a single day." },
    { emoji: "📉", title: "Crypto Market Volatile After Fed Remarks", source: "Bloomberg", time: "2h ago", summary: "Powell's comments on interest rates trigger a 5% swing in crypto markets." },
    { emoji: "🏦", title: "JPMorgan Launches Bitcoin Custody", source: "FT", time: "8h ago", summary: "Wall Street giant now offers institutional Bitcoin storage services." },
    { emoji: "🌐", title: "El Salvador Reports BTC Profit", source: "Reuters", time: "2d ago", summary: "Country's Bitcoin reserve now worth $400M after years of IMF criticism." },
  ],
  "tesla": [
    { emoji: "🚗", title: "Tesla Cybertruck Recall Issued", source: "AP", time: "1h ago", summary: "NHTSA orders recall of 45,000 Cybertrucks over faulty drive assist software." },
    { emoji: "⚡", title: "Tesla Q1 Deliveries Miss Estimates", source: "WSJ", time: "4h ago", summary: "Company delivers 386,000 vehicles, below analyst expectations of 410,000." },
    { emoji: "🤝", title: "Tesla Signs Deal with Saudi Arabia", source: "CNN", time: "6h ago", summary: "Gigafactory planned for Riyadh as part of Vision 2030 investment push." },
    { emoji: "📊", title: "Musk Sells $2B in Tesla Shares", source: "Reuters", time: "1d ago", summary: "SEC filing reveals latest stock sale amid ongoing focus on xAI and SpaceX." },
  ],
  "spacex": [
    { emoji: "🚀", title: "Starship Test Flight Successful", source: "Space.com", time: "3h ago", summary: "Starship completes full orbital mission and lands back on launch mount." },
    { emoji: "🌕", title: "NASA Artemis IV Update", source: "NASA", time: "5h ago", summary: "SpaceX lunar lander passes critical design review ahead of 2027 Moon landing." },
    { emoji: "🛰️", title: "Starlink Reaches 10M Subscribers", source: "Bloomberg", time: "1d ago", summary: "Satellite internet service now covers 110 countries with sub-50ms latency." },
    { emoji: "💥", title: "Rocket Lab Challenges SpaceX", source: "TechCrunch", time: "2d ago", summary: "New Neutron rocket targets SpaceX's commercial launch dominance." },
  ],
  "stocks": [
    { emoji: "📈", title: "Dow Jones Surges 500 Points", source: "CNBC", time: "1h ago", summary: "Strong jobs data boosts investor confidence. Healthcare and energy lead gains." },
    { emoji: "💵", title: "Fed Holds Rates Steady", source: "WSJ", time: "3h ago", summary: "Federal Reserve keeps interest rates unchanged, signals two cuts possible in 2026." },
    { emoji: "🏦", title: "Goldman Sachs Beats Estimates", source: "Bloomberg", time: "5h ago", summary: "Bank reports $12.4B in Q1 revenue, driven by record trading desk performance." },
    { emoji: "📉", title: "Oil Prices Drop on Supply Surge", source: "Reuters", time: "7h ago", summary: "Brent crude falls below $70 as OPEC+ increases production quotas unexpectedly." },
  ],
  "openai": [
    { emoji: "🤖", title: "OpenAI Valued at $300B", source: "FT", time: "2h ago", summary: "Latest funding round puts the AI giant at a record valuation after investor frenzy." },
    { emoji: "📱", title: "ChatGPT Reaches 500M Users", source: "TechCrunch", time: "4h ago", summary: "OpenAI announces milestone as daily active users double year-over-year." },
    { emoji: "🔑", title: "OpenAI Releases New API Features", source: "The Verge", time: "6h ago", summary: "Developers get access to real-time voice, vision, and memory APIs in one package." },
    { emoji: "⚖️", title: "NY Times Lawsuit Update", source: "AP", time: "1d ago", summary: "Court rules OpenAI must preserve training data logs as copyright case proceeds." },
  ],
};

const TRENDING = ["AI News", "Bitcoin", "Tesla", "OpenAI", "SpaceX", "Stocks", "Climate", "Elections", "FIFA", "Apple"];

// ============================
// 🔧 HELPER FUNCTIONS
// ============================

function getNews(query) {
  const key = query.toLowerCase().replace(/\s+/g, "");
  for (const [k, v] of Object.entries(NEWS)) {
    if (key.includes(k) || k.includes(key)) return v;
  }
  return NEWS["default"];
}

function formatNewsMessage(articles, query) {
  let msg = `🔍 *Results for: ${query}*\n\n`;
  articles.forEach((a, i) => {
    msg += `${a.emoji} *${a.title}*\n`;
    msg += `📰 ${a.source}  ·  🕐 ${a.time}\n`;
    msg += `${a.summary}\n`;
    if (i < articles.length - 1) msg += `\n`;
  });
  return msg;
}

function getTrendingKeyboard() {
  const rows = [];
  for (let i = 0; i < TRENDING.length; i += 2) {
    const row = [{ text: TRENDING[i], callback_data: `search:${TRENDING[i]}` }];
    if (TRENDING[i + 1]) row.push({ text: TRENDING[i + 1], callback_data: `search:${TRENDING[i + 1]}` });
    rows.push(row);
  }
  return { inline_keyboard: rows };
}

function getRelatedKeyboard(exclude) {
  const related = TRENDING.filter(t => t !== exclude).slice(0, 6);
  const rows = [];
  for (let i = 0; i < related.length; i += 3) {
    rows.push(related.slice(i, i + 3).map(t => ({ text: t, callback_data: `search:${t}` })));
  }
  rows.push([{ text: "🔥 Hot Search", callback_data: "hot" }, { text: "🏠 Main Menu", callback_data: "menu" }]);
  return { inline_keyboard: rows };
}

// ============================
// 🚀 /start COMMAND
// ============================
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || "there";

  // Welcome message
  const welcomeText =
    `📡 *Welcome to NewsSearch Bot, ${firstName}!*\n\n` +
    `🔍 The essential Telegram news search engine.\n\n` +
    `Find the latest news, articles, and trending topics instantly\\.\n\n` +
    `✅ *What I can do:*\n` +
    `• Search news by keyword\n` +
    `• Show trending topics\n` +
    `• Find latest articles from top sources\n\n` 


  bot.sendMessage(chatId, welcomeText, { parse_mode: "Markdown" });

  // Trending hot search
  setTimeout(() => {
    bot.sendMessage(
      chatId,
      `🔥 *Hot Search Ranking*\n\n🔎 Tap any keyword to search instantly 👇`,
      {
        parse_mode: "Markdown",
        reply_markup: getTrendingKeyboard(),
      }
    );
  }, 800);
});

// ============================
// 🔍 /search COMMAND
// ============================
bot.onText(/\/search (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const query = match[1];
  sendNewsResults(chatId, query);
});

// ============================
// 🔥 /hot COMMAND
// ============================
bot.onText(/\/hot/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `🔥 *Hot Search Ranking*\n\nTap any keyword 👇`, {
    parse_mode: "Markdown",
    reply_markup: getTrendingKeyboard(),
  });
});

// ============================
// 📋 /help COMMAND
// ============================
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `ℹ️ *NewsSearch Bot Help*\n\n` +
    `*Commands:*\n` +
    `/start \\- Welcome screen \\+ trending topics\n` +
    `/search \\[keyword\\] \\- Search for news\n` +
    `/hot \\- Show hot search rankings\n` +
    `/help \\- Show this help\n\n` +
    `*Or just type any keyword* and I'll search for you\\!`,
    { parse_mode: "MarkdownV2" }
  );
});

// ============================
// 💬 FREE TEXT SEARCH
// ============================
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Skip commands
  if (!text || text.startsWith("/")) return;

  sendNewsResults(chatId, text);
});

// ============================
// 🔘 INLINE BUTTON CALLBACKS
// ============================
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  bot.answerCallbackQuery(query.id); // Remove loading spinner

  if (data.startsWith("search:")) {
    const keyword = data.replace("search:", "");
    sendNewsResults(chatId, keyword);
  } else if (data === "hot") {
    bot.sendMessage(chatId, `🔥 *Hot Search Ranking*\n\nTap any keyword 👇`, {
      parse_mode: "Markdown",
      reply_markup: getTrendingKeyboard(),
    });
  } else if (data === "menu") {
    bot.sendMessage(chatId, `🏠 *Main Menu*\n\nWhat would you like to do?`, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "🔥 Hot Search", callback_data: "hot" }, { text: "📰 Latest News", callback_data: "search:default" }],
          [{ text: "₿ Bitcoin", callback_data: "search:Bitcoin" }, { text: "🤖 AI News", callback_data: "search:AI News" }],
        ],
      },
    });
  }
});

// ============================
// 📰 SEND NEWS RESULTS
// ============================
function sendNewsResults(chatId, query) {
  const articles = getNews(query);
  const message = formatNewsMessage(articles, query);

  bot.sendMessage(chatId, message, {
    parse_mode: "Markdown",
    reply_markup: getRelatedKeyboard(query),
  });
}

// ============================
// ✅ BOT STARTED
// ============================
console.log("✅ NewsSearch Bot is running...");
console.log("🔍 Listening for messages...");
