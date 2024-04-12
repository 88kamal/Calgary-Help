/* eslint-disable react/prop-types */
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const Layout = ({ children }) => {
    return (
        <div>
            {/* Navbar  */}
            <Navbar />

            {/* Main Content  */}
            <div className="main-Conten">
                {children}
            </div>

            {/* Footer  */}
            <Footer />
        </div>
    );
}

export default Layout;
