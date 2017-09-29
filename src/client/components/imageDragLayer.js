import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

function getItemStyles(props) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  let { x, y } = currentOffset;
  console.log("pointer is ", props.pointer);
  if (props.pointer) {
    x += props.pointer.x - 45;
    y += props.pointer.y - 90;
  }

  // if (props.snapToGrid) {
  //   x -= initialOffset.x;
  //   y -= initialOffset.y;
  //   [x, y] = snapToGrid(x, y);
  //   x += initialOffset.x;
  //   y += initialOffset.y;
  // }

  console.log(currentOffset);
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}


class CustomDragLayer extends Component {
  renderItem(type, item) {
    console.log("renderItem ", type, item);
    const img = document.querySelector(`img[data-id="${item.id}"]`);
    const width = 90;//img ? img.clientWidth : 90;
    const height = 90;//img ? img.clientHeight : 90;
    return (
      <div style={{ width, height }}>
        <img src={img.src} style={{ width: "100%", height: "100%", transform: "scale(1.2)" }}/>
      </div>
    );
  }

  render() {
    const { item, itemType, isDragging } = this.props;
    console.log(item, itemType, isDragging);

    if (!isDragging || itemType !== 'IMAGE') { // itemType could be __NATIVE_FILE__ in case of file dnd.
      return null;
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {this.renderItem(itemType, item)}
        </div>
      </div>
    );
  }
}

export default DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
}))(CustomDragLayer)