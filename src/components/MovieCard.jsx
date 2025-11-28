import { Link } from 'react-router-dom';
import { FaClock, FaStar, FaCalendar, FaFilm } from 'react-icons/fa';

export default function MovieCard({ movie }) {
  // Get the first poster from the posters array, or use a placeholder
  const posterUrl = movie.posterUrls && movie.posterUrls.length > 0 
    ? movie.posterUrls[0] 
    : "https://via.placeholder.com/300x450?text=No+Poster";

  // Format duration (convert minutes to hours and minutes)
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Determine state color
  const getStateColor = (state) => {
    switch(state) {
      case "NOW_SHOWING":
        return "bg-gradient-to-r from-green-500 to-cyan-500";
      case "COMING_SOON":
        return "bg-gradient-to-r from-yellow-500 to-orange-500";
      case "ENDED":
        return "bg-gray-500";
      default:
        return "bg-blue-500";
    }
  };

  const getStateLabel = (state) => {
    switch(state) {
      case "NOW_SHOWING":
        return "Now Showing";
      case "COMING_SOON":
        return "Coming Soon";
      case "ENDED":
        return "Ended";
      default:
        return state;
    }
  };

  return (
    <div className="font-poppins-med rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 overflow-hidden group bg-gray-900">
      {/* POSTER IMAGE */}
      <div className="h-96 w-full overflow-hidden relative">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Movie State Badge */}
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow-md text-white ${getStateColor(movie.stateOfMovie)}`}
        >
          {getStateLabel(movie.stateOfMovie)}
        </span>

        {/* Age Restriction Badge */}
        <span className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-md text-xs font-bold shadow-md">
          {movie.ageRestriction || movie.rating}
        </span>

        {/* Poster Count Badge */}
        {movie.posterUrls && movie.posterUrls.length > 1 && (
          <span className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <FaFilm />
            {movie.posterUrls.length}
          </span>
        )}

        {/* Rating Overlay */}
        {movie.averageRating && (
          <div className="absolute bottom-3 left-3 bg-yellow-500 text-gray-900 px-3 py-1 rounded-lg flex items-center gap-1 font-bold shadow-md">
            <FaStar />
            <span>{movie.averageRating}</span>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-6 bg-gray-800">
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
          {movie.title}
        </h3>

        {/* Genre */}
        <p className="text-sm text-cyan-400 mb-3">
          {movie.genre}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
          {movie.description || movie.plotSummary}
        </p>

        {/* Movie Info */}
        <div className="flex flex-wrap gap-4 text-gray-300 text-sm mb-4">
          {/* Duration */}
          <div className="flex items-center gap-1">
            <FaClock className="text-cyan-500" />
            <span>{formatDuration(movie.duration)}</span>
          </div>

          {/* Release Date */}
          <div className="flex items-center gap-1">
            <FaCalendar className="text-cyan-500" />
            <span>{formatDate(movie.releaseDate)}</span>
          </div>
        </div>

        {/* Price & Locations */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-400">From</p>
            <p className="text-2xl font-bold text-green-500">${movie.basePrice}</p>
          </div>
          {movie.availableAtLocations && movie.availableAtLocations.length > 0 && (
            <div className="text-right">
              <p className="text-xs text-gray-400">Available at</p>
              <p className="text-sm text-cyan-400 font-semibold">
                {movie.availableAtLocations.length} location{movie.availableAtLocations.length > 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>

        {/* Bookings Info */}
        {movie.totalBookings !== undefined && (
          <p className="text-xs text-gray-500 mb-4">
            {movie.totalBookings} booking{movie.totalBookings !== 1 ? 's' : ''} so far
          </p>
        )}

        {/* BUTTON */}
        <Link
          to={`/movies/${movie.id}`}
          className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-md hover:from-blue-600 hover:to-cyan-500 transition-all duration-300"
        >
          {movie.stateOfMovie === 'NOW_SHOWING' ? 'Book Now' : 'View Details'}
        </Link>
      </div>
    </div>
  );
}