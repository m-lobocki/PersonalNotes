import React, {ChangeEventHandler, EventHandler, SyntheticEvent} from "react";

export interface FormContextValueType {
    onChange: ChangeEventHandler<HTMLInputElement>;
    onBlur: EventHandler<SyntheticEvent>;
    model: any;
    errors: any;
    touched: Map<string, boolean>;
}

export const FormContext = React.createContext<FormContextValueType>({
    model: {}, errors: {}, onChange: () => {}, onBlur: () => {}, touched: new Map<string, boolean>()
});
