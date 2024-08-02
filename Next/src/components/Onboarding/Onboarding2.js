import React from "react";
import SchoolSearchBar from "./SchoolSearchBar";

export default function Onboarding2({name, school, setSchool}) {
    return (
        <>
            <div className="flex flex-col">
                <span>Nice to meet you, {name} </span>
                <span>Now, where do you go?</span>
                <SchoolSearchBar />
            </div>
        </>
    )
}