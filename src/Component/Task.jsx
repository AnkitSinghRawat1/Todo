import { Button, Card, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { taskComp } from "./compStyle";
const Task = ({ data, deleteTaskFunction, updateTaskFunction }) => {
  return (
    <Stack style={taskComp.taskStackStyle}>
      {data?.map((res) => (
        <Card
          key={res.id}
          style={{
            margin: "20px",
            padding: "20px",
            maxWidth: "400px",
            width: "400px",
          }}
        >
          <Typography>
            {" "}
            Title:{" "}
            {res.taskName.length > 20
              ? `${res.taskName.slice(0, 20)}...`
              : res.taskName}{" "}
          </Typography>
          <Typography>
            {" "}
            Description:{" "}
            {res.taskDesc.length > 20
              ? `${res.taskDesc.slice(0, 20)}...`
              : res.taskDesc}{" "}
          </Typography>
          <Typography>
            {" "}
            Status:{" "}
            {res.status.length > 20
              ? `${res.status.slice(0, 20)}...`
              : res.status}{" "}
          </Typography>

          <Button onClick={() => updateTaskFunction(res)}>update</Button>
          <Button onClick={() => deleteTaskFunction(res.id)}>Delete</Button>
        </Card>
      ))}
    </Stack>
  );
};

export default Task;
