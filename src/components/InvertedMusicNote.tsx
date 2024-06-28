import React from 'react';

const InvertedMusicNote = (_props: {
    className?: string,
}) => {
    return (
        <svg
            className={_props.className}
            width="512"
            height="512"
            viewBox="0 0 512 512"
            version="1.1"
            id="svg5"
            xmlns="http://www.w3.org/2000/svg">
            <defs
                id="defs2" />
            <filter id="Bevel2" filterUnits="objectBoundingBox" x="-10%" y="-10%" width="150%" height="150%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"/>
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
                    d="M 295.60742 30.822266 A 114.88166 62.90815 1.9827747 0 0 179.73047 82.539062 L 179.63086 82.513672 L 87.863281 452.75586 A 24.428589 24.428589 0 0 0 105.69727 482.34375 A 24.428589 24.428589 0 0 0 135.28516 464.50977 C 140.30748 444.24686 157.86523 440.74805 157.86523 440.74805 C 157.86523 440.74805 349.22663 401.32377 401.48242 249.4707 C 410.29739 223.85479 398.8457 184.24609 398.8457 184.24609 C 368.33549 118.49048 367.61166 168.20924 368.95312 179.17188 C 368.95312 179.17188 389.83299 320.33066 161.67188 358.05078 L 216.16406 138.19531 A 114.88166 62.90815 1.9827747 0 0 291.25391 156.5625 A 114.88166 62.90815 1.9827747 0 0 408.24414 97.667969 A 114.88166 62.90815 1.9827747 0 0 295.60742 30.822266 z " />
            </g>
        </svg>
    )
}

export default InvertedMusicNote;