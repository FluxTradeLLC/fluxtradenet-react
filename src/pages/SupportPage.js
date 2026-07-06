import React, { useState } from "react";
import { s } from "../strings.js";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

export function SupportPage() {
    const [supportName, setSupportName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [supportSubject, setSupportSubject] = useState("");
  const [supportMessage, setSupportMessage] = useState("");
  const [supportError, setSupportError] = useState("");
  const [supportSuccess, setSupportSuccess] = useState(false);
  const [supportLoading, setSupportLoading] = useState(false);

  const handleSupportSubmit = async (e) => {
    e.preventDefault();
    setSupportError("");
    setSupportSuccess(false);
    setSupportLoading(true);

    try {
      await api.post("/support/send-support-email", {
        name: supportName,
        email: supportEmail,
        subject: supportSubject,
        message: supportMessage,
      });
      setSupportSuccess(true);
      setSupportName("");
      setSupportEmail("");
      setSupportSubject("");
      setSupportMessage("");
      setTimeout(() => setSupportSuccess(false), 5000);
    } catch (err) {
      setSupportError(err.response?.data?.error || s("support.error"));
    } finally {
      setSupportLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-full">
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-12">
        <h1 className="text-5xl font-extrabold mb-4 text-center">{s("support.title")}</h1>
        <p className="text-gray-300 mb-4">
          {s("support.description")}{" "}
          <a href="mailto:grant@fluxtrade.net" className="underline text-blue-400 hover:text-blue-300">
            grant@fluxtrade.net
          </a>
          &nbsp;{s("support.orSendMessage")}
        </p>
        <p className="text-gray-300 mb-8 flex items-center gap-2">
          {s("support.discordHelp")}

          <a
            href="https://discord.gg/239t9xcrxV"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full lg:w-auto max-w-[500px] justify-center items-center space-x-2 text-gray-400 hover:text-gray-300 py-2 px-4 transition-colors duration-200 border border-gray-700 rounded-lg p-2"
            style={{ textDecoration: "none" }}
          >
            <FontAwesomeIcon icon={faDiscord} size="sm" />
            <span>{s("header.freeDiscord")}</span>
          </a>
        </p>
        
        {/* Additional Resources Section */}
        <div className="mb-8 bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-white">{s("support.additionalResources")}</h2>
          <div className="space-y-3 text-gray-300">
            <p>
              {s("support.resourcesDescription")}
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                {s("support.refundInfo")}{" "}
                <Link to="/policies" className="underline text-blue-400 hover:text-blue-300">
                  {s("footer.refundPolicies")}
                </Link>
              </li>
              <li>
                {s("support.termsInfo")}{" "}
                <Link to="/terms" className="underline text-blue-400 hover:text-blue-300">
                  {s("footer.terms")}
                </Link>
              </li>
            </ul>
            <p className="mt-4">
              {s("support.stillNeedHelp")} <a href="mailto:grant@fluxtrade.net" className="underline text-blue-400 hover:text-blue-300">{s("support.emailDirectly")}</a>.
            </p>
          </div>
        </div>
        
        <div className="mt-8 bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-6">{s("support.sendMessage")}</h2>
          <form onSubmit={handleSupportSubmit} className="space-y-4">
            {supportError && (
              <p className="text-red-500 text-sm text-center">{supportError}</p>
            )}
            {supportSuccess && (
              <p className="text-green-500 text-sm text-center">
                {s("support.success")}
              </p>
            )}
            <div>
              <input
                type="text"
                placeholder={s("support.yourName")}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={supportName}
                onChange={(e) => setSupportName(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder={s("support.yourEmail")}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder={s("support.subject")}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={supportSubject}
                onChange={(e) => setSupportSubject(e.target.value)}
                required
              />
            </div>
            <div>
              <textarea
                placeholder={s("support.message")}
                rows="6"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={supportLoading}
              className="w-full bg-[#5865F2] hover:bg-[#4752C4] disabled:bg-gray-600 disabled:cursor-not-allowed disabled:hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              {supportLoading ? s("support.sending") : s("support.sendEmail")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SupportPage;
