import React from "react";

import { Button, Drawer, IconButton, makeStyles } from "@material-ui/core";
import { CloseIcon } from "../Icons/CloseIcon";
const nominationDrawerStyles = makeStyles({
  header: { display: "flex" },
  button: {
    padding: "6px",
    backgroundColor: "#008060",
    color: "white",
    "&:hover": {
      backgroundColor: "#004c3f",
    },
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
    <Drawer variant="persistent" anchor="right" open={showNominationDrawer}>
      <div className={classes.header}>
        <p>Your Nominations</p>
        <IconButton
          size="medium"
          aria-label="Close Nomination Drawer"
          onClick={() => handleShowNominationDrawer(false)}
        >
          <CloseIcon />
        </IconButton>
      </div>
      {nominations.map((nomination) => (
        <div key={nomination.id}>
          <p>
            {nomination.title} {nomination.year}
          </p>
          <Button
            variant="contained"
            color="primary"
            onClick={() => removeNomination(nomination.id)}
          >
            Remove
          </Button>
        </div>
      ))}
    </Drawer>
  );
};
