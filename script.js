//your JS code here. If required.
// Function to set a cookie
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000)); // set expiration time
  let expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie value
function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Function to apply the font size and color preferences
function applyPreferences() {
  const fontSize = getCookie("fontsize");
  const fontColor = getCookie("fontcolor");

  if (fontSize) {
    document.documentElement.style.setProperty('--fontsize', fontSize + 'px');
    document.getElementById('fontsize').value = fontSize;
  }
  if (fontColor) {
    document.documentElement.style.setProperty('--fontcolor', fontColor);
    document.getElementById('fontcolor').value = fontColor;
  }
}

// Apply preferences when the page loads
window.onload = applyPreferences;

// Handle form submission
document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault();

  const fontSize = document.getElementById('fontsize').value;
  const fontColor = document.getElementById('fontcolor').value;

  // Save the preferences in cookies
  setCookie('fontsize', fontSize, 365); // Store for 1 year
  setCookie('fontcolor', fontColor, 365); // Store for 1 year

  // Apply the preferences immediately
  document.documentElement.style.setProperty('--fontsize', fontSize + 'px');
  document.documentElement.style.setProperty('--fontcolor', fontColor);
});
