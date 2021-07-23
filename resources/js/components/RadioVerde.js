import { Radio, withStyles } from '@material-ui/core';

const RadioVerde = withStyles((theme) => ({
    root: {
        color: '#009E2C',
        '&:checked': {
            color: '#005417'
        }
    },
    checked: {}
}))((props) => <Radio color="default" {...props} />);

export default RadioVerde;