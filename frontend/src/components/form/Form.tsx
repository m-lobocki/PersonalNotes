import React, {ChangeEventHandler, Component, FormEvent, FormEventHandler} from 'react';
import {c} from "../../helpers/class-name";

interface FormProps<TState> {
    initialState: TState;
    className?: string;
    onSubmit?: FormEventHandler<HTMLFormElement>;
    validate?: (state: any) => FormErrors<TState>;
}

export type FormErrors<TState> = {
    [P in keyof TState]?: string;
}

export interface FormContextValueType {
    onChange: ChangeEventHandler<HTMLInputElement>;
    state: any;
    errors: any;
}

export const FormContext = React.createContext<FormContextValueType>({
    state: {}, errors: {}, onChange: () => {}
});

export default class Form<TState> extends Component<FormProps<TState>, TState> {
    readonly state = this.props.initialState;

    handleFieldChange = (event: FormEvent<HTMLInputElement>) => {
        const {id, value} = event.currentTarget;
        this.setState({[id]: value} as any);
    };

    render() {
        const {children, className, onSubmit, validate} = this.props;
        const state = this.state;
        const value: FormContextValueType = {onChange: this.handleFieldChange, state, errors: validate?.(state)};
        return (
            <FormContext.Provider value={value}>
                <form className={c`form ${className}`} onSubmit={onSubmit}>
                    {children}
                </form>
            </FormContext.Provider>
        );
    }
}
