import React, { useEffect, useState } from "react";
import { FiSearch, FiShoppingCart, FiUser, FiChevronDown, FiHome } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Image } from 'react-bootstrap';
import { logout } from "../../Actions/userActions";
import { logoutSeller } from "../../Actions/sellerActions";

const Header = ({ scrollToStories }) => {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { isAuthenticatedSeller, seller } = useSelector((state) => state.sellerState);

  const [User, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout);
    navigate('/');
  };

  const logoutSellerHandler = () => {
    dispatch(logoutSeller);
    navigate('/');
  };

  useEffect(() => {
    if (seller && seller.role) {
      setUser(seller.role);
    } else if (user && user.role) {
      setUser(user.role);
    } else {
      setUser(null);
    }
  }, [seller, user]);

  const profileNavigate = () => {
    if (User === "seller") {
      navigate('/profileseller');
    } else {
      navigate('/myprofile');
    }
  };

  return (
    <nav className="relative bg-[#704214] shadow-md py-4 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-10">
        {/* Logo */}
        {User === "seller" ? (
          <Link to="/dashboard" className="no-underline">
            <h1 className="text-3xl font-bold text-[#F5E1C9] tracking-wide">RuralCraft</h1>
          </Link>
        ) : (
          <Link to="/" className="no-underline">
            <h1 className="text-3xl font-bold text-[#F5E1C9] tracking-wide">RuralCraft</h1>
          </Link>
        )}

        {/* Navigation Links */}
        {User === "seller" ? (
          <div className="flex space-x-8 text-lg font-medium">
            <Link to="/dashboard" className="text-[#F5E1C9] hover:text-[#D2B48C] transition duration-300">Dashboard</Link>
            <Link to="/about" className="text-[#F5E1C9] hover:text-[#D2B48C] transition duration-300">About</Link>
            <Link to="/course" className="text-[#F5E1C9] hover:text-[#D2B48C] transition duration-300">Craft Courses</Link>
            <Link to="/contact" className="text-[#F5E1C9] hover:text-[#D2B48C] transition duration-300">Contact Us</Link>
            <Link to="/sellappointments" className="text-[#F5E1C9] hover:text-[#D2B48C] transition duration-300">Appointments</Link>
            <Link to="/home" title="Home"><FiHome className="text-2xl text-[#F5E1C9] hover:text-[#D2B48C] cursor-pointer" /></Link>
          </div>
        ) : (
          <div className="flex space-x-8 text-lg font-medium">
            <Link to="/about" className="text-[#F5E1C9] hover:text-[#D2B48C] transition duration-300">About</Link>
            <Link to="/course" className="text-[#F5E1C9] hover:text-[#D2B48C] transition duration-300">Craft Courses</Link>
            <Link to="/contact" className="text-[#F5E1C9] hover:text-[#D2B48C] transition duration-300">Contact Us</Link>
            <Link to="/useappointments" className="text-[#F5E1C9] hover:text-[#D2B48C] transition duration-300">Appointments</Link>
            {/*<Link to="/loginEducator" className="text-[#F5E1C9] hover:text-[#D2B48C] transition duration-300">Manage Courses</Link>*/}
          </div>
        )}

        {/* Icons and Additional Links */}
        <div className="flex space-x-6 items-center">
          {User !== "seller" && (
            <>
              <FiSearch className="text-2xl text-[#F5E1C9] hover:text-[#D2B48C] transition duration-300 cursor-pointer" />
              <Link to="/cart" title="Cart">
                <FiShoppingCart className="text-2xl text-[#F5E1C9] hover:text-[#D2B48C] transition duration-300 cursor-pointer" />
              </Link>
              <Link to="/home" title="Home"><FiHome className="text-2xl text-[#F5E1C9] hover:text-[#D2B48C] cursor-pointer" /></Link>
            </>
          )} 

          {/* Single Login/Profile Dropdown */}
          {(isAuthenticated || isAuthenticatedSeller) ? (
            <div className="flex items-center space-x-4">
              <Dropdown className='dropdown-container d-inline z-50'>
                <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
                  <figure className='avatar avatar-nav'>
                    <Image width="50px" src={User === "seller" ? seller?.avatar : user?.avatar} />
                  </figure>
                  <span>{User === "seller" ? seller?.name : user?.name}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="z-50">
                  <Dropdown.Item onClick={profileNavigate} className="text">Profile</Dropdown.Item>
                  <Dropdown.Item onClick={logoutSellerHandler} className="text-danger">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <FiUser className="text-2xl text-[#F5E1C9] hover:text-[#D2B48C] transition duration-300 cursor-pointer" />
            </div>
          ) : (
            <div className="relative group z-50">
              <button className="flex items-center text-[#F5E1C9] hover:text-[#D2B48C] transition duration-300">
                Login <FiChevronDown className="ml-2 text-sm" />
              </button>
              <div className="absolute right-0 mt-2 w-44 bg-[#5A3821] shadow-lg rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition duration-300 z-50">
                <Link to="/login" className="block px-4 py-2 text-[#F5E1C9] hover:bg-[#8C6B52] transition">Buyer Login</Link>
                <Link to="/loginseller" className="block px-4 py-2 text-[#F5E1C9] hover:bg-[#8C6B52] transition">Seller Login</Link>
                <Link to="/loginEducator" className="block px-4 py-2 text-[#F5E1C9] hover:bg-[#8C6B52] transition">Educator Login</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;