const { spawn } = require("child_process");
const fs = require("fs/promises");

const FFMPEG_PATH =
  "/Users/mahmoud/Documents/Draft/dowloading/node_modules/ffmpeg-static/ffmpeg";

async function downloadVideo(video, audio, outputFilename, ffmpegPath) {
  return new Promise((resolve, reject) => {
    try {
      const command = `${ffmpegPath} -i ${video} -i ${audio} -c copy -bsf:a aac_adtstoasc ${outputFilename}`;
      console.log(command);
      const ffmpegProcess = spawn(command, { shell: true });

      ffmpegProcess.stderr.on("data", (data) => {
        // Parse the data to get progress information and print it
        console.log("segment is downloaded");
        console.log(data);
      });

      ffmpegProcess.on("exit", (code) => {
        if (code === 0) {
          console.log(`Video downloaded successfully as ${outputFilename}`);
          resolve();
        } else {
          console.error(
            `An error occurred during download. Exit code: ${code}`
          );
          reject(`Download failed with exit code ${code}`);
        }
      });
    } catch (error) {
      console.error(
        "An error occurred, please ensure ffmpeg is installed and the URL is correct."
      );
      console.error(error.message || error);
      reject(error);
    }
  });
}

const readURLsJSON = async () => {
  const contentJSON = await fs.readFile(
    "output 2023-12-07 20:36:03.json",
    "utf8"
  );
  content = JSON.parse(contentJSON);
  for (let [videoURL, videName] of Object.entries(content)) {
    const baseURL = videoURL.replace(/\/master.*/, "");
    const video = baseURL + "/media-2/stream.m3u8";
    const audio = baseURL + "/audio/aac/und/stream.m3u8";
    const formattedName = formateVideoName(videName);
    try {
      await downloadVideo(video, audio, formattedName, FFMPEG_PATH);
    } catch (e) {
      console.log("error in downloading video: ");
      console.log(formattedName);
      console.log(e);
      return;
    }
  }
};

const formateVideoName = (name) => {
  return (
    name
      .replace(/\s/g, "_")
      .replace(/\-/g, "_")
      .replace(/\(/g, "")
      .replace(/\)/g, "")
      .replace(/\]/g, "")
      .replace(/\[/g, "")
      .replace(/\./g, "") + ".mp4"
  );
};

readURLsJSON();
