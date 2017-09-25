import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { COLORS } from '../../styles/constants';
import { apiCall } from '../../api';

const HomeTitle = styled.h1`
  text-transform: capitalize;
  color: ${COLORS.TEXT_GRAY_FOCUS};
`;

const Content = styled.div``;

class Home extends React.Component {
  state = {
    value: 'e262bd13-1de4-11e7-a453-60571879dae7',
  };



  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  onSend = () => {
    const id = this.state.value;
    this.getProcessXML(id)
      .then(this.renderXML)
      .catch((err) => {
        console.error("Error: ",err);
      });

  };

  groupByActivity(arr) {
    return arr.reduce((acc, item) => {
      if (!acc[item.activityId]) {
        acc[item.activityId] = { active: 0, complete: 0 };
      }
      if (item.endTime) {
        acc[item.activityId].complete++;
      } else {
        acc[item.activityId].active++;
      }
      return acc;
    }, {});
  }

  getProcessXML(id) {
    return new Promise((res, rej) => {
      apiCall({ url: `process-instance/${id}`})
      .then((result) => {
        if (result.definitionId) {
          apiCall({url: `process-definition/${result.definitionId}/xml`})
            .then((xml) => {
              apiCall({ url: `history/activity-instance?processInstanceId=${id}`})
                .then((activityArray) => {
                  const counters = this.groupByActivity(activityArray);
                  res({ xml, counters });
                });
          });
        } else {

        }
      });
    });
  }

  componentDidMount() {
    this.viewer = new BpmnJS({ container: '#canvas' });
  }

  renderXML = ({ xml: { bpmn20Xml } , counters }) => {
    // import a BPMN 2.0 diagram
    this.viewer.importXML(bpmn20Xml, (err) => {
      if (err) {
        // import failed :-(
      } else {
        // we did well!

        const canvas = this.viewer.get('canvas');
        canvas.zoom('fit-viewport');


        const overlays = this.viewer.get('overlays');

        Object.keys(counters).forEach((activityId) => {
          overlays.add(activityId, {
            position: {
              bottom: 0,
              right: 0,
            },
            html: `<div>${counters[activityId].active},${counters[activityId].complete}</div>`,
          });
        });
      }
    });




  };

  render() {
    return (
      <Content>
        <label>ID</label>
        <input value={this.state.value} onChange={this.onChange} type="text" />
        <button onClick={this.onSend}>Send</button>
        <div id="canvas" style={{ width: 800, height: 800 }}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
