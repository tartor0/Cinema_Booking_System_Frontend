import { HiMenu, HiX } from "react-icons/hi";
import { MdMovieFilter, MdLocalMovies } from "react-icons/md";
import { FaFilm, FaTicketAlt } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-900/95 backdrop-blur-sm font-poppins-med shadow-lg py-4 px-6 md:px-12 transition-all duration-300 border-b border-cyan-500/20">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
            <MdLocalMovies className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Tartor Cinema
            </h1>
            <p className="text-xs text-gray-400 -mt-1">Book Your Experience</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex text-white gap-8 items-center">
          <li>
            <Link
              to="/"
              className="flex items-center gap-2 hover:text-cyan-400 transition-colors duration-300"
            >
              <FaFilm className="text-sm" />
              Now Showing
            </Link>
          </li>
          <li>
            <Link
              to="/coming-soon"
              className="flex items-center gap-2 hover:text-cyan-400 transition-colors duration-300"
            >
              <MdMovieFilter className="text-lg" />
              Coming Soon
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="flex items-center gap-2 hover:text-cyan-400 transition-colors duration-300"
            >
              About
            </Link>
          </li>
        </ul>

        {/* Book Tickets Button */}
        <Link
          to="/book-tickets"
          className="hidden md:flex items-center gap-2 text-white bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2 rounded-xl shadow-md hover:scale-105 hover:shadow-cyan-500/50 transition-all duration-300"
        >
          <FaTicketAlt />
          Book Tickets
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-cyan-400 text-3xl hover:text-cyan-300 transition-colors"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden mt-4 bg-gray-800/95 backdrop-blur-sm rounded-xl p-5 space-y-4 text-white animate-fadeIn border border-cyan-500/20">
          <Link 
            to="/" 
            className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
            onClick={() => setOpen(false)}
          >
            <FaFilm />
            Now Showing
          </Link>
          <Link
            to="/coming-soon"
            className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
            onClick={() => setOpen(false)}
          >
            <MdMovieFilter />
            Coming Soon
          </Link>
          <Link
            to="/about"
            className="block hover:text-cyan-400 transition-colors"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            to="/book-tickets"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 py-2 rounded-xl hover:scale-105 transition-transform shadow-md shadow-cyan-500/30"
            onClick={() => setOpen(false)}
          >
            <FaTicketAlt />
            Book Tickets
          </Link>
        </div>
      )}
    </nav>
  );
}