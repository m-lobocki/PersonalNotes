import React, {Component, FormEvent, FormEventHandler, SyntheticEvent} from 'react';
import {c} from "../../helpers/class-name";
import {FormContextValueType, FormContext} from "./FormContext";

interface FormProps<TModel> {
    initialState: TModel;
    className?: string;
    onSubmit?: FormEventHandler<HTMLFormElement>;
    validate?: (state: TModel) => FormValidation<TModel>;
}

type FormState<TModel> = {
    model: TModel;
    touched: Map<string, boolean>;
}

export type FormErrors<TModel> = {
    [property in keyof TModel]?: string;
}

export type FormValidation<TModel> = Generator<[keyof TModel, string]>

export type FieldElement<TValue> = {
    id: string;
    value: TValue;
}

export default class Form<TModel extends object> extends Component<FormProps<TModel>, FormState<TModel>> {
    readonly state: FormState<TModel> = {
        model: this.props.initialState,
        touched: new Map<string, boolean>()
    };

    handleFieldChange = (event: FormEvent<FieldElement<string>>) => {
        const {id, value} = event.currentTarget;
        this.setState(state => ({
            ...state,
            model: {
                ...state.model,
                [id]: value
            }
        }));
    };

    handleFieldBlur = (event: SyntheticEvent) => {
        const {id} = event.currentTarget;
        this.setState(state => {
            const {touched} = state;
            touched.set(id, true);
            return {
                ...state,
                touched
            }
        });
    };

    render() {
        const {children, className, onSubmit, validate} = this.props;
        const {model, touched} = this.state;
        const errors = validate ? this.getTouchedFieldsValidation(validate(model), touched) : [];
        const value: FormContextValueType = {
            onChange: this.handleFieldChange,
            onBlur: this.handleFieldBlur,
            touched,
            model,
            errors
        };
        return (
            <FormContext.Provider value={value}>
                <form className={c`form ${className}`} onSubmit={onSubmit}>
                    {children}
                </form>
            </FormContext.Provider>
        );
    }

    getTouchedFieldsValidation(validation: FormValidation<TModel>, touched: Map<string, boolean>): FormErrors<TModel> {
        return [...validation]
            .filter(([property]) => touched.has(property.toString()))
            .reduce((object, [property, error]) => ({...object, [property]: error}), {});
    }
}
