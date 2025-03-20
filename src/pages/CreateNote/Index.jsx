import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../Context/Auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const CreateNote = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#D8C4B6");
  const { user } = useAuth();

  const API_URL = "http://localhost:3000/api/v1/notes";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || title.length < 5) {
      toast.error("Title must be at least 5 characters long.");
      return;
    }
    if (!description.trim()) {
      toast.error("Description is required.");
      return;
    }

    // Ensure the correct user ID is retrieved
    const userId = user?._id || localStorage.getItem("userId");
    const token = user?.token || localStorage.getItem("token");

    console.log("User ID:", userId);
    console.log("Token:", token);

    if (!userId || !token) {
      toast.error("Authentication error. Please log in again.");
      return;
    }

    const note = { title, description, color, userID: userId };
    console.log("Sending Note:", note);

    try {
      const response = await axios.post(API_URL, note, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response:", response.data);

      if (response.data.success) {
        toast.success("Note created successfully");
        navigate("/notes");
      } else {
        toast.error(response.data.message || "Failed to create note");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message ||
          "Failed to create note. Please try again."
      );
    }
  };

  return (
    <div className="create-note-container">
      <div className="create-note">
        <h2>Create a Note</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Note Title (Min 5 chars)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Write your note here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <div className="color-picker">
            <label>Pick a Color:</label>
            
          </div>
          <button type="submit">Save Note</button>
        </form>
      </div>
    </div>
  );
};
