import { StyleSheet, Text, View } from 'react-native';
import ChatGBT from './src';

export default function App() {
  return (
    <View style={styles.container}>
      <ChatGBT/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffcc9',
    
  },
});
