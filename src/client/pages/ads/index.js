import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Loading from '../../components/loading';
import Error from '../../components/error';
import AdsList from '../../components/adsList';
import { loadAds, loadAdsError, loadAdsSuccess } from '../../actions/ads.action';
import AdsService from '../../services/ads';
import Pagination from '../../components/pagination';

const Page = styled.div`
  flex: 1;
`;

class AdsPage extends React.Component {
  state = {
    currentPageIndex: 0,
  };

  componentDidMount() {
    this.props.dispatch(loadAds());
    AdsService.getAds()
      .then(ads => this.props.dispatch(loadAdsSuccess(ads)))
      .catch(error => this.props.dispatch(loadAdsError(error)));
  }

  onPaginationChange = (pageIndex) => {
    this.setState(() => ({ currentPageIndex: pageIndex }));
  };

  render() {
    const { loaded, ads, error } = this.props;

    if (!loaded) {
      return <Loading />;
    }

    const pageAds = ads[this.state.currentPageIndex].ads;

    return (
      <Page>
        {error && <Error msg={error} />}
        <AdsList ads={pageAds} />
        <Pagination onPaginationChange={this.onPaginationChange} total={ads.length} current={this.state.currentPageIndex} />
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  ads: state.ads.items,
  loaded: state.ads.loaded,
  error: state.ads.error,
});

AdsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ads: PropTypes.arrayOf(PropTypes.object).isRequired,
  loaded: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

AdsPage.defaultProps = {
  error: null,
};

export default connect(mapStateToProps)(AdsPage);
