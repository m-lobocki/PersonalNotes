import React, {ChangeEvent, ChangeEventHandler, Component, HTMLProps} from 'react';
import "./TextField.scss";
import {c} from "../../helpers/class-name";
import {FormContext} from "./Form";

export interface TextFieldProps {
    label: string;
    id: any;
    fieldClassName?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>
}

interface TextFieldState {
    hasText: boolean;
}

export default class TextField extends Component<TextFieldProps & HTMLProps<HTMLInputElement>, TextFieldState> {
    readonly state: TextFieldState = {hasText: false};

    handleInputChanged = (event: ChangeEvent<HTMLInputElement>, onChange: ChangeEventHandler<HTMLInputElement>) => {
        this.setState({hasText: Boolean(event.target.value)});
        this.props.onChange?.(event);
        onChange(event);
    };

    render() {
        let props = {...this.props};
        const {id, label, fieldClassName} = props;
        const {hasText} = this.state;
        delete props.label;
        delete props.fieldClassName;
        return (
            <FormContext.Consumer>
                {({onChange, state}) => {
                    const value = state[id];
                    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => this.handleInputChanged(event, onChange);
                    return (
                        <div className={c`field text-field ${fieldClassName}`}>
                            <input
                                {...props}
                                className={c`text-field__input ${{'text-field__input--has-text': hasText}}`}
                                value={value}
                                onChange={handleInputChange}/>
                            <label className="text-field__label" htmlFor={id}>{label}</label>
                        </div>
                    )
                }}
            </FormContext.Consumer>
        );
    }
}
