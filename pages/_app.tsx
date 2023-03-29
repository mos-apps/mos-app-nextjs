import config from "@config/config.json";
import theme from "@config/theme.json";
import Head from "next/head";
import { useEffect, useState } from "react";
import TagManager from "react-gtm-module";
import "styles/style.scss";
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config as fConfig } from '@fortawesome/fontawesome-svg-core'
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { GoogleAnalytics } from "nextjs-google-analytics";


fConfig.autoAddCss = false

const App = ({ Component, pageProps }: any) => {
  // default theme setup

  // import google font css
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;
  const [fontcss, setFontcss] = useState<any>();
  useEffect(() => {
    fetch(
      `https://fonts.googleapis.com/css2?family=${pf}${
        sf ? "&family=" + sf : ""
      }&display=swap`
    ).then((res) => res.text().then((css) => setFontcss(css)));
  }, [pf, sf]);

  // google tag manager (gtm)
  const tagManagerArgs = {
    gtmId: config.params.tag_manager_id,
  };
  useEffect(() => {
    setTimeout(() => {
      // process.env.NODE_ENV === "production" &&
        config.params.tag_manager_id &&
        TagManager.initialize(tagManagerArgs);
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <GoogleReCaptchaProvider
      reCaptchaKey="6LdiLBklAAAAAJMhA06pGM7SOnzDU9WLMCAgvOeK"
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
        <Head>
          {/* google font css */}
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <style
            dangerouslySetInnerHTML={{
              __html: `${fontcss}`,
            }}
          />
          {/* responsive meta */}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=5"
          />
        </Head>
        <GoogleAnalytics trackPageViews gaMeasurementId={config.params.ga_tag} />
        <Component {...pageProps} />
      </GoogleReCaptchaProvider>
      
    </>
  );
};

export default App;
