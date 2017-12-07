import React, { Component } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} from 'react-native';
import getImage from './getImage';

export default class EventCell extends Component {

  render({ event } = this.props) {
    const image = getImage(event);
    let TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    return (
      <View>
        <TouchableElement
          onPress={this.props.onSelect}
          onShowUnderlay={this.props.onHighlight}
          onHideUnderlay={this.props.onUnhighlight}>
          <View style={styles.row}>
            <View style={styles.imageContainer}>
              {image
                ? <Image source={image} style={styles.petImage} />
                : <View style={styles.noImage}><Text style={styles.noImageText}>No image</Text></View>
              }
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.petName} numberOfLines={1}>
              {event.name}
              </Text>
              <Text style={styles.petBreed} numberOfLines={1}>
                {event.event_date}
              </Text>
              <Text style={styles.petDescription} numberOfLines={2}>
                {event.details}
              </Text>
              <Text style={styles.petLocation}>
                {event.location}
              </Text>
              </View>
          </View>
        </TouchableElement>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    borderStyle: 'solid',
    borderBottomColor: '#dddddd',
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 5,
  },
  imageContainer: {
    backgroundColor: '#dddddd',
    width: 90,
    height: 90,
    marginRight: 10
  },
  textContainer: {
    flex: 1,
  },
  noImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noImageText: {
    color: '#aaaaaa',
  },
  petImage: {
    width: 90,
    height: 90,
  },
  petName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  petBreed: {
    fontSize: 13,
  },
  petDescription: {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5,
  },
  petLocation: {
    fontSize: 12,
    color: 'gray',
  },
});