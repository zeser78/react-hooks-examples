import React, { useRef, useState, useEffect } from "react";
import logo from "./logo.svg";

const NavBarExample = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    // check the height of the links
    const linksHeight = linksRef.current.getBondingClientRect().height;

    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = "0px";
    }
    return () => {};
  }, [showLinks]);
  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <img src={logo} alt="logo" width="100px" />
          <button
            className="nav-toggle"
            onClick={() => setShowLinks(!showLinks)}
          >
            BARS{" "}
          </button>
        </div>
        {/* {showLinks && ( */}
        <div className="links-container" ref={linksContainerRef}>
          <ul className="links" ref={linksRef}>
            <li>
              <a href="#">about</a>
            </li>
            <li>
              <a href="#">products</a>
            </li>
            <li>
              <a href="#">contact</a>
            </li>
          </ul>
        </div>
        {/* )} */}

        <ul className="social-icons">
          <a href="#">TW</a>
        </ul>
      </div>
    </nav>
  );
};

export default NavBarExample;
