import React, { useState } from "react";
import axios from "axios";
import {
  makeStyles,
  TextField,
  Button,
  InputAdornment,
} from "@material-ui/core";
import { MovieGrid } from "./Components/MovieGrid";
import { NominationDrawer } from "./Components/NominationDrawer";
import { SearchIcon } from "./Icons/SearchIcon";

const appStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "helvetica",
    color: "#004c3f",
  },
  button: {
    padding: "16px",
    backgroundColor: "#008060",
    color: "white",
    "&:hover": {
      backgroundColor: "#004c3f",
    },
  },
  searchField: {
    color: "#004c3f",
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#008060",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#004c3f",
    },
  },
  searchFieldLabel: {
    color: "#008060",
    "&.Mui-focused": {
      color: "#004c3f",
    },
  },
  searchFieldContainer: {
    display: "flex",
    justifyContent: "center",
    paddingBottom: "20px",
  },
});

export const App = () => {
  const classes = appStyles({});
  const [searchResults, setSearchResults] = useState([]);
  const [showNominationDrawer, setShowNominationDrawer] = useState(false);
  const [nominations, setNominations] = useState([]);

  const fetchResults = async (e) => {
    if (e.keyCode === 13) {
      const result = await axios.get(
        `http://www.omdbapi.com/?apikey=b6c68bdb&s=${e.target.value}&type=movie`
      );
      setSearchResults(result.data.Search);
      console.log("result", result);
      console.log("Search", searchResults);
    }
  };

  const handleNominations = (newNominations) => {
    setNominations(newNominations);
  };

  const handleShowNominationDrawer = (showDrawer) => {
    setShowNominationDrawer(showDrawer);
  };

  const nominationIdList = nominations.map((nomination) => nomination.id);
  return (
    <div>
      <div className={classes.header}>
        <h1>The Shoppies: Movie Awards for Entrepreneurs</h1>
        <Button
          className={classes.button}
          onClick={() => setShowNominationDrawer(true)}
        >
          View Nominations
        </Button>
      </div>
      <NominationDrawer
        showNominationDrawer={showNominationDrawer}
        handleShowNominationDrawer={handleShowNominationDrawer}
        handleNominations={handleNominations}
        nominations={nominations}
      />

      <div className={classes.searchFieldContainer}>
        <TextField
          className={classes.searchField}
          label="Search for a movie"
          variant="outlined"
          onKeyDown={fetchResults}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon></SearchIcon>
              </InputAdornment>
            ),
            className: classes.searchField,
          }}
          InputLabelProps={{
            className: classes.searchFieldLabel,
          }}
        ></TextField>
      </div>
      <MovieGrid
        searchResults={searchResults}
        handleNominations={handleNominations}
        nominations={nominations}
        nominationIdList={nominationIdList}
      ></MovieGrid>
    </div>
  );
};
