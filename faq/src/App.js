import Navigation from './components/Navigation';
import Tier from './components/Tier';
import Accordion from './components/Accordion';
import Footer from './components/Footer';

import './App.module.css';

function App() {
  return (
    <>
      <Navigation />
      <section>
        <Tier />
      </section>
      <section>
        <Accordion title='General' category='general'/>
        <br />
        <br />
        <Accordion title='TLS Crypto Hub' category='hub'/>
      </section>
      <section>
        Contact Us
      </section>
      <Footer />
    </>
  );
}

export default App;
