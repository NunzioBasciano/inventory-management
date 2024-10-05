import type { Config } from "tailwindcss";
import {createThemes} from 'tw-colors';
import colors from 'tailwindcss/colors';

const baseColors = [  'gray',  'red',  'yellow',  'green',  'blue',  'indigo',  'purple',  'pink',];

// Mappa per invertire le tonalità, es. la tonalità più chiara '50' viene associata alla tonalità più scura '900'
const shadeMapping = {
  "50": "900",
  "100": "800",
  "200": "700",
  "300": "600",
  "400": "500",
  "500": "400",
  "600": "300",
  "700": "200",
  "800": "100",
  "900": "50",
};

const generateThemeObject = (colors: any, mapping: any, invert = false )=> {
  const theme: any = {};
  //Per ogni colore, viene aggiunta una nuova chiave nell'oggetto theme
  baseColors.forEach((color) => {
    theme[color] = {};
    //Per ogni colore di base, la funzione cicla attraverso l'oggetto mapping, che associa tonalità chiare a tonalità scure
    Object.entries(mapping).forEach(([key, value]: any) => {
      // La funzione verifica il valore del parametro invert Se invert è true, viene utilizzato value (ad es., la tonalità scura 900).
      const shadeKey = invert ? value: key;
      theme[color][key] = colors[color][shadeKey];      
    })
  }); 
  return theme;
}
 // Genera il tema chiaro senza inversione delle tonalità
const lightTheme = generateThemeObject(colors, shadeMapping);
// Genera il tema scuro con tonalità invertite
const darkTheme = generateThemeObject(colors, shadeMapping, true);

const themes = {
  light: {
    ...lightTheme,  // Usa lo spread operator per includere tutte le proprietà di `lightTheme` generate dalla funzione `generateThemeObject`
    white: '#ffffff' // Aggiunge manualmente la chiave `white` con il valore esadecimale del bianco per il tema chiaro
  },
  dark: {
    ...darkTheme, // Usa lo spread operator per includere tutte le proprietà di `darkTheme` (con tonalità invertite) generate dalla funzione `generateThemeObject`
    white: colors.gray['950'], // Sovrascrive o aggiunge la chiave `white`, assegnandole la tonalità più scura (`950`) del colore `gray` di Tailwind per il tema scuro
    black: colors.gray['50'] // Aggiunge la chiave `black`, assegnandole la tonalità più chiara (`50`) del colore `gray` per il tema scuro
  }
}

const config: Config = {
  darkMode: 'class',

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': "radial-gradient(var(--tw-gradient-stops))",
        'gradient-conic': 
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [createThemes(themes)],
};
export default config;
