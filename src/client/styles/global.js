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

   
  input[type="text"] {
    width: 100%;
    background-color: transparent;
    border: 3px solid ${COLORS.BORDER_GRAY};
    border-left: none;
    border-right: none;
    padding: 10px 0;
    font-size: ${FONTS.SIZE_SMALL};
    outline: none;
    color: ${COLORS.TEXT_GRAY};
    transition: all .5s;
    
    &:focus {
      border-color: ${COLORS.BORDER_GRAY_HOVER};
      padding: 15px 0;
      color: ${COLORS.TEXT_GRAY_FOCUS};
      font-size: ${FONTS.SIZE_MEDIUM};
    }
  }
`;
