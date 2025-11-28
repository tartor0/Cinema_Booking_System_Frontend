import { useEffect, useState } from "react";
import { getAllCinemaBookings } from "../api/cinemabooking";
import MovieCard from "../components/MovieCard";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaFilm, FaTicketAlt, FaStar, FaTheaterMasks } from "react-icons/fa";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [stateFilter, setStateFilter] = useState("ALL"); // "ALL", "NOW_SHOWING", "COMING_SOON", "ENDED"
  const [genreFilter, setGenreFilter] = useState("ALL");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getAllCinemaBookings();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  // Get unique genres from movies
  const genres = ["ALL", ...new Set(
    movies.flatMap(movie => 
      movie.genre ? movie.genre.split(',').map(g => g.trim()) : []
    )
  )];

  useEffect(() => {
    let filtered = movies;

    // Filter by state
    if (stateFilter !== "ALL") {
      filtered = filtered.filter((m) => m.stateOfMovie === stateFilter);
    }

    // Filter by genre
    if (genreFilter !== "ALL") {
      filtered = filtered.filter((m) => 
        m.genre && m.genre.includes(genreFilter)
      );
    }

    setFilteredMovies(filtered);
  }, [stateFilter, genreFilter, movies]);

  return (
    <div className="w-full min-h-screen font-poppins-med bg-gray-900">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-20 text-center pb-24 px-6 md:px-16 lg:px-32">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="mb-6" data-aos="zoom-in">
            <FaFilm className="text-cyan-500 text-6xl mx-auto animate-pulse" />
          </div>
          
          <h1
            className="text-4xl md:text-7xl font-bold text-white leading-tight"
            data-aos="fade-up"
          >
            Experience Cinema
            <span className="text-cyan-500 block mt-2" data-aos="fade-up" data-aos-delay="200">
              Like Never Before
            </span>
          </h1>

          <p
            className="mt-6 text-lg text-gray-300 max-w-2xl"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Discover the latest blockbusters, book your seats, and immerse yourself 
            in unforgettable movie experiences at our state-of-the-art cinemas.
          </p>

          {/* FILTERS */}
          <div
            className="mt-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            {/* State Filter */}
            <div className="relative">
              <label className="block text-left text-sm text-gray-400 mb-2 font-semibold">
                Movie Status
              </label>
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="w-full px-6 py-3 rounded-xl shadow-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-base appearance-none cursor-pointer hover:bg-gray-750 transition-colors"
              >
                <option value="ALL">All Movies</option>
                <option value="NOW_SHOWING">Now Showing</option>
                <option value="COMING_SOON">Coming Soon</option>
                <option value="ENDED">Ended</option>
              </select>
            </div>

            {/* Genre Filter */}
            <div className="relative">
              <label className="block text-left text-sm text-gray-400 mb-2 font-semibold">
                Genre
              </label>
              <select
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
                className="w-full px-6 py-3 rounded-xl shadow-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-base appearance-none cursor-pointer hover:bg-gray-750 transition-colors"
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre === "ALL" ? "All Genres" : genre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stats Bar */}
          <div 
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <FaFilm className="text-cyan-500 text-2xl mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{movies.length}</p>
              <p className="text-sm text-gray-400">Total Movies</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <FaTicketAlt className="text-green-500 text-2xl mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">
                {movies.filter(m => m.stateOfMovie === 'NOW_SHOWING').length}
              </p>
              <p className="text-sm text-gray-400">Now Showing</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <FaTheaterMasks className="text-yellow-500 text-2xl mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">
                {movies.filter(m => m.stateOfMovie === 'COMING_SOON').length}
              </p>
              <p className="text-sm text-gray-400">Coming Soon</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <FaStar className="text-orange-500 text-2xl mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">
                {movies.reduce((acc, m) => acc + (m.totalBookings || 0), 0)}
              </p>
              <p className="text-sm text-gray-400">Total Bookings</p>
            </div>
          </div>
        </div>
      </section>

      {/* MOVIES SECTION */}
      <section
        className="px-6 md:px-10 lg:px-15 lg:py-10 mb-10"
        id="movies"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <FaFilm className="text-cyan-500" />
                {stateFilter === "NOW_SHOWING" ? "Now Showing" :
                 stateFilter === "COMING_SOON" ? "Coming Soon" :
                 stateFilter === "ENDED" ? "Past Movies" : "All Movies"}
              </h2>
              <p className="text-gray-400 mt-2">
                {filteredMovies.length} movie{filteredMovies.length !== 1 ? 's' : ''} available
              </p>
            </div>
            <a
              href="/add-movie"
              className="inline-flex items-center gap-2 text-white bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg font-semibold"
            >
              <FaFilm />
              Add Movie
            </a>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-500 mx-auto mb-4"></div>
                <p className="text-gray-400 text-lg">Loading movies...</p>
              </div>
            </div>
          ) : filteredMovies.length === 0 ? (
            <div className="text-center py-20">
              <FaFilm className="text-gray-600 text-6xl mx-auto mb-4" />
              <p className="text-gray-400 text-xl">
                No movies found for the selected filters.
              </p>
              <button
                onClick={() => {
                  setStateFilter("ALL");
                  setGenreFilter("ALL");
                }}
                className="mt-6 text-cyan-400 hover:text-cyan-300 underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div 
              className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
              data-aos="fade-up"
            >
              {filteredMovies.map((movie) => (
                <div key={movie.id} data-aos="zoom-in" data-aos-delay="100">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section
        className="w-full bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-6 md:px-12 lg:px-20"
        id="about"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About Our Cinema
            </h2>
            <p className="mt-4 text-gray-300 text-lg max-w-3xl mx-auto">
              We bring you the ultimate movie-going experience with cutting-edge technology, 
              comfortable seating, and a vast selection of films. From blockbusters to indie gems, 
              we've got something for every movie lover.
            </p>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            data-aos="fade-up"
          >
            <div className="bg-gray-800 border border-gray-700 shadow-xl rounded-2xl p-6 hover:shadow-2xl hover:border-cyan-500 transition-all">
              <div className="bg-cyan-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FaTheaterMasks className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Premium Experience
              </h3>
              <p className="text-gray-400">
                State-of-the-art screens, immersive sound systems, and luxury seating 
                for the ultimate viewing experience.
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 shadow-xl rounded-2xl p-6 hover:shadow-2xl hover:border-cyan-500 transition-all">
              <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FaTicketAlt className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Easy Booking
              </h3>
              <p className="text-gray-400">
                Book your tickets online in seconds with our user-friendly platform. 
                Choose your seats and showtime with ease.
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 shadow-xl rounded-2xl p-6 hover:shadow-2xl hover:border-cyan-500 transition-all">
              <div className="bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FaStar className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Latest Releases
              </h3>
              <p className="text-gray-400">
                Watch the hottest new movies on opening day. We bring you all the 
                biggest blockbusters and exclusive premieres.
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 shadow-xl rounded-2xl p-6 hover:shadow-2xl hover:border-cyan-500 transition-all">
              <div className="bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FaFilm className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Multiple Locations
              </h3>
              <p className="text-gray-400">
                Find us at convenient locations across the city. All our theaters 
                feature the same high-quality experience.
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 shadow-xl rounded-2xl p-6 hover:shadow-2xl hover:border-cyan-500 transition-all">
              <div className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FaTicketAlt className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Special Offers
              </h3>
              <p className="text-gray-400">
                Enjoy exclusive deals, loyalty rewards, and special discounts on 
                tickets and concessions throughout the year.
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 shadow-xl rounded-2xl p-6 hover:shadow-2xl hover:border-cyan-500 transition-all">
              <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FaTheaterMasks className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Diverse Selection
              </h3>
              <p className="text-gray-400">
                From action-packed adventures to heartfelt dramas, we showcase a 
                wide variety of genres for all audiences.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div 
            className="mt-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl p-10 text-center"
            data-aos="zoom-in"
          >
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready for Your Next Movie Night?
            </h3>
            <p className="text-white text-lg mb-6 max-w-2xl mx-auto">
              Browse our current showings and book your tickets today. The perfect 
              movie experience awaits!
            </p>
            <a
              href="#movies"
              className="inline-block bg-white text-cyan-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
            >
              Explore Movies Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}