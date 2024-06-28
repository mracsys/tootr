import React from 'react';

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
    className: string;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, className, ...other } = props;
    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            className={className}
            id={`${className}-tabpanel-${index}`}
            aria-labelledby={`${className}-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div>
                    {children}
                </div>
            )}
        </div>

    );
}

export const allyProps = (index: number, className: string) => {
    return {
        id: `${className}-tab-${index}`,
        'aria-controls': `${className}-tabpanel-${index}`,
    }
}

export default TabPanel;