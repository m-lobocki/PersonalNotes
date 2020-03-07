import React, {Component, HTMLProps} from 'react';
import "./TextField.scss";

interface TextFieldProps {
    label: string;
    id: any;
}

export default class TextField extends Component<TextFieldProps & HTMLProps<HTMLInputElement>> {
    render() {
        let props = {...this.props};
        const {id, label} = props;
        delete props.label;
        return (
            <div className="text-field">
                <input className="text-field__input" placeholder=" " {...props}/>
                <label className="text-field__label" htmlFor={id}>{label}</label>
            </div>
        );
    }
}
