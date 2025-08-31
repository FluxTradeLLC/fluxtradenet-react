import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Papa from 'papaparse';

export const BacktestPage = ({ file }) => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [file]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/backtests/${file}`);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
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
    <div className="p-8 sm:px-8 bg-gray-900 text-white min-h-screen">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">Backtest Results: {file}</h2>
          <a href={`/backtests/${file}`} download className="text-blue-500 hover:text-blue-800 mr-[20px]">
            Download CSV
          </a>
          <Link to="/" className="text-blue-500 hover:text-blue-800">Back to Home</Link>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th
                      key={header}
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-900 text-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i}>
                    {headers.map((header) => (
                      <td key={header} className="px-5 py-5 border-b border-gray-200 bg-gray-900 text-white text-sm">
                        <p className="text-white whitespace-no-wrap">{row[header]}</p>
                      </td>
                    ))}
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