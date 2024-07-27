// src/components/Layout.js
import NewNavbar from '../components/Navbar/newNavbar.js';
import '../styles/globals.css';

const Layout = ({ children }) => {
  return (
    <html>
      <body>
        <div className="w-full p-6">
          <NewNavbar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
};

export default Layout;
