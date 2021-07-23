import { Button, withStyles } from '@material-ui/core';

const BotaoVerde = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#009E2C'),
        backgroundColor: '#009E2C',
        '&:hover': {
            backgroundColor: '#005417'
        },
    }
}))(Button);

export default BotaoVerde;