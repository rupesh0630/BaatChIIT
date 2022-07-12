import React from 'react';
import Head from './Head';
import Content from './Content';
import NavbarNew from '../Navbar/NavbarNew';
import Footer from '../Footer/Footer';


function Home() {
  
  return (
    <div>   
      <div id="home_fix">
        <NavbarNew />
        <Head /> 
        <Content />
        <Footer />
      </div>
    </div>
  );
}

export default Home;