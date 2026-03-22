const TelegramBot = require("node-telegram-bot-api");

// ============================
// 🤖 MAIN BOT TOKEN
// ============================
const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

// ============================
// 🖼️ WELCOME IMAGE
// ============================
const WELCOME_IMAGE = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80";

// ============================
// 📢 CHANNEL LISTS
// ============================
const CHANNELS = {
  ai: [
    { name: " Test-01", user: "postiingNew", members: "125K" },
    // { name: "🧠 Deep Learning Hub", user: "deeplearninghub", desc: "Deep learning papers & tutorials", members: "89K" },
    // { name: "💡 Tech AI Insider", user: "techaiinsider", desc: "Big Tech AI updates from Google, Meta, Microsoft", members: "210K" },
    // { name: "🌐 AI World News", user: "aiworldnews", desc: "Global AI policy & industry news", members: "143K" },
  ],
  bitcoin: [
    { name: " Test-02", user: "postiingNew02", members: "450K" },
    // { name: "📈 Crypto Daily", user: "cryptodailynews", desc: "Daily crypto market updates", members: "280K" },
    // { name: "🏦 Institutional Crypto", user: "institutionalcrypto", desc: "ETF, institutional Bitcoin news", members: "95K" },
    // { name: "🌍 Crypto Regulation", user: "cryptoregulationnews", desc: "Global crypto laws & compliance", members: "112K" },
  ],
  tesla: [
    { name: " Test-03", user: "postiingNew03", members: "340K" },
    // { name: "⚡ EV World", user: "evworldnews", desc: "Electric vehicle industry news", members: "189K" },
    // { name: "🤖 Tesla FSD Updates", user: "teslafsdnews", desc: "Full Self-Driving software updates", members: "225K" },
    // { name: "🚀 Elon Musk News", user: "elonmusknews", desc: "Elon Musk announcements & news", members: "512K" },
  ],
  openai: [
    { name: "🌐 Test-04", user: "postiingNew", members: "620K" },
    // { name: "🤖 GPT Updates", user: "gptupdates", desc: "Latest GPT model releases", members: "380K" },
    // { name: "💻 OpenAI Developers", user: "openaidev", desc: "API updates & developer news", members: "234K" },
    // { name: "🚀 Sam Altman News", user: "samaltnews", desc: "OpenAI CEO updates & interviews", members: "198K" },
  ],
};

// ============================
// 🔧 HELPER FUNCTIONS
// ============================
function getMainKeyboard() {
  return {
    inline_keyboard: [
      [
        { text: "🤖 Test-01", callback_data: "topic:ai" },
        { text: "₿ Test-02", callback_data: "topic:bitcoin" },
      ],
      [
        { text: "🚗 Test-03", callback_data: "topic:tesla" },
        // { text: "🌐 Test-04", callback_data: "topic:openai" },
      ],
    ],
  };
}

function getChannelButtons(channels, topic) {
  const rows = channels.map(ch => ([
    { text: `${ch.name} · 👥 ${ch.members}`, url: `https://t.me/${ch.user}` }
  ]));
  rows.push([{ text: "🏠 Back to Main Menu", callback_data: "menu" }]);
  return { inline_keyboard: rows };
}

function formatChannelList(channels, topicName) {
  let msg = `📢 *${topicName} Channels*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
  channels.forEach((ch, i) => {
    msg += `${i + 1}. *${ch.name}*\n`;
    msg += `   👥 ${ch.members} members\n`;
    msg += `   📝 ${ch.desc}\n`;
    msg += `   🔗 @${ch.user}\n\n`;
  });
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `👇 Tap any channel to join!`;
  return msg;
}

const TOPIC_NAMES = {
  ai: "🤖 Test-01",
  bitcoin: "₿ Test-02",
  tesla: "🚗 Test-03",
  openai: "🌐 Test-04",
};

// ============================
// 🚀 /start COMMAND
// ============================
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || "there";

  // Welcome image + text
  await bot.sendPhoto(chatId, WELCOME_IMAGE, {
    caption:
      `📡 *Welcome to Test Bot, ${firstName}!*\n\n` +
      `🔍This is a Telegram resource search engine. Send keywords to find groups, channels, videos, and music.\n\n` +
      // `Find the best news channels on AI, Bitcoin, Tesla & OpenAI.\n\n` +
      `👇 Tap any topic to see the best channels!`,
    parse_mode: "Markdown",
  });

  // Topic buttons
  await new Promise(r => setTimeout(r, 800));
  await bot.sendMessage(chatId,
    `🔥 *Hot Topics*\n\nChoose a topic to explore channels 👇`,
    {
      parse_mode: "Markdown",
      reply_markup: getMainKeyboard(),
    }
  );
});

// ============================
// 🔘 BUTTON CALLBACKS
// ============================
bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  await bot.answerCallbackQuery(query.id);

  if (data.startsWith("topic:")) {
    const topic = data.replace("topic:", "");
    const channels = CHANNELS[topic];
    const topicName = TOPIC_NAMES[topic];

    await bot.sendMessage(chatId,
      formatChannelList(channels, topicName),
      {
        parse_mode: "Markdown",
        reply_markup: getChannelButtons(channels, topic),
      }
    );

  } else if (data === "menu") {
    await bot.sendMessage(chatId,
      `🔥 *Hot Topics*\n\nChoose a topic to explore channels 👇`,
      {
        parse_mode: "Markdown",
        reply_markup: getMainKeyboard(),
      }
    );
  }
});

// ============================
// 💬 FREE TEXT
// ============================
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (!text || text.startsWith("/")) return;

  bot.sendMessage(chatId,
    `👇 Choose a topic to see the best channels!`,
    { reply_markup: getMainKeyboard() }
  );
});

// ============================
// ✅ BOT STARTED
// ============================
console.log("✅ NewsSearch Main Bot is running...");
console.log("🔗 Channels shown directly in main bot!");
