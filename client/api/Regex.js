export function validateEmail(email) {
  const regex = /[\w.]+@gmail\.com$/;
  return regex.test(email);
}

export function isVideoFile(filename) {
  var videoExtensions = ["mp4", "mkv", "flv", "gif", "avi", "mov", "wmv"];
  var extension = filename.split(".").pop().toLowerCase();

  return videoExtensions.includes(extension);
}
