  import { MdLocalMovies, MdEmail } from "react-icons/md";
  import { FaFilm, FaTicketAlt, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

  export default function Footer() {
    return (
      <footer className="relative overflow-hidden text-white font-poppins-med bg-gray-900 py-12 px-6 md:px-12 border-t border-cyan-500/20">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black opacity-90"></div>
        
        {/* Container */}
        <div className="flex flex-col lg:flex-row justify-between flex-wrap gap-16 max-w-[1200px] mx-auto mb-12 relative z-10">
          {/* Left */}
          <div className="flex-1 min-w-[280px] lg:flex-[1.2]">
            <div className="pb-6 mb-6 border-b border-cyan-500/30">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-2 rounded-lg">
                  <MdLocalMovies className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Tartor Cinema
                </h2>
              </div>
              <p className="text-gray-400 max-w-[300px] text-sm leading-6">
                Your premier destination for blockbuster movies and unforgettable cinema experiences across Nigeria.
              </p>
            </div>

            <div className="flex gap-14 flex-wrap mt-6">
              {/* Column 1 */}
              <div className="min-w-[150px]">
                <h3 className="mb-4 text-sm font-semibold uppercase text-cyan-400 flex items-center gap-2">
                  <FaFilm className="text-xs" />
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      className="text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-300"
                      href="/"
                    >
                      Now Showing
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-300"
                      href="/coming-soon"
                    >
                      Coming Soon
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-300"
                      href="/about"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-300"
                      href="/locations"
                    >
                      Locations
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 2 */}
              <div className="min-w-[150px]">
                <h3 className="mb-4 text-sm font-semibold uppercase text-cyan-400 flex items-center gap-2">
                  <FaTicketAlt className="text-xs" />
                  Support
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      className="text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-300"
                      href="/help"
                    >
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-300"
                      href="/contact"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-300"
                      href="/faq"
                    >
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-300"
                      href="/feedback"
                    >
                      Feedback
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="mt-8">
              <h3 className="mb-4 text-sm font-semibold uppercase text-cyan-400">
                Follow Us
              </h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 p-3 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <FaFacebook className="text-lg" />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 p-3 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <FaTwitter className="text-lg" />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 p-3 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <FaInstagram className="text-lg" />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 p-3 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <FaYoutube className="text-lg" />
                </a>
              </div>
            </div>
          </div>

          {/* Right - Newsletter */}
          <div className="flex-1 min-w-[300px] lg:pl-10">
            <span className="block text-xs font-bold tracking-wide mb-2 text-gray-500 uppercase flex items-center gap-2">
              <MdEmail className="text-cyan-400" />
              Newsletter
            </span>

            <h3 className="text-3xl md:text-4xl font-semibold leading-tight mb-3">
              Stay Updated
            </h3>
            
            <p className="text-gray-400 text-sm mb-6">
              Get the latest movie releases, exclusive deals, and cinema news delivered to your inbox!
            </p>

            <form className="flex rounded-full overflow-hidden bg-gray-800 max-w-[360px] border border-cyan-500/30 hover:border-cyan-500/60 transition-colors">
              <input
                type="email"
                required
                placeholder="Enter your email..."
                className="flex-1 px-5 py-3 text-sm outline-none bg-transparent text-white placeholder-gray-500"
              />
              <button
                type="submit"
                className="px-6 text-white bg-gradient-to-r from-cyan-500 to-blue-600 text-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
              >
                →
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-cyan-500/20 pt-6 mt-6 max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between gap-4 text-gray-400 text-sm relative z-10">
          <p className="flex items-center gap-2">
            <span className="text-cyan-400">©</span> {new Date().getFullYear()} Tartor Cinema. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <a className="hover:text-cyan-400 transition-colors" href="/privacy">
              Privacy Policy
            </a>
            <span className="text-gray-600">|</span>
            <a className="hover:text-cyan-400 transition-colors" href="/terms">
              Terms of Service
            </a>
            <span className="text-gray-600">|</span>
            <a className="hover:text-cyan-400 transition-colors" href="/cookies">
              Cookie Policy
            </a>
          </div>
        </div>
      </footer>
    );
  }