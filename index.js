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
// 📢 CHANNEL LISTS
// ============================
const CHANNELS = {
  ai: [
    { name: "🤖 AI News Daily", user: "ainewsdaily", desc: "Latest AI breakthroughs & research", members: "125K" },
    { name: "🧠 Deep Learning Hub", user: "deeplearninghub", desc: "Deep learning papers & tutorials", members: "89K" },
    { name: "💡 Tech AI Insider", user: "techaiinsider", desc: "Big Tech AI updates from Google, Meta, Microsoft", members: "210K" },
    { name: "🔬 AI Research Papers", user: "airesearchpapers", desc: "Daily AI research paper summaries", members: "67K" },
    { name: "🌐 AI World News", user: "aiworldnews", desc: "Global AI policy & industry news", members: "143K" },
    { name: "🤖 OpenAI Updates", user: "openaiunews", desc: "Official OpenAI product updates", members: "320K" },
    { name: "🚀 Future AI", user: "futureai_channel", desc: "AGI progress & future of AI", members: "98K" },
    { name: "💼 Enterprise AI", user: "enterpriseai", desc: "AI in business & enterprise solutions", members: "54K" },
  ],
  bitcoin: [
    { name: "₿ Bitcoin News", user: "bitcoinnewschannel", desc: "Real-time Bitcoin price & news", members: "450K" },
    { name: "📈 Crypto Daily", user: "cryptodailynews", desc: "Daily crypto market updates", members: "280K" },
    { name: "🏦 Institutional Crypto", user: "institutionalcrypto", desc: "ETF, institutional Bitcoin news", members: "95K" },
    { name: "⚡ Lightning Network", user: "lightningnetworknews", desc: "Bitcoin Lightning updates", members: "43K" },
    { name: "🌐 DeFi Pulse", user: "defipulsenews", desc: "DeFi protocols & yield farming", members: "167K" },
    { name: "📊 Crypto Charts", user: "cryptochartsnews", desc: "Technical analysis & price charts", members: "210K" },
    { name: "🔐 Crypto Security", user: "cryptosecuritynews", desc: "Wallet safety & hack alerts", members: "78K" },
    { name: "🌍 Crypto Regulation", user: "cryptoregulationnews", desc: "Global crypto laws & compliance", members: "112K" },
  ],
  tesla: [
    { name: "🚗 Tesla News", user: "teslanewschannel", desc: "Latest Tesla vehicle & software updates", members: "340K" },
    { name: "⚡ EV World", user: "evworldnews", desc: "Electric vehicle industry news", members: "189K" },
    { name: "🔋 Tesla Battery Tech", user: "teslabatterytech", desc: "Battery innovation & energy news", members: "67K" },
    { name: "🤖 Tesla FSD Updates", user: "teslafsdnews", desc: "Full Self-Driving software updates", members: "225K" },
    { name: "📊 Tesla Stock", user: "tslastocknews", desc: "TSLA stock analysis & earnings", members: "143K" },
    { name: "🏭 Tesla Gigafactory", user: "teslagigafactory", desc: "Gigafactory production updates", members: "89K" },
    { name: "🚀 Elon Musk News", user: "elonmusknews", desc: "Elon Musk announcements & news", members: "512K" },
    { name: "🌞 Tesla Solar", user: "teslasolar", desc: "Tesla Solar & Powerwall news", members: "45K" },
  ],
  openai: [
    { name: "🌐 ChatGPT News", user: "chatgptnewschannel", desc: "ChatGPT updates & tips", members: "620K" },
    { name: "🤖 GPT Updates", user: "gptupdates", desc: "Latest GPT model releases", members: "380K" },
    { name: "🎨 DALL-E Art", user: "dalleart", desc: "AI art & image generation news", members: "156K" },
    { name: "💻 OpenAI Developers", user: "openaidev", desc: "API updates & developer news", members: "234K" },
    { name: "⚖️ AI Ethics & Law", user: "aiethicslaw", desc: "AI regulation & legal updates", members: "87K" },
    { name: "🔬 AI Research", user: "airesearchnews", desc: "OpenAI research papers & findings", members: "143K" },
    { name: "🎙️ AI Voice & Audio", user: "aivoicenews", desc: "Whisper, voice AI updates", members: "65K" },
    { name: "🚀 Sam Altman News", user: "samaltnews", desc: "OpenAI CEO updates & interviews", members: "198K" },
  ],
};

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
// 🚀 START ALL BOTS
// ============================
const mainBot    = new TelegramBot(MAIN_TOKEN,    { polling: true });
const aiBot      = new TelegramBot(AI_TOKEN,      { polling: true });
const bitcoinBot = new TelegramBot(BITCOIN_TOKEN, { polling: true });
const teslaBot   = new TelegramBot(TESLA_TOKEN,   { polling: true });
const openaiBot  = new TelegramBot(OPENAI_TOKEN,  { polling: true });

// ============================
// 🔧 HELPER FUNCTIONS
// ============================
function formatChannelList(channels, topic) {
  let msg = `📢 *${topic} Channels*\n`;
  msg += `─────────────────────\n\n`;
  channels.forEach((ch, i) => {
    msg += `${i + 1}. ${ch.name}\n`;
    msg += `   👥 ${ch.members} members\n`;
    msg += `   📝 ${ch.desc}\n`;
    msg += `   🔗 @${ch.user}\n\n`;
  });
  msg += `─────────────────────\n`;
  msg += `💡 Tap any username to join!`;
  return msg;
}

function getChannelButtons(channels) {
  return {
    inline_keyboard: channels.map(ch => ([
      { text: `${ch.name} · ${ch.members}`, url: `https://t.me/${ch.user}` }
    ])),
  };
}

function makeKeyboard(keywords) {
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
        { text: "📢 All Channels", callback_data: latestCb },
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
      `🔍 Find the best AI Telegram channels.\n` +
      `Tap any keyword below to explore channels!\n\n` +
      `📢 Stay ahead with cutting-edge AI updates.`,
    parse_mode: "Markdown",
  });

  // 2. Trending keywords
  await new Promise(r => setTimeout(r, 800));
  await aiBot.sendMessage(chatId,
    `🔥 *Trending AI Topics*\n\nTap any keyword to find channels 👇`,
    {
      parse_mode: "Markdown",
      reply_markup: makeKeyboard(AI_KEYWORDS),
    }
  );
});

aiBot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  await aiBot.answerCallbackQuery(query.id);

  if (data.startsWith("search:")) {
    // Show channel list
    await aiBot.sendMessage(chatId,
      formatChannelList(CHANNELS.ai, "🤖 AI News"),
      {
        parse_mode: "Markdown",
        reply_markup: getChannelButtons(CHANNELS.ai),
      }
    );
  } else if (data === "channels_ai") {
    await aiBot.sendMessage(chatId,
      formatChannelList(CHANNELS.ai, "🤖 AI News"),
      {
        parse_mode: "Markdown",
        reply_markup: getChannelButtons(CHANNELS.ai),
      }
    );
  } else if (data === "trending_ai") {
    await aiBot.sendMessage(chatId,
      `🔥 *Trending AI Topics*\n\nTap any keyword to find channels 👇`,
      {
        parse_mode: "Markdown",
        reply_markup: makeKeyboard(AI_KEYWORDS),
      }
    );
  }
});

aiBot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (!text || text.startsWith("/")) return;

  await aiBot.sendMessage(chatId,
    formatChannelList(CHANNELS.ai, "🤖 AI News"),
    {
      parse_mode: "Markdown",
      reply_markup: getChannelButtons(CHANNELS.ai),
    }
  );
});

// ============================
// ₿ BITCOIN BOT
// ============================
bitcoinBot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || "there";

  await bitcoinBot.sendPhoto(chatId, IMAGES.bitcoin, {
    caption:
      `₿ *Welcome to Bitcoin News Bot, ${firstName}!*\n\n` +
      `🔍 Find the best Bitcoin & Crypto Telegram channels.\n` +
      `Tap any keyword below to explore channels!\n\n` +
      `📢 Stay ahead with real-time crypto updates.`,
    parse_mode: "Markdown",
  });

  await new Promise(r => setTimeout(r, 800));
  await bitcoinBot.sendMessage(chatId,
    `🔥 *Trending Crypto Topics*\n\nTap any keyword to find channels 👇`,
    {
      parse_mode: "Markdown",
      reply_markup: makeKeyboard(BITCOIN_KEYWORDS),
    }
  );
});

bitcoinBot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  await bitcoinBot.answerCallbackQuery(query.id);

  if (data.startsWith("search:")) {
    await bitcoinBot.sendMessage(chatId,
      formatChannelList(CHANNELS.bitcoin, "₿ Bitcoin & Crypto"),
      {
        parse_mode: "Markdown",
        reply_markup: getChannelButtons(CHANNELS.bitcoin),
      }
    );
  } else if (data === "channels_btc") {
    await bitcoinBot.sendMessage(chatId,
      formatChannelList(CHANNELS.bitcoin, "₿ Bitcoin & Crypto"),
      {
        parse_mode: "Markdown",
        reply_markup: getChannelButtons(CHANNELS.bitcoin),
      }
    );
  } else if (data === "trending_btc") {
    await bitcoinBot.sendMessage(chatId,
      `🔥 *Trending Crypto Topics*\n\nTap any keyword to find channels 👇`,
      {
        parse_mode: "Markdown",
        reply_markup: makeKeyboard(BITCOIN_KEYWORDS),
      }
    );
  }
});

bitcoinBot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (!text || text.startsWith("/")) return;

  await bitcoinBot.sendMessage(chatId,
    formatChannelList(CHANNELS.bitcoin, "₿ Bitcoin & Crypto"),
    {
      parse_mode: "Markdown",
      reply_markup: getChannelButtons(CHANNELS.bitcoin),
    }
  );
});

// ============================
// 🚗 TESLA BOT
// ============================
teslaBot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || "there";

  await teslaBot.sendPhoto(chatId, IMAGES.tesla, {
    caption:
      `🚗 *Welcome to Tesla News Bot, ${firstName}!*\n\n` +
      `🔍 Find the best Tesla & EV Telegram channels.\n` +
      `Tap any keyword below to explore channels!\n\n` +
      `📢 Stay ahead with real-time Tesla updates.`,
    parse_mode: "Markdown",
  });

  await new Promise(r => setTimeout(r, 800));
  await teslaBot.sendMessage(chatId,
    `🔥 *Trending Tesla Topics*\n\nTap any keyword to find channels 👇`,
    {
      parse_mode: "Markdown",
      reply_markup: makeKeyboard(TESLA_KEYWORDS),
    }
  );
});

teslaBot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  await teslaBot.answerCallbackQuery(query.id);

  if (data.startsWith("search:")) {
    await teslaBot.sendMessage(chatId,
      formatChannelList(CHANNELS.tesla, "🚗 Tesla & EV"),
      {
        parse_mode: "Markdown",
        reply_markup: getChannelButtons(CHANNELS.tesla),
      }
    );
  } else if (data === "channels_tesla") {
    await teslaBot.sendMessage(chatId,
      formatChannelList(CHANNELS.tesla, "🚗 Tesla & EV"),
      {
        parse_mode: "Markdown",
        reply_markup: getChannelButtons(CHANNELS.tesla),
      }
    );
  } else if (data === "trending_tesla") {
    await teslaBot.sendMessage(chatId,
      `🔥 *Trending Tesla Topics*\n\nTap any keyword to find channels 👇`,
      {
        parse_mode: "Markdown",
        reply_markup: makeKeyboard(TESLA_KEYWORDS),
      }
    );
  }
});

teslaBot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (!text || text.startsWith("/")) return;

  await teslaBot.sendMessage(chatId,
    formatChannelList(CHANNELS.tesla, "🚗 Tesla & EV"),
    {
      parse_mode: "Markdown",
      reply_markup: getChannelButtons(CHANNELS.tesla),
    }
  );
});

// ============================
// 🌐 OPENAI BOT
// ============================
openaiBot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || "there";

  await openaiBot.sendPhoto(chatId, IMAGES.openai, {
    caption:
      `🌐 *Welcome to OpenAI News Bot, ${firstName}!*\n\n` +
      `🔍 Find the best OpenAI & ChatGPT Telegram channels.\n` +
      `Tap any keyword below to explore channels!\n\n` +
      `📢 Stay ahead with real-time OpenAI updates.`,
    parse_mode: "Markdown",
  });

  await new Promise(r => setTimeout(r, 800));
  await openaiBot.sendMessage(chatId,
    `🔥 *Trending OpenAI Topics*\n\nTap any keyword to find channels 👇`,
    {
      parse_mode: "Markdown",
      reply_markup: makeKeyboard(OPENAI_KEYWORDS),
    }
  );
});

openaiBot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  await openaiBot.answerCallbackQuery(query.id);

  if (data.startsWith("search:")) {
    await openaiBot.sendMessage(chatId,
      formatChannelList(CHANNELS.openai, "🌐 OpenAI & ChatGPT"),
      {
        parse_mode: "Markdown",
        reply_markup: getChannelButtons(CHANNELS.openai),
      }
    );
  } else if (data === "channels_openai") {
    await openaiBot.sendMessage(chatId,
      formatChannelList(CHANNELS.openai, "🌐 OpenAI & ChatGPT"),
      {
        parse_mode: "Markdown",
        reply_markup: getChannelButtons(CHANNELS.openai),
      }
    );
  } else if (data === "trending_openai") {
    await openaiBot.sendMessage(chatId,
      `🔥 *Trending OpenAI Topics*\n\nTap any keyword to find channels 👇`,
      {
        parse_mode: "Markdown",
        reply_markup: makeKeyboard(OPENAI_KEYWORDS),
      }
    );
  }
});

openaiBot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (!text || text.startsWith("/")) return;

  await openaiBot.sendMessage(chatId,
    formatChannelList(CHANNELS.openai, "🌐 OpenAI & ChatGPT"),
    {
      parse_mode: "Markdown",
      reply_markup: getChannelButtons(CHANNELS.openai),
    }
  );
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
