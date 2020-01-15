import React, {SyntheticEvent} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";

export interface IconProps {
    icon: IconDefinition;
    onClick?: (event: SyntheticEvent) => void;
    activatedModifierName?: string;
    deactivatedModifierName?: string;
}

export interface IconState {
    hasBeenClickedYet: boolean;
    isActive: boolean;
}

export class Icon extends React.Component<IconProps, IconState> {
    readonly state = {hasBeenClickedYet: false, isActive: false};
    static defaultProps = {
        activatedModifierName: 'activated',
        deactivatedModifierName: 'deactivated',
    };

    handleIconClick = (event: SyntheticEvent) => {
        this.setState(state => ({isActive: !state.isActive, hasBeenClickedYet: true}));
        this.props.onClick?.(event);
    };

    render() {
        return (
            <figure className="icon" onClick={this.handleIconClick}>
                <FontAwesomeIcon
                    className={
                        "icon__glyph " + (this.state.isActive
                            ? `icon__glyph--${this.props.activatedModifierName} `
                            : (this.state.hasBeenClickedYet && `icon__glyph--${this.props.deactivatedModifierName}`))
                    }
                    icon={this.props.icon}/>
            </figure>
        );
    }
}
