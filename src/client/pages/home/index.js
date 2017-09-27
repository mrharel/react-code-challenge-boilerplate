import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import MultiBackend, { TouchTransition, Preview } from 'react-dnd-multi-backend';
import { DragDropContext } from 'react-dnd';
import { COLORS } from '../../styles/constants';
import Image from '../../components/image';

const Content = styled.div``;


const IMAGES = [
  { id: 0, src: "http://all4desktop.com/data_images/1280%20x%20800/4198671-green-sea-view.jpg" },
  { id: 1, src: "http://www.eagleview.com.au/_assets/img/testimonials/Testimonial-3.jpg" },
  { id: 2, src: "http://i.dailymail.co.uk/i/pix/2017/04/11/06/3F23D80300000578-4399486-Palace_of_Westminster_view_from_the_Westminster_Bridge_One_of_th-a-12_1491890238800.jpg" },
  { id: 3, src: "https://assets.kpmg.com/content/dam/kpmg/images/2015/11/view-from-the-top-v2.jpg/jcr:content/renditions/cq5dam.web.512.341.jpg" },
  { id: 4, src: "http://www.westerntourshuahin.com/image/upload/Lake%20View-huahin%20(8).jpg" },
];

const BigContainer = styled.div`
  
  .image {
    width: 100%;
    height: 100%;
  }
  
  
`;

const SmallContainer = styled.div`
  .wrapper {
    display: inline-block;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  
  .image {
    width: 90px;
    height: 90px;
    margin: 10px;
  }
`;

const Long = styled.div`
  background-color: #efefef;
  height: 700px;
`;

class Home extends React.Component {
  state = {
    images: IMAGES,
  };


  generatePreview = (type, item, style) => {
    console.log("generatePreview", type, item, style);
    return (
      <SmallContainer style={{...style, width: 90, height: 90, zIndex: 99999}} className="test" >
        <Image src={this.state.images.find(data => data.id === item.id).src}/>
      </SmallContainer>
    );
  };

  changeImageLocation = (dragIndex, hoverIndex) => {
    console.log("changeImageLocation:",dragIndex, hoverIndex );
    this.setState({ images: this.state.images.map((image, index) => {
      if (index === dragIndex) return this.state.images[hoverIndex];
      if (index === hoverIndex) return this.state.images[dragIndex];
      return image;
    }) });
  };

  render() {
    const { ready } = this.props;
    const { images } = this.state;
    return (
      <Content>
        <Preview generator={this.generatePreview} />
        <BigContainer>
          <Image onSwap={this.changeImageLocation} src={images[0].src} id={images[0].id} index={0}/>
        </BigContainer>
        <SmallContainer>
          {images.map((data, index) => index === 0 ? null : <Image onSwap={this.changeImageLocation}  key={data.id} index={index} id={data.id} src={data.src} />)}
        </SmallContainer>
        <Long>kjdfhg dfkjgh dfskgjh fdslkgjh dsfklgjh sdfkjlgh </Long>
      </Content>
    );
  }
}


const mapStateToProps = state => ({
  ready: state.app.ready,
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

Home.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  ready: PropTypes.bool.isRequired,
};

const HTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend
    },
    {
      backend: TouchBackend({ delayTouchStart: 500 }), // Note that you can call your backends with options
      preview: true,
      transition: TouchTransition
    }
  ]
};

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(MultiBackend(HTML5toTouch))(Home));

//export default connect(mapStateToProps, mapDispatchToProps)(Home);
