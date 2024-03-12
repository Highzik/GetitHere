import { Link } from "react-router-dom";
import { useState } from "react";
import SignIn from "./SignIn";

export default function SignUp() {
  const [text, setText] = useState(true);
  const changeTheText = () => {
    setText(!text);
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
          <form>
            <h1 className="text-center font-semibold text-2xl py-5">Sign Up</h1>
            <input
              type="text"
              id="firstName"
              placeholder="First name"
              required
              className="w-full mb-2 p-3 bg-navBG focus:outline-none"
            />
            <input
              type="text"
              id="lastName"
              placeholder="Last name"
              required
              className="w-full mb-2 p-3 bg-navBG focus:outline-none"

            />
            <input
              type="text"
              id="userName"
              placeholder="Username"
              required
              className="w-full mb-2 p-3 bg-navBG focus:outline-none"

            />
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              className="w-full mb-2 p-3 bg-navBG focus:outline-none"

            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              className="w-full mb-2 p-3 bg-navBG focus:outline-none"

            />
            <button

              className="bg-hover text-hoverText font-semibold text-md w-full p-3 mb-2 rounded-md">SIGN UP
            </button>

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
