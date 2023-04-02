






const MovieItemDetails = ({movie, handleLikes, baseURL }) => {
  return (
    <>
      <h1>{movie.name}</h1>
      <img
        className="img img-cover"
        src={`${baseURL}${movie?.fileImage}`}
        alt={movie.name}
      />
      <p>{movie.likes.length}</p>
      <button onClick={handleLikes}>Like</button>
    </>
  );
};

export default MovieItemDetails;
