import { injectGlobal } from 'styled-components';
import { COLORS, FONTS } from './constants';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {    
    background-color: ${COLORS.APP_BGCOLOR};
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  body {
    font-family: ${FONTS.FAMILY};
  }
  
  #app {    
    min-height: 100%;
    min-width: 100%;
  } 

   
  
`;
