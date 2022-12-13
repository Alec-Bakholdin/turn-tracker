import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Stack,
} from "@mui/material";
import UsernameEditor from "./UsernameEditor";

export default function Profile(): React.ReactElement {
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
              <UsernameEditor />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
}
