import React from "react";

interface SpanProps {
    text?: string
}

export const WebcamSpan: React.FC<SpanProps> = ({text}) => {
    return (
        <div className={'w-100 mt-3 mb-3 flex items-center justify-center'}>
            <span className={'select-none white'}>{text}</span>
        </div>
    )
}