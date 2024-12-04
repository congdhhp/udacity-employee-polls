import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Typography } from '@mui/material';

const LeaderBoard = () => {
  const users = useSelector((state) => state.user.users);
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    const leaderboard = Object.keys(users)
      .map((userId) => ({
        ...users[userId],
        noAnswers: Object.keys(users[userId].answers).length,
        noQuestions: users[userId].questions.length,
      }))
      .sort((a, b) => (b.noAnswers + b.noQuestions) - (a.noAnswers + a.noQuestions));

    setListUser(leaderboard);
  }, [users]);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Leaderboard
      </Typography>
      <TableContainer component={Paper} elevation={4} sx={{ mt: 3 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.400' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Users</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Answers</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listUser.map((user) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  <Grid container spacing={2}>
                    <Grid item>
                      <Avatar alt={user.name} src={user.avatarURL} />
                    </Grid>
                    <Grid item>
                      <Grid container direction="column" alignItems="flex-start">
                        <Typography variant="body1">{user.name}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          @{user.id}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>{user.noAnswers}</TableCell>
                <TableCell>{user.noQuestions}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default LeaderBoard;
