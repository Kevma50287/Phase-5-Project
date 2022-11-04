import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function UserCard({ username, image }) {
  return (
    <Card className="basic-info-card" sx={{ minWidth: 275, maxWidth:400 }}>
      <CardContent>
        <img src={image} alt="user" />
        <Typography
          sx={{ fontSize: `1.5rem` }}
          color="text.primary"
          gutterBottom
        >
          {username}
        </Typography>
      </CardContent>
    </Card>
  );
}
