import React from 'react';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement>{
    current: number;
    maxElems: number;
    style?: string
}

export const Loader: React.FC<LoaderProps> = ({ref ,style,current,maxElems}) => {
    return (
        <div className={'p-2 rounded-lg opacity-70 h-10 z-10 absolute w-full bg-cyan-600 w-full'}>
            <div className={'opacity-80 h-full w-full bg-cyan-900 rounded-lg z-20 bg-cyan-700'}>
                <div ref={ref} className={`rounded-lg opacity-70 h-full z-30 bg-cyan-600`}>

                </div>
            </div>
        </div>
    );
};