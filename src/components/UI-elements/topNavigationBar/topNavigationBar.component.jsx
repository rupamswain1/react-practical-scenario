import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function TopNavigationBar({pagename,exportData,defaultColumns,setColumnVisibility}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange=(event)=>{
    console.log(event.currentTarget.name)
  }
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {pagename}
          </Typography>
          <div>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    defaultColumns.map((col)=>{
                       return(
                        <MenuItem value={col.field} >
                            <Checkbox
                                defaultChecked
                                name={col.field}
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                onChange={setColumnVisibility}
                            />
                            {col.headerName}
                        </MenuItem>
                       )
                    })
                }
                
            </Menu>
            </div>
          <Button color="inherit" onClick={()=>exportData()}>Export</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
