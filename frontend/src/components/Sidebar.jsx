import React, { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getUser, updateUserProfile } from "../api/user";
import { useUser } from "../utils/Context/UserContext";
import toast from "react-hot-toast";

const SideBar = ({ handleNavBar }) => {
  const [user, setUser] = useState(null);
  const { userDetails } = useUser();
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser(userDetails);
        setUser(data);
      } catch (e) {
        console.error(e.message);
      }
    };

    if (userDetails) {
      fetchUser();
    }
  }, [userDetails]);

  if (!user) return null;

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadPhoto = async () => {
    if (selectedFile === null) {
      alert("Please select a file first.");
      return;
    }

    try {
      toast
        .promise(updateUserProfile(userDetails, selectedFile), {
          loading: "Uploading...",
          success: "File uploaded!",
          error: "Could not upload.",
        })
        .then(() => {
          handleNavBar();
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to upload photo.");
        });
    } catch (error) {
      console.error(error);
      alert("Failed to upload photo.");
    }
  };

  return (
    <motion.div
      className="z-10 fixed top-0 flex justify-end h-full w-full bg-black bg-opacity-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <motion.div
        className="font-body bg-white h-full w-[25%]"
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.2, type: "tween" }}
      >
        <div className="h-16 border-b border-black flex items-center justify-between px-4">
          <h2 className="font-bold text-xl">Hey!</h2>
          <span onClick={handleNavBar} className="cursor-pointer">
            <FaXmark />
          </span>
        </div>
        <div className="flex flex-col gap-4 px-4 py-4 overflow-y-scroll hide-scrollbar">
          <div className="flex items-center gap-4">
            <img
              src={user.userProfileUrl}
              alt="User Avatar"
              className="w-12 h-12 rounded-full"
              loading="lazy"
            />
            <div>
              <h3 className="text-xl font-bold">{user.name}</h3>
              <Link to="/profile" className="text-sm text-blue-500">
                View Profile
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <input
              type="file"
              name="selectedFile"
              id="upload-photo"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="upload-photo"
              className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-center"
            >
              Choose a file
            </label>
            <button
              onClick={handleUploadPhoto}
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Upload Photo
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SideBar;
