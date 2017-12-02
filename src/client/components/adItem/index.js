import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AdItem = styled.div`
  width: 100%;
  background: #fff;
  margin: 20px;
  padding: 15px;
  
  @media (min-width: 768px) {
    width: 304px;
  }
  
  @media (min-width: 992px) {
    width: 254px;
  }
`;
const Title = styled.h2`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #8f3aa2;
  font-size: 18px;
`;
const Created = styled.div`
  color: #a09f9f;
`;
const Description = styled.p`
  color: #666;
  font-size: 14px;
`;

const AdItemComponent = ({ data }) => (
  <AdItem>
    <Title>{data.title}</Title>
    <Created>{data.created}</Created>
    <Description>{data.description}</Description>
  </AdItem>
);

AdItemComponent.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    created: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default AdItemComponent;
