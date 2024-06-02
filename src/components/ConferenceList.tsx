import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { Box, Typography } from "@mui/material";
import {
  createConference,
  deleteConference,
  getConferences,
} from "../dbManager/dbManager";
import { formatDate } from "../helpers/helper";
import UpdateIcon from "@mui/icons-material/Update";
import AddIcon from "@mui/icons-material/Add";
import CreateConferenceDialog from "./CreateConferenceDialog";

interface Conference {
  ID: string;
  Name: string;
  Description: string;
  Price: number;
  Max_number_of_attendees: number;
  Date: string;
  End_date: string;
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ExpandMoreIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const ConferenceList: React.FC = () => {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [expanded, setExpanded] = useState<string | false>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  useEffect(() => {
    const asyncWrapper = async () => {
      await updateConferences();
    };

    asyncWrapper();
  }, []);

  const updateConferences = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") ?? "");
      console.log("Updating conferences for user:", user);

      const response = await getConferences(user.username, user.password);
      if (response.success) {
        setConferences(response.rows);
        console.log("Conferences fetched:", response.rows);
      } else {
        console.error("Error fetching conferences:", response.message);
      }
    } catch (error) {
      console.error("Error fetching conferences:", error);
    }
  };

  const handleDelete = async (conferenceId: string) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") ?? "");
      console.log("Deleting conference with ID:", conferenceId);

      const response = await deleteConference(
        user.username,
        user.password,
        conferenceId
      );
      if (response.success) {
        console.log("Conference deleted successfully");
        await updateConferences(); // Update conferences after deletion
      } else {
        console.error("Failed to delete conference:", response.message);
      }
    } catch (error) {
      console.error("Error deleting conference:", error);
    }
  };

  const handleCreateConference = async (data: any) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") ?? "");

      console.log(data);

      const response = await createConference(
        user.username,
        user.password,
        data
      );
      if (response.success) {
        console.log("Conference created successfully");
        await updateConferences();
      } else {
        console.error("Failed to create conference:", response.message);
      }
    } catch (error) {
      console.error("Error creating conference:", error);
    }
    handleClose();
  };

  const handleClose = async () => {
    setOpen(false);
  };

  return (
    <List sx={{ width: "100%" }}>
      <IconButton
        aria-label="delete"
        size="large"
        onClick={() => {
          setOpen(true);
        }}
      >
        <AddIcon />
      </IconButton>
      <IconButton aria-label="delete" size="large" onClick={updateConferences}>
        <UpdateIcon />
      </IconButton>
      {conferences.length > 0 &&
        conferences.map((c) => (
          <div
            key={c.ID}
            style={{
              display: "flex",
              borderRadius: "16px",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "4px",
            }}
          >
            <Accordion
              expanded={expanded === c.ID}
              onChange={handleChange(c.ID)}
              sx={{
                width: "100%",
                borderRadius: "16px",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{
                  borderRadius: "16px",
                  display: "flex",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography>{c.Name}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <IconButton
                      aria-label="delete"
                      size="large"
                      onClick={() => handleDelete(c.ID)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Typography>
                      {formatDate(c.Date)} - {formatDate(c.End_date)}
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "lightgray",
                  borderRadius: "16px",
                  gap: "16px",
                }}
              >
                <Typography>{c.Description}</Typography>
                <Typography>Price: {c.Price}$</Typography>
                <Typography>
                  Number of attendees: 0 / {c.Max_number_of_attendees}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      <CreateConferenceDialog
        open={open}
        handleCreate={handleCreateConference}
        handleClose={handleClose}
      />
    </List>
  );
};

export default ConferenceList;
