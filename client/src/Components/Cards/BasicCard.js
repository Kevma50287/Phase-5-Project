import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function BasicCard({ title, content, image }) {
  return (
    <Card className="basic-info-card" sx={{ minWidth: 275 }}>
      <CardContent>
        <img src={image} alt="how-reach-works" />
        <Typography
          sx={{ fontSize: `1.5rem` }}
          color="text.primary"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography variant="body2">{content}</Typography>
      </CardContent>
    </Card>
  );
}
