import * as React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function SelectList(props) {
    const [value, setValue] = React.useState('01');

    const handleChange = (event) => {
        setValue(event.target.value);
        const { name, value } = event.target;
        props.selectValue(name, value);
    };

    return (
        <div>
            <FormControl fullWidth variant="outlined">
                <Select
                    labelId="select-label"
                    id="select"
                    name={props.name}
                    value={value}
                    onChange={handleChange}
                >
                    <MenuItem key={'01'} value={'01'}>{props.descripcion}</MenuItem>
                    {props.lista &&
                        props.lista.map((item, index) => (
                            <MenuItem key={item.value} value={item.value}>{item.descripcion}</MenuItem>
                        ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default SelectList;
