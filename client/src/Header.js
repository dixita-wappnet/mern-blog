import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <div className="dashboard-header">
    <header>
      <Link to="/" className="logo">Single Post Blog</Link>
      <nav>
        {username && (
          <>
            <Link to="/create" className="logo">
              <button className="btn">
                Create new post
              </button>
              </Link>
            <a onClick={logout} className="logo">
              <button className="btn">
              Logout ({username})

              </button>
              </a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login" className="logo">
              <button className="btn"> 
              Login
              </button>
              </Link>
            <Link to="/register" className="logo">
              <button className="btn">
              Register
              </button>
              </Link>
          </>
        )}
      </nav>
    </header>
        </div>
  );
}
