import { useAuth } from "../context/authContext/";
import { doSignOut } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
  const { userLoggedIn, currentUser } = useAuth(); // Ambil data user
  const navigate = useNavigate(); // Hook untuk navigasi

  // Fungsi logout dengan konfirmasi
  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar?");
    if (confirmLogout) {
      doSignOut()
        .then(() => {
          navigate("/login"); // Redirect ke halaman login setelah logout
        })
        .catch((error) => {
          console.error("Error during logout:", error);
        });
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a href="/">Home</a>
            </li>

            <li>
              <a href="/pokemon">Pokemon</a>
            </li>
            <li>
              <ThemeSwitcher />
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/">Home</a>
          </li>

          <li>
            <a href="/pokemon">Pokemon</a>
          </li>
          <li>
            <ThemeSwitcher />
          </li>
        </ul>
      </div>
      {userLoggedIn && (
        <div className="navbar-end">
          <span className="btn">{currentUser?.email}</span>
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
