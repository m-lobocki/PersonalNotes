import React, {SyntheticEvent} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import "./Icon.scss";

interface IconProps {
    icon: IconDefinition;
    onClick?: (event: SyntheticEvent) => void;
    activatedModifierName?: string;
    deactivatedModifierName?: string;
}

interface IconState {
    isActive: boolean;
}

export default class Icon extends React.Component<IconProps, IconState> {
    static defaultProps = {
        activatedModifierName: 'activated',
        deactivatedModifierName: 'deactivated',
    };
    readonly state = {
        hasBeenClickedYet: false,
        isActive: false
    };

    handleIconClick = (event: SyntheticEvent) => {
        this.setState(state => ({isActive: !state.isActive}));
        this.props.onClick?.(event);
    };

    render() {
        return (
            <figure className="icon" onClick={this.handleIconClick}>
                <FontAwesomeIcon
                    icon={this.props.icon}
                    className={
                        "icon__glyph " + (this.state.isActive
                            ? `icon__glyph--${this.props.activatedModifierName} `
                            : `icon__glyph--${this.props.deactivatedModifierName}`)
                    }
                />
            </figure>
        );
    }
}
