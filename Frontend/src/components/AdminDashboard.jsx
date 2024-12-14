
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function AdminDashboard() {
    const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  // Handle file input change
  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  // Upload video
  const handleVideoUpload = async (e) => {
    e.preventDefault();

    if (!video) {
      toast.error('Please select a video to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('video', video);

    try {
      const response = await axios.post('/api/videos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Video uploaded successfully!');
      console.log(response.data);

      // Clear the form
      setTitle('');
      setDescription('');
      setVideo(null);
      document.getElementById('video').value = ''; // Clear file input
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload video. Please try again.');
    }
  };

  // Delete video
  const handleDeleteVideo = async (videoId) => {
    try {
      const response = await axios.delete(`/api/videos/${videoId}`);
      toast.success('Video deleted successfully!');
      console.log(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete video. Please try again.');
    }
  };

  // Add user
  const handleAddUser = async (e) => {
    e.preventDefault();

    if (!username || !email) {
      toast.error('Please provide all user details.');
      return;
    }

    try {
      const response = await axios.post('/api/users/add', { username, email });
      toast.success('User added successfully!');
      console.log(response.data);

      // Clear the form
      setUsername('');
      setEmail('');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add user. Please try again.');
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(`/api/users/${userId}`);
      toast.success('User deleted successfully!');
      console.log(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete user. Please try again.');
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
        {/* Upload Video Section */}
        <div>
          <button onClick={() => document.getElementById('video_modal').showModal()} className="btn btn-primary">
            Upload Video
          </button>

          <dialog id="video_modal" className="modal">
            <div className="modal-box">
              <button
                onClick={() => document.getElementById('video_modal').close()}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
              <h3 className="font-bold text-lg">Upload a Video</h3>

              <form onSubmit={handleVideoUpload}>
                <div className="mt-4 space-y-2 py-1">
                  <label htmlFor="title" className="block font-medium">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    placeholder="Enter title"
                    className="w-full px-4 py-2 border rounded-md outline-none"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="mt-4 space-y-2 py-1">
                  <label htmlFor="description" className="block font-medium">
                    Description
                  </label>
                  <textarea
                    id="description"
                    placeholder="Enter description"
                    className="w-full px-4 py-2 border rounded-md outline-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="mt-4">
                  <label htmlFor="video" className="block font-medium">
                    Upload Video
                  </label>
                  <input
                    type="file"
                    id="video"
                    accept="video/*"
                    className="mt-2"
                    onChange={handleFileChange}
                    required
                  />
                </div>

                <div className="flex justify-end mt-6">
                  <button type="submit" className="btn btn-success text-white hover:text-black">
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </div>

        {/* Add User Section */}
        <div>
          <button onClick={() => document.getElementById('user_modal').showModal()} className="btn btn-secondary">
            Add User
          </button>

          <dialog id="user_modal" className="modal">
            <div className="modal-box">
              <button
                onClick={() => document.getElementById('user_modal').close()}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
              <h3 className="font-bold text-lg">Add a User</h3>

              <form onSubmit={handleAddUser}>
                <div className="mt-4 space-y-2 py-1">
                  <label htmlFor="username" className="block font-medium">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Enter username"
                    className="w-full px-4 py-2 border rounded-md outline-none"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="mt-4 space-y-2 py-1">
                  <label htmlFor="email" className="block font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    className="w-full px-4 py-2 border rounded-md outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="flex justify-end mt-6">
                  <button type="submit" className="btn btn-success text-white hover:text-black">
                    Add User
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </div>
      </div>
    </>
  );
};
  

export default AdminDashboard




