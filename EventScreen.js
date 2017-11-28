import React, { Component } from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View
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
          <Text style={styles.petDecsription}>{event.details}</Text>
          <Text>{' '}</Text>
          <Text>时间: {event.eventDate}</Text>
          <Text>地点: {event.location}</Text>
          <Text>艺人: {event.artist}</Text>
          <Text>{' '}</Text>
          <Text style={{color: 'blue'}} onPress={() => Linking.openURL(url)}>
            {event.eventUrl}
          </Text>
        </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: '#dddddd',
    flex: 1,
  },
  petImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  noImage: {
    flex: 1,
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