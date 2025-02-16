import React from 'react';
import {
  View, StyleSheet, TextInput,
} from 'react-native';

import { getuuid } from '../Utils/ApiUtils';
import { Warn } from '../Utils/Toast';


import { RegisterTask } from '../Utils/BackgroundTask';
import { ClearNotifications } from '../Utils/Notifications';
import { Button1 } from '../Renders/Button';
import { background } from '../Utils/BackgroundTask';
import { getforgedata } from '../Utils/ForgeData';
import { clearcache } from '../Utils/ClearCache';
export default class Config extends React.Component {
  state = {
    interval: 8, // default value
  };

  render() {
    return (
      <View style={{ marginTop: 20, backgroundColor: '#242323' }}>
        <View style={{ alignItems: 'center' }}>
          <TextInput style={styles.textinput} placeholder="username"
            onSubmitEditing={(event) => { getuuid(event.nativeEvent.text); }} />
        </View>

        <Button1
          title="Clear scheduled notifications"
          onPress={async () => {
            await ClearNotifications();
            Warn('Notifications cleared');
          }}
        />
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <Button1
            title="Toggle auto notification"
            style={{ textAlign: 'center', backgroundColor: 'gray' }}
            onPress={() => {
              RegisterTask(this.state.interval);
            }}
          />
        </View>
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <Button1
            title="Clear cached data"
            style={{ textAlign: 'center', backgroundColor: 'gray' }}
            onPress={() => {
              clearcache();
            }}
          />

        </View>
        <View style={{ alignItems: 'center' }}>
          <TextInput
            style={styles.textinput}
            placeholder="Custom auto notification inverval"
            onSubmitEditing={(event) => {
              this.setState({ interval: event.nativeEvent.text });
            }}
          />
        </View>
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <Button1
            title="Test background task"
            style={{ textAlign: 'center', backgroundColor: 'gray' }}
            onPress={() => {
              background();
            }}
          />
        </View>
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <Button1
            title="Refresh forge data"
            style={{ textAlign: 'center', backgroundColor: 'gray' }}
            onPress={() => {
              getforgedata(1);
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view:
  {
    backgroundColor: 'gray',
    textAlign: 'center',
  },
  text:
  {
    fontSize: 15,
    marginBottom: 8,
    color: '#bcc3cf',
    textAlign: 'center',
    fontFamily: 'sans-serif',

  },
  textinput:
  {
    backgroundColor: '#595959',
    textAlign: 'center',
    width: '85%',
    borderRadius: 5,
    color: 'white',
    padding: 5,
    fontSize: 16,
    margin: 5,
  },
  button: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 5,
    width: '85%',
  },
});
