import { useState } from "react";
import "./style.css";

interface INavBarProps {
    navName: string;
    navItems: string[];
}

function NavBar({ navName, navItems }: INavBarProps) {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-white shadow">
            <div className="container-fluid">
                <a className="navbar-brand" href="home" style={{ marginLeft: "100px" }}>
                    <span className="fw-bolder fs-4">{navName}</span>
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav mb-2 mb-md-1" style={{ marginRight: "250px" }}>
                        {navItems.map((items, index) => (
                            <li
                                key={items}
                                className="nav-item"
                                onClick={() => setSelectedIndex(index)}
                            >
                                <a
                                    className={
                                        selectedIndex === index
                                            ? "nav-link active fw-bold"
                                            : "nav-link"
                                    }
                                    href="addtodo"
                                >
                                    {items}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
