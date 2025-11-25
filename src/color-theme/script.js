const storageKey = "data-scheme";
const pressedButton = '[data-scheme][aria-pressed="true"]';

const getColorPreference = () => {
  const storedScheme = localStorage.getItem(storageKey);
  if (storedScheme) return storedScheme;
  else
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
};

const setScheme = (scheme) => {
  // Switch to the new scheme
  document.documentElement.setAttribute("data-scheme", scheme);
  // Remove aria-pressed from the previously selected button
  document.querySelector(pressedButton)?.setAttribute("aria-pressed", "false");
  // Set aria-pressed on the newly selected button
  const target = document.querySelector(
    `[data-button][data-scheme="${scheme}"]`
  );
  target?.setAttribute("aria-pressed", "true");
  // Persist to localStorage
  localStorage.setItem(storageKey, scheme);
};

const handleSchemeSelection = (event) => {
  const target = event.currentTarget;
  const isPressed = target.getAttribute("aria-pressed");
  const scheme = target.getAttribute("data-scheme");
  if (isPressed !== "true" && scheme) {
    setScheme(scheme);
  }
};

window.onload = () => {
  const colorPreference = getColorPreference();
  setScheme(colorPreference);

  const themePicker = document.querySelector(`[data-options="theme"]`);
  const schemeButtons = themePicker?.querySelectorAll(`[data-scheme]`);

  schemeButtons?.forEach((button) => {
    button.addEventListener("click", handleSchemeSelection);
  });
};
