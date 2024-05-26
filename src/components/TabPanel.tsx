
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

export default TabPanel;