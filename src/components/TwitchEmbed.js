import React, { useEffect, useRef } from "react";

const TwitchEmbedPlayer = ({ channel }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!channel || !containerRef.current) return;

    const container = containerRef.current;

    // Clear any existing embed
    container.innerHTML = "";

    // Create the iframe embed
    const iframe = document.createElement("iframe");
    iframe.src = `https://player.twitch.tv/?channel=${channel}&parent=${window.location.hostname}&muted=false`;
    iframe.allowFullScreen = true;
    iframe.width = "960";
    iframe.height = "540";
    iframe.frameBorder = "0";
    iframe.scrolling = "no";
    iframe.allow = "autoplay; fullscreen";

    container.appendChild(iframe);

    // Cleanup function
    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [channel]);

  return <div ref={containerRef} style={{ width: "960px", height: "540px" }} />;
};

export default TwitchEmbedPlayer;
