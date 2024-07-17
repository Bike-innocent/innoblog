import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});


// module.exports = {
//   plugins: [
//     nextui({
//       prefix: "nextui", // prefix for themes variables
//       addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
//       defaultTheme: "light", // default theme from the themes object
//       defaultExtendTheme: "light", // default theme to extend on custom themes
//       layout: {}, // common layout tokens (applied to all themes)
//       themes: {
//         light: {
//           layout: {}, // light theme layout tokens
//           colors: {}, // light theme colors
//         },
//         dark: {
//           layout: {}, // dark theme layout tokens
//           colors: {}, // dark theme colors
//         },
//         // ... custom themes
//       },
//     }),
//   ],
// };