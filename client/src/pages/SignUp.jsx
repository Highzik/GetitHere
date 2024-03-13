import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SignIn from "./SignIn";

export default function SignUp() {
  const [text, setText] = useState(true)
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const navigate = useNavigate();

  const changeTheText = () => {
    setText(!text);
  }

  const getUserData = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (!res.ok) {
        setLoading(true);
        throw new Error("Unable to sign up. Please refresh page and try again")
      }
      setSuccessMessage("User Successfully Created");
      setLoading(true)
      setTimeout(() => {
        navigate("/sign-in")
      }, 2000)
    } catch (error) {
      setError(error.message)
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        setError(error)
      }, 2000)
    }
  }
  return (
    <>{text ?
      <main className="flex flex-col sm:flex-row max-w-4xl mx-auto py-16 px-5">
        <section className="flex-1">
          <h1 className="text-4xl font-semibold mb-3">Welcome to Getit<span className="text-hover font-bold text-4xl">Here</span></h1>
          <p className="text-lg font-semibold mb-3">Everything you need to scale a global team</p>
          <p className="mb-3 font-semibold max-md:">Your one stop shop of getting everything needed...</p>
          <button onClick={changeTheText} className="bg-hover py-2 px-6 text-hoverText font-semibold text-md rounded-md shadow-lg">{text ? "Click To Sign In" : "Click To Sign Up"}</button>
        </section>

        <aside className="shadow-2xl px-8 max-w-xl mx-auto flex-1 rounded-lg mt-4">
          <form onSubmit={handleSubmit}>
            <h1 className="text-center font-semibold text-2xl py-5">Sign Up</h1>
            <input
              type="text"
              id="firstName"
              placeholder="First name"
              required
              className="w-full mb-2 p-3 bg-navBG focus:outline-none"
              onChange={getUserData}
            />

            <input
              type="text"
              id="lastName"
              placeholder="Last name"
              required
              className="w-full mb-2 p-3 bg-navBG focus:outline-none"
              onChange={getUserData}
            />

            <input
              type="text"
              id="userName"
              placeholder="Username"
              required
              className="w-full mb-2 p-3 bg-navBG focus:outline-none"
              onChange={getUserData}
            />

            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              className="w-full mb-2 p-3 bg-navBG focus:outline-none"
              onChange={getUserData}
            />

            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              className="w-full mb-2 p-3 bg-navBG focus:outline-none"
              onChange={getUserData}
            />

            <button
              disabled={loading}
              className="bg-hover text-hoverText font-semibold text-md w-full p-3 mb-2 rounded-md">{loading ? "LOADING..." : "SIGN UP"}
            </button>
            {error && <p className="text-google font-semibold text-sm">{error.message}</p>}
            {successMessage && <p className="text-success font-semibold text-sm">{successMessage}</p>}
          </form>
          <div className="flex gap-3 py-3">
            <p className="font-semibold text-md">Already have an account? </p>
            <Link to={'/sign-in'}>
              <span className="font-bold text-hover text-md ">Sign In</span>
            </Link>
          </div>
        </aside>
      </main>
      : <div>
        <SignIn />
      </div>}
    </>

  )
}
