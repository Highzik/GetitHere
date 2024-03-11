import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()
  const getData = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
    console.log(formData)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/user/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success === false) {
        setError(data.message);
        setLoading(loading)
        return;
      }
      setLoading(!loading)
      navigate('/sign-in')
    } catch (error) {
      setLoading(loading)
      setError(error)
    }
  }
  return (
    <>
      <main className="flex flex-col sm:flex-row max-w-4xl mx-auto py-16 px-5">
        <section className="flex-1">
          <h1 className="text-4xl font-semibold mb-3">Welcome to Getit<span className="text-hover font-bold text-4xl">Here</span></h1>
          <p className="text-lg font-semibold mb-3">Everything you need to scale a global team</p>
          <p className="mb-3 font-semibold max-md:">Your one stop shop of getting everything needed...</p>
          <button className="bg-hover py-2 px-6 text-hoverText font-semibold text-md rounded-md shadow-lg">Get Started</button>
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
              onChange={getData}
            />
            <input
              type="text"
              id="lastName"
              placeholder="Last name"
              required
              className="w-full mb-2 p-3 bg-navBG focus:outline-none"
              onChange={getData}
            />
            <input
              type="text"
              id="userName"
              placeholder="Username"
              required
              className="w-full mb-2 p-3 bg-navBG focus:outline-none"
              onChange={getData}
            />
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              className="w-full mb-2 p-3 bg-navBG focus:outline-none"
              onChange={getData}
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              className="w-full mb-2 p-3 bg-navBG focus:outline-none"
              onChange={getData}
            />
            <button
              disabled={loading}
              className="bg-hover text-hoverText font-semibold text-md w-full p-3 mb-2 rounded-md">{loading ? "Loading..." : "SIGN UP"}
            </button>
            <p>{error}</p>
          </form>
          <div className="flex gap-3 py-3">
            <p className="font-semibold text-md">Already have an account? </p>
            <Link to={'/sign-in'}>
              <span className="font-bold text-hover text-md ">Sign In</span>
            </Link>
          </div>
        </aside>
      </main>
    </>

  )
}
