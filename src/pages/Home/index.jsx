import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/Auth";

export const Home = () => {
  const { user } = useAuth(); // Get user authentication status
  const navigate = useNavigate();

  const handleCreateNoteClick = () => {
    if (user) {
      navigate("/notes/create"); // If user is logged in, go to create note
    } else {
      navigate("/register"); // Otherwise, redirect to register
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Note App By Aboshady 📝</h1>
        <br />
        <p>
          Your personal space to capture, organize, and share your thoughts.
        </p>
        <br />
      </header>

      <section className="note-warning">
        <h2>⚠️ One-Way Journey! </h2>
        <p>
          Once you write a note, it's <strong>etched in history</strong> – no
          edits, no deletes! <br />
          Think twice, write once! 📝🔒
        </p>
      </section>


      <div className="cta-buttons">
        <button onClick={handleCreateNoteClick} className="btn-secondary">
          Create Your Note Now
        </button>
      </div>
    </div>
  );
};
