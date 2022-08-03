/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./sections/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--mw-primary)",
        "primary-hover": "var(--mw-primary-hover)",
        "primary-selected": "var(--mw-primary-selected)",
        "primary-inverse-hover": "var(--mw-primary-inverse-hover)",
        "primary-inverse-hover-click": "var(--mw-primary-inverse-hover-click)",
        "font-main": "var(--mw-font-main)",
        "font-active-border": "var(--mw-font-active-border)",
        "font-inactive-border": "var(--mw-font-inactive-border)",
        "bg-elephant-grey": "var(--mw-bg-elephant-grey)",
        "bg-elephant-contrast": "var(--mw-bg-elephant-contrast)",
        "bg-white": "var(--mw-bg-white)",
        "link-color": "var(--mw-link-color)",
        "link-color-hover": "var(--mw-link-color-hover)",
        "link-color-active": "var(--mw-link-color-active)",
        "link-color-disabled": "var(--mw-link-color-disabled)",
        "danger-color": "var(--mw-danger-color)",
        "danger-color-glow": "var(--mw-danger-color-glow)",
        "danger-color-inactive": "var(--mw-danger-color-inactive)",
        "danger-color-disabled": "var(--mw-danger-color-disabled)",
        "danger-color-hover": "var(--mw-danger-color-hover)",
        "danger-color-active": "var(--mw-danger-color-active)",
      },
      dropShadow: {
        normal: "0px 0px 30px rgba(0, 25, 72, 0.15)",
        hover: "0px 10px 40px rgba(0, 25, 72, 0.25)",
        selected: "0px 5px 30px rgba(0, 25, 72, 0.25)",
        button: "0px 4px 6px rgba(1, 5, 93, 0.15)",
      },
      spacing: {
        "10px": "10px",
        "100px": "100px",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
