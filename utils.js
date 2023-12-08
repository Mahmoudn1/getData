function getFormattedTimestamp() {
  const currentDateTime = new Date();

  // Format the date and time components
  const year = currentDateTime.getFullYear();
  const month = (currentDateTime.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = currentDateTime.getDate().toString().padStart(2, "0");
  const hours = currentDateTime.getHours().toString().padStart(2, "0");
  const minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentDateTime.getSeconds().toString().padStart(2, "0");

  // Create the formatted timestamp
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

module.exports = {
  getFormattedTimestamp,
};
