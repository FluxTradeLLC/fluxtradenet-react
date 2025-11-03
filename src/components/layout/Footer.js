import { Link } from "react-router-dom"

export const Footer = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

    return (
        <footer className="p-8 text-md text-white bg-gray-900">
        <div className="mb-8">
          <p className="mb-2 font-semibold text-center">Navigation</p>
          <ul className="text-gray-300 flex gap-2 items-center justify-center">
            <li onClick={handleClick}><Link to="/" className="hover:underline">Home</Link></li>
            <li onClick={handleClick}><Link to="/pricing" className="hover:underline">Pricing</Link></li>
            <li onClick={handleClick}><Link to="/account" className="hover:underline">Account</Link></li>
            <li onClick={handleClick}><Link to="/refund-policy" className="hover:underline">Refund Policy</Link></li>
            <li onClick={handleClick}><Link to="/affiliates" className="hover:underline">Affiliates</Link></li>
            <li onClick={handleClick}><Link to="/support" className="hover:underline">Support</Link></li>
          </ul>
        </div>
        <p className="mb-4">Disclaimers</p>
        <p className="mb-4">Futures and forex trading contains substantial risk and is not for every investor. An investor could
potentially lose all or more than the initial investment. Risk capital is money that can be lost without
jeopardizing ones’ financial security or life style. Only risk capital should be used for trading and only
those with sufficient risk capital should consider trading. Past performance is not necessarily indicative of
future results</p>
        <p className="mb-4">Hypothetical performance results have many inherent limitations, some of which are described below. No
representation is being made that any account will or is likely to achieve profits or losses similar to those
shown; in fact, there are frequently sharp differences between hypothetical performance results and the
actual results subsequently achieved by any particular trading program. One of the limitations of
hypothetical performance results is that they are generally prepared with the benefit of hindsight. In
addition, hypothetical trading does not involve financial risk, and no hypothetical trading record can
completely account for the impact of financial risk of actual trading. for example, the ability to withstand
losses or to adhere to a particular trading program in spite of trading losses are material points which
can also adversely affect actual trading results. There are numerous other factors related to the markets
in general or to the implementation of any specific trading program which cannot be fully accounted for
in the preparation of hypothetical performance results and all which can adversely affect trading results.</p>
        <p>Testimonials appearing on this website may not be representative of other clients or customers and is not
        a guarantee of future performance or success. </p>

        
        <div className="flex justify-center w-full mt-12"><iframe title="Discord" src="https://discord.com/widget?id=1296225730568388640&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe></div>
        <p className="text-center mt-12">Copyright &copy; {new Date().getFullYear()}, FluxTrade, LLC. All rights reserved.</p>
      </footer>
    )
}