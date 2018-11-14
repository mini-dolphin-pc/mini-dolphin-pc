import React, { PureComponent } from 'react';
import { connect } from 'dva';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import Authorized from '@/utils/Authorized';
import styles from './Time.less';

const { Secured } = Authorized;
// const targetTime = new Date().getTime() + 3900000;

// use permission as a parameter
const havePermissionAsync = new Promise(resolve => {
  // Call resolve on behalf of passed
  setTimeout(() => resolve(), 300);
});

@Secured(havePermissionAsync)
@connect(({ time, loading }) => ({
  data:time,
  loading: loading.models.time,
}))
class Time extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    setInterval(() => {
      dispatch({
        type: 'time/changeTime',
        payload: new Date(),
      });
    }, 1000);
  }


  render() {
    const { data } = this.props;
    return <div className={styles.dateTime}>
      <span className={styles.time}>{data.time}</span>
    </div>
  }
}

export default Time;
