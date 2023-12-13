import Script from "next/script";
import "tailwindcss/tailwind.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "Ziyad Edher | Software Engineer",
  description:
    "I build and break things in AI, cryptography, infrastructure, and security lands.",
};

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID;

const Layout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <head>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </head>
    <body>
      <SpeedInsights />
      {children}
    </body>
  </html>
);

export default Layout;
