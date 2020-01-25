import React, {SyntheticEvent} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import "./Icon.scss";
import {c} from "../helpers/class-name";

interface IconProps {
    icon: IconDefinition;
    onClick?: (event: SyntheticEvent) => void;
    className?: string;
}

export default class Icon extends React.Component<IconProps> {
    render() {
        return (
            <figure className={c`icon ${this.props.className}`} onClick={this.props.onClick}>
                <FontAwesomeIcon
                    icon={this.props.icon}
                    className={"icon__glyph"}
                />
            </figure>
        );
    }
}
