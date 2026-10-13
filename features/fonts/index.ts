import localFont from "next/font/local";

export const helvetica = localFont({
  src: [
    {
      path: "./helvetica/helvetica-neue-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./helvetica/helvetica-neue-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-helvetica",
  display: "swap",
});
