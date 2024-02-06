import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import {Sidebar,Videos} from "./";

import { fetchFromAPI } from "../utils/fechFromAPI";
import { useParams } from "react-router-dom";
const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const {searchTerm}=useParams();

  useEffect(() => {
    setVideos(null);
    // `` inside this part will be became dynamic
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
      .then((data) => setVideos(data.items))
    }, [searchTerm]);

  return (
    <Box p={3} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
          Search Results For :<span style={{ color: "#FC1503" }}>
            {searchTerm}
          </span> videos
        </Typography>

        <Videos videos={videos} />
      </Box>
  );
};

export default SearchFeed;