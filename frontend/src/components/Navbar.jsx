import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import homesvg from '../assets/home.svg'

const handleClick = () => {
  window.location.reload();
  console.log('reloaded!');
}

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');  
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  }
  

  return (
    <nav className="border-b-[1px] border-black pt-6 pb-4 px-12 font-newsreader">
      <div className="flex items-center justify-between container mx-auto">
        {/* Left Section: Home Icon */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold mr-4 hover:bg-gray-100 rounded-lg p-2">
            <img src={homesvg} alt="Home" className="w-8 h-8" />
          </Link>
        </div>

        {/* Center Section: NewsBoard */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/home" onClick={handleClick} className="text-4xl font-bold">
            NewsBoard
          </Link>
        </div>

        {/* Right Section: Login/Register or Logout */}
        <div className="ml-auto flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className=" font-semibold hover:text-gray-300 px-4 text-lg">
                Login
              </Link>
              <Link to="/register" className=" font-semibold hover:text-gray-300 px-4 text-lg">
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className=" font-semibold hover:text-gray-300 px-4 text-lg"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
