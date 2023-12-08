const getVideosPagesURLsAndNamesMap =
  require("./videosPagesURLsAndNamesManager").getVideosPagesURLsAndNamesMap;

const getVideosURLsAndNames =
  require("./videosURLsAndNamesManager").getVideosURLsAndNames;

const getFormattedTimestamp = require("./utils").getFormattedTimestamp;

const init = async () => {
  console.log("Getting Videos Pages URLS And Names.....");
  console.log("\n");

  const videosPagesURLsAndNamesMap = await getVideosPagesURLsAndNamesMap();

  console.log("Getting Videos URLS And Names....");
  console.log("\n");

  await getVideosURLsAndNames(
    "mohamedismaillderiny@gmail.com",
    "mam52021$",
    videosPagesURLsAndNamesMap
  );

  console.log("All Completed MUbaraak");
  console.log("\n");
};

global.formattedTimestamp = getFormattedTimestamp();

init();
