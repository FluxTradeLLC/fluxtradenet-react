import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faTwitch,
  faInstagram,
  faFacebook,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  const { t } = useTranslation();
  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="p-8 pb-20 md:pb-8 pt-24 text-md text-white bg-gray-900"
      role="contentinfo"
    >
      <nav className="mb-8" aria-label="Footer navigation">
        <p className="mb-2 font-semibold text-center">{t("footer.navigation")}</p>
        <ul className="text-gray-300 flex gap-4 items-center justify-center flex-wrap">
          <li onClick={handleClick}>
            <Link to="/" className="hover:underline">
              {t("footer.home")}
            </Link>
          </li>
          <li onClick={handleClick}>
            <Link to="/pricing" className="hover:underline">
              {t("footer.pricing")}
            </Link>
          </li>
          <li onClick={handleClick}>
            <Link to="/account" className="hover:underline">
              {t("footer.account")}
            </Link>
          </li>
          <li onClick={handleClick}>
            <Link to="/policies" className="hover:underline">
              {t("footer.refundPolicies")}
            </Link>
          </li>
          <li onClick={handleClick}>
            <Link to="/affiliates" className="hover:underline">
              {t("footer.affiliates")}
            </Link>
          </li>
          <li onClick={handleClick}>
            <Link to="/support" className="hover:underline">
              {t("footer.support")}
            </Link>
          </li>
          <li onClick={handleClick}>
            <Link to="/terms" className="hover:underline">
              {t("footer.terms")}
            </Link>
          </li>
          <li onClick={handleClick}>
            <Link to="/disclaimers" className="hover:underline">
              {t("footer.disclaimers")}
            </Link>
          </li>
        </ul>
      </nav>

      <div className="mb-8 mt-12">
        <p className="mb-2 font-semibold text-center">{t("footer.followUs")}</p>
        <ul className="flex gap-4 items-center justify-center">
          <li>
            <a
              href="https://www.youtube.com/@FluxTradeLLC"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-500 transition-colors duration-200"
              aria-label="Follow us on YouTube (opens in new tab)"
            >
              <FontAwesomeIcon icon={faYoutube} size="lg" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href="https://www.twitch.tv/fluxtradellc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-500 transition-colors duration-200"
              aria-label="Follow us on Twitch (opens in new tab)"
            >
              <FontAwesomeIcon icon={faTwitch} size="lg" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/fluxtradellc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition-colors duration-200"
              aria-label="Follow us on Instagram (opens in new tab)"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                size="lg"
                aria-hidden="true"
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.tiktok.com/@bitlionllc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Follow us on TikTok (opens in new tab)"
            >
              <FontAwesomeIcon icon={faTiktok} size="lg" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/profile.php?id=61583361714523"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
              aria-label="Follow us on Facebook (opens in new tab)"
            >
              <FontAwesomeIcon icon={faFacebook} size="lg" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>

      <div className="flex justify-center w-full mt-12">
        <iframe
          title="Discord"
          src="https://discord.com/widget?id=1296225730568388640&theme=dark"
          width="350"
          height="500"
          allowtransparency="true"
          frameborder="0"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        ></iframe>
      </div>

      <div
        className="trustpilot-widget mt-12"
        data-locale="en-US"
        data-template-id="56278e9abfbbba0bdcd568bc"
        data-businessunit-id="6924855d34e60d463bf9b72e"
        data-style-height="52px"
        data-style-width="100%"
        data-token="5f2573ff-2f13-4237-8899-9684c8df975a"
      >
        <a
          href="https://www.trustpilot.com/review/fluxtrade.net"
          target="_blank"
          rel="noopener noreferrer"
        >
          Trustpilot
        </a>
      </div>

      <p className="mb-4 mt-12" id="disclaimers">{t("footer.disclaimers")}</p>
      <p className="mb-4">
        {t("footer.disclaimer1")}
      </p>
      <p className="mb-4">
        {t("footer.disclaimer2")}
      </p>
      <p>
        {t("footer.disclaimer3")}
      </p>

      <p className="text-center mt-12">
        {t("footer.copyright", { year: new Date().getFullYear() })}
      </p>
    </footer>
  );
};
