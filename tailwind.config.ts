import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      colors: {
        //main
        main_color: "#076567",
        dark_color: "#053A3C",
        
        //grey
        grey_0: "#FFFFFF",
        grey_25: "#F9F9F9",
        grey_50: "#F1F1F1",
        grey_100: "#EAEAEA",
        grey_200: "#D3D3D3",
        grey_250: "#A6A6A6",
        grey_300: "#707070",
        grey_400: "#656565",
        grey_500: "#5A5A5A",
        grey_600: "#434343",
        grey_700: "#323232",
        grey_800: "#272727",
        grey_900: "#191919",

        //tag
        sold_text: "#707070", //grey_300
        sold_bg: "#EAEAEA", //grey_100
        reserved: "#000D50",
        onSale: "#002E5F",

        point_1: "#FF5151",
        primary: "#00A8FF",
        primary_dark: "#00669B",
        prugio: "#084F51",
        font_main: "#00A8FF",
        dark_blue: "#00669B",
        //graph
        graph_1: "#00A8FF",
        graph_2: "#744FFA",
        graph_3: "#733DA4",
        graph_4: "#5B507F",
        graph_5: "#12C5A1",
        graph_6: "#40D4A4",
        graph_up: "#FF5151",
        graph_down: "#0085FF",

        

      },
      screens: {
        small: "375px",
        medium: "768px",
        large: "1200px"
      }
    }
  },
  plugins: []
}
export default config
