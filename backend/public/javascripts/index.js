document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Collect form data
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      // Send login request to the server
      const response = await axios.post("/admin/login", {
        email,
        password,
      });

      if (response.status === 200) {
        window.location.href = "/movies";
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.error || "Login failed. Please try again.");
    }
  });
  const movieForm = document.getElementById("movieForm");

  if (movieForm) {
    movieForm.addEventListener("submit", async (e) => {
      e.preventDefault(); // Prevent default form submission

      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const thumbnail = document.getElementById("thumbnail").value;
      const videoUrl = document.getElementById("videoUrl").value;
      console.log(title, description, thumbnail, videoUrl);

      const isUpdate = movieForm.action.includes("/admin/movies/"); // Check if it's an update

      try {
        let response;
        if (isUpdate) {
          const movieId = document.getElementById("movieId").value; // Get movie ID for updating
          response = await axios.post(`/admin/movies/${movieId}`, {
            title,
            description,
            thumbnail,
            videoUrl,
          });
        } else {
          response = await axios.post("/admin/movies", {
            title,
            description,
            thumbnail,
            videoUrl,
          });
        }
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.error || "Something went wrong.");
      }
    });
  }
  const handleDelete = async (id) => {
    try {
        const response = await axios.post(`/admin/movie/${id}`);
        if (response.status === 200) {
            alert('Movie deleted successfully!');
            window.location.href = '/movies'; // Redirect to the movies list
        }
    } catch (error) {
        console.error(error);
        alert(error.response?.data?.error || 'Failed to delete the movie. Please try again.');
    }
};

// Event listener for confirm delete buttons
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('confirm-delete-btn')) {
        const movieId = event.target.getAttribute('data-movie-id');
        handleDelete(movieId);
    }
});
  
});
