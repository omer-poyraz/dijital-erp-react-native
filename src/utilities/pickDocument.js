import * as DocumentPicker from 'expo-document-picker';
import { Platform } from 'react-native';

export const pickDocument = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: true,
    });
    
    if (result.type === 'success') {
      if (Platform.OS !== 'web') {
        const { uri, name, size, mimeType } = result;
        
        return {
          uri,
          name,
          size,
          type: mimeType,
        };
      } 
      else {
        return result.file;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error picking document:', error);
    return null;
  }
};