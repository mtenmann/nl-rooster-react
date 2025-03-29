import { Outlet, Link } from "react-router-dom";
import { CSSProperties } from "react";

const Layout = () => {
  const layoutStyle: CSSProperties = {
    backgroundColor: "#121212", // Dark background color
    color: "#fff",
    minHeight: "100vh",
    padding: "20px",
  };

  const headerStyle: CSSProperties = {
    textAlign: "center",
    marginBottom: "20px",
  };

  return (
    <div style={layoutStyle}>
      <header style={headerStyle}>
        <h1>Nerdelandslaget</h1>
        <h2>&lt;Rooster&gt;</h2>
        {/* Navigation link to overview */}
        <nav>
          <Link to="/overview" style={{ color: "#fff", textDecoration: "none" }}>
            Rooster
          </Link>
        </nav>
      </header>
      {/* Outlet renders the nested page content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
