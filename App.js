import React from 'react';
import {ActivityIndicator, Text, View,StyleSheet, TextInput, Button, ToastAndroid} from 'react-native';
import * as Notifications from 'expo-notifications';
import * as SecureStore from 'expo-secure-store';
import forgeconvert from "./forgeconvert.json";
var forgetime,forgeendtime1,forgeendtime2,forgeendtime3,forgeendtime4,forgeendtime5,forgeuntil1,forgeuntil2,forgeuntil3,forgeuntil4,forgeuntil5,forgetime1,forgetime2,forgetime3,forgetime4,forgetime5,forgeid1,forgeid2,forgeid3,forgeid4,forgeid5;
var timeleft = 1;

  
Notifications.setNotificationHandler({
handleNotification: () => {
return {
shouldShowAlert: true
}}
})

export default class App extends React.Component {
  
  state ={
    isLoading:true,
    uuid:'',
    profiledata:'',
    pisc:'',
    apsc:'',
    uisc:''
  }
  getdata = async () => {
    try {
      
      var uuidsuccess = 'no';
      var apikeysuccess = 'no';
      var uuid = await SecureStore.getItemAsync('uuid');
      var apikey = await SecureStore.getItemAsync('apikey');
      if(uuid) { uuidsuccess = 'Valid'}
      if(apikey) { apikeysuccess = 'Valid'}
      if(uuid && apikey)
      {
      try{
      var profiledata1 = await fetch('https://api.hypixel.net/skyblock/profiles?uuid=' + uuid + '&key=' + apikey )
      .then((response) => response.json())
      if(profiledata1.success == true) //is something invalid?
      {
      for(let i = 0; i < 69; i++) //get selected profile
      {
        if(profiledata1.profiles[i].selected == true)
        {
          var profiledata = profiledata1.profiles[i];
          break;
        }
      }
    } else {
      if(profiledata1.cause == "Malformed UUID"){ alert('Invalid UUID');
    uuidsuccess ="Invalid"; uuid = ""; profiledata = ""; }
      else if(profiledata1.cause == "Invalid API key"){ alert('Invalid api key');
      apikeysuccess ="Invalid"; uuid = ""; profiledata = ""; }}
    } catch (a){
      if(a == 'TypeError: Network request failed')
      {
        ToastAndroid.show('No internet connection',ToastAndroid.SHORT)
      }
      else{
        alert('Api request failed\nError: ' + a);
      }
      
      this.setState({
        isLoading:false,
        profiledata: "",
        uuid: uuid,
        uisc: uuidsuccess,
        apsc: apikeysuccess
      });
      return;
    }
     //const bazaardata = await fetch('https://api.hypixel.net/skyblock/bazaar').then((response) => response.json())
    //prob never gonna use this
      this.setState({
        isLoading:false,
        profiledata: profiledata,
        uuid: uuid,
        uisc: uuidsuccess,
        apsc: apikeysuccess
      })
      }
    else{
      this.setState({
        isLoading:false,
        profiledata: "",
        uuid: "",
        uisc: uuidsuccess,
        apsc: apikeysuccess
      });
    }
    } catch (e) {
      console.log(e);
    }
  
  };

  savedata = async (item,value) => {
    try {
      await SecureStore.setItemAsync(item,value);
    } catch (e) {
      console.log(e);
    }
  };

  getuuid = async (username) => {
    try {
      var uuid1 = await fetch("https://api.mojang.com/users/profiles/minecraft/" + username)
      .then((response) => response.json())
      if(uuid1 == "")
      {
        ToastAndroid.show('Invalid username', ToastAndroid.SHORT); // not possible but whatever
      }
      else{
      this.savedata('uuid', uuid1.id)
      ToastAndroid.show('uuid saved: ' + uuid1.id,ToastAndroid.SHORT);
      }
    } catch (e) {
      ToastAndroid.show('Invalid username', ToastAndroid.SHORT);
    }
  };

  notify = async (timeleft) => {
    await Notifications.scheduleNotificationAsync({
      content: {
      title: "Forge",
      body: 'Forge is ready',
      priority:'max',
      data: { data: 'collect forge' },
      },
      trigger: { seconds: timeleft },
      });
      ToastAndroid.show('Notification set', ToastAndroid.SHORT);
  }

  componentDidMount()
  {
    this.getdata();
  }


 render() 
 {
  
  var moment = require('moment');
  if (this.state.isLoading) {
    return(
      <View style={{flex: 1, paddingTop: 40}}>
        <Text style={{textAlign:"center"}}>Loading...</Text>
      <ActivityIndicator/>
      </View>
    )
  }
    
  

 
  if(this.state.uuid && this.state.profiledata)
  {
    var profiledata = this.state.profiledata.members[this.state.uuid];
    var forge = profiledata.forge.forge_processes.forge_1;
  if(profiledata.mining_core.nodes.forge_time){
    var forgetime_ = profiledata.mining_core.nodes.forge_time;
    if(profiledata.mining_core.nodes.forge_time < 20)
      {forgetime = (0.9 - forgetime_*0.005)}else{forgetime = 0.7}}
    else{forgetime = 1} //quickforge stuff

if(forge['1']){
  forgeid1 = forge['1'].id.toLowerCase();
  forgetime1 = 3600000*forgetime*forgeconvert[forge['1'].id];
  forgeendtime1 = moment(new Date(forge['1'].startTime + forgetime1)).format('hh:mm A');
  forgeuntil1 =  moment(forge['1'].startTime + forgetime1).fromNow();
  if(forge['1'].startTime + forgetime1 - Date.now() > 0){ 
  timeleft = (forge['1'].startTime + forgetime1 - 180000 - Date.now())/1000; } else { timeleft = 1; }} 

if(forge['2']){
  forgeid2 = forge['2'].id.toLowerCase();
  forgetime2 = 3600000*forgetime*forgeconvert[forge['2'].id];
  forgeendtime2 = moment(new Date(forge['2'].startTime + forgetime2)).format('hh:mm A');
  forgeuntil2 =  moment(forge['2'].startTime + forgetime2).fromNow();
  if(forge['2'].startTime + forgetime1 - Date.now() > 0){ 
  timeleft = (forge['2'].startTime + forgetime1 - 180000 - Date.now())/1000; } else { timeleft = 1; }}

if(forge['3']){
  forgeid3 = forge['3'].id.toLowerCase();
  forgetime3 = 3600000*forgetime*forgeconvert[forge['3'].id];
  forgeendtime3 = moment(new Date(forge['3'].startTime + forgetime3)).format('hh:mm A');
  forgeuntil3 =  moment(forge['3'].startTime + forgetime3).fromNow();
  if(forge['3'].startTime + forgetime1 - Date.now() > 0){
  timeleft = (forge['3'].startTime + forgetime1 - 180000 - Date.now())/1000; } else { timeleft = 1; }}

if(forge['4']){
  forgeid4 = forge['4'].id.toLowerCase();
  forgetime4 = 3600000*forgetime*forgeconvert[forge['4'].id];
  forgeendtime4 = moment(new Date(forge['4'].startTime + forgetime4)).format('hh:mm A');
  forgeuntil4 =  moment(forge['4'].startTime + forgetime4).fromNow();
  if(forge['4'].startTime + forgetime1 - Date.now() > 0){ 
  timeleft = (forge['4'].startTime + forgetime1 - 180000 - Date.now())/1000; } else { timeleft = 1; }}

if(forge['5']){
  forgeid5 = forge['5'].id.toLowerCase();
  forgetime5 = 3600000*forgetime*forgeconvert[forge['5'].id];
  forgeendtime5 = moment(new Date(forge['5'].startTime + forgetime5)).format('hh:mm A');
  forgeuntil5 =  moment(forge['5'].startTime + forgetime5).fromNow();
  if(forge['5'].startTime + forgetime1 - Date.now() > 0){
  timeleft = (forge['5'].startTime + forgetime1 - 180000 - Date.now())/1000; } else { timeleft = 1; }} 


    //remember to fix
      this.notify(timeleft);
      }
      
    
  
  return(
<View style={{flex:1, flexDirection: 'column', backgroundColor:"#242323"}}>
    <Text style={{paddingTop:50,fontSize:20,fontStyle:"bold",color:"cyan",fontWeight: 'bold',margin:5, textAlign:'center'}}>Dwarven Forge</Text>
    
        
        
        <Text style={styles.text1}>{forgeid1} ending at: {forgeendtime1} ({forgeuntil1}) </Text>
        <Text style={styles.text1}>{forgeid2} ending at: {forgeendtime2} ({forgeuntil2}) </Text>
        <Text style={styles.text1}>{forgeid3} ending at: {forgeendtime3} ({forgeuntil3}) </Text>
        <Text style={styles.text1}>{forgeid4} ending at: {forgeendtime4} ({forgeuntil4}) </Text>
        <Text style={styles.text1}>{forgeid5} ending at: {forgeendtime5} ({forgeuntil5}) </Text>
        <TextInput style={styles.textinput1} placeholder={"api key: " + this.state.apsc} onSubmitEditing={event =>
         {ToastAndroid.show('api key saved: ' + event.nativeEvent.text,ToastAndroid.SHORT )
      this.savedata("apikey", event.nativeEvent.text)
      }}>
    </TextInput>
    <TextInput style={styles.textinput1} placeholder={"username: " + this.state.uisc} onSubmitEditing={event =>
         {

      this.getuuid(event.nativeEvent.text);
      }}>
    </TextInput>
    <Button
    title="Clear scheduled notifications"
    style={{textAlign:'center',backgroundColor:'gray' }}
    onPress={async () => {
     await Notifications.cancelAllScheduledNotificationsAsync();
     ToastAndroid.show('Notifications cleared', ToastAndroid.SHORT)
    }}
    ></Button>
    <View style={{marginTop:20}}>
    <Button
    title="Test notification"
    style={{textAlign:'center',backgroundColor:'gray' }}
    onPress={async () => {
      await Notifications.scheduleNotificationAsync({
        content: {
        title: "Forge",
        body: 'Forge is ready',
        priority:'max',
        data: { data: 'collect forge' },
        },
        trigger: { seconds: 1 },
        });
        ToastAndroid.show('Tested notification', ToastAndroid.SHORT);
    }}
    ></Button>
    </View>
    <View style={{marginTop:20}}>
    <Button
    title="Reload data(spamming => invalid api key)"
    style={{textAlign:'center',backgroundColor:'gray' }}
    onPress={() => {
      this.getdata();
      this.render();
      ToastAndroid.show('Data reloaded', ToastAndroid.TOP)
    }}
    ></Button>
    </View>

    
    </View>
  );
}  

}


const styles = StyleSheet.create({
 
 
view:
{
  backgroundColor:'gray',
  textAlign:'center'
},
text:
{ 
   fontSize: 18,
   marginBottom:8,
    color:'white',
    textAlign:'center',
    fontFamily: 'sans-serif',
    
},
text1:
{ 
   fontSize: 15,
   marginBottom:8,
    color:'white',
    textAlign:'center',
    fontFamily: 'sans-serif',
    
},
textinput:
{ 
   fontSize: 25,
   marginTop:60,
   marginBottom:15,
    color:'black',
    placeholderTextColor:'white',
    textAlign:'center',
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
    
},
textinput1:
{
  marginLeft:48,
  marginRight:48,
  fontSize: 20,
   marginBottom:15,
   backgroundColor:"gray",
    color:'white',
    placeholderTextColor:'white',
    textAlign:'center',
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
}
});