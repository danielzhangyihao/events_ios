/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  ListView,
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  ScrollView
} from 'react-native';
import _ from 'lodash';
import EventCell from './EventCell';
import EventScreen from './EventScreen';
import dismissKeyboard from 'dismissKeyboard';

const convert = (obj) => {
  let result = {};
  _.map(obj, (item, key) => {
    let value;
    if (typeof (item) === 'object') {
      if (item.$t) { value = item.$t; }
      else { value = convert(item); }
    }
    else { value = item; }
    result[key] = value;
  });
  return result;
};

let resultsCache = [];

export default class App extends Component {

  state = {
    isLoading: false,
    isLoadingTail: false,
    lastOffset: 0,
    city: '全部',
    cities: [
         {'name': '全部', 'id': 1},
         {'name': '北京', 'id': 2},
         {'name': '上海', 'id': 3},
         {'name': '深圳', 'id': 4},
         {'name': '广州', 'id': 5},
         {'name': '成都', 'id': 6},
         {'name': '香港', 'id': 7},
         {'name': '杭州', 'id': 8},
         {'name': '西安', 'id': 9}
      ],
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
  };

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents = () => {
    const city = this.state.city;
    const offset = this.state.lastOffset,
      URL = `https://guarded-shelf-23948.herokuapp.com/allEvents?offset=${offset}&city=${city}`;

    if (_.isEmpty(resultsCache)) {
      this.setState({isLoading: true});
    }

    fetch(URL)
      .then((response) => response.json())
      .catch((error) => {
        this.setState({
          dataSource: this.getDataSource([]),
          isLoading: false,
        });
      })
      .then((data) => {
        resultsCache = _.concat(resultsCache, _.toArray(convert(data.events)));
        this.setState({
          isLoading: false,
          isLoadingTail: false,
          lastOffset: data.offset,
          dataSource: this.getDataSource(resultsCache),
        });
      })
      .done();
  }

  getDataSource = (events: Array<any>): ListView.DataSource => {
    return this.state.dataSource.cloneWithRows(events);
  }

  selectEvent = (event: Object) => {
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        title: event.name,
        component: EventScreen,
        passProps: {event},
      });
    } else {
      dismissKeyboard();
      this.props.navigator.push({
        title: event.name,
        name: 'event',
        event: event,
      });
    }
  }

  onEndReached = () => {
    // We're already fetching
    if (this.state.isLoadingTail) {
      return;
    }
    this.setState({
      isLoadingTail: true,
    });
    this.fetchEvents();
  }

  onPressButton = (city: string) => {
    resultsCache = [];
    this.setState({
      lastOffset: 0,
      city: city,
    }, () => {this.fetchEvents()});
  }

  renderRow = (
    event: Object,
    sectionID: number | string,
    rowID: number | string,
    highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void
  ) => {
    return (
      <EventCell
        key={event.id}
        onSelect={() => this.selectEvent(event)}
        onHighlight={() => highlightRowFunc(sectionID, rowID)}
        onUnhighlight={() => highlightRowFunc(null, null)}
        event={event}
      />
    );
  }

  renderFooter = () => {
    if (!this.state.isLoadingTail) {
      return <View style={styles.scrollSpinner} />;
    }

    return <ActivityIndicator style={styles.scrollSpinner} />;
  }

  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        <View style = { styles.scrollViewHolder }>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} automaticallyAdjustContentInsets={false}>
               {
                  this.state.cities.map((item, index) => (
                    <Button style = { styles.item }
                      onPress={this.onPressButton.bind(this, item.name)}
                      title={item.name}
                    />
                  ))
               }
            </ScrollView>
        </View>
        {isLoading
          ? <View style={styles.loading}><Text>Loading...</Text></View>
          : <ListView
            dataSource={this.state.dataSource}
            renderFooter={this.renderFooter}
            renderRow={this.renderRow}
            onEndReached={this.onEndReached}
            automaticallyAdjustContentInsets={false}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps={true}
            showsVerticalScrollIndicator={false}
          />
        }
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 64 : 0,
    flex: 1,
    backgroundColor: 'white',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollSpinner: {
    marginVertical: 20,
  },
  scrollViewHolder:{
      borderTopWidth: 2,
      borderBottomWidth: 2,
      borderTopColor: 'rgba(0,0,0,0.5)',
      borderBottomColor: 'rgba(0,0,0,0.5)',
  },
  item:{
      color: 'black',
      fontSize: 18
  },
});