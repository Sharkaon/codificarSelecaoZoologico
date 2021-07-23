import { TextField, withStyles } from '@material-ui/core';

const InputVerde = withStyles((theme) => ({
    root: {
        '& input:valid + fieldset': {
            borderColor: '#009E2C',
            borderWidth: 2
        },
        '& input:valid:focus + fieldset': {
            borderColor: '#009E2C',
            borderWidth: 2
        },
        '& input:invalid + fieldset': {
            borderColor: '#005417',
            borderWidth: 2
        },
        '& input:invalid:focus + fieldset': {
            borderColor: '#005417',
            borderWidth: 2
        }
    }
}))(TextField)
 
export default InputVerde;