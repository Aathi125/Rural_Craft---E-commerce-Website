import React, { useState } from "react";
import { FiSearch, FiShoppingCart, FiUser, FiHome } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ scrollToStories }) => {
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleDropdownNavigate = (path) => {
    setProfileDropdownOpen(false);
    navigate(path);
  };

  return (
   <div></div>
  );
};

export default Header;
