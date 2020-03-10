import React, {ChangeEvent, Component, createRef, HTMLProps} from 'react';
import "./TextField.scss";
import {c} from "../../helpers/class-name";

export interface TextFieldProps {
    label: string;
    id: any;
    fieldClassName?: string;
}

interface TextFieldState {
    hasText: boolean;
}

export default class TextField extends Component<TextFieldProps & HTMLProps<HTMLInputElement>, TextFieldState> {
    private inputRef = createRef<HTMLInputElement>();
    readonly state: TextFieldState = {hasText: false};

    inputChanged = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({hasText: Boolean(event.target.value)});
    };

    render() {
        let props = {...this.props};
        const {id, label, fieldClassName} = props;
        const {hasText} = this.state;
        delete props.label;
        delete props.fieldClassName;
        return (
            <div className={c`field text-field ${fieldClassName}`}>
                <input
                    className={c`text-field__input ${{'text-field__input--has-text': hasText}}`}
                    ref={this.inputRef}
                    onChange={this.inputChanged}
                    {...props}/>
                <label className="text-field__label" htmlFor={id}>{label}</label>
            </div>
        );
    }
}
