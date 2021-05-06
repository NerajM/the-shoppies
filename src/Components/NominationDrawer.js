import React from "react";
import { Drawer, IconButton, makeStyles } from "@material-ui/core";
import { ArrowIcon } from "../Icons/ArrowIcon";
import { DeleteIcon } from "../Icons/DeleteIcon";

const nominationDrawerStyles = makeStyles({
  header: {
    display: "flex",
    alignItems: "center",
    color: "#004c3f",
    fontFamily: "helvetica",
    fontSize: "24pt",
  },
  drawerPaper: {
    width: "20%",
    backgroundColor: "#fbf7ed",
  },
  nomination: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#004c3f",
    fontFamily: "helvetica",
    marginLeft: "5px",
    fontSize: "16pt",
  },
});

export const NominationDrawer = ({
  showNominationDrawer,
  handleShowNominationDrawer,
  handleNominations,
  nominations,
}) => {
  const classes = nominationDrawerStyles({});

  const removeNomination = (id) => {
    const updatedNominationList = nominations.filter(
      (nomination) => nomination.id !== id
    );
    handleNominations(updatedNominationList);
  };

  return (
    <Drawer
      anchor="right"
      open={showNominationDrawer}
      onClose={() => handleShowNominationDrawer(false)}
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={classes.header}>
        <IconButton
          size="medium"
          aria-label="Close Nomination Drawer"
          onClick={() => handleShowNominationDrawer(false)}
        >
          <ArrowIcon />
        </IconButton>
        <p>Your Nominations</p>
      </div>
      {nominations.map((nomination) => (
        <div classkey={nomination.id} className={classes.nomination}>
          <p>
            {nomination.title} ({nomination.year})
          </p>
          <IconButton
            aria-label="Remove Nomination"
            onClick={() => removeNomination(nomination.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
    </Drawer>
  );
};
