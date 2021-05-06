import React, { useState } from "react";
import axios from "axios";
import {
  makeStyles,
  TextField,
  Button,
  InputAdornment,
  Dialog,
  DialogTitle,
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
    marginLeft: "5px",
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
  menuButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  menuButton: {
    margin: "0px 2px 2px 0px",
    padding: "10px",
    backgroundColor: "#008060",
    color: "white",
    "&:hover": {
      backgroundColor: "#004c3f",
    },
  },
  noResultsMessage: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "helvetica",
    color: "#900C3F",
    fontSize: "16pt",
  },
});

export const App = () => {
  const classes = appStyles({});
  const [showBanner, setShowBanner] = useState(false);
  const [showNominationDrawer, setShowNominationDrawer] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [nominations, setNominations] = useState([]);

  const fetchResults = async (e) => {
    if (e.keyCode === 13) {
      const result = await axios.get(
        `http://www.omdbapi.com/?apikey=b6c68bdb&s=${e.target.value}&type=movie`
      );
      setSearchResults(result.data.Search);
    }
  };

  const handleNominations = (newNominations) => {
    setNominations(newNominations);
    setShowBanner(newNominations.length === 5);
  };

  const handleShowNominationDrawer = (showDrawer) => {
    setShowNominationDrawer(showDrawer);
  };

  const nominationIdList = nominations.map((nomination) => nomination.id);

  return (
    <>
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
        />
      </div>
      {searchResults ? (
        <MovieGrid
          searchResults={searchResults}
          handleNominations={handleNominations}
          nominations={nominations}
          nominationIdList={nominationIdList}
        />
      ) : (
        <p className={classes.noResultsMessage}>
          Whoops! No movies found, try another movie.
        </p>
      )}
      <Dialog open={showBanner} onClose={() => setShowBanner(false)}>
        <DialogTitle>
          Congratulations! You have reached 5 nominations!
        </DialogTitle>
        <div className={classes.menuButtonContainer}>
          <Button
            className={classes.menuButton}
            onClick={() => setShowBanner(false)}
          >
            Close
          </Button>
          <Button
            className={classes.menuButton}
            onClick={() => {
              setShowBanner(false);
              handleShowNominationDrawer(true);
            }}
          >
            View Nominations
          </Button>
        </div>
      </Dialog>
    </>
  );
};
