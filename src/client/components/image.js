import React from 'react';
import styled from 'styled-components';
import { DragSource, DropTarget } from "react-dnd";
import { findDOMNode } from 'react-dom';

const ImageWrapper = styled.div`
  position: relative; 
  display: inline-block; 
  user-select: none;
  transition: transform 0.5s;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  
  &.touch {
    transform: scale(1.2);
  }
  
  img {
    width: 100%;
    height: 100%;
  }
  
  
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
`;


class Image extends React.Component {
  state = {
    touching: false,
  };

  onTouchStart = () => {
    this.timer = setTimeout(() => {
      this.setState({ touching: true });
    }, 500);

  };
  onTouchMove = () => {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.setState({ touching: false });
  };
  onTouchEnd = () => {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.setState({ touching: false });
  };

  render() {
    const { src, connectDragSource, connectDropTarget, isDragging } = this.props;
    const opacity = isDragging ? 0 : 1;


    return connectDragSource(connectDropTarget(
      <div style={{ opacity }} onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd} className="wrapper">
        <ImageWrapper className={`image ${this.state.touching ? "touch": ""}`}>
          <Overlay>Overlay</Overlay>
          <img src={src} />
        </ImageWrapper>
      </div>
    ));
  }
}

const cardSource = {
  beginDrag(props) {
    console.log("begin drag.....");

    return {
      id: props.id,
      index: props.index,
    };
  },

  endDrag() {

  }
  //
  // canDrag(props) {
  //   console.log("candrag", props);
  //   return false;
  // }
};

const cardTarget = {
  drop(props, monitor, component) {
    // const dragIndex = monitor.getItem().index;
    // const hoverIndex = props.index;

    // Don't replace items with themselves
    // if (dragIndex === hoverIndex) {
    //     return;
    // }

    // Time to actually perform the action
    // props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    // monitor.getItem().index = hoverIndex;
  },
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
   // const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    //const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    //const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
   // const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
   // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
   ///   return;
   // }

    // Dragging upwards
  //  if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
   //   return;
  //  }

    if (!props.onSwap) return;

    // Time to actually perform the action
    props.onSwap(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

const droppableComponent = DropTarget("IMAGE", cardTarget,  (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(Image);

const draggableComponent = DragSource("IMAGE", cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(droppableComponent);

export default draggableComponent;
