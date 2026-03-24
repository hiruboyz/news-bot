const { chromium } = require("playwright");
const fs = require("fs");

async function scrapeTrending() {
  console.log("🔍 Scraping signal.bz...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto("https://www.signal.bz", { waitUntil: "networkidle", timeout: 30000 });

    // Wait for content to load
    await page.waitForTimeout(3000);

    // Use correct selector .rank-text
    const keywords = await page.evaluate(() => {
      const items = document.querySelectorAll(".rank-text");
      return Array.from(items)
        .slice(0, 10)
        .map(item => item.innerText.trim())
        .filter(text => text.length > 0);
    });

    await browser.close();

    if (keywords.length > 0) {
      const data = {
        updatedAt: new Date().toISOString(),
        keywords: keywords,
      };
      fs.writeFileSync("trending.json", JSON.stringify(data, null, 2), "utf8");
      console.log(`✅ Saved ${keywords.length} trending keywords:`);
      keywords.forEach((kw, i) => console.log(`   ${i + 1}. ${kw}`));
    } else {
      console.log("⚠️ No keywords found! Keeping old data.");
    }

  } catch (err) {
    console.error("❌ Scraping error:", err.message);
    await browser.close();
  }
}

// Run immediately on start
scrapeTrending();

// Run every 10 minutes
setInterval(scrapeTrending, 10 * 60 * 1000);

console.log("⏰ Scraper running every 10 minutes...");
