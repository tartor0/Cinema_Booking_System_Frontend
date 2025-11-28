import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { deleteCinemaBooking, getCinemaBookingById } from "../api/cinemabooking";
import {
  HiChevronLeft,
  HiChevronRight,
  HiLocationMarker,
} from "react-icons/hi";
import {
  FaClock,
  FaStar,
  FaCalendar,
  FaFilm,
  FaUsers,
  FaTheaterMasks,
  FaPlay
} from "react-icons/fa";
import { MdMovieFilter } from "react-icons/md";

export default function MovieCardDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCinemaBookingById(id);
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie?"
    );
    if (!confirmDelete) return;

    try {
      await deleteCinemaBooking(id);
      alert("Movie deleted successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error deleting:", err);
      alert("Failed to delete movie.");
    }
  };

  // ✅ CORRECT
  const nextImage = () => {
    if (movie.posterUrls && movie.posterUrls.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === movie.posterUrls.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (movie.posterUrls && movie.posterUrls.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? movie.posterUrls.length - 1 : prev - 1
      );
    }
  };

  // Format duration
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get state color and label
  const getStateInfo = (state) => {
    switch (state) {
      case "NOW_SHOWING":
        return {
          color: "bg-gradient-to-r from-green-500 to-cyan-500",
          label: "Now Showing"
        };
      case "COMING_SOON":
        return {
          color: "bg-gradient-to-r from-yellow-500 to-orange-500",
          label: "Coming Soon"
        };
      case "ENDED":
        return {
          color: "bg-gray-500",
          label: "Ended"
        };
      default:
        return {
          color: "bg-blue-500",
          label: state
        };
    }
  };

  if (loading) {
    return (
      <div className="flex font-poppins-med justify-center items-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-center">
          <p className="text-red-500 text-2xl font-bold mb-4">Movie not found</p>
          <Link
            to="/"
            className="text-cyan-400 hover:underline"
          >
            ← Back to movies
          </Link>
        </div>
      </div>
    );
  }

  // ✅ CORRECT
  const posters = movie.posterUrls && movie.posterUrls.length > 0
    ? movie.posterUrls
    : ["https://via.placeholder.com/400x600?text=No+Poster"];

  const currentPoster = posters[currentImageIndex];
  const stateInfo = getStateInfo(movie.stateOfMovie);

  return (
    <div className="min-h-screen font-poppins-med bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-5 py-10">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 font-semibold"
        >
          <HiChevronLeft className="text-xl" />
          Back to Movies
        </Link>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* LEFT: POSTER CAROUSEL */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main Poster */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src={currentPoster}
                alt={`${movie.title} - Poster ${currentImageIndex + 1}`}
                className="w-full h-[600px] object-cover"
              />

              {/* Navigation Arrows */}
              {posters.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
                  >
                    <HiChevronLeft className="text-2xl" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
                  >
                    <HiChevronRight className="text-2xl" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {posters.length}
                  </div>
                </>
              )}

              {/* Status Badge */}
              <span className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-semibold shadow-lg text-white ${stateInfo.color}`}>
                {stateInfo.label}
              </span>

              {/* Age Rating Badge */}
              <span className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
                {movie.ageRestriction || movie.rating}
              </span>
            </div>

            {/* Thumbnail Gallery */}
            {posters.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {posters.map((poster, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`rounded-lg overflow-hidden border-2 transition-all ${index === currentImageIndex
                      ? "border-cyan-500 shadow-lg scale-105"
                      : "border-gray-600 hover:border-cyan-400"
                      }`}
                  >
                    <img
                      src={poster}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Trailer Button */}
            {movie.trailerUrl && (
              <button
                onClick={() => setShowTrailer(!showTrailer)}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 px-6 rounded-xl font-semibold shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaPlay />
                {showTrailer ? 'Hide Trailer' : 'Watch Trailer'}
              </button>
            )}
          </div>

          {/* RIGHT: MOVIE DETAILS */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              {/* Title */}
              <h1 className="text-5xl font-bold text-white mb-2">
                {movie.title}
              </h1>

              {/* Genre */}
              <p className="text-cyan-400 text-lg mb-4 flex items-center gap-2">
                <MdMovieFilter />
                {movie.genre}
              </p>

              {/* Rating */}
              {movie.averageRating && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-bold shadow-md">
                    <FaStar className="mr-2" />
                    <span className="text-xl">{movie.averageRating}</span>
                    <span className="text-sm ml-1">/10</span>
                  </div>
                  {movie.totalBookings > 0 && (
                    <span className="text-gray-400 text-sm">
                      ({movie.totalBookings} booking{movie.totalBookings !== 1 ? 's' : ''})
                    </span>
                  )}
                </div>
              )}

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <FaClock className="text-cyan-400 text-xl mb-2" />
                  <p className="text-gray-400 text-sm">Duration</p>
                  <p className="text-white font-semibold">{formatDuration(movie.duration)}</p>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <FaCalendar className="text-cyan-400 text-xl mb-2" />
                  <p className="text-gray-400 text-sm">Release Date</p>
                  <p className="text-white font-semibold">{formatDate(movie.releaseDate)}</p>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <FaTheaterMasks className="text-cyan-400 text-xl mb-2" />
                  <p className="text-gray-400 text-sm">Rating</p>
                  <p className="text-white font-semibold">{movie.ageRestriction || movie.rating}</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-3">Plot Summary</h2>
                <p className="text-gray-300 leading-relaxed">
                  {movie.description || movie.plotSummary || "No description available."}
                </p>
              </div>

              {/* Crew Information */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-2">Director</h3>
                  <p className="text-gray-200">{movie.director}</p>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-2">Producer</h3>
                  <p className="text-gray-200">{movie.producer}</p>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg md:col-span-2">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-2">Writer</h3>
                  <p className="text-gray-200">{movie.writer}</p>
                </div>
              </div>

              {/* Cast */}
              {movie.cast && movie.cast.length > 0 && (
                <div className="bg-gray-800 p-5 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                    <FaUsers />
                    Cast
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.cast.map((actor, index) => (
                      <span
                        key={index}
                        className="bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-200"
                      >
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Locations */}
              {movie.availableAtLocations && movie.availableAtLocations.length > 0 && (
                <div className="bg-blue-900 bg-opacity-30 p-5 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                    <HiLocationMarker />
                    Available At
                  </h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {movie.availableAtLocations.map((location, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg"
                      >
                        <FaFilm className="text-cyan-400" />
                        <span className="text-gray-200">{location}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Booking Period */}
              <div className="bg-gray-800 p-5 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-cyan-400 mb-3">Booking Period</h3>
                <div className="flex items-center gap-4 text-gray-300">
                  <div>
                    <p className="text-sm text-gray-400">From</p>
                    <p className="font-semibold">{formatDate(movie.bookingStartDate)}</p>
                  </div>
                  <span className="text-gray-500">→</span>
                  <div>
                    <p className="text-sm text-gray-400">To</p>
                    <p className="font-semibold">{formatDate(movie.bookingEndDate)}</p>
                  </div>
                </div>
              </div>

              {/* Trailer Video */}
              {showTrailer && movie.trailerUrl && (
                <div className="mb-6 rounded-lg overflow-hidden">
                  <video
                    controls
                    className="w-full"
                    src={movie.trailerUrl}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              {/* PRICE */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-xl shadow-lg mb-6">
                <p className="text-white text-sm mb-1">Ticket Price (from)</p>
                <p className="text-5xl font-bold text-white">
                  ${parseFloat(movie.basePrice).toFixed(2)}
                </p>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={`/edit-movie/${id}`}
                className="flex-1 text-center bg-cyan-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:bg-cyan-700 transition-all duration-300"
              >
                Edit Movie
              </Link>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:bg-red-700 transition-all duration-300"
              >
                Delete Movie
              </button>
              {movie.stateOfMovie === 'NOW_SHOWING' && (
                <button
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                >
                  Book Tickets
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}