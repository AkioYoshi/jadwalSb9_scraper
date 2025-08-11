const fs = require("fs");
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto("http://snapyb9.byethost11.com/data_android_sb9.php?api_key=api-key-xyz-122490&mode=data", {
    waitUntil: "networkidle0",
    timeout: 60000
  });

  // Ambil isi halaman setelah JavaScript selesai
  const content = await page.content();

  // Simpan hasilnya ke output/data.json (bisa parse jadi JSON kalau perlu)
  fs.mkdirSync("output", { recursive: true });
  fs.writeFileSync("output/data.json", JSON.stringify({ html: content }, null, 2));

  await browser.close();
})();
