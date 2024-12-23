import MainFrame from "./MainFrame";
import { useState } from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { red } from "@mui/material/colors";

const About = ({ game_details }) => {
  const [showMore, setShowMore] = useState(false);

  const handleToggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="about">
      <h1>about this game</h1>
      <p>{game_details.about[0]}</p>
      <MainFrame main_image={game_details.gifs[0]} />
      <p>{game_details.about[1]}</p>
      {showMore && (
        <>
          <MainFrame main_image={game_details.gifs[1]} />
          <p>{game_details.about[2]}</p>
          <MainFrame main_image={game_details.gifs[2]} />
        </>
      )}
      <span onClick={handleToggleShowMore}>
        {showMore ? "Show Less" : "Show More"}
      </span>
      {!showMore ? (
        <KeyboardDoubleArrowDownIcon
          sx={{ fontSize: 30 , color:red[500]}}
          style={{ cursor: "pointer" }}
          onClick={handleToggleShowMore}
        />
      ) : (
        <KeyboardDoubleArrowUpIcon
          sx={{ fontSize: 30, color:red[500]}}
          style={{ cursor: "pointer" }}
          onClick={handleToggleShowMore}
        />
      )}
    </div>
  );
};

export default About;
