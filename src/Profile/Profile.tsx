import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useUser } from "../types/user";
import { Edit } from "@mui/icons-material";

export default function Profile(): React.ReactElement {
  const { user } = useUser();

  return (
    <Stack>
      <Card>
        <CardHeader title={"Profile"} />
        <CardContent>
          <Grid container rowGap={2} spacing={1} alignItems={"center"}>
            <Grid item>
              <Avatar />
            </Grid>
            <Grid item>
              <Button>Modify</Button>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item>
              <Typography variant={"body1"}>
                <b>Username:</b> {user?.username}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton>
                <Edit />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
}
