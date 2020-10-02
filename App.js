import React, {useRef, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  PermissionsAndroid,
  TouchableOpacity,
  Text,
} from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import Orientation from 'react-native-orientation-locker';

import ReactNativeFS from 'react-native-fs';

const App = () => {
  const ref = useRef();

  useEffect(() => {
    Orientation.lockToLandscape();
  }, []);

  const handleSignature = async (signature) => {
    console.log(signature);
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );

    const path = `${ReactNativeFS.PicturesDirectoryPath}/assinatura.svg`;
    console.log(path);

    try {
      await ReactNativeFS.writeFile(
        path,
        signature.replace('data:image/svg+xml;base64,', ''),
        {encoding: 'base64'},
      );

      // const file = await ReactNativeFS.readFile(path);
    } catch (err) {
      console.log('err', err);
    }

    // FileSystem.writeAsStringAsync(
    //   path,
    //   signature.replace('data:image/png;base64,', ''),
    //   {encoding: FileSystem.EncodingType.Base64},
    // )
    //   .then((res) => {
    //     console.log(res);
    //     FileSystem.getInfoAsync(path, {size: true, md5: true}).then((file) => {
    //       console.log(file);
    //     });
    //   })
    //   .catch((err) => {
    //     console.log('err', err);
    //   });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView
        style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <SignatureScreen
          ref={ref}
          onOK={handleSignature}
          clearText="Limpar"
          confirmText="Confirmar"
          autoClear={true}
          imageType="image/svg+xml"
          descriptionText={'Assinatura'}
          webStyle={`.m-signature-pad--footer
            .button {
              background-color: #d7df36;
              color: #523f92;
            }`}
        />
        {/* <TouchableOpacity
          style={{
            width: 100,
            height: 60,
            backgroundColor: '#7159c1',
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          activeOpacity={0.7}>
          <Text style={{color: '#fff', fontSize: 18}}>Assinar</Text>
        </TouchableOpacity> */}
      </SafeAreaView>
    </>
  );
};

export default App;
