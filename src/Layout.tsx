import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    const layoutStyle = {
        backgroundColor: "#121212", // Dark background color
        color: "#fff",
        minHeight: "100vh",
        padding: "20px",
    };

    const headerStyle = {
        textAlign: "center",
        marginBottom: "20px",
    };

    return (
        <div style={layoutStyle}>
        <header style={headerStyle}>
            <h1>BOBLE</h1>
            <h2>&lt;Nerdelandslaget&gt;</h2>
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
