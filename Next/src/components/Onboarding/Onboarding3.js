import React from "react";

export default function Onboarding3(props) {
    return (
        <>
            <div className="flex">
                <span>Nice to meet you, {props.name} </span>
                <input>Where do you go?</input>
            </div>
        </>
    )
}