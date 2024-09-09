import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  Dimensions,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';

// Lấy kích thước màn hình ban đầu
const { width: initialWidth, height: initialHeight } = Dimensions.get('window');

const App = () => {
  const [screenWidth, setScreenWidth] = useState(initialWidth);
  const [screenHeight, setScreenHeight] = useState(initialHeight);
  const [orientation, setOrientation] = useState(initialHeight > initialWidth ? 'portrait' : 'landscape');

  // Cập nhật kích thước màn hình và hướng khi có sự thay đổi
  useEffect(() => {
    const handleDimensionChange = ({ window: { width, height } }) => {
      setScreenWidth(width);
      setScreenHeight(height);
      setOrientation(height > width ? 'portrait' : 'landscape');
    };

    const subscription = Dimensions.addEventListener('change', handleDimensionChange);

    // Cleanup event listener khi component unmount
    return () => {
      subscription?.remove();
    };
  }, []);

  // Tính toán chiều rộng của nút bấm và hình ảnh
  const buttonWidth = screenWidth / 2;
  const imageWidth = screenWidth * 0.8;
  const imageHeight = imageWidth * (9 / 16); // Giữ tỷ lệ hình ảnh

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Hình ảnh thay đổi kích thước theo chiều rộng màn hình */}
      <Image
        source={{ uri: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1621690/capsule_616x353.jpg?t=1722425996' }}
        style={{
          width: imageWidth,
          height: orientation === 'portrait' ? imageHeight : imageHeight * 0.7, // Giảm chiều cao trong chế độ ngang
        }}
      />

      {/* Bố cục các nút thay đổi theo hướng màn hình */}
      <View style={orientation === 'portrait' ? styles.portrait : styles.landscape}>
        <View style={[styles.buttonContainer, { width: buttonWidth }]}>
          <Button title="Button 1" onPress={() => {}} />
        </View>
        <View style={[styles.buttonContainer, { width: buttonWidth }]}>
          <Button title="Button 2" onPress={() => {}} />
        </View>
      </View>

      {/* Trường nhập liệu, sử dụng KeyboardAvoidingView để tránh bị che bởi bàn phím */}
      <TextInput placeholder="Enter text" style={styles.input} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  portrait: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  landscape: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonContainer: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '80%',
    marginTop: 20,
  },
});
export default App;