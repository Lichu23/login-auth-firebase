import { useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  //initialize firebase authentication and navigation
  const auth = getAuth();
  const navigate = useNavigate();

  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signInWithGoogle = async () => {
    setAuthing(true);

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user.uid);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };

  const signInWithEmail = async () => {
    setAuthing(true);
    setError("");

    //Use firebase to sign in with email and password
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response.user.uid);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        navigate("/");
      });
  };

  return (
    <div className="w-full h-screen flex">
      <div className="lg:w-1/2 lg:h-full flex flex-col bg-[#282c34] items-center justify-center"></div>

      <div className="lg:w-1/2 lg:h-full md:w-full sm:w-full bg-[#1a1a1a] flex flex-col p-20 justify-center">
        <div className="w-full flex flex-col max-w-[450px] mx-auto">
          <div className="w-full flex flex-col mb-10 text-white">
            <h3 className="text-4xl font-bold mb-2">Login</h3>
            <p className="text-lg mb-4">
              Welcome Back! Please enter your details.
            </p>
          </div>

          <div className="w-full flex flex-col mb-6">
            <input
              type="email"
              placeholder="Email"
              className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="w-full flex flex-col mb-4">
            <button
              className="w-full bg-transparent border border-white text-white my-2 font-semibold rounded-md p-4 text-center flex items-center justify-center cursor-pointer"
              onClick={signInWithEmail}
              disabled={authing}
            >
              Log In With Email and Password
            </button>
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="w-full flex items-center justify-center relative py-4">
            <div className="w-full h-[1px] bg-gray-500"></div>
            <p className="text-lg absolute text-gray-500 bg-[#1a1a1a] px-2">
              OR
            </p>
          </div>

          <button
            className="w-full bg-white text-black font-semibold rounded-md p-4 text-center flex items-center justify-center cursor-pointer mt-7"
            onClick={signInWithGoogle}
            disabled={authing}
          >
            Log In With Google
          </button>
        </div>

        <div className="w-full flex items-center justify-center mt-10">
          <p className="text-sm font-normal text-gray-400">
            Don't have an account?{" "}
            <span className="font-semibold text-white cursor-pointer underline">
              <a href="/sign-up">Sign Up</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};