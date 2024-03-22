/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Montserrat", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("tailwindcss-animated"),
  ],
};
