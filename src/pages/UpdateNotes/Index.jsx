import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/Auth";
import { toast } from "react-toastify";
import axios from "axios";

export const UpdateNote = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#ffffff");
  const { user } = useAuth();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.token) {
      toast.error("Unauthorized! Please log in again.");
      return;
    }

    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/v1/notes/${id}`,
        { title, description, color },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (data.success) {
        setTitle("");
        setDescription("");
        setColor("#ffffff");
        toast.success("Note updated");
        navigate("/notes");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating note");
    }
  };

  const getNote = async () => {
    if (!user || !user.token) {
      toast.error("Unauthorized! Please log in again.");
      return;
    }

    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/notes/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (data.success) {
        setTitle(data.data.title);
        setDescription(data.data.description);
        setColor(data.data.color);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching note");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNote();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="flex flex-col gap-4 p-4 min-h-screen items-center justify-center">
      <form className="flex flex-col gap-4 container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-100 px-4 py-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gray-100 px-4 py-2 rounded-md"
        />
        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="bg-gray-100 px-4 py-2 rounded-md"
        >
          <option value="#ffffff">White</option>
          <option value="#ff0000">Red</option>
          <option value="#00ff00">Green</option>
          <option value="#0000ff">Blue</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Update Note
        </button>
      </form>
    </div>
  );
};
