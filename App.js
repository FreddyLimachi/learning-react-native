import React, {useState} from 'react'
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Sharing from 'expo-sharing'

const App = () => {

  const [selectedImage, setSelectedImage] = useState(null)

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false){
      alert('Permission to access camera is requerid')
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync()
    console.log(pickerResult)

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({localUri: pickerResult.uri})
  }

  const openShareDialog = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert('Compartir, no esta disponible en tu plataforma')
      return;
    }

    Sharing.shareAsync(selectedImage.localUri);

  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona una imagen</Text>

      <TouchableOpacity
        onPress={openImagePickerAsync}
      
      >

      <Image
        source={{uri: selectedImage !== null ? selectedImage.localUri : 'https://picsum.photos/200/300'}}
        style={styles.image}
      />
        
      </TouchableOpacity>
     
      {
        selectedImage ?
          <TouchableOpacity
          onPress={openShareDialog}
          style={styles.button}
        >
          <Text>Share</Text>
        </TouchableOpacity>
        : <View/>

      }
      
    </View>

  )
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "black" },
  title: { fontSize: 30, color: "#fff" },
  image: {height: 300, width: 300, borderRadius: 150, resizeMode: 'contain'},
  button: {backgroundColor: "red", width: 100, height: 40, justifyContent: "center", alignItems: "center"}
})

export default App;
