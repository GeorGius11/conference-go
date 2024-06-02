import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";

type CreateConferenceDialogProps = {
  open: boolean;
  handleCreate: Function;
  handleClose: Function;
};

const formatDate = (date: Date): string => {
  return date.toISOString().slice(0, 23);
};

export default function CreateConferenceDialog({
  open,
  handleCreate,
  handleClose,
}: CreateConferenceDialogProps) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [maxNumberOfAttendees, setMaxNumberOfAttendees] = React.useState(0);
  const [startDate, setStartDate] = React.useState(formatDate(new Date()));
  const [endDate, setEndDate] = React.useState(formatDate(new Date()));

  return (
    <React.Fragment>
      <Dialog
        onClose={() => {
          handleClose();
        }}
        open={open}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleCreate({
              Name: name,
              Price: price,
              Description: description,
              Max_number_of_attendees: maxNumberOfAttendees,
              startDate: new Date(startDate).toISOString(),
              endDate: new Date(endDate).toISOString(),
            });
          },
        }}
      >
        <DialogTitle>Create Conference</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <TextField
              value={name}
              label="Name"
              sx={{
                width: "260px",
              }}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              value={description}
              label="Description"
              sx={{
                width: "260px",
              }}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <TextField
              type="number"
              label="Price"
              value={price}
              onChange={(e) => {
                setPrice(Number(e.target.value));
              }}
              inputProps={{ min: 0, max: 10000, step: 1 }}
              variant="outlined"
              sx={{
                width: "260px",
              }}
            />
            <TextField
              type="number"
              label="Max Number of Attendees"
              value={maxNumberOfAttendees}
              onChange={(e) => {
                setMaxNumberOfAttendees(Number(e.target.value));
              }}
              inputProps={{ min: 0, max: 1000000, step: 1 }}
              variant="outlined"
              sx={{
                width: "260px",
              }}
            />
            <TextField
              type="datetime-local"
              label="Start date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                width: "260px",
              }}
              fullWidth
            />
            <TextField
              type="datetime-local"
              label="End date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                width: "260px",
              }}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
