const TelegramBot = require("node-telegram-bot-api");

// ============================
// 🤖 MAIN BOT TOKEN
// ============================
const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

// ============================
// 🖼️ WELCOME IMAGE
// ============================

const WELCOME_IMAGE = "https://raw.githubusercontent.com/hiruboyz/news-bot/main/Magnifying%20wealth%20with%20vibrant%20colors.png";

// ============================
// 📢 CHANNEL LISTS
// ============================
const CHANNELS = {
  ai: [
     { name: "🎬 こすっち103/ミニマム146cm超究極クビレ轟絶癒やし系ロ●ビッチ彼氏持ち美少女ナマ中出しNTR凶行！誰もが犯したくなるレベルの被虐大好きドMちゃん！首絞めで妊娠力爆上がり孕まSEX！", user: "postiingNew/23" },
    { name: "🎬 北国の性処理玩具ゆらちゃんは可愛さとエロさはレベチ過ぎて敵わない！逆バニーコスパコパコ個人撮影。精魂尽き果てる程の濃厚中出しセックスでガチ昇天！", user: "postiingNew/45" },
    // { name: "🎬 こすっち103/ミニマム146cm超究極クビレ轟絶癒やし系ロ●ビッチ彼氏持ち美少女ナマ中出しNTR凶行！誰もが犯したくなるレベルの被虐大好きドMちゃん！首絞めで妊娠力爆上がり孕まSEX！", user: "postiingNew/8" },
    // { name: "🎬 こすっち103/ミニマム146cm超究極クビレ轟絶癒やし系ロ●ビッチ彼氏持ち美少女ナマ中出しNTR凶行！誰もが犯したくなるレベルの被虐大好きドMちゃん！首絞めで妊娠力爆上がり孕まSEX！", user: "postiingNew/23" },
    // { name: "🎬 こすっち103/ミニマム146cm超究極クビレ轟絶癒やし系ロ●ビッチ彼氏持ち美少女ナマ中出しNTR凶行！誰もが犯したくなるレベルの被虐大好きドMちゃん！首絞めで妊娠力爆上がり孕まSEX！", user: "postiingNew/23" },
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
        { text: "美颜渲染", callback_data: "topic:ai" },
        { text: "极致高潮", callback_data: "topic:bitcoin" },
      ],
      [
        { text: "电子魅魔女友", callback_data: "topic:tesla" },
        // { text: "🌐 Test-04", callback_data: "topic:openai" },
      ],
    ],
  };
}

function getChannelButtons(channels, topic) {
  const rows = channels.map(ch => ([
    { text: `${ch.name}`, url: `https://t.me/${ch.user}` }
  ]));
  rows.push([{ text: "🏠 Back to Main Menu", callback_data: "menu" }]);
  return { inline_keyboard: rows };
}

// function formatChannelList(channels, topicName) {
//   let msg = `📢 *${topicName} Channels*\n`;
//   msg += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
//   channels.forEach((ch, i) => {
//     msg += `${i + 1}. *${ch.name}*\n`;
//     msg += `   👥 ${ch.members} members\n`;
//     msg += `   📝 ${ch.desc}\n`;
//     msg += `   🔗 @${ch.user}\n\n`;
//   });
//   msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
//   msg += `👇 Tap any channel to join!`;
//   return msg;
// }

function formatChannelList(channels, topicName) {
  return `📢 *${topicName}*\n\n👇 Tap any post below:`;
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
