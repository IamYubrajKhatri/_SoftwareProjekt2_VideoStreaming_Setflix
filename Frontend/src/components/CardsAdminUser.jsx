import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function CardsAdminUser({ item, onDelete }) {  // Destructure props here
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const imageUrl = `/${item.image}`;  // Assuming 'item.image' contains 'profile.avif'


  // Function to handle deleting the user
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4001/api/admin/${item._id}`);
      toast.success('User deleted successfully!');
      onDelete(item._id); // Notify parent to refresh the list or update UI
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user. Please try again.');
    }
  };

  return (
    <div className="my-4 p-3">
      <div className="card bg-base-300 p-3 shadow-xl mx-1 hover:scale-105 duration-200">
        <figure>
          <img src="https://img.freepik.com/vektoren-kostenlos/blauer-kreis-mit-weissem-benutzer_78370-4707.jpg" alt="Profile image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{item.username}</h2>
          <p>{item.email}</p>
          <div className="card-actions justify-between">
            {/* Delete Button */}
            <button
              className="btn btn-error text-white hover:text-black"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardsAdminUser;
