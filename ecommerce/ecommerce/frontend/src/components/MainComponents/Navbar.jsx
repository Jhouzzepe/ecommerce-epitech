import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import SearchBar from "../HomeComponents/CustomSearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import authService from "../../services/authService";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthenticated = !!(localStorage.getItem("user") || sessionStorage.getItem("user"));
  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    navigate(`/product/?search=${searchTerm}`);
  };

  const handleLogout = () => {
    authService.logout();
    localStorage.removeItem("user");
    navigate('/login');
  };

  return (
    <nav className="bg-[#2E4033] text-white shadow-md
    ">
      <div className="flex flex-wrap items-center justify-between px-4 py-3 md:px-8">
        <div className="flex items-center space-x-4">
          <img
            src="/CapyBrun.png"
            alt="CapyBrun"
            className="w-12 h-12 object-cover rounded-full"
          />
          <Link to="/" className="no-underline">
            <h1
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#A88030] via-[#E7C248] via-[#FFEB8A] via-[#E7C248] to-[#A88030]"
              style={{ fontFamily: "Marcellus SC, serif" }}
            >
              Papuche
            </h1>
          </Link>

          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl focus:outline-none"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        <div className="hidden md:flex flex-grow justify-center">
          <div className="flex-grow max-w-md mx-4">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        <div className="hidden md:flex flex-grow items-center justify-end space-x-4 text-2xl" style={{ fontFamily: "Italiana, serif" }}>
          <Link to="/" className="py-2 px-4 hover:bg-gray-700 rounded">
            Accueil
          </Link>
          <Link to="/product" className="py-2 px-4 hover:bg-gray-700 rounded">
            Produits
          </Link>
          <Link to="/categories" className="py-2 px-4 hover:bg-gray-700 rounded">
            Catégories
          </Link>
          <Link to="/cart" className="py-2 px-4 hover:bg-gray-700 rounded">
            <FontAwesomeIcon icon={faShoppingCart} />
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="py-2 px-4 hover:bg-gray-700 rounded">
                <FontAwesomeIcon icon={faUser} />
              </Link>
              <button
                onClick={handleLogout}
                className="py-2 px-4 hover:bg-gray-700 rounded bg-transparent border-none text-white cursor-pointer"
              >
                Se déconnecter
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="py-2 px-4 hover:bg-gray-700 rounded">
                Inscription
              </Link>
              <Link to="/login" className="py-2 px-4 hover:bg-gray-700 rounded">
                Connexion
              </Link>

            </>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#2E4033] px-4 py-3 text-2xl" style={{ fontFamily: "Italiana, serif" }}>
          <SearchBar onSearch={handleSearch} />
          <ul className="mt-2 space-y-2">
            <li>
              <Link to="/" className="block py-2 px-4 hover:bg-gray-700 rounded text-2xl" style={{ fontFamily: "Italiana, serif" }}>
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/product" className="block py-2 px-4 hover:bg-gray-700 rounded text-2xl" style={{ fontFamily: "Italiana, serif" }}>
                Produits
              </Link>
            </li>
            <li>
              <Link to="/contact" className="block py-2 px-4 hover:bg-gray-700 rounded text-2xl" style={{ fontFamily: "Italiana, serif" }}>
                Contact
              </Link>
            </li>
            <li>
              <Link to="/cart" className="block py-2 px-4 hover:bg-gray-700 rounded text-2xl" style={{ fontFamily: "Italiana, serif" }}>
                Panier
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/profile" className="block py-2 px-4 hover:bg-gray-700 rounded text-2xl" style={{ fontFamily: "Italiana, serif" }}>
                    Profil
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block py-2 px-4 hover:bg-gray-700 rounded bg-transparent border-none text-white cursor-pointer text-2xl" style={{ fontFamily: "Italiana, serif" }}
                  >
                    Se déconnecter
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/register" className="block py-2 px-4 hover:bg-gray-700 rounded text-2xl" style={{ fontFamily: "Italiana, serif" }}>
                    Inscription
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="block py-2 px-4 hover:bg-gray-700 roundedtext-2xl" style={{ fontFamily: "Italiana, serif" }}>
                    Connexion
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
