import { useState } from "react";
import { Search } from "./Search";

export const Home = ({ setImageData }) => {
  const [searchQuery, setSearchQuery] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bool, setBool] = useState(false);

  const noDefault = (event) => {
    event.preventDefault();
  };

  return <></>;
};
