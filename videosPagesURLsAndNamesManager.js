const fs = require("fs/promises");
const cheerio = require("cheerio");

const HOME_PATH = "home.html";
const VIDEO_TEXT_PATTERN =
  /[a-zA-Z]+ - Video \(\d{4}-\d{2}-\d{2}\) - \[\d+h:\d+m\]/;

const getVideosPagesURLsAndNamesMapManager = async () => {
  const content = await readHomeContent();
  const $ = cheerio.load(content);
  const spans = loadContentSpans($);
  return getVideosPagesURLsAndNames($, spans);
};

const getVideosPagesURLsAndNames = ($, spans) => {
  const VideosPagesURLsAndNamesMap = new Map();
  spans.map((_, span) => {
    const videoName = $(span).text();
    if (VIDEO_TEXT_PATTERN.test(videoName)) {
      const parentAnchor = $(span).closest("a");
      const url = parentAnchor.attr("href");
      VideosPagesURLsAndNamesMap.set(url, videoName);
    }
  });
  return VideosPagesURLsAndNamesMap;
};

const loadContentSpans = ($) => {
  const spans = $("span.item-content-wrap");
  return spans;
};

const readHomeContent = async () => {
  try {
    return await fs.readFile(HOME_PATH, "utf8");
  } catch (e) {
    console.log("could not read Home Content file Due to");
    console.log(e);
  }
};

module.exports = {
  getVideosPagesURLsAndNamesMap: getVideosPagesURLsAndNamesMapManager,
};
