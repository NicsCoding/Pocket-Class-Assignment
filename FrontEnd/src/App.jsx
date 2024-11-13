import { Link, Outlet } from "react-router-dom";
import "./App.css";
function App() {
  console.log(localStorage.getItem("loginToken"));
  return (
    <div>
      <center>
        <h1>Welcome to PocketClass</h1>
      </center>
      <header className="header-tag">
        <nav>
          {" "}
          <div
            style={{
              display: "flex",
              gap: "60px",
            }}
          >
            <div>
              <Link to="/instructor">
                <button className="btn btn-primary">
                  Instructor Dashboard
                </button>
              </Link>
            </div>
            <div>
              <Link
                to={
                  localStorage.getItem("loginToken")
                    ? "/student"
                    : "/login-page"
                }
              >
                <button className="btn btn-danger">Student Corner</button>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
