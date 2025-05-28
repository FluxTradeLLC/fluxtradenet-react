import './App.css';
import logo from './assets/logo.png';
import header from './assets/header.png'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="FluxTrade Logo" style={{ height: '60px', marginRight: '16px', verticalAlign: 'middle' }} />
        <h1 style={{ display: 'inline', verticalAlign: 'middle' }}>FluxTrade</h1>
        <nav>
          <a href="#about">About</a> | <a href="#services">Services</a> | <a href="#contact">Contact</a> | <a href="#policies">Policies</a>
        </nav>
      </header>
      <main>
        <section>
          <img src={header} alt='FluxTrade header' width="93%" className="Section"/>
        </section>
        <section id="about" className="Section">
          <h2>About FluxTrade</h2>
          <p>FluxTrade builds advanced trading software for individuals and institutions. We offer robust, reliable, and innovative solutions to help you succeed in the markets.</p>
        </section>
        <section id="services" className="Section">
          <h2>Our Services</h2>
          <ul>
            <li>Trading software licenses</li>
            <li>Subscription-based trading tools and analytics</li>
            <li>Custom trading solutions for professionals</li>
          </ul>
        </section>
        <section id="contact" className="Section">
          <h2>Contact Us</h2>
          <p>Email: <a href="mailto:hello@fluxtrade.net" style={{color: "white"}}>hello@fluxtrade.net</a></p>
        </section>
        <section id="policies" className="Section">
          <h2>Policies</h2>
          <h3>Refund & Dispute Policy</h3>
          <p>All sales are final. FluxTrade does not offer refunds or accept disputes under any circumstances. Please review your purchase carefully before completing your order.</p>
          <h3>Cancelation Policy</h3>
          <p>Subscriptions can be canceled at any time, but no refunds will be issued for any remaining period.</p>
          <h3>Legal & Export Restrictions</h3>
          <p>Our software may be subject to export laws and regulations. It is your responsibility to ensure compliance with all applicable laws in your jurisdiction.</p>
        </section>
      </main>
      <footer className="App-footer">
        <p>&copy; {new Date().getFullYear()} FluxTrade. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
