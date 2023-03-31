import React, { ReactNode } from 'react';
import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import HomeComponent from './pages/Home';
import ImportExportComponent from './pages/ImportExport';

import tinyClerkIcon from '../../assets/icon.svg'

const Main = (props: {view: string}) => {
  switch (props.view) {
    case "Home":
      return(<HomeComponent />);
    case "Import / Export":
      return(<ImportExportComponent />);

    default:
      return(<div>Undefined Item</div>);
  }
}

const drawerWidth = 200;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const MenuListItem = ({icon, onClick, open, name}: {icon: ReactNode, onClick: () => void, open: boolean, name: string}) => {
  return (
    <ListItem disablePadding sx={{display: 'block'}}>
      <ListItemButton sx={{minHeight: 48, justifyContent: 'center', px: 2.5}} onClick={onClick}>
        <ListItemIcon sx={{minWidth: 0, marginRight: 'auto', justifyContent: 'center'}}>
          {icon}
        </ListItemIcon>
        <ListItemText primary={name} sx={{opacity: open ? 1 : 0}} style={{paddingLeft: "16px"}} />
      </ListItemButton>
    </ListItem>
  )
}

const RootComponent = () => {
  const [open, setOpen] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState("Home");

  return (
    <Box sx={{display: "flex"}}>
      <AppBar position='fixed' open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" hidden={open}>
            {currentPage}
          </Typography>
          <a href="https://github.com/crowbait/tinyclerk" target="_blank" style={{display: "inline-block", position: "absolute", left: "calc(50% - 16px)"}} rel="noreferrer">
            <img src={tinyClerkIcon} style={{height: "48px", margin: "auto"}} alt="tinyClerk logo" />
          </a>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open} sx={{background: "#202020"}}>
        <DrawerHeader>
          <Typography hidden={!open}>{currentPage}</Typography>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>

        <List>
          <MenuListItem open={open} icon={<HomeIcon />} name="Home" onClick={() => setCurrentPage("Home")} />
          <MenuListItem open={open} icon={<ImportExportIcon />} name="Import / Export" onClick={() => setCurrentPage("Import / Export")} />
        </List>
      </Drawer>

      <Box component="main" sx={{flexGrow: 1, p: 3}}>
        <DrawerHeader />
        <Main view={currentPage} />
      </Box>
    </Box>
  )
}

export default RootComponent;
