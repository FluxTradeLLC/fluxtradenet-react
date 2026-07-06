import React, { useState, useEffect } from "react";
import { s } from "../strings.js";
import { Link } from "react-router-dom";
import Papa from "papaparse";

export const BacktestPage = ({ file }) => {
    const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [file]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/backtests/${file}`);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value);

      Papa.parse(csv, {
        header: true,
        complete: (results) => {
          setHeaders(results.meta.fields);
          setData(results.data);
        },
      });
    };

    fetchData();
  }, [file]);

  return (
    <div className="px-8 pt-12 pb-8 bg-gray-900 text-white min-h-full">
      <div>
        <div>
          <h1 className="text-5xl font-extrabold mb-4 text-center">
            {s("backtest.title", { file })}
          </h1>
          <a
            href={`/backtests/${file}`}
            download
            className="text-blue-500 hover:text-blue-800 mr-[20px]"
          >
            {s("backtest.downloadCsv")}
          </a>
          <Link to="/" className="text-blue-500 hover:text-blue-800">
            {s("backtest.backToHome")}
          </Link>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th
                      key={header}
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-900 text-white text-left text-xs font-semibold uppercase tracking-wider"
                    >
                      {s(`backtest.tableHeaders.${header}`, {
                        defaultValue: header,
                      })}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i}>
                    {headers.map((header) => {
                      let cellValue = row[header];

                      // Translate position values
                      if (
                        header === "Market pos." &&
                        (cellValue === "Long" || cellValue === "Short")
                      ) {
                        cellValue = s(`backtest.positions.${cellValue}`, {
                          defaultValue: cellValue,
                        });
                      }

                      // Translate entry names
                      if (header === "Entry name" && cellValue) {
                        cellValue = s(`backtest.entryNames.${cellValue}`, {
                          defaultValue: cellValue,
                        });
                      }

                      if (header === "Exit name" && cellValue) {
                        let exitKey = cellValue.trim();
                        if (exitKey === "StopLoss") {
                          exitKey = "Stop loss";
                        }
                        cellValue = s(`backtest.exitNames.${exitKey}`, {
                          defaultValue: cellValue,
                        });
                      }

                      return (
                        <td
                          key={header}
                          className="px-5 py-5 border-b border-gray-200 bg-gray-900 text-white text-sm"
                        >
                          <p className="text-white whitespace-no-wrap">
                            {cellValue}
                          </p>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
