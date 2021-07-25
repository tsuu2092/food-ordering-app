import { AppBar, Box, Button, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { Fragment } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
const useStyles = makeStyles((theme) => (
  {
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      height: 64,
    },
    btn: {
      color: theme.palette.primary.contrastText,

    },
    link: {
      textDecoration: 'none',
      color: theme.palette.primary.contrastText
    }
  })
)

function AppBarItems() {
  const classes = useStyles()
  const user = useAuthStore(state => state.user)
  const isAdmin = user?.role === 'admin'
  const logout = useAuthStore(state => state.logout)
  if (user) return (
    <Fragment>
      {
        isAdmin && <Button component={Link} to='/dashboard' className={classes.btn}>Dashboard</Button>
      }
      <Button onClick={logout} className={classes.btn}>Log out</Button>
    </Fragment>
  )
  return (
    <Fragment>
      <Button component={Link} to='/login' className={classes.btn}>Login</Button>
      <Button component={Link} to='/signup' className={classes.btn}>Signup</Button>
    </Fragment>
  )
}

export default function MainAppBar() {
  const classes = useStyles()
  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <AppBar position='sticky' className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Link className={classes.link} to="/"><Typography variant='h6'>DeliV</Typography></Link>
          <Box display='flex' justifyContent='center' ml='auto'>
            <AppBarItems />
          </Box>
        </Toolbar>
      </AppBar>
    </Box >
  )
}