import List from "@mui/material/List";
import { getConferences } from "../dbManager/dbManager";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { Box, Typography } from "@mui/material";
import { formatDate } from "../helpers/helper";

interface Conference {
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
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
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

export default function ConferenceList() {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [expanded, setExpanded] = useState<string | false>("");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  useEffect(() => {
    const asyncWrapper = async () => {
      const user = JSON.parse(localStorage.getItem("user") ?? "");

      console.log(user);

      const conferencesFromDb = await getConferences(
        user.username,
        user.password
      );
      setConferences(conferencesFromDb.rows);

      console.log(conferencesFromDb.rows);
    };

    asyncWrapper();
  }, []);

  return (
    <List sx={{ width: "100%" }}>
      {conferences.length > 0 &&
        conferences.map((c) => (
          <div
            key={c.Name}
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
              expanded={expanded === c.Name}
              onChange={handleChange(c.Name)}
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
                  <Typography>
                    {formatDate(c.Date)} - {formatDate(c.End_date)}
                  </Typography>
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
    </List>
  );
}
