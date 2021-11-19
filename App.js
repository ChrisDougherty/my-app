import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);
  
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
     alert('Permission to access camera roll is required!');
      return;
    }
    
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    
    if (pickerResult.cancelled === true) {
      return;
    }
  
      setSelectedImage({ localUri: pickerResult.uri });
  };
  let openShareDialogAsync = async () => {
      if(!(await Sharing.isAvailableAsync())){
        alert("Uh oh, sharing isn't available on your platform");
        return;
      }
      await Sharing.shareAsync(selectedImage.localUri);
  };
  
    if (selectedImage !== null) {
      return (
        <View style={styles.container}>
          <Image
            source={{ uri: selectedImage.localUri }}
            style={styles.thumbnail}
          />
          <TouchableOpacity onPress={openShareDialogAsync} style ={styles.button}>
            <Text style={styles.buttonText}>Share this photo</Text>
          </TouchableOpacity>
        </View>
      );
    }
  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://www.prestigeanimalhospital.com/sites/default/files/styles/large/public/golden-retriever-dog-breed-info.jpg?itok=scGfz-nI"}} style={{width: 305, height: 300}}/>

      <Text style={{color: '#ffff', fontSize: 24}}>
      Dog 
      </Text>
      

      <TouchableOpacity 
        onPress={openImagePickerAsync}>
        <Text style={{ fontSize:20, color: '#fff' }}>Pick a photo</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3ea0ad',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail:{
    width:300,
    height: 300,
    resizeMode: "contain",
  }
});
