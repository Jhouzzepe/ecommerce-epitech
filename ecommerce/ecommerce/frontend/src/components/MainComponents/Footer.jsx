import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#2E4033] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <Link to="/" className="no-underline flex items-center space-x-4">
              <img
                src="/CapyBrun.png"
                alt="CapyBrun"
                className="w-12 h-12 object-cover rounded-full"
              />
              <h1
                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#A88030] via-[#E7C248] via-[#FFEB8A] via-[#E7C248] to-[#A88030]"
                style={{ fontFamily: "Marcellus SC, serif" }}
              >
                Papuche
              </h1>
            </Link>
            <p className="mt-4 text-sm">
              © 2024 Papuche. Tous droits réservés.
            </p>
          </div>

          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Liens Rapides</h2>
            <ul>
              <li className="mb-2">
                <Link to="/" className="hover:underline">
                  Accueil
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/product" className="hover:underline">
                  Produits
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/cart" className="hover:underline">
                  Panier
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/terms" className="hover:underline">
                  Conditions Générales
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Suivez-nous</h2>
            <div className="flex space-x-4">
              <a href="#" className="hover:underline">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:underline">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="hover:underline">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="hover:underline">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/3">
            <h2 className="text-xl font-bold mb-4">Contactez-nous</h2>
            <p className="mb-2">
              Adresse: 101 Rue de l'hopital militaire, Lille, France
            </p>
            <p className="mb-2">Téléphone: +33 1 23 45 67 89</p>
            <p>Email: contact@papuche.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
