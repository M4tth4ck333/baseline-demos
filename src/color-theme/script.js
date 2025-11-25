const pressedButton = '[data-scheme][aria-pressed="true"]';
const storageKey = 'theme-preference';

const getColorPreference = () => {
  if (localStorage.getItem(storageKey)) return localStorage.getItem(storageKey);
  else
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
};

const setInitialScheme = () => {
  const savedScheme = localStorage.getItem('data-scheme');
  if (savedScheme) {
    setScheme(savedScheme);
  } else {
    getColorPreference();
    setScheme(theme.value);
  }
};

const setScheme = (scheme) => {
  const target = document.querySelector(
    `[data-button][data-scheme="${scheme}"]`
  );
  document.documentElement.setAttribute('data-scheme', scheme);

  document.querySelector(pressedButton)?.setAttribute('aria-pressed', 'false');
  target?.setAttribute('aria-pressed', 'true');
};

const theme = {
  value: getColorPreference(),
};

setInitialScheme();

const handleSchemeSelection = (event) => {
  const target = event.target;
  const isPressed = target.getAttribute('aria-pressed');
  const scheme = target.getAttribute('data-scheme');

  if (isPressed !== 'true') {
    setScheme(scheme);
    localStorage.setItem('data-scheme', scheme);
  }
};

window.onload = () => {
  setInitialScheme();

  const themePicker = document.querySelector(`[data-options="theme"]`);
  const schemeButtons = themePicker.querySelectorAll(`[data-scheme]`);

  schemeButtons.forEach((button) => {
    button.addEventListener('click', handleSchemeSelection);
  });
};
