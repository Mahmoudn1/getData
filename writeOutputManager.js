const fs = require("fs/promises");

const writeVideosURLsAndNamesInJSONFile = async (videoURL, videName) => {
  let content;
  try {
    const contentJSON = await fs.readFile(
      `output ${global.formattedTimestamp}.json`,
      "utf8"
    );
    content = JSON.parse(contentJSON);
  } catch (e) {}

  let dataToBeWritten = {};

  if (content) {
    content[videoURL] = videName;
    dataToBeWritten = content;
  } else {
    dataToBeWritten[videoURL] = videName;
  }

  await fs.writeFile(
    `output ${global.formattedTimestamp}.json`,
    JSON.stringify(dataToBeWritten, null, 2)
  );
};
module.exports = {
  writeVideosURLsAndNamesInJSONFile,
};
