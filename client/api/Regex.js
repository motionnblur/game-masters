export default function validateEmail(email) {
  const regex = /[\w.]+@gmail\.com$/;
  return regex.test(email);
}
