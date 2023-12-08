const puppeteer = require("puppeteer");
const writeVideosURLsAndNamesInJSONFile =
  require("./writeOutputManager").writeVideosURLsAndNamesInJSONFile;

const getVideosURLsManager = async (
  username,
  password,
  videosPagesURLsAndNamesMap
) => {
  const browser = await puppeteer.launch();
  const cookies = await login(username, password, browser);
  await getVideosURLs(browser, videosPagesURLsAndNamesMap, cookies);
  await browser.close();
};

const login = async (username, password, browser) => {
  const page = await browser.newPage();

  await page.goto("https://qbank.pharmachieve.com/mod/lti/view.php?id=1289503");

  await page.type("#username", username);
  await page.type("#password", password);

  await page.click("#loginbtn");

  await page.waitForNavigation();

  const cookies = await page.cookies();

  await page.close();

  console.log("Logged in successfully");
  return await cookies;
};

const getVideosURLs = async (browser, videosPagesURLsAndNamesMap, cookies) => {
  for (const [
    videoPageURL,
    videoName,
  ] of videosPagesURLsAndNamesMap.entries()) {
    console.log("Getting....");
    console.log(videoPageURL);
    console.log(videoName);
    console.log("\n");

    const page = await browser.newPage();
    await page.setCookie(...cookies);
    await page.goto(videoPageURL);
    const videoURL = await page.$eval("source", (element) => {
      return element.src;
    });

    await writeVideosURLsAndNamesInJSONFile(videoURL, videoName);

    await page.close();

    console.log("Completed");
    console.log("\n");
  }
};

module.exports = {
  getVideosURLsAndNames: getVideosURLsManager,
};
