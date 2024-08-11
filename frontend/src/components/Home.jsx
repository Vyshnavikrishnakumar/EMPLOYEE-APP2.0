import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Modal,
  Box,
  TextField
} from "@mui/material";
import "../App.css";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    EmpName: "",
    designation: "",
    empId: "",
    img_url: ""
  });

  useEffect(() => {
    axios.get('http://localhost:3500/view')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []); 

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3500/remove/${id}`)
      .then((response) => {
        console.log(response.data);
        setData(data.filter(item => item._id !== id));
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  const handleUpdate = (id) => {
    setCurrentId(id);
    const employee = data.find(item => item._id === id);
    setUpdatedData({
      EmpName: employee.EmpName,
      designation: employee.designation,
      empId: employee.empId,
      img_url: employee.img_url
    });
    setOpen(true);
  };

  const handleSave = () => {
    axios.put(`http://localhost:3500/update/${currentId}`, updatedData)
      .then((response) => {
        console.log(response.data);
        setData(data.map(item => (item._id === currentId ? response.data.updatedEmployee : item)));
        setOpen(false);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  return (
    <div className="Mar">
      <Grid container spacing={6}>
        {data.map((val, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent>
                <img
                  src={val.img_url}
                  className="img-fluid rounded-start"
                  width="100%"
                  alt="image"
                />
                <Typography gutterBottom variant="h5">
                  {val.EmpName}
                </Typography>
                <Typography component="div">{val.designation}</Typography>
                <Typography component="div">{val.empId}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(val._id)}
                >
                  Delete
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => handleUpdate(val._id)}
                >
                  Update
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal for updating employee */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Update Employee
          </Typography>
          <Box
            component="form"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
          >
            <TextField
              label="Employee Name"
              variant="outlined"
              value={updatedData.EmpName}
              onChange={(e) => setUpdatedData({ ...updatedData, EmpName: e.target.value })}
            />
            <TextField
              label="Designation"
              variant="outlined"
              value={updatedData.designation}
              onChange={(e) => setUpdatedData({ ...updatedData, designation: e.target.value })}
            />
            <TextField
              label="Employee Id"
              variant="outlined"
              value={updatedData.empId}
              onChange={(e) => setUpdatedData({ ...updatedData, empId: e.target.value })}
            />
            <TextField
              label="Photo URL"
              variant="outlined"
              value={updatedData.img_url}
              onChange={(e) => setUpdatedData({ ...updatedData, img_url: e.target.value })}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ mt: 2 }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
