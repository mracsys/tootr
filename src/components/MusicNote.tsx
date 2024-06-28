import React from 'react';

const MusicNote = (_props: {
    className?: string,
}) => {
    return (
        <svg
            className={_props.className}
            width="32"
            height="32"
            viewBox="0 0 512 512"
            version="1.1"
            id="svg5"
            xmlns="http://www.w3.org/2000/svg">
            <defs
                id="defs2" />
            <filter id="Bevel2" filterUnits="objectBoundingBox" x="-10%" y="-10%" width="150%" height="150%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="0.5" result="blur"/>
                <feSpecularLighting in="blur" surfaceScale="5" specularConstant="0.5" specularExponent="10" result="specOut" lightingColor="white">
                    <fePointLight x="-5000" y="-10000" z="0000"/>
                </feSpecularLighting>
                <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut2"/>
                <feComposite in="SourceGraphic" in2="specOut2" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint" />
            </filter>
            <g
                id="layer1">
                <path
                    id="path31"
                    filter="url(#Bevel2)"
                    d="M 329.59961 25.365234 A 24.428589 24.428589 0 0 0 306.87695 43.830078 L 225.10742 369.75391 A 114.88166 62.90815 2.1461998 0 0 150.03125 351.33008 A 114.88166 62.90815 2.1461998 0 0 32.873047 409.89258 A 114.88166 62.90815 2.1461998 0 0 145.31836 477.05859 A 114.88166 62.90815 2.1461998 0 0 261.3418 425.67188 L 261.44336 425.69727 L 327.57617 162.10156 C 511.31139 302.53708 426.59375 417.36328 426.59375 417.36328 C 420.26192 426.41242 397.55817 470.64826 455.37109 426.91797 C 455.37109 426.91797 484.07924 397.32583 488.32422 370.57031 C 513.48891 211.96148 363.04492 87.298828 363.04492 87.298828 C 363.04492 87.298828 349.18552 75.967255 354.26562 55.71875 A 24.428589 24.428589 0 0 0 336.51562 26.080078 A 24.428589 24.428589 0 0 0 329.59961 25.365234 z " />
            </g>
        </svg>
    )
}

export default MusicNote;