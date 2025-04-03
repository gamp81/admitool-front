import React from "react";
const CardMenu = ({ icon, text, color }) => {
    return (
      <div className="card" style={{ borderColor: color }}>
        <div className="icon" style={{ color: color }}>
          {icon}
        </div>
        <p className="text">{text}</p>
      </div>
    );
  };
  export default CardMenu;