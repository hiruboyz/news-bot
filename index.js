const TelegramBot = require("node-telegram-bot-api");

// ============================
// 🤖 ALL BOT TOKENS
// ============================
const MAIN_TOKEN    = process.env.BOT_TOKEN;
const AI_TOKEN      = "8716836493:AAFJN9G0IiGbD4RYdMDp2CPbwlDMNskfWh8";
const BITCOIN_TOKEN = "8621803468:AAE1dAaDgxFHSiwCWmOPWwS6pAl4S4Tp8ACE";
const TESLA_TOKEN   = "8382399883:AAEeqNC05j6jL3WcgcbI1RqO7zqsIELiuxo";
const OPENAI_TOKEN  = "8749342231:AAEAhhCS_xL2Wdh3bBKbQn2Gm3EqBwfVHwQ";

// ============================
// 🖼️ WELCOME IMAGES
// ============================
const IMAGES = {
  main:    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
  ai:      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
  bitcoin: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80",
  tesla:   "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80",
  openai:  "https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&q=80",
};

// ============================
// 🚀 START ALL BOTS
// ============================
const mainBot    = new TelegramBot(MAIN_TOKEN,    { polling: true });
const aiBot      = new TelegramBot(AI_TOKEN,      { polling: true });
const bitcoinBot = new TelegramBot(BITCOIN_TOKEN, { polling: true });
const teslaBot   = new TelegramBot(TESLA_TOKEN,   { polling: true });
const openaiBot  = new TelegramBot(OPENAI_TOKEN,  { polling: true });

// ============================
// 🔥 TRENDING KEYWORDS
// ============================
const AI_KEYWORDS = [
  "GPT-5", "DeepMind", "Copilot", "Meta AI",
  "EU AI Act", "AlphaFold", "Gemini", "Claude",
  "Robotics", "AI Safety", "Llama 3", "Sora",
];

const BITCOIN_KEYWORDS = [
  "BTC Price", "ETF News", "Halving", "Altcoins",
  "Ethereum", "Binance", "Regulation", "Mining",
  "Lightning", "DeFi", "NFT", "Web3",
];

const TESLA_KEYWORDS = [
  "Cybertruck", "Model 3", "FSD", "Earnings",
  "Gigafactory", "Elon Musk", "Model Y", "Roadster",
  "Supercharger", "Battery", "Solar", "Autopilot",
];

const OPENAI_KEYWORDS = [
  "ChatGPT", "GPT-5", "Sora", "API",
  "Sam Altman", "DALL-E", "Whisper", "Funding",
  "Safety", "Lawsuit", "Plugins", "Voice",
];

// ============================
// 📰 NEWS DATA
// ============================
const NEWS_DATA = {
  // AI Bot news
  "gpt-5":      [{ title: "OpenAI Launches GPT-5", source: "The Verge", time: "1h ago", summary: "New model scores 95% on medical licensing exams and writes full apps from scratch." }],
  "deepmind":   [{ title: "Google DeepMind AlphaFold 3", source: "Nature", time: "3h ago", summary: "New protein folding model solves structures 10x faster than its predecessor." }],
  "copilot":    [{ title: "Microsoft Copilot Restructuring", source: "Bloomberg", time: "5h ago", summary: "Tech giant announces AI-driven restructuring across support and finance teams." }],
  "meta ai":    [{ title: "Meta AI Expands Globally", source: "TechCrunch", time: "2h ago", summary: "Meta AI assistant now available in 50+ countries with multilingual support." }],
  "eu ai act":  [{ title: "EU AI Act Enforcement Begins", source: "Reuters", time: "1d ago", summary: "First fines issued under new regulation targeting high-risk AI systems." }],
  "alphafold":  [{ title: "AlphaFold Solves 200M Proteins", source: "Nature", time: "2d ago", summary: "DeepMind's model has now mapped nearly every known protein structure on Earth." }],
  "gemini":     [{ title: "Google Gemini Ultra Launches", source: "Google Blog", time: "4h ago", summary: "Google's most powerful AI model now available to enterprise customers worldwide." }],
  "claude":     [{ title: "Anthropic Claude 4 Released", source: "Anthropic", time: "6h ago", summary: "New Claude model sets records on coding and reasoning benchmarks." }],
  "robotics":   [{ title: "Figure AI Robot Walks Autonomously", source: "TechCrunch", time: "3h ago", summary: "Humanoid robot completes complex factory tasks without human assistance." }],
  "ai safety":  [{ title: "OpenAI Safety Board Formed", source: "Reuters", time: "1d ago", summary: "Independent safety board to oversee all major AI model deployments." }],
  "llama 3":    [{ title: "Meta Llama 3 Outperforms GPT-4", source: "Meta AI", time: "5h ago", summary: "Open-source model beats proprietary rivals on coding and math tasks." }],
  "sora":       [{ title: "OpenAI Sora Goes Public", source: "The Verge", time: "2h ago", summary: "AI video generation tool now available to all ChatGPT Plus subscribers." }],

  // Bitcoin bot news
  "btc price":   [{ title: "Bitcoin Surpasses $120,000", source: "CoinDesk", time: "30m ago", summary: "Institutional buying accelerates as ETF inflows hit $2B in a single day." }],
  "etf news":    [{ title: "Bitcoin ETF Hits Record Volume", source: "CoinTelegraph", time: "4h ago", summary: "BlackRock's Bitcoin ETF records highest single-day trading volume of $3.5B." }],
  "halving":     [{ title: "Bitcoin Halving Impact Analysis", source: "Decrypt", time: "1d ago", summary: "Analysts predict supply shock to push BTC above $150K within 6 months." }],
  "altcoins":    [{ title: "Altcoin Season Begins", source: "CoinDesk", time: "3h ago", summary: "ETH, SOL and BNB surge 20%+ as Bitcoin dominance drops below 50%." }],
  "ethereum":    [{ title: "Ethereum ETF Approved", source: "Bloomberg", time: "2h ago", summary: "SEC approves spot Ethereum ETF, triggering 15% price surge in 24 hours." }],
  "binance":     [{ title: "Binance Launches New Features", source: "CoinTelegraph", time: "5h ago", summary: "Exchange adds copy trading and AI portfolio management tools for retail users." }],
  "regulation":  [{ title: "G20 Crypto Regulation Framework", source: "Reuters", time: "1d ago", summary: "Major economies agree on unified rules for crypto exchanges and stablecoins." }],
  "mining":      [{ title: "Bitcoin Mining Goes 60% Green", source: "CoinDesk", time: "6h ago", summary: "Report shows majority of Bitcoin mining now powered by renewable energy." }],
  "lightning":   [{ title: "Lightning Network Hits 10,000 BTC", source: "Decrypt", time: "2d ago", summary: "Bitcoin's payment layer reaches new capacity record as adoption surges." }],
  "defi":        [{ title: "DeFi Total Value Locked Hits $200B", source: "DeFiPulse", time: "4h ago", summary: "Decentralized finance protocols see massive inflows as crypto bull market continues." }],
  "nft":         [{ title: "NFT Market Revival in 2026", source: "CoinDesk", time: "1d ago", summary: "NFT trading volume surges 300% as new gaming and music projects launch." }],
  "web3":        [{ title: "Web3 Adoption Reaches 100M Users", source: "a16z", time: "3h ago", summary: "Crypto wallet users hit milestone as mainstream apps integrate blockchain features." }],

  // Tesla bot news
  "cybertruck":    [{ title: "Tesla Cybertruck Recall Issued", source: "AP", time: "1h ago", summary: "NHTSA orders recall of 45,000 Cybertrucks over faulty drive assist software." }],
  "model 3":       [{ title: "Tesla Model 3 Highland Wins Award", source: "Electrek", time: "2h ago", summary: "Model 3 Highland wins European Car of the Year for third consecutive year." }],
  "fsd":           [{ title: "Tesla FSD Version 13 Released", source: "Electrek", time: "5h ago", summary: "Full Self-Driving update brings major improvements to highway and city navigation." }],
  "earnings":      [{ title: "Tesla Q1 Deliveries Miss Estimates", source: "WSJ", time: "4h ago", summary: "Company delivers 386,000 vehicles, below analyst expectations of 410,000." }],
  "gigafactory":   [{ title: "Tesla Gigafactory Saudi Arabia", source: "CNN", time: "6h ago", summary: "Gigafactory planned for Riyadh as part of Vision 2030 investment push." }],
  "elon musk":     [{ title: "Musk Sells $2B in Tesla Shares", source: "Reuters", time: "1d ago", summary: "SEC filing reveals latest stock sale amid ongoing focus on xAI and SpaceX." }],
  "model y":       [{ title: "Tesla Model Y Tops Global Sales", source: "Bloomberg", time: "3h ago", summary: "Model Y becomes best-selling car in the world for second consecutive year." }],
  "roadster":      [{ title: "Tesla Roadster Launch Date Confirmed", source: "Electrek", time: "2d ago", summary: "Tesla CEO confirms new Roadster will launch in late 2026 with 0-60 in 1.1 seconds." }],
  "supercharger":  [{ title: "Tesla Supercharger Hits 60,000 Stations", source: "Tesla Blog", time: "4h ago", summary: "Tesla's charging network now the largest in the world, covering 110 countries." }],
  "battery":       [{ title: "Tesla 4680 Battery Achieves 500 Miles", source: "WSJ", time: "5h ago", summary: "New battery cell sets EV industry range record in latest Model S tests." }],
  "solar":         [{ title: "Tesla Solar Roof Sales Surge", source: "Bloomberg", time: "1d ago", summary: "Solar roof installations up 200% as homeowners seek energy independence." }],
  "autopilot":     [{ title: "Tesla Autopilot Cleared in Investigation", source: "Reuters", time: "6h ago", summary: "NHTSA closes probe after finding no defect in Tesla's Autopilot system." }],

  // OpenAI bot news
  "chatgpt":    [{ title: "ChatGPT Reaches 500M Users", source: "TechCrunch", time: "4h ago", summary: "OpenAI announces milestone as daily active users double year-over-year." }],
  "api":        [{ title: "OpenAI Releases New API Features", source: "The Verge", time: "6h ago", summary: "Developers get access to real-time voice, vision, and memory APIs in one package." }],
  "sam altman": [{ title: "Sam Altman Keynote at Davos", source: "Bloomberg", time: "2h ago", summary: "OpenAI CEO outlines vision for AGI timeline and safety commitments to world leaders." }],
  "dall-e":     [{ title: "DALL-E 4 Launches with Video", source: "The Verge", time: "3h ago", summary: "OpenAI's image model now generates 4K images and short video clips from text." }],
  "whisper":    [{ title: "Whisper V4 Transcribes 100 Languages", source: "OpenAI Blog", time: "1d ago", summary: "New speech recognition model achieves human-level accuracy in all major languages." }],
  "funding":    [{ title: "OpenAI Valued at $300B", source: "FT", time: "2h ago", summary: "Latest funding round puts the AI giant at a record valuation after investor frenzy." }],
  "safety":     [{ title: "OpenAI Safety Board Established", source: "Reuters", time: "5h ago", summary: "Independent experts join new board to oversee AI development and deployment." }],
  "lawsuit":    [{ title: "NY Times Lawsuit Update", source: "AP", time: "1d ago", summary: "Court rules OpenAI must preserve training data logs as copyright case proceeds." }],
  "plugins":    [{ title: "ChatGPT Plugins Hit 1,000 Tools", source: "TechCrunch", time: "3h ago", summary: "Plugin ecosystem grows rapidly as developers build on ChatGPT's platform." }],
  "voice":      [{ title: "ChatGPT Voice Mode Expands", source: "The Verge", time: "4h ago", summary: "Advanced voice mode now available in 50 languages with emotional tone support." }],
};

// Default news if keyword not found
const DEFAULT_NEWS = [
  { title: "AI Industry Hits $1 Trillion Valuation", source: "Bloomberg", time: "1h ago", summary: "Global AI market reaches historic milestone as enterprise adoption accelerates." },
  { title: "Tech Giants Race for AI Supremacy", source: "FT", time: "3h ago", summary: "Google, Microsoft, Meta and Apple all announce major AI investments this quarter." },
  { title: "AI Regulation Debate Heats Up", source: "Reuters", time: "5h ago", summary: "Lawmakers worldwide push for stricter controls on advanced AI systems." },
];

// ============================
// 🔧 HELPER FUNCTIONS
// ============================
function getNews(keyword) {
  const key = keyword.toLowerCase().trim();
  return NEWS_DATA[key] || DEFAULT_NEWS;
}

function formatNewsResults(articles, keyword) {
  let msg = `🔍 *Results for: ${keyword}*\n\n`;
  articles.forEach((a, i) => {
    msg += `${i + 1}. 📌 *${a.title}*\n`;
    msg += `   📰 ${a.source}  ·  🕐 ${a.time}\n`;
    msg += `   ${a.summary}\n\n`;
  });
  return msg;
}

function makeKeyboard(keywords, botName) {
  const rows = [];
  for (let i = 0; i < keywords.length; i += 4) {
    rows.push(
      keywords.slice(i, i + 4).map(k => ({
        text: k,
        callback_data: `search:${k}`,
      }))
    );
  }
  return { inline_keyboard: rows };
}

function getBottomMenu(latestCb, trendingCb) {
  return {
    inline_keyboard: [
      [
        { text: "📰 Latest News", callback_data: latestCb },
        { text: "🔥 Trending", callback_data: trendingCb },
      ],
    ],
  };
}

// ============================
// 🏠 MAIN BOT
// ============================
function getMainKeyboard() {
  return {
    inline_keyboard: [
      [
        { text: "🤖 AI News", url: "https://t.me/AINewsSearch_Bot" },
        { text: "₿ Bitcoin", url: "https://t.me/BitcoinNewsSearch_Bot" },
      ],
      [
        { text: "🚗 Tesla", url: "https://t.me/TeslaNewsSearch_Bot" },
        { text: "🌐 OpenAI", url: "https://t.me/OpenAINewsSearch_Bot" },
      ],
    ],
  };
}

mainBot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || "there";

  await mainBot.sendPhoto(chatId, IMAGES.main, {
    caption:
      `📡 *Welcome to NewsSearch Bot, ${firstName}!*\n\n` +
      `🔍 The essential Telegram news search engine.\n` +
      `Find the latest news on AI, Bitcoin, Tesla & OpenAI instantly.\n\n` +
      `👇 Tap any topic to open its dedicated news bot!`,
    parse_mode: "Markdown",
  });

  setTimeout(() => {
    mainBot.sendMessage(chatId, `🔥 *Hot Topics*\n\nChoose a topic to explore 👇`, {
      parse_mode: "Markdown",
      reply_markup: getMainKeyboard(),
    });
  }, 800);
});

mainBot.on("message", (msg) => {
  if (!msg.text || msg.text.startsWith("/")) return;
  mainBot.sendMessage(msg.chat.id, `👇 Tap a topic to open its news bot!`, {
    reply_markup: getMainKeyboard(),
  });
});

// ============================
// 🤖 AI NEWS BOT
// ============================
aiBot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || "there";

  // 1. Welcome image + text
  await aiBot.sendPhoto(chatId, IMAGES.ai, {
    caption:
      `🤖 *Welcome to AI News Bot, ${firstName}!*\n\n` +
      `🔍 Search the latest Artificial Intelligence news.\n` +
      `Send any keyword to find what you need!\n\n` +
      `📢 Stay ahead with cutting-edge AI updates.`,
    parse_mode: "Markdown",
  });

  // 2. Trending keywords
  setTimeout(() => {
    aiBot.sendMessage(chatId,
      `🔥 *Trending AI Topics*\n\nTap any keyword to search instantly 👇`,
      {
        parse_mode: "Markdown",
        reply_markup: makeKeyboard(AI_KEYWORDS, "ai"),
      }
    );
  }, 800);
});

aiBot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  await aiBot.answerCallbackQuery(query.id);

  if (data.startsWith("search:")) {
    const keyword = data.replace("search:", "");
    const articles = getNews(keyword);
    await aiBot.sendMessage(chatId, formatNewsResults(articles, keyword), {
      parse_mode: "Markdown",
      reply_markup: getBottomMenu("latest_ai", "trending_ai"),
    });
  } else if (data === "latest_ai") {
    const latest = [
      { title: "OpenAI Launches GPT-5", source: "The Verge", time: "1h ago", summary: "New model scores 95% on medical licensing exams." },
      { title: "Google DeepMind AlphaFold 3", source: "Nature", time: "3h ago", summary: "Protein folding model now 10x faster than predecessor." },
      { title: "Meta AI Expands to 50+ Countries", source: "TechCrunch", time: "2h ago", summary: "Multilingual AI assistant now available globally." },
    ];
    await aiBot.sendMessage(chatId, formatNewsResults(latest, "Latest AI News"), {
      parse_mode: "Markdown",
      reply_markup: getBottomMenu("latest_ai", "trending_ai"),
    });
  } else if (data === "trending_ai") {
    await aiBot.sendMessage(chatId,
      `🔥 *Trending AI Topics*\n\nTap any keyword to search instantly 👇`,
      {
        parse_mode: "Markdown",
        reply_markup: makeKeyboard(AI_KEYWORDS, "ai"),
      }
    );
  }
});

aiBot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (!text || text.startsWith("/")) return;

  const articles = getNews(text);
  await aiBot.sendMessage(chatId, formatNewsResults(articles, text), {
    parse_mode: "Markdown",
    reply_markup: getBottomMenu("latest_ai", "trending_ai"),
  });
});

// ============================
// ₿ BITCOIN BOT
// ============================
bitcoinBot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || "there";

  // 1. Welcome image + text
  await bitcoinBot.sendPhoto(chatId, IMAGES.bitcoin, {
    caption:
      `₿ *Welcome to Bitcoin News Bot, ${firstName}!*\n\n` +
      `🔍 Search the latest Bitcoin & Crypto news.\n` +
      `Send any keyword to find what you need!\n\n` +
      `📢 Stay ahead with real-time crypto updates.`,
    parse_mode: "Markdown",
  });

  // 2. Trending keywords
  setTimeout(() => {
    bitcoinBot.sendMessage(chatId,
      `🔥 *Trending Crypto Topics*\n\nTap any keyword to search instantly 👇`,
      {
        parse_mode: "Markdown",
        reply_markup: makeKeyboard(BITCOIN_KEYWORDS, "bitcoin"),
      }
    );
  }, 800);
});

bitcoinBot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  await bitcoinBot.answerCallbackQuery(query.id);

  if (data.startsWith("search:")) {
    const keyword = data.replace("search:", "");
    const articles = getNews(keyword);
    await bitcoinBot.sendMessage(chatId, formatNewsResults(articles, keyword), {
      parse_mode: "Markdown",
      reply_markup: getBottomMenu("latest_btc", "trending_btc"),
    });
  } else if (data === "latest_btc") {
    const latest = [
      { title: "Bitcoin Surpasses $120,000", source: "CoinDesk", time: "30m ago", summary: "Institutional buying accelerates as ETF inflows hit $2B." },
      { title: "Bitcoin ETF Hits Record Volume", source: "CoinTelegraph", time: "4h ago", summary: "BlackRock's Bitcoin ETF records $3.5B single-day volume." },
      { title: "JPMorgan Launches Bitcoin Custody", source: "FT", time: "8h ago", summary: "Wall Street giant now offers institutional Bitcoin storage." },
    ];
    await bitcoinBot.sendMessage(chatId, formatNewsResults(latest, "Latest Bitcoin News"), {
      parse_mode: "Markdown",
      reply_markup: getBottomMenu("latest_btc", "trending_btc"),
    });
  } else if (data === "trending_btc") {
    await bitcoinBot.sendMessage(chatId,
      `🔥 *Trending Crypto Topics*\n\nTap any keyword to search instantly 👇`,
      {
        parse_mode: "Markdown",
        reply_markup: makeKeyboard(BITCOIN_KEYWORDS, "bitcoin"),
      }
    );
  }
});

bitcoinBot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (!text || text.startsWith("/")) return;

  const articles = getNews(text);
  await bitcoinBot.sendMessage(chatId, formatNewsResults(articles, text), {
    parse_mode: "Markdown",
    reply_markup: getBottomMenu("latest_btc", "trending_btc"),
  });
});

// ============================
// 🚗 TESLA BOT
// ============================
teslaBot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || "there";

  // 1. Welcome image + text
  await teslaBot.sendPhoto(chatId, IMAGES.tesla, {
    caption:
      `🚗 *Welcome to Tesla News Bot, ${firstName}!*\n\n` +
      `🔍 Search the latest Tesla & EV news.\n` +
      `Send any keyword to find what you need!\n\n` +
      `📢 Stay ahead with real-time Tesla updates.`,
    parse_mode: "Markdown",
  });

  // 2. Trending keywords
  setTimeout(() => {
    teslaBot.sendMessage(chatId,
      `🔥 *Trending Tesla Topics*\n\nTap any keyword to search instantly 👇`,
      {
        parse_mode: "Markdown",
        reply_markup: makeKeyboard(TESLA_KEYWORDS, "tesla"),
      }
    );
  }, 800);
});

teslaBot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  await teslaBot.answerCallbackQuery(query.id);

  if (data.startsWith("search:")) {
    const keyword = data.replace("search:", "");
    const articles = getNews(keyword);
    await teslaBot.sendMessage(chatId, formatNewsResults(articles, keyword), {
      parse_mode: "Markdown",
      reply_markup: getBottomMenu("latest_tesla", "trending_tesla"),
    });
  } else if (data === "latest_tesla") {
    const latest = [
      { title: "Tesla Cybertruck Recall Issued", source: "AP", time: "1h ago", summary: "NHTSA orders recall of 45,000 Cybertrucks over faulty software." },
      { title: "Tesla Q1 Deliveries Miss Estimates", source: "WSJ", time: "4h ago", summary: "Company delivers 386,000 vehicles, below analyst expectations." },
      { title: "Tesla FSD Version 13 Released", source: "Electrek", time: "5h ago", summary: "Major improvements to highway and city navigation." },
    ];
    await teslaBot.sendMessage(chatId, formatNewsResults(latest, "Latest Tesla News"), {
      parse_mode: "Markdown",
      reply_markup: getBottomMenu("latest_tesla", "trending_tesla"),
    });
  } else if (data === "trending_tesla") {
    await teslaBot.sendMessage(chatId,
      `🔥 *Trending Tesla Topics*\n\nTap any keyword to search instantly 👇`,
      {
        parse_mode: "Markdown",
        reply_markup: makeKeyboard(TESLA_KEYWORDS, "tesla"),
      }
    );
  }
});

teslaBot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (!text || text.startsWith("/")) return;

  const articles = getNews(text);
  await teslaBot.sendMessage(chatId, formatNewsResults(articles, text), {
    parse_mode: "Markdown",
    reply_markup: getBottomMenu("latest_tesla", "trending_tesla"),
  });
});

// ============================
// 🌐 OPENAI BOT
// ============================
openaiBot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || "there";

  // 1. Welcome image + text
  await openaiBot.sendPhoto(chatId, IMAGES.openai, {
    caption:
      `🌐 *Welcome to OpenAI News Bot, ${firstName}!*\n\n` +
      `🔍 Search the latest OpenAI & ChatGPT news.\n` +
      `Send any keyword to find what you need!\n\n` +
      `📢 Stay ahead with real-time OpenAI updates.`,
    parse_mode: "Markdown",
  });

  // 2. Trending keywords
  setTimeout(() => {
    openaiBot.sendMessage(chatId,
      `🔥 *Trending OpenAI Topics*\n\nTap any keyword to search instantly 👇`,
      {
        parse_mode: "Markdown",
        reply_markup: makeKeyboard(OPENAI_KEYWORDS, "openai"),
      }
    );
  }, 800);
});

openaiBot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  await openaiBot.answerCallbackQuery(query.id);

  if (data.startsWith("search:")) {
    const keyword = data.replace("search:", "");
    const articles = getNews(keyword);
    await openaiBot.sendMessage(chatId, formatNewsResults(articles, keyword), {
      parse_mode: "Markdown",
      reply_markup: getBottomMenu("latest_openai", "trending_openai"),
    });
  } else if (data === "latest_openai") {
    const latest = [
      { title: "OpenAI Valued at $300B", source: "FT", time: "2h ago", summary: "Latest funding round puts AI giant at record valuation." },
      { title: "ChatGPT Reaches 500M Users", source: "TechCrunch", time: "4h ago", summary: "Daily active users double year-over-year." },
      { title: "OpenAI Releases New API Features", source: "The Verge", time: "6h ago", summary: "Voice, vision, and memory APIs now in one package." },
    ];
    await openaiBot.sendMessage(chatId, formatNewsResults(latest, "Latest OpenAI News"), {
      parse_mode: "Markdown",
      reply_markup: getBottomMenu("latest_openai", "trending_openai"),
    });
  } else if (data === "trending_openai") {
    await openaiBot.sendMessage(chatId,
      `🔥 *Trending OpenAI Topics*\n\nTap any keyword to search instantly 👇`,
      {
        parse_mode: "Markdown",
        reply_markup: makeKeyboard(OPENAI_KEYWORDS, "openai"),
      }
    );
  }
});

openaiBot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (!text || text.startsWith("/")) return;

  const articles = getNews(text);
  await openaiBot.sendMessage(chatId, formatNewsResults(articles, text), {
    parse_mode: "Markdown",
    reply_markup: getBottomMenu("latest_openai", "trending_openai"),
  });
});

// ============================
// ✅ ALL BOTS STARTED
// ============================
console.log("✅ Main Bot is running...");
console.log("✅ AI News Bot is running...");
console.log("✅ Bitcoin Bot is running...");
console.log("✅ Tesla Bot is running...");
console.log("✅ OpenAI Bot is running...");
console.log("🚀 All 5 bots running in ONE project!");
