import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

export function PaymentPostPurchasePage() {
    const [discordName, setDiscordName] = useState('');
    const [machineId, setMachineId] = useState('');
    const [email, setEmail] = useState('');
    const [ntEmail, setNtEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [tradingViewUsername, setTradingViewUsername] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await axios.post('/payment/send-post-purchase-info', {
                discordName,
                machineId,
                email,
                ntEmail,
                firstName,
                lastName,
                tradingViewUsername,
            });
            setSuccess(true);
        } catch (err) {
            setError('Failed to submit info. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-4 pt-12">
            <h1 className="text-4xl font-extrabold mb-4 text-green-400">Congrats, your purchase is complete! 🎉</h1>
            <p className="text-lg text-gray-300 mb-6 max-w-xl">
                Thank you for joining FluxTrade! Your subscription is now active and you have full access to all premium features. Check your email for a receipt and onboarding instructions. If you have any questions, our support team is here to help.
            </p>
            <p className="text-md text-gray-400 mb-8 max-w-lg">
                You can manage your account, view your subscription, and get started with our tools from your account dashboard.
            </p>
            <Link to="/account" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg">
                Go to My Account
            </Link>
            {/* New Form Section */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8 w-full max-w-md shadow-lg mt-12">
                <h2 className="text-2xl font-bold mb-4 text-indigo-400">Get Started</h2>
                
                {success ? (
                    <div className="text-green-400 font-semibold text-center"><p>Info submitted successfully! We'll add access for these accounts shortly. In the meantime, please check your email for information on how to download and install the Add-ons. 🚀</p><p className='mt-6'>Access to TradingView scripts is fully automated, but takes around 30 minutes. Access to NinjaTrader licenses is a manual process, and will occur during the day in the US Eastern timezone.</p><p className='mt-6'>Join the <a className="text-blue-400" href="https://discord.gg/UTcxDRQ26U">Discord!</a></p></div>
                ) : (
                    <>
                        <p>Please enter your Discord username (optional) and NinjaTrader User-Defined Machine ID and/or TradingView username in the form below, and we will get you set up with your license on our end.</p>
                        <p className='mt-4'>To get the User-Defined Machine ID:</p>
                        <ol className='list-decimal m-4'>
                            <li>In the NinjaTrader Control Center, click "Help" &gt; then click “3rd party licensing”</li>
                            <li>Put "FluxTrade" into the “Vendor name” field</li>
                            <li>In the "User defined ID" section, put a string to add to your machine ID into the “User defined ID” field. (example: JoeRichardsPC)</li>
                            <li>Click "Submit" &gt; then copy the newly generated Machine ID &gt; put it into the form below.</li>
                        </ol>
                        <p>Need help? Email us at <a href="mailto:hello@fluxtrade.net" className='text-blue-400'>hello@fluxtrade.net</a>.</p>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                            <label className="flex flex-col text-left">
                                <span className="mb-1 font-semibold">First Name</span>
                                <input
                                    type="text"
                                    className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    required
                                />
                            </label>
                            <label className="flex flex-col text-left">
                                <span className="mb-1 font-semibold">Last Name</span>
                                <input
                                    type="text"
                                    className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                    required
                                />
                            </label>
                            <label className="flex flex-col text-left">
                                <span className="mb-1 font-semibold">Email</span>
                                <input
                                    type="email"
                                    className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </label>
                            <label className="flex flex-col text-left">
                                <span className="mb-1 font-semibold">NinjaTrader Account Email (if different than other email)</span>
                                <input
                                    type="email"
                                    className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="your@email.com"
                                    value={ntEmail}
                                    onChange={e => setNtEmail(e.target.value)}
                                    required
                                />
                            </label>
                            <label className="flex flex-col text-left">
                                <span className="mb-1 font-semibold">Discord Username</span>
                                <input
                                    type="text"
                                    className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="e.g. Trader"
                                    value={discordName}
                                    onChange={e => setDiscordName(e.target.value)}
                                    // required
                                />
                            </label>
                            <label className="flex flex-col text-left">
                                <span className="mb-1 font-semibold">TradingView Username</span>
                                <input
                                    type="text"
                                    className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="e.g. tradingview_user"
                                    value={tradingViewUsername}
                                    onChange={e => setTradingViewUsername(e.target.value)}
                                />
                            </label>
                            <label className="flex flex-col text-left">
                                <span className="mb-1 font-semibold">User-Defined Machine ID (for NinjaTrader)</span>
                                <input
                                    type="text"
                                    className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter your custom machine ID"
                                    value={machineId}
                                    onChange={e => setMachineId(e.target.value)}
                                    // required
                                />
                            </label>
                            {error && <div className="text-red-400 text-sm">{error}</div>}
                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 disabled:opacity-60"
                                disabled={loading}
                            >
                                {loading ? 'Submitting...' : 'Submit Info'}
                            </button>
                        </form>
                    </>
                )}
            </div>
            
        </div>
    );
} 