import React, {Component, ComponentType} from "react";

export function withActiveClassNames<Props extends object>(WrappedComponent: ComponentType<Props>, baseClassName: string) {
    return class extends Component<Props> {
        render() {
            return <WrappedComponent
                className={baseClassName}
                activeClassName={baseClassName + '--active'}
                {...this.props as Props}/>;
        }
    }
}
