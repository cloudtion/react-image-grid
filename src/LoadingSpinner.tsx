
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface OptionalStyle {
    className?: string,
    style?: React.CSSProperties;
}

export default function LoadingSpinner(props:OptionalStyle) : React.ReactElement {

    return (
        <span className={"img-grid-loading-spinner "+(props.className??"")} style={props.style}>
            <FontAwesomeIcon icon={faSpinner}/>
        </span>
    );
}