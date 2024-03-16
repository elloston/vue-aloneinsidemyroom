/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify, type ThemeDefinition } from "vuetify";

const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    //
  },
  variables: {
    //
  },
};

export default createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      myCustomLightTheme,
    },
  },
});
