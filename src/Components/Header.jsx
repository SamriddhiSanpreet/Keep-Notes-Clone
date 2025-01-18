import React from "react";
import download from "../assets/image/download.png";
import styled from "styled-components";

const HEADER = styled.div`
  display: flex;
  background-color: #f5d03e;
  height: 13vh;
  margin-top: 0.25rem;
  justify-content: space-between;
  align-items: center;

  span {
    font-weight: 500;
    line-height: 1.2;
    font-size: calc(1.3rem + 0.6vw);
    font-family: "Roboto", serif;
    color: #fff;
  }

  form input {
    padding: 10px 3px 10px 8px;
    border-radius: 5px;
    outline: none;
    border: none;
    width: 20rem;
  }

  select {
    padding: 8px;
    border-radius: 5px;
    outline: none;
    border: none;
    margin-left: 10px;
    cursor: pointer;
    width:10rem;
    margin-right:50px;
  }
`;

const Header = ({ setSearchQuery, setSortOrder }) => {
  return (
    <HEADER>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={download} width={50} height={50} alt="Google Keep Logo" />
        <span>Google Keep</span>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search Your Note Here..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Default</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
      </form>
    </HEADER>
  );
};

export default Header;
