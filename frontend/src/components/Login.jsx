import { useState } from "react";
import { addUser } from "../api/user";
import { signInWithEmailAndPassword, getOTP, sendOTP } from "../api/validate";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { FaXmark } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../utils/storeSlices/userSlice";

const Login = ({ handleLogin }) => {
  const dispatch = useDispatch();
  const [alreadyUser, setAlreadyUser] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState("");
  const [user, setUser] = useState({
    name: "",
    userEmail: "",
    userPassword: "",
    userPhoneNumber: "",
  });

  const handleAlreadyUser = () => {
    setAlreadyUser(!alreadyUser);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleUserLogin = async (event) => {
    event.preventDefault();

    if (!alreadyUser) {
      await toast.promise(
        sendOTP(user.userEmail).then((response) => {
          setOtpStep(true);
          return response.message;
        }),
        {
          loading: "Verifying...",
          success: "OTP sent to your email",
          error: (error) => {
            if (error.response && error.response.message) {
              return `Error: ${error.response.message}`;
            }
            return `Error: ${error.message || "Failed to upload photo."}`;
          },
        }
      );
    } else {
      const response = await signInWithEmailAndPassword(
        user.userEmail,
        user.userPassword
      );
      if (response.ok) {
        const json = await response.json();
        toast.success(`${json.message}`);
        dispatch(setIsLoggedIn());
        localStorage.setItem("email", user.userEmail);
        localStorage.setItem("token", json.token);
        handleLogin();
      } else {
        const json = await response.json();
        toast.error(`${json.message}`);
        setErrorMessage(`${json.message}`);
      }
    }
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    const response = await getOTP();
    // otp verify
    if (response.otp == otp) {
      const finalResponse = await addUser(user);
      const json = await finalResponse.json();
      console.log(json);
      if (finalResponse.ok) {
        toast.success("Account created! Please login to your account");
        handleLogin();
      } else {
        toast.error(json.message);
      }
    } else {
      console.log("otp are not same");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      className="z-50 fixed h-full w-full bg-black bg-opacity-30"
    >
      <motion.div
        initial={{ y: -250, opacity: 0 }}
        animate={{ y: 0, opacity: 100 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="font-roboto w-1/3 h-[94%] bg-white m-auto mt-5 rounded-lg flex flex-col"
      >
        <div className="mt-10 flex justify-between w-full items-center">
          <h3 className="ml-16 px-1 font-medium">Get Started</h3>
          <div className="mr-10">
            <span onClick={handleLogin} className="cursor-pointer">
              <FaXmark />
            </span>
          </div>
        </div>
        {!otpStep ? (
          <form className="flex flex-col my-6 px-4 items-center">
            {!alreadyUser && (
              <input
                name="name"
                value={user.name}
                onChange={handleChange}
                id="name"
                className="border w-3/4 my-2 px-2 py-2 rounded-lg focus:outline-1"
                type="text"
                placeholder="Enter Your Name"
                autoComplete="on"
              />
            )}
            <input
              name="userEmail"
              value={user.userEmail}
              onChange={handleChange}
              id="email"
              className="border w-3/4 my-2 px-2 py-2 rounded-lg focus:outline-1"
              type="text"
              placeholder="Enter Email"
              autoComplete="on"
            />
            {!alreadyUser && (
              <input
                name="userPhoneNumber"
                value={user.userPhoneNumber}
                onChange={handleChange}
                id="phoneNo"
                className="border w-3/4 my-3 px-2 py-2 rounded-lg focus:outline-1"
                type="number"
                placeholder="Enter Phone No"
                autoComplete="off"
              />
            )}

            <input
              name="userPassword"
              value={user.userPassword}
              onChange={handleChange}
              id="password"
              className="border w-3/4 my-3 px-2 py-2 rounded-lg focus:outline-1"
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
            />

            <p className="text-red-500">{errorMessage}</p>
            <button
              onClick={handleUserLogin}
              className="bg-[#449ba2] mt-4 w-3/4 text-white py-2 text-lg rounded-lg"
            >
              {alreadyUser ? "Sign in" : "Sign Up"}
            </button>
          </form>
        ) : (
          <form className="flex flex-col my-6 px-4 items-center">
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border w-3/4 my-3 px-2 py-2 rounded-lg focus:outline-1"
              type="text"
              placeholder="Enter OTP"
              autoComplete="off"
            />
            <button
              onClick={handleOtpSubmit}
              className="bg-[#449ba2] mt-4 w-3/4 py-2 text-lg rounded-lg"
            >
              Submit OTP
            </button>
          </form>
        )}
        {!otpStep && (
          <p className="flex justify-center">
            {alreadyUser ? "New user ?" : "Already a User? "}
            <button onClick={handleAlreadyUser} className="px-2">
              {alreadyUser ? "Sign up" : "Sign in"}
            </button>
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Login;
