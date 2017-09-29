import React, { Component } from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import { DropTarget } from 'react-dnd';
import styled from 'styled-components';

const Overlay = styled.div`
      position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(255, 139, 56, 0.4);
    color: white;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    transition: all 0.7s;
    pointer-events: none;

`;
const fileTarget = {
  drop(props, monitor) {
    console.log(monitor.getItem().files);
  }
};

class DropZone extends React.Component {
  render() {
    const { connectDropTarget, isOver, canDrop } = this.props;

    return connectDropTarget(
      <div style={{ position: 'relative' }}>
        <Overlay style={{
            opacity: isOver ? 1 : 0,
           }}>
          Drop Here
        </Overlay>
        {this.props.children}
      </div>
    );
  }
}

export default DropTarget(NativeTypes.FILE, fileTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(DropZone);