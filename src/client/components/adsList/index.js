import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AdItem from '../adItem';

const AdsList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const AdListComponent = ({ ads }) => (
  <AdsList>
    {ads.map(ad => <AdItem key={ad.id} data={ad} />)}
  </AdsList>
);

AdListComponent.propTypes = {
  ads: PropTypes.array.isRequired,
};

export default AdListComponent;
