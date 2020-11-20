import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => {
  console.log(theme);
  // console.log(theme.breakpoints.up('sm'));
  // console.log(theme.breakpoints.up('xs'));
  return {
    root: {
      flexGrow: 1,
    },
    paper: (props) => {
      console.log(props);
      return {
        padding: theme.spacing(6),
        margin: theme.spacing(5),
        textAlign: 'center',
        backgroundColor: '#007bff',
        // color: theme.palette.text.secondary,
        color: '#ffffff',
      };
    },
  };
});

function AutoGrid() {
  const theme = useTheme();
  const classes = useStyles({
    sm: useMediaQuery(theme.breakpoints.up('sm')),
    xs: useMediaQuery(theme.breakpoints.up('xs')),
    md: useMediaQuery(theme.breakpoints.up('md')),
    lg: useMediaQuery(theme.breakpoints.up('lg')),
  });
  console.log(classes);

  return (
    <div className={classes.root}>
      {[
        ['Notes', 'Terminal', '+'],
        ['+',     '+',        '+'],
        ['+',     '+',        '+']
      ].map((b, index) => (
        <Grid key={index} container spacing={6}>
          {b.map((bb, bIndex) => (
            <Grid key={bIndex} item xs>
              <Paper className={classes.paper}>
                <strong>
                  {bb}
                </strong>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ))}
    </div>
  );
}

export default function Home(): JSX.Element {
  return (
    <div
      className={styles.container}
      data-tid="container"
    >
      {/*
      <h2>Home</h2>
      <Link to={routes.COUNTER}>to Counter</Link>
      {["Notes",2,3,4,5,6,7,8,9].map((name, index) => (
        <div key={index} className={styles['plugin-box']}>
          {name}
        </div>
      ))}
      */}
      <Container>
        <AutoGrid />
      </Container>
    </div>
  );
}

