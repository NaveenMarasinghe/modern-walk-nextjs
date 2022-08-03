import React from "react";

const RootStyleLoader = (props) => {
  return (
    <style>
      {`
        :root {
            --mw-primary: ${props.theme?.colors?.primary};
            --mw-primary-hover: ${props.theme?.colors?.primaryHover};
            --mw-primary-selected: ${props.theme?.colors?.primarySelected};
            --mw-primary-inverse-hover: ${props.theme?.colors?.primaryInverseHover};
            --mw-primary-inverse-hover-click: ${props.theme?.colors?.primaryInverseHoverClick};
            --mw-font-main: ${props.theme?.colors?.fontMain};
            --mw-font-active-border: ${props.theme?.colors?.fontActiveBorder};
            --mw-font-inactive-border: ${props.theme?.colors?.fontInactiveBorder};
            --mw-bg-elephant-grey: ${props.theme?.colors?.bgElephantGrey};
            --mw-bg-elephant-contrast: ${props.theme?.colors?.bgElephantContrast};
            --mw-bg-white: ${props.theme?.colors?.bgWhite};
            --mw-link-color: ${props.theme?.colors?.LinkColor};
            --mw-link-color-hover: ${props.theme?.colors?.LinkColorHover};
            --mw-link-color-active: ${props.theme?.colors?.LinkColorActive};
            --mw-link-color-disabled: ${props.theme?.colors?.LinkColorDisabled};
            --mw-danger-color: ${props.theme?.colors?.dangerColor};
            --mw-danger-color-glow: ${props.theme?.colors?.dangerColorGlow};
            --mw-danger-color-inactive: ${props.theme?.colors?.dangerColorInactive};
            --mw-danger-color-disabled: ${props.theme?.colors?.dangerColorDisabled};
            --mw-danger-color-hover: ${props.theme?.colors?.dangerColorHover};
            --mw-danger-color-active: ${props.theme?.colors?.dangerColorActive};
            --ws-font-size-h1: ${props.theme?.fontSize?.h1};
            --ws-font-size-h2: ${props.theme?.fontSize?.h2};
            --ws-font-size-h3: ${props.theme?.fontSize?.h3};
            --ws-font-size-h4: ${props.theme?.fontSize?.h4};
            --ws-font-size-h5: ${props.theme?.fontSize?.h5};
            --ws-font-size-h6: ${props.theme?.fontSize?.h6};
            --ws-font-size-base: ${props.theme?.fontSize?.base};
            --ws-font-size-small: ${props.theme?.fontSize?.small};
            --ws-font-size-xs: ${props.theme?.fontSize?.xs};
            --ws-color-primary: ${props.theme?.colors?.primary};
            --ws-color-primary-dark-shade-01: ${props.theme?.colors?.primaryDarkShade01};
            --ws-color-primary-dark-shade-02: ${props.theme?.colors?.primaryDarkShade02};
            --ws-color-primary-light-shade-01: ${props.theme?.colors?.primaryLightShade01};
            --ws-color-primary-light-shade-02: ${props.theme?.colors?.primaryLightShade02};
            --ws-color-secondary: ${props.theme?.colors?.secondary};
            --ws-color-secondary-dark-shade-01: ${props.theme?.colors?.secondaryDarkShade01};
            --ws-color-font-nav-h: ${props.theme?.colors?.fontNavHeading};
            --ws-color-font-nav-base: ${props.theme?.colors?.fontNavBase};
            --ws-color-font-nav-light: ${props.theme?.colors?.fontNavLight};
            --ws-color-font-nav-mobile-base: ${props.theme?.colors?.fontNavMobileBase};
            --ws-color-font-base: ${props.theme?.colors?.fontBase};
            --ws-color-font-heading: ${props.theme?.colors?.fontHeading};
            --ws-color-heading-bg: ${props.theme?.colors?.headingBg};
            --ws-color-lightgray-01: ${props.theme?.colors?.lightgrayShade01};
            --ws-color-lightgray-02: ${props.theme?.colors?.lightgrayShade02};
            --ws-color-lightgray-03: ${props.theme?.colors?.lightgrayShade03};
            --ws-color-lightgray-04: ${props.theme?.colors?.lightgrayShade04};
            --ws-color-lightgray-05: ${props.theme?.colors?.lightgrayShade05};
            --ws-color-lightgray-06: ${props.theme?.colors?.lightgrayShade06};
            --ws-color-lightgray-07: ${props.theme?.colors?.lightgrayShade07};
            --ws-color-blue-01: ${props.theme?.colors?.blueShade01};
            --ws-color-blue-02: ${props.theme?.colors?.blueShade02};
            --ws-width-page-content: ${props.theme?.widths?.pageContent};
        }
     `}
    </style>
  );
};

export default RootStyleLoader;
