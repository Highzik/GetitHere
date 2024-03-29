import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SignUp from "./SignUp";
import { motion } from "framer-motion"
import Notification from "./Notification";

export default function SignIn() {
  const [text, setText] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null)

  // function to toggle on and off the sign in and sign up form
  const changeTheText = () => {
    setText(!text);
  }

  // variable to navigate user to homepage after signing in
  const navigate = useNavigate()

  // Function to listen to the changes in the input
  const signInData = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (!res.ok) {
        setLoading(true)
        throw new Error("Invalid credentials")
      }
      setLoading(true)
      setSuccessMessage('Signed in successfully')
      setTimeout(() => {
        setLoading(false)
        navigate("/")
      }, 4000)
    } catch (error) {
      setLoading(true)
      setError(error.message)
      setTimeout(() => {
        setLoading(false)
        setError(error)
      }, 2000)
    }
  }

  return (
    <>{text ?
      <main className="flex flex-col sm:flex-row max-w-4xl mx-auto py-16 px-5">
        <section className="flex-1" >
          <h1 className="text-4xl font-semibold mb-3">Welcome to Getit<span className="text-hover font-bold text-4xl">Here</span></h1>
          <p className="text-lg font-semibold mb-3">Everything you need to scale a global team</p>
          <p className="mb-3 font-semibold">Your one stop shop of getting everything needed...</p>
          <button onClick={changeTheText} className="bg-hover py-2 px-6 text-hoverText font-semibold text-md rounded-md shadow-lg">{text ? "Click To Sign Up" : "Click To Sign In"}</button>
        </section>

        <motion.aside
          initial={{ opacity: 0, rotateY: -180 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: 180 }}
          transition={{ duration: 0.2 }}
          className="shadow-2xl px-8 max-w-xl mx-auto flex-1 rounded-lg mt-4">
          <form onSubmit={handleSubmit}>
            <h1 className="text-center font-semibold text-2xl py-5">Sign in</h1>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              required
              className="w-full mb-2 p-3 bg-navBG focus:outline-none"
              onChange={signInData}
            />

            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              className="w-full mb-2 p-3 bg-navBG focus:outline-none"
              onChange={signInData}
            />

            <button
              disabled={loading}
              className="bg-hover text-hoverText font-semibold text-md w-full p-3 mb-2 rounded-md">{loading ? "Loading..." : "SIGN IN"}
            </button>
          </form>
          <div className="flex gap-3 py-3">
            <p className="text-md font-semibold">Dont have an account?</p>
            <Link to={'/sign-up'}>
              <span className="text-hover font-bold text-md">Sign Up</span>
            </Link>
          </div>
        </motion.aside>
        <Notification message={error ? error.message : successMessage} isError={error ? true : false} />
      </main>
      : <div>
        <SignUp />
      </div>}
    </>
  )
}
