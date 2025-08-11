import fs from "fs";
import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto(
    "http://snapyb9.byethost11.com/data_android_sb9.php?api_key=api-key-xyz-122490&mode=data",
    {
      waitUntil: "networkidle0",
      timeout: 60000,
    }
  );

  try {
    // Cek apakah elemen <pre> ada
    const preElement = await page.$("pre");

    if (preElement) {
      const textContent = await page.evaluate(el => el.innerText, preElement);

      fs.mkdirSync("output", { recursive: true });
      fs.writeFileSync(
        "output/data.json",
        JSON.stringify({ data: textContent }, null, 2)
      );
    } else {
      fs.mkdirSync("output", { recursive: true });
      fs.writeFileSync(
        "output/data.json",
        JSON.stringify({ error: "<pre> element not found" }, null, 2)
      );
    }
  } catch (error) {
    fs.mkdirSync("output", { recursive: true });
    fs.writeFileSync(
      "output/data.json",
      JSON.stringify({ error: error.message }, null, 2)
    );
  }

  await browser.close();
})();
