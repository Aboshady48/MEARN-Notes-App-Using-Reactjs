import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/Auth";
import { Link } from "react-router-dom";

export const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const getAllNotes = async () => {
      if (!user) {
        console.error("User is not authenticated.");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token is missing!");
        return;
      }

      try {
        setLoading(true);

        const userId = user?._id || localStorage.getItem("userId");
        console.log("Fetching notes for user:", userId);

        const response = await axios.get(
          `http://localhost:3000/api/v1/notes?userID=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        console.log("Fetched Notes:", response.data.data);
        setNotes(response.data.data || []);
        toast.success("Notes loaded successfully!");
      } catch (error) {
        console.error("Error fetching notes:", error);
        toast.error(error.response?.data?.message || "Failed to load notes");
        setNotes([]);
      } finally {
        setLoading(false);
      }
    };

    getAllNotes();
  }, [user]);

  if (loading)
    return (
      <div className="loading-effect">
        <div></div> {/* This div will be animated */}
      </div>
    );

  return (
    <div className="notes-container">
      <h1 className="notes-title">
        {notes.length === 0 ? "No Notes Created Yet" : "Your Notes"}
      </h1>

      <div className="notes-grid">
        {notes.map((note) => (
          <div
            key={note._id}
            className="note-card"
            style={{ backgroundColor: note.color }}
          >
            <h1 className="note-title">{note.title}</h1>
            <p className="note-description">{note.description}</p>

            <div className="note-buttons">
              {/* <Link to={`/notes/update/${note._id}`} className="update-btn">
                Update
              </Link> */}
             
            </div>
          </div>
        ))}
      </div>

      <div className="create-note-button">
        <Link to="/notes/create" className="create-btn">
          + Create Note
        </Link>
      </div>
    </div>
  );
};

export default Notes;
