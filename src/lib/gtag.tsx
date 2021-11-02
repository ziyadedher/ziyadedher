import Script from "next/script";
import React from "react";

// eslint-disable-next-line prefer-destructuring, node/no-process-env -- can't destructure Next.js env.
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID;

const GTag: React.FunctionComponent = () => (
  <>
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
    />
    <Script
      id="gtag-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        // eslint-disable-next-line @typescript-eslint/naming-convention -- gtag needs innerHTML.
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
         `,
      }}
    />
  </>
);

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
const pageview = (url: string): void => {
  window.gtag("config", GA_TRACKING_ID, {
    // eslint-disable-next-line @typescript-eslint/naming-convention, camelcase -- gtag convention.
    page_path: url,
  });
};

export default GTag;
export { pageview };
