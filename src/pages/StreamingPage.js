import React from "react";
import { useTranslation } from "react-i18next";
import TwitchEmbedPlayer from "../components/TwitchEmbed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faTwitch,
  faInstagram,
  faFacebook,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

export function StreamingPage() {
  const { t } = useTranslation();
  const twitchChannel = "fluxtradellc";

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-12">
        <h1 className="text-5xl font-extrabold mb-4 text-center">
          {t("streaming.title")}
        </h1>
        <p className="text-gray-300 mb-8 text-center">
          {t("streaming.description")}
        </p>

        <div className="mb-8 flex items-center justify-center">
          <TwitchEmbedPlayer channel={twitchChannel} />
        </div>

        <p className="text-center text-gray-400 italic mb-8">
          {t("streaming.disclaimer")}
        </p>

        <div className="mt-12">
          <p className="mb-4 font-semibold text-center text-xl">
            {t("streaming.followUs")}
          </p>
          <ul className="flex gap-6 items-center justify-center flex-wrap">
            <li>
              <a
                href="https://www.youtube.com/@FluxTradeLLC"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                aria-label={t("streaming.followYouTube")}
              >
                <FontAwesomeIcon
                  icon={faYoutube}
                  size="2x"
                  aria-hidden="true"
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.twitch.tv/fluxtradellc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-500 transition-colors duration-200"
                aria-label={t("streaming.followTwitch")}
              >
                <FontAwesomeIcon icon={faTwitch} size="2x" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/fluxtradellc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors duration-200"
                aria-label={t("streaming.followInstagram")}
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  size="2x"
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
                aria-label={t("streaming.followTikTok")}
              >
                <FontAwesomeIcon icon={faTiktok} size="2x" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=61583361714523"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
                aria-label={t("streaming.followFacebook")}
              >
                <FontAwesomeIcon
                  icon={faFacebook}
                  size="2x"
                  aria-hidden="true"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default StreamingPage;
