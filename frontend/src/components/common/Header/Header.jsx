import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiHeart, FiUser, FiLogOut } from 'react-icons/fi';
import { MdDashboard } from 'react-icons/md';
import { useAuth } from '@hooks/useAuth';
import logo from '../../../assets/images/Logo.png';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', scroll);
    return () => window.removeEventListener('scroll', scroll);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenu(false);
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/coming-soon', label: 'Coming Soon' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 bg-primary-50 border-b border-primary-200 transition-all 
      ${scrolled ? 'shadow-premium' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4">

        {/* MAIN BAR */}
        <div className="flex items-center justify-between py-3">

          {/* Logo + Brand */}
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 md:gap-3"
          >
            <img
              src={logo}
              alt="Divine Chatter Logo"
              className="h-10 md:h-12"
            />

            <div className="leading-tight">
              <p
                className="
        font-divine
        text-sm sm:text-base md:text-xl
        tracking-[0.14em] md:tracking-[0.18em]
        text-divine-darkBrown
      "
              >
                DIVINE CHATTER
              </p>

              <p
                className="
        hidden sm:block
        text-[9px] sm:text-[10px] md:text-[11px]
        tracking-[0.22em]
        text-divine-bronze
        uppercase
      "
              >
                Connecting Youth to Religion
              </p>
            </div>
          </Link>



          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 ml-auto mr-4">

            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative font-medium text-divine-darkBrown transition hover:text-divine-gold
                  after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                  after:bg-gradient-to-r after:from-divine-gold after:to-primary-300
                  after:w-0 after:transition-all hover:after:w-full
                  ${isActive && 'text-divine-gold after:w-full'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-5">

            {isAuthenticated && (
              <Link
                to="/wishlist"
                className="p-2 rounded-full hover:bg-primary-100 hover:text-divine-gold transition"
              >
                <FiHeart size={20} />
              </Link>
            )}

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenu(!userMenu)}
                  className="p-2 rounded-full hover:bg-primary-100 hover:text-divine-gold transition"
                >
                  <FiUser size={20} />
                </button>

                {userMenu && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-premium animate-scale-in overflow-hidden">
                    <div className="p-4 bg-sacred-200">
                      <p className="font-semibold text-divine-darkBrown">
                        {user?.name}
                      </p>
                      <p className="text-sm text-divine-bronze">
                        {user?.email}
                      </p>
                    </div>

                    <div className="py-2">
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setUserMenu(false)}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-primary-100"
                        >
                          <MdDashboard /> Dashboard
                        </Link>
                      )}
                      <Link
                        to="/profile"
                        onClick={() => setUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-primary-100"
                      >
                        <FiUser /> Profile
                      </Link>
                      <Link
                        to="/wishlist"
                        onClick={() => setUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-primary-100"
                      >
                        <FiHeart /> Wishlist
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 w-full text-left text-red-600 hover:bg-red-50"
                      >
                        <FiLogOut /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 rounded-full 
             bg-gradient-to-r from-divine-premiumGold to-divine-gold 
             text-white shadow-glow hover:scale-105 transition"
              >
                Login
              </Link>

            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 text-divine-darkBrown"
            >
              {open ? <FiX size={26} /> : <FiMenu size={26} />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 
        ${open ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="bg-primary-50 border-t px-4 py-4 space-y-3 animate-slide-down">
          {navLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className="block py-2 px-3 rounded-lg hover:bg-primary-100 transition"
            >
              {link.label}
            </NavLink>
          ))}

          {!isAuthenticated && (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block py-2 rounded-lg bg-divine-gold text-white text-center"
            >
              Login
            </Link>
          )}
        </div>
      </div>

    </header>
  );
};

export default Header;
