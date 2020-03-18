import React, {ChangeEventHandler, Component, FormEvent, FormEventHandler} from 'react';
import {c} from "../../helpers/class-name";

interface FormProps<TState> {
    initialState: TState;
    className?: string;
    onSubmit?: FormEventHandler<HTMLFormElement>;
}

export interface FormContextValueType {
    onChange: ChangeEventHandler<HTMLInputElement>;
    state: any;
}

export const FormContext = React.createContext<FormContextValueType>({
    state: {}, onChange: () => {
    }
});

export default class Form<TState> extends Component<FormProps<TState>, TState> {
    readonly state = this.props.initialState;

    handleFieldChange = (event: FormEvent<HTMLInputElement>) => {
        const {id, value} = event.currentTarget;
        this.setState({[id]: value} as any);
    };

    render() {
        const value: FormContextValueType = {onChange: this.handleFieldChange, state: this.state};
        return (
            <FormContext.Provider value={value}>
                <form className={c`form ${this.props.className}`} onSubmit={this.props.onSubmit}>
                    {this.props.children}
                </form>
            </FormContext.Provider>
        );
    }
}
