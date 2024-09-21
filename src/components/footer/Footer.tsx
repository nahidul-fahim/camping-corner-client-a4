import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#1f1d18] text-white">
            <div className="container mx-auto px-6 py-6 lg:py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch justify-stretch">

                    {/* About Us */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Camping Corner</h2>
                        <p className="text-white/70">
                            Camping Corner is your go-to store for all camping essentials. From sturdy tents to reliable outdoor gear, we provide high-quality products to ensure your adventures are safe and enjoyable. Whether you're a weekend camper or a seasoned explorer, we've got you covered for every outdoor journey.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className='flex md:justify-center md:items-center justify-start items-start flex-col'>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-left md:text-center">
                            <li>
                                <NavLink to="/" className="hover:text-primary transition-colors">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/products" className="hover:text-primary transition-colors">Products</NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" className="hover:text-primary transition-colors">About Us</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className="hover:text-primary transition-colors">Contact</NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Connect With Us */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                <FaFacebookF size={24} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                <FaTwitter size={24} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                <FaLinkedinIn size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-primary/40 text-center">
                    <p className="text-white/70">&copy; {new Date().getFullYear()} Camping Corner. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
