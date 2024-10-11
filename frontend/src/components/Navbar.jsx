import { Link } from 'react-router-dom';

const handleClick = () => {
  window.location.reload();
  console.log('reloaded!');
}

const Navbar = () => {
  return (
    <nav className="border-b-[1px] border-black pt-6 pb-4 px-4 font-newsreader">
      <div className="flex items-center justify-between container mx-auto">
        {/* Left Section: Home Icon */}
        <div className="flex items-center">
          <Link to="/"className="text-2xl font-bold mr-4 hover:bg-gray-100 rounded-lg p-2">
            🏠
          </Link>
        </div>

        {/* Center Section: NewsBoard */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/home" onClick={handleClick} className="text-4xl font-bold">
            NewsBoard
          </Link>
        </div>

        {/* Right Section: Login and Register */}
        <div className="ml-auto flex items-center space-x-4">
          <Link to="/login" className="hover:text-gray-300 px-4 font-medium text-lg">
            Login
          </Link>
          <Link to="/register" className="hover:text-gray-300 px-4 font-medium text-lg">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
