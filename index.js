const TelegramBot = require("node-telegram-bot-api");

const fs = require("fs");

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
     { name: "🎬 演员：一条みお 番号：SHC116", user: "postiingNew/74" },
     { name: "🎬 番号：HRSM-12 标签 美颜渲染 颜值", user: "postiingNew/83" },
     { name: "🎬 演员：匠ぷにもえ 番号：SHC105", user: "postiingNew/89" },
    // { name: "🧠 Deep Learning Hub", user: "deeplearninghub", desc: "Deep learning papers & tutorials", members: "89K" },
    // { name: "💡 Tech AI Insider", user: "techaiinsider", desc: "Big Tech AI updates from Google, Meta, Microsoft", members: "210K" },
    // { name: "🌐 AI World News", user: "aiworldnews", desc: "Global AI policy & industry news", members: "143K" },
  ],
  bitcoin: [
    
    { name: "🎬 [中字]PRED-819 ─把漂亮姐姐弄到极致怀孕─ 前女子主播和香奈月在「已经高潮了啦」状态下持续内射！纤瘦身材被破坏后的追击活塞让她半哭着达到顶峰高潮！", user: "postiingNew02/11" },
    { name: "🎬 [中字]PRED-816 喜欢流口水的湿吻姐姐和深情老头的窒息前舌吻性爱全程", user: "postiingNew02/12" },
    { name: "🎬 PPPE-375 斯宾斯乳房发育诊所 橄榄樱花", user: "postiingNew02/13" },
    { name: "🎬 PRED-859 因为美由的大屁股太色了…所以和哥哥结婚的初恋同学，在同一个屋簷下背德内射，抢回来的故事。 逢泽美由！", user: "postiingNew02/14" },
    { name: "🎬 IPZZ-295 突如其来的大暴风雨让胸大的女下属躲到我家，她湿透的身体让我心头一热，就这样把她弄得湿答答的。樱空桃", user: "postiingNew02/16" },
    // { name: "📈 Crypto Daily", user: "cryptodailynews", desc: "Daily crypto market updates", members: "280K" },
    // { name: "🏦 Institutional Crypto", user: "institutionalcrypto", desc: "ETF, institutional Bitcoin news", members: "95K" },
    // { name: "🌍 Crypto Regulation", user: "cryptoregulationnews", desc: "Global crypto laws & compliance", members: "112K" },
  ],
  tesla: [
    // { name: " Test-03", user: "postiingNew03", members: "340K" },
    { name: "🎬 极品奶油风网红，电子魅魔女友，前凸后翘性感身材，一对巨乳摇摇欲坠，情趣丝袜淫荡肥臀，高清写真诱惑十足！", user: "postiingNew03/106" },
    { name: "🎬 抖音少妇微信定制福利视频，高颜值反差婊，性感情趣丝袜淫荡诱惑，各种剧情足交挑逗，年轻的妈妈勾引骚狗儿子，果然戴眼镜的才是最骚的~", user: "postiingNew03/112" },
    { name: "🎬 高颜值抖音博主，脸足同框私密定制，极品美女御姐黑丝、裸足，美脚诱惑，抹油搓脚心诱惑榨精，这么漂亮的美女帮哥哥打飞机，足交，绝对的视觉盛宴！", user: "postiingNew03/118" },
    { name: "🎬 足控福音！微博百万粉丝玉足女神，单人定制美脚诱惑资源，白里透红的食品级玉足，三寸金莲小脚丫令人垂涎三尺，真想含住脚趾猛吸一口~", user: "postiingNew03/124" },
    { name: "🎬 这才是抖音的正确打开方式！吃瓜网友视角VS土豪裸聊视角，以为是一本正经的女主播，没想到幻龙骑乘骚得一笔，红底高跟裤里丝，这谁顶得住啊！", user: "postiingNew03/130" },
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

// --------------------

function getTrendingKeywords() {
  try {
    if (fs.existsSync("trending.json")) {
      const data = JSON.parse(fs.readFileSync("trending.json", "utf8"));
      return data.keywords || [];
    }
  } catch (err) {
    console.error("Error reading trending.json:", err.message);
  }
  return ["키워드1", "키워드2", "키워드3", "키워드4", "키워드5"];
}

function getTrendingKeyboard() {
  const keywords = getTrendingKeywords();
  const rows = [];
  for (let i = 0; i < keywords.length; i += 2) {
    const row = [
      { text: keywords[i], url: `https://www.google.com/search?q=${encodeURIComponent(keywords[i])}` },
    ];
    if (keywords[i + 1]) {
      row.push({
        text: keywords[i + 1],
        url: `https://www.google.com/search?q=${encodeURIComponent(keywords[i + 1])}`,
      });
    }
    rows.push(row);
  }
  rows.push([{ text: "🔄 Refresh Trending", callback_data: "refresh_trending" }]);
  return { inline_keyboard: rows };
}


///-/-//--//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-////--/-/-/-/-/-

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
  ai: " Test-01",
  bitcoin: " Test-02",
  tesla: " Test-03",
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

//   // Topic buttons
//   await new Promise(r => setTimeout(r, 800));
//   await bot.sendMessage(chatId,
//     `🔥 *Hot Topics*\n\nChoose a topic to explore channels 👇`,
//     {
//       parse_mode: "Markdown",
//       reply_markup: getMainKeyboard(),
//     }
//   );
// });



//   // Topic buttons
//   await new Promise(r => setTimeout(r, 800));
//   await bot.sendMessage(chatId,
//     `🔥 *Hot Topics*\n\nChoose a topic to explore channels 👇`,
//     {
//       parse_mode: "Markdown",
//       reply_markup: getMainKeyboard(),
//     }
//   );

//   // Trending keywords
//   await new Promise(r => setTimeout(r, 800));
//   await bot.sendMessage(chatId,
//     `🔥 *Real-time Trending*\n\nTap any keyword to search 👇`,
//     {
//       parse_mode: "Markdown",
//       reply_markup: getTrendingKeyboard(),
//     }
//   );
// });


  // Topic buttons + Trending combined
  await new Promise(r => setTimeout(r, 800));
  
  const mainKeys = getMainKeyboard().inline_keyboard;
  const trendingKeys = getTrendingKeyboard().inline_keyboard;
  const combinedKeyboard = {
    inline_keyboard: [...trendingKeys, ...mainKeys]
  };

  await bot.sendMessage(chatId,
    `🔥 *Hot Topics*\n\nChoose a topic to explore channels 👇`,
    {
      parse_mode: "Markdown",
      reply_markup: combinedKeyboard,
    }
  );

// ============================
// 🔘 BUTTON CALLBACKS
// ============================
// bot.on("callback_query", async (query) => {
//   const chatId = query.message.chat.id;
//   const data = query.data;
//   await bot.answerCallbackQuery(query.id);

//   if (data.startsWith("topic:")) {
//     const topic = data.replace("topic:", "");
//     const channels = CHANNELS[topic];
//     const topicName = TOPIC_NAMES[topic];

//     await bot.sendMessage(chatId,
//       formatChannelList(channels, topicName),
//       {
//         parse_mode: "Markdown",
//         reply_markup: getChannelButtons(channels, topic),
//       }
//     );

//   } else if (data === "menu") {
//     await bot.sendMessage(chatId,
//       `🔥 *Hot Topics*\n\nChoose a topic to explore channels 👇`,
//       {
//         parse_mode: "Markdown",
//         reply_markup: getMainKeyboard(),
//       }
//     );
//   }
// });


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
  } else if (data === "refresh_trending") {   // ← ADD THIS BLOCK
    await bot.sendMessage(chatId,
      `🔥 *Real-time Trending*\n\nTap any keyword to search 👇`,
      {
        parse_mode: "Markdown",
        reply_markup: getTrendingKeyboard(),
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
