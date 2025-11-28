import React from 'react'
import profile from "../assets/profile-1.jpg"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Navbar = () => {

  const user = useSelector((store) => store.user);
  console.log(user);

  return (
    <div className="navbar bg-base-200 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">👨‍💻DevTinder</Link>
        </div>
        {user && <div className="flex gap-1 items-center">
          <p>Welcome, {user.firstName}</p>
          <div className="dropdown dropdown-end mx-5">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
               <img
                  alt="Tailwind CSS Navbar component"
                  src={profile} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link to='/profile' className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><Link to="settings">Settings</Link></li>
              <li><Link to="logout">Logout</Link></li>
            </ul>
          </div>
        </div>}
      </div>
  )
}

export default Navbar