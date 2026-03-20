const TelegramBot = require("node-telegram-bot-api");

// ============================
// 🤖 ALL BOT TOKENS
// ============================
const MAIN_TOKEN    = process.env.BOT_TOKEN;
const AI_TOKEN      = "8716836493:AAFJN9G0IiGbD4RYdMDp2CPbwlDMNskfWh8";
const BITCOIN_TOKEN = "8621803468:AAE1dADgxFHSiwCWmOPWwS6pAl4S4Tp8ACE";
const TESLA_TOKEN   = "8382399883:AAEeqNC05j6jL3WcgcbI1RqO7zqsIELiuxo";
const OPENAI_TOKEN  = "8749342231:AAEAhhCS_xL2Wdh3bBKbQn2Gm3EqBwfVHwQ";

// ============================
// 🖼️ IMAGES
// ============================
const IMAGES = {
  // AI News Bot Images
  ai: {
    welcome: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    sample1: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    sample2: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800&q=80",
    sample3: "https://images.unsplash.com/photo-1684369176170-463e84248b70?w=800&q=80",
  },
  // Bitcoin Bot Images
  bitcoin: {
    welcome: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80",
    sample1: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&q=80",
    sample2: "https://images.unsplash.com/photo-1609726494499-27d3e942456c?w=800&q=80",
    sample3: "https://images.unsplash.com/photo-1591994843349-f415893b3a6b?w=800&q=80",
  },
  // Tesla Bot Images
  tesla: {
    welcome: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80",
    sample1: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    sample2: "https://images.unsplash.com/photo-1562618817-253a073daa3b?w=800&q=80",
    sample3: "https://images.unsplash.com/photo-1571987502227-9231b837d92a?w=800&q=80",
  },
  // OpenAI Bot Images
  openai: {
    welcome: "https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&q=80",
    sample1: "https://images.unsplash.com/photo-1680016961031-c5de8f2f4bfc?w=800&q=80",
    sample2: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800&q=80",
    sample3: "https://images.unsplash.com/photo-1686191128892-3b37add4c844?w=800&q=80",
  },
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
// 📰 NEWS DATA
// ============================
const AI_NEWS = [
  { emoji: "🤖", title: "OpenAI Launches GPT-5", source: "The Verge", time: "1h ago", summary: "New model scores 95% on medical licensing exams and writes full apps from scratch." },
  { emoji: "🧠", title: "Google DeepMind AlphaFold 3", source: "Nature", time: "3h ago", summary: "New protein folding model solves structures 10x faster than its predecessor." },
  { emoji: "💼", title: "Microsoft Copilot Restructuring", source: "Bloomberg", time: "5h ago", summary: "Tech giant announces AI-driven restructuring across support and finance teams." },
  { emoji: "🔒", title: "EU AI Act Enforcement Begins", source: "Reuters", time: "1d ago", summary: "First fines issued under new regulation targeting high-risk AI systems." },
  { emoji: "🌐", title: "Meta AI Expands Globally", source: "TechCrunch", time: "2h ago", summary: "Meta AI assistant now available in 50+ countries with multilingual support." },
  { emoji: "🔬", title: "AI Detects Cancer Earlier Than Doctors", source: "BBC", time: "6h ago", summary: "New study shows AI model detects early-stage cancer with 94% accuracy." },
];

const BITCOIN_NEWS = [
  { emoji: "₿", title: "Bitcoin Surpasses $120,000", source: "CoinDesk", time: "30m ago", summary: "Institutional buying accelerates as ETF inflows hit $2B in a single day." },
  { emoji: "📉", title: "Crypto Market Volatile After Fed Remarks", source: "Bloomberg", time: "2h ago", summary: "Powell's comments on interest rates trigger a 5% swing in crypto markets." },
  { emoji: "🏦", title: "JPMorgan Launches Bitcoin Custody", source: "FT", time: "8h ago", summary: "Wall Street giant now offers institutional Bitcoin storage services." },
  { emoji: "🌐", title: "El Salvador Reports BTC Profit", source: "Reuters", time: "2d ago", summary: "Country's Bitcoin reserve now worth $400M after years of IMF criticism." },
  { emoji: "📊", title: "Bitcoin ETF Hits Record Volume", source: "CoinTelegraph", time: "4h ago", summary: "BlackRock's Bitcoin ETF records highest single-day trading volume of $3.5B." },
  { emoji: "🔐", title: "New Bitcoin Lightning Network Update", source: "Decrypt", time: "1d ago", summary: "Major upgrade enables faster, cheaper Bitcoin transactions globally." },
];

const TESLA_NEWS = [
  { emoji: "🚗", title: "Tesla Cybertruck Recall Issued", source: "AP", time: "1h ago", summary: "NHTSA orders recall of 45,000 Cybertrucks over faulty drive assist software." },
  { emoji: "⚡", title: "Tesla Q1 Deliveries Miss Estimates", source: "WSJ", time: "4h ago", summary: "Company delivers 386,000 vehicles, below analyst expectations of 410,000." },
  { emoji: "🤝", title: "Tesla Signs Deal with Saudi Arabia", source: "CNN", time: "6h ago", summary: "Gigafactory planned for Riyadh as part of Vision 2030 investment push." },
  { emoji: "📊", title: "Musk Sells $2B in Tesla Shares", source: "Reuters", time: "1d ago", summary: "SEC filing reveals latest stock sale amid ongoing focus on xAI and SpaceX." },
  { emoji: "🔋", title: "Tesla Megapack Hits New Record", source: "Bloomberg", time: "3h ago", summary: "Energy storage division reports record quarterly revenue of $3.7B." },
  { emoji: "🚀", title: "Tesla FSD Version 13 Released", source: "Electrek", time: "5h ago", summary: "Full Self-Driving update brings major improvements to highway and city navigation." },
];

const OPENAI_NEWS = [
  { emoji: "🤖", title: "OpenAI Valued at $300B", source: "FT", time: "2h ago", summary: "Latest funding round puts the AI giant at a record valuation after investor frenzy." },
  { emoji: "📱", title: "ChatGPT Reaches 500M Users", source: "TechCrunch", time: "4h ago", summary: "OpenAI announces milestone as daily active users double year-over-year." },
  { emoji: "🔑", title: "OpenAI Releases New API Features", source: "The Verge", time: "6h ago", summary: "Developers get access to real-time voice, vision, and memory APIs in one package." },
  { emoji: "⚖️", title: "NY Times Lawsuit Update", source: "AP", time: "1d ago", summary: "Court rules OpenAI must preserve training data logs as copyright case proceeds." },
  { emoji: "🌐", title: "OpenAI Launches GPT-5", source: "Bloomberg", time: "1h ago", summary: "New model scores 95% on medical licensing exams and writes full apps from scratch." },
  { emoji: "🔬", title: "OpenAI Partners with WHO", source: "Reuters", time: "3h ago", summary: "Partnership aims to use AI for global health diagnostics and disease prevention." },
];

// ============================
// 🔧 HELPER FUNCTIONS
// ============================
function formatNews(articles, title) {
  let msg = `${title}\n\n`;
  articles.forEach((a) => {
    msg += `${a.emoji} *${a.title}*\n`;
    msg += `📰 ${a.source}  ·  🕐 ${a.time}\n`;
    msg += `${a.summary}\n\n`;
  });
  return msg;
}

function getRefreshKeyboard() {
  return {
    inline_keyboard: [
      [{ text: "🔄 Refresh News", callback_data: "refresh" }],
    ],
  };
}

// Send 3 sample images one by one with captions
async function sendSampleImages(bot, chatId, images, captions) {
  for (let i = 0; i < 3; i++) {
    await new Promise(resolve => setTimeout(resolve, 600));
    await bot.sendPhoto(chatId, images[i], {
      caption: captions[i],
      parse_mode: "Markdown",
    });
  }
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

mainBot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || "there";
  mainBot.sendMessage(
    chatId,
    `📡 *Welcome to NewsSearch Bot, ${firstName}!*\n\n` +
    `🔍 The essential Telegram news search engine.\n\n` +
    `Find the latest news, articles, and trending topics instantly.\n\n` +
    `✅ *What I can do:*\n` +
    `• Tap any topic below to open its dedicated news bot\n` +
    `• Each topic has its own bot with focused news\n` +
    `• Get the latest articles from top sources\n`,
    { parse_mode: "Markdown" }
  );
  setTimeout(() => {
    mainBot.sendMessage(
      chatId,
      `🔥 *Hot Search Ranking*\n\n🔎 Tap any keyword to open its news bot 👇`,
      { parse_mode: "Markdown", reply_markup: getMainKeyboard() }
    );
  }, 800);
});

mainBot.onText(/\/hot/, (msg) => {
  mainBot.sendMessage(msg.chat.id, `🔥 *Hot Search Ranking*\n\nTap any keyword 👇`, {
    parse_mode: "Markdown",
    reply_markup: getMainKeyboard(),
  });
});

mainBot.on("message", (msg) => {
  if (!msg.text || msg.text.startsWith("/")) return;
  mainBot.sendMessage(msg.chat.id, `🔍 Tap a topic button to open its news bot!\n\nType /hot to see all topics.`);
});

// ============================
// 🤖 AI NEWS BOT
// ============================
aiBot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || "there";

  // 1. Welcome Image + Text
  await aiBot.sendPhoto(chatId, IMAGES.ai.welcome, {
    caption:
      `🤖 *Welcome to AI News Bot, ${firstName}!*\n\n` +
      `Stay updated with the latest in Artificial Intelligence.\n\n` +
      `✅ *What you'll get:*\n` +
      `• Latest AI research & breakthroughs\n` +
      `• Big Tech AI updates\n` +
      `• AI policy & regulation news`,
    parse_mode: "Markdown",
  });

  // 2. News List
  await new Promise(resolve => setTimeout(resolve, 800));
  await aiBot.sendMessage(chatId, formatNews(AI_NEWS, "🤖 *Latest AI News*"), {
    parse_mode: "Markdown",
    reply_markup: getRefreshKeyboard(),
  });

  // 3. Sample Image 1
  await new Promise(resolve => setTimeout(resolve, 600));
  await aiBot.sendPhoto(chatId, IMAGES.ai.sample1, {
    caption: `🧠 *AI Spotlight #1*\n\nGoogle DeepMind achieves new milestone in AI reasoning, surpassing human-level performance on complex math benchmarks.\n\n📰 Nature  ·  🕐 2h ago`,
    parse_mode: "Markdown",
  });

  // 4. Sample Image 2
  await new Promise(resolve => setTimeout(resolve, 600));
  await aiBot.sendPhoto(chatId, IMAGES.ai.sample2, {
    caption: `💡 *AI Spotlight #2*\n\nMeta releases open-source AI model that outperforms GPT-4 on coding tasks, available for free to developers worldwide.\n\n📰 TechCrunch  ·  🕐 4h ago`,
    parse_mode: "Markdown",
  });

  // 5. Sample Image 3
  await new Promise(resolve => setTimeout(resolve, 600));
  await aiBot.sendPhoto(chatId, IMAGES.ai.sample3, {
    caption: `🔬 *AI Spotlight #3*\n\nNew AI system from MIT can predict protein structures in seconds, revolutionizing drug discovery and medical research.\n\n📰 MIT News  ·  🕐 6h ago`,
    parse_mode: "Markdown",
  });
});

aiBot.onText(/\/news/, (msg) => {
  aiBot.sendMessage(msg.chat.id, formatNews(AI_NEWS, "🤖 *Latest AI News*"), {
    parse_mode: "Markdown",
    reply_markup: getRefreshKeyboard(),
  });
});

aiBot.on("callback_query", (query) => {
  aiBot.answerCallbackQuery(query.id);
  aiBot.sendMessage(query.message.chat.id, formatNews(AI_NEWS, "🤖 *Latest AI News*"), {
    parse_mode: "Markdown",
    reply_markup: getRefreshKeyboard(),
  });
});

aiBot.on("message", (msg) => {
  if (!msg.text || msg.text.startsWith("/")) return;
  aiBot.sendMessage(msg.chat.id, `🤖 Type /news to see the latest AI news!`);
});

// ============================
// ₿ BITCOIN BOT
// ============================
bitcoinBot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || "there";

  // 1. Welcome Image + Text
  await bitcoinBot.sendPhoto(chatId, IMAGES.bitcoin.welcome, {
    caption:
      `₿ *Welcome to Bitcoin News Bot, ${firstName}!*\n\n` +
      `Stay updated with the latest Bitcoin & crypto news.\n\n` +
      `✅ *What you'll get:*\n` +
      `• Live Bitcoin price updates\n` +
      `• Institutional & ETF news\n` +
      `• Crypto regulation updates`,
    parse_mode: "Markdown",
  });

  // 2. News List
  await new Promise(resolve => setTimeout(resolve, 800));
  await bitcoinBot.sendMessage(chatId, formatNews(BITCOIN_NEWS, "₿ *Latest Bitcoin News*"), {
    parse_mode: "Markdown",
    reply_markup: getRefreshKeyboard(),
  });

  // 3. Sample Image 1
  await new Promise(resolve => setTimeout(resolve, 600));
  await bitcoinBot.sendPhoto(chatId, IMAGES.bitcoin.sample1, {
    caption: `₿ *Bitcoin Spotlight #1*\n\nBitcoin ETF inflows reach record $2.4B in a single week as institutional adoption accelerates across Wall Street.\n\n📰 CoinDesk  ·  🕐 1h ago`,
    parse_mode: "Markdown",
  });

  // 4. Sample Image 2
  await new Promise(resolve => setTimeout(resolve, 600));
  await bitcoinBot.sendPhoto(chatId, IMAGES.bitcoin.sample2, {
    caption: `📈 *Bitcoin Spotlight #2*\n\nMicroStrategy adds another 10,000 BTC to its treasury, bringing total holdings to over 214,000 Bitcoin worth $25B.\n\n📰 Bloomberg  ·  🕐 3h ago`,
    parse_mode: "Markdown",
  });

  // 5. Sample Image 3
  await new Promise(resolve => setTimeout(resolve, 600));
  await bitcoinBot.sendPhoto(chatId, IMAGES.bitcoin.sample3, {
    caption: `🌐 *Bitcoin Spotlight #3*\n\nG20 nations agree on unified crypto regulation framework, bringing clarity to Bitcoin's legal status in major economies.\n\n📰 Reuters  ·  🕐 5h ago`,
    parse_mode: "Markdown",
  });
});

bitcoinBot.onText(/\/news/, (msg) => {
  bitcoinBot.sendMessage(msg.chat.id, formatNews(BITCOIN_NEWS, "₿ *Latest Bitcoin News*"), {
    parse_mode: "Markdown",
    reply_markup: getRefreshKeyboard(),
  });
});

bitcoinBot.on("callback_query", (query) => {
  bitcoinBot.answerCallbackQuery(query.id);
  bitcoinBot.sendMessage(query.message.chat.id, formatNews(BITCOIN_NEWS, "₿ *Latest Bitcoin News*"), {
    parse_mode: "Markdown",
    reply_markup: getRefreshKeyboard(),
  });
});

bitcoinBot.on("message", (msg) => {
  if (!msg.text || msg.text.startsWith("/")) return;
  bitcoinBot.sendMessage(msg.chat.id, `₿ Type /news to see the latest Bitcoin news!`);
});

// ============================
// 🚗 TESLA BOT
// ============================
teslaBot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || "there";

  // 1. Welcome Image + Text
  await teslaBot.sendPhoto(chatId, IMAGES.tesla.welcome, {
    caption:
      `🚗 *Welcome to Tesla News Bot, ${firstName}!*\n\n` +
      `Stay updated with the latest Tesla & EV news.\n\n` +
      `✅ *What you'll get:*\n` +
      `• Tesla vehicle & product updates\n` +
      `• Stock & earnings news\n` +
      `• FSD & technology updates`,
    parse_mode: "Markdown",
  });

  // 2. News List
  await new Promise(resolve => setTimeout(resolve, 800));
  await teslaBot.sendMessage(chatId, formatNews(TESLA_NEWS, "🚗 *Latest Tesla News*"), {
    parse_mode: "Markdown",
    reply_markup: getRefreshKeyboard(),
  });

  // 3. Sample Image 1
  await new Promise(resolve => setTimeout(resolve, 600));
  await teslaBot.sendPhoto(chatId, IMAGES.tesla.sample1, {
    caption: `🚗 *Tesla Spotlight #1*\n\nTesla Model 3 Highland wins European Car of the Year award, beating traditional automakers for the third consecutive year.\n\n📰 Electrek  ·  🕐 1h ago`,
    parse_mode: "Markdown",
  });

  // 4. Sample Image 2
  await new Promise(resolve => setTimeout(resolve, 600));
  await teslaBot.sendPhoto(chatId, IMAGES.tesla.sample2, {
    caption: `⚡ *Tesla Spotlight #2*\n\nTesla Supercharger network expands to 60,000 stations globally, making it the world's largest EV charging network.\n\n📰 Tesla Blog  ·  🕐 3h ago`,
    parse_mode: "Markdown",
  });

  // 5. Sample Image 3
  await new Promise(resolve => setTimeout(resolve, 600));
  await teslaBot.sendPhoto(chatId, IMAGES.tesla.sample3, {
    caption: `🔋 *Tesla Spotlight #3*\n\nTesla's new 4680 battery cell achieves 500-mile range milestone in Model S, setting a new EV industry record.\n\n📰 WSJ  ·  🕐 5h ago`,
    parse_mode: "Markdown",
  });
});

teslaBot.onText(/\/news/, (msg) => {
  teslaBot.sendMessage(msg.chat.id, formatNews(TESLA_NEWS, "🚗 *Latest Tesla News*"), {
    parse_mode: "Markdown",
    reply_markup: getRefreshKeyboard(),
  });
});

teslaBot.on("callback_query", (query) => {
  teslaBot.answerCallbackQuery(query.id);
  teslaBot.sendMessage(query.message.chat.id, formatNews(TESLA_NEWS, "🚗 *Latest Tesla News*"), {
    parse_mode: "Markdown",
    reply_markup: getRefreshKeyboard(),
  });
});

teslaBot.on("message", (msg) => {
  if (!msg.text || msg.text.startsWith("/")) return;
  teslaBot.sendMessage(msg.chat.id, `🚗 Type /news to see the latest Tesla news!`);
});

// ============================
// 🌐 OPENAI BOT
// ============================
openaiBot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || "there";

  // 1. Welcome Image + Text
  await openaiBot.sendPhoto(chatId, IMAGES.openai.welcome, {
    caption:
      `🌐 *Welcome to OpenAI News Bot, ${firstName}!*\n\n` +
      `Stay updated with the latest OpenAI & ChatGPT news.\n\n` +
      `✅ *What you'll get:*\n` +
      `• ChatGPT & GPT model updates\n` +
      `• OpenAI business & funding news\n` +
      `• AI policy & legal updates`,
    parse_mode: "Markdown",
  });

  // 2. News List
  await new Promise(resolve => setTimeout(resolve, 800));
  await openaiBot.sendMessage(chatId, formatNews(OPENAI_NEWS, "🌐 *Latest OpenAI News*"), {
    parse_mode: "Markdown",
    reply_markup: getRefreshKeyboard(),
  });

  // 3. Sample Image 1
  await new Promise(resolve => setTimeout(resolve, 600));
  await openaiBot.sendPhoto(chatId, IMAGES.openai.sample1, {
    caption: `🌐 *OpenAI Spotlight #1*\n\nChatGPT introduces real-time collaboration features, allowing multiple users to work together in shared AI conversations.\n\n📰 The Verge  ·  🕐 1h ago`,
    parse_mode: "Markdown",
  });

  // 4. Sample Image 2
  await new Promise(resolve => setTimeout(resolve, 600));
  await openaiBot.sendPhoto(chatId, IMAGES.openai.sample2, {
    caption: `🔑 *OpenAI Spotlight #2*\n\nOpenAI's new o3 reasoning model scores 100% on International Math Olympiad problems, a first for any AI system.\n\n📰 MIT Tech Review  ·  🕐 3h ago`,
    parse_mode: "Markdown",
  });

  // 5. Sample Image 3
  await new Promise(resolve => setTimeout(resolve, 600));
  await openaiBot.sendPhoto(chatId, IMAGES.openai.sample3, {
    caption: `⚖️ *OpenAI Spotlight #3*\n\nOpenAI announces new safety board with independent experts to oversee AI development and deployment decisions.\n\n📰 Reuters  ·  🕐 5h ago`,
    parse_mode: "Markdown",
  });
});

openaiBot.onText(/\/news/, (msg) => {
  openaiBot.sendMessage(msg.chat.id, formatNews(OPENAI_NEWS, "🌐 *Latest OpenAI News*"), {
    parse_mode: "Markdown",
    reply_markup: getRefreshKeyboard(),
  });
});

openaiBot.on("callback_query", (query) => {
  openaiBot.answerCallbackQuery(query.id);
  openaiBot.sendMessage(query.message.chat.id, formatNews(OPENAI_NEWS, "🌐 *Latest OpenAI News*"), {
    parse_mode: "Markdown",
    reply_markup: getRefreshKeyboard(),
  });
});

openaiBot.on("message", (msg) => {
  if (!msg.text || msg.text.startsWith("/")) return;
  openaiBot.sendMessage(msg.chat.id, `🌐 Type /news to see the latest OpenAI news!`);
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
