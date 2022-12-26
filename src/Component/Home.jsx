import React, { useEffect, useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import Task from "./Task";
import {
  addNewTask,
  deleteTask,
  getAllPost,
  updateTask,
} from "../service/task.service";
import { homeComp } from "./compStyle";

const Home = () => {
  const [currentTask, setCurrentTask] = useState({
    id: "",
    taskName: "",
    taskDesc: "",
    status: "",
  });
  const [data, setData] = useState([]);
  const [isNew, setIsNew] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    (async () => {
      const response = await getAllPost();
      if (response?.status) {
        if (response.data.length === 0) {
          setIsUpdateMode(false);
          setCurrentTask({ taskName: "", taskDesc: "", status: "" });
        }
        setData(response.data);
      }
    })();
  }, [isNew]);

  const handleChange = (e) => {
    setCurrentTask({ ...currentTask, [e.target.name]: e.target.value });
  };

  const isSameNameExist = () => {
    const _data = data;
    for (let { taskName, id: _id } of _data) {
      if (!isUpdateMode) {
        if (taskName === currentTask.taskName) {
          alert("same name exist");
          return true;
        }
      } else {
        if (taskName === currentTask.taskName && _id !== id) {
          alert("Usame name exist", id);
          return true;
        }
      }
    }
    return false;
  };

  const add = async () => {
    const exist = isSameNameExist();
    if (!exist) {
      const response = await addNewTask(currentTask);
      if (response?.status) {
        setIsNew(!isNew);
        setCurrentTask({
          taskName: "",
          taskDesc: "",
          status: "",
        });
      }
    }
  };

  const update = async () => {
    const exist = isSameNameExist();
    if (!exist) {
      const response = await updateTask(id, currentTask);
      if (response?.status) {
        setIsNew(!isNew);
        setIsUpdateMode(false);
        setCurrentTask({
          taskName: "",
          taskDesc: "",
          status: "",
        });
      }
    }
  };

  const checkValidation = () => {
    const currentData = currentTask;
    if (
      currentData.taskName.trim().length !== 0 &&
      currentData.taskDesc.trim().length !== 0 &&
      currentData.status.trim().length !== 0
    )
      return true;
    return false;
  };

  const addNewTaskFunc = async () => {
    const isValid = checkValidation();
    if (isValid) {
      if (!isUpdateMode) add();
      else update();
    } else {
      alert("please fill all the fields");
    }
  };

  const updateTaskFunction = async ({ id, taskName, taskDesc, status }) => {
    setIsUpdateMode(true);
    setId(id);
    setCurrentTask({ taskName, taskDesc, status });
  };

  const deleteTaskFunction = async (id) => {
    const response = await deleteTask(id);
    if (response?.status) {
      setIsNew(!isNew);
    }
  };

  return (
    <Stack style={homeComp.stackStyle}>
      <TextField
        style={homeComp.field}
        id="outlined-basic"
        label="Task Name"
        name="taskName"
        variant="outlined"
        value={currentTask.taskName}
        onChange={handleChange}
      />
      <TextField
        style={homeComp.field}
        id="outlined-basic"
        name="taskDesc"
        label="Task Description"
        variant="outlined"
        value={currentTask.taskDesc}
        onChange={handleChange}
      />
      <TextField
        style={homeComp.field}
        id="outlined-basic"
        label="Status"
        name="status"
        variant="outlined"
        value={currentTask.status}
        onChange={handleChange}
      />

      <Button
        style={homeComp.addButtonStyle}
        variant="contained"
        onClick={addNewTaskFunc}
      >
        {!isUpdateMode ? "Add New Task" : "Update Task"}
      </Button>

      {data?.length !== 0 && (
        <>
          <Typography variant="h3">Task List</Typography>
          <Task
            data={data}
            deleteTaskFunction={deleteTaskFunction}
            updateTaskFunction={updateTaskFunction}
          />
        </>
      )}
    </Stack>
  );
};

export default Home;
