import React, { Component } from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import getImage from './getImage';

export default class EventScreen extends Component {

  render({ event } = this.props) {
    const image = getImage(event);

    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.imageContainer}>
          {image
            ? <Image source={image} style={styles.petImage} />
            : <View style={styles.noImage}><Text style={styles.noImageText}>No image</Text></View>
          }
        </View>
        <View style={styles.mainSection}>
          <Text>时间: {event.event_date}</Text>
          <Text>地点: {event.location}</Text>
          <Text>艺人: {event.artist}</Text>
          {event.event_url
            ? <Text style={{color: 'blue'}} onPress={() => Linking.openURL(event.event_url)}>{'购票链接'}</Text>
            : <Text>{' '}</Text>
          }
          <Text>{' '}</Text>
          <Text style={styles.petDecsription}>{event.details}</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
  imageContainer: {
    backgroundColor: '#dddddd',
    height: Dimensions.get('window').width,
  },
  petImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  noImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noImageText: {
    color: '#aaaaaa',
  },
  mainSection: {
    flex: 1,
    padding: 10,
  },
});