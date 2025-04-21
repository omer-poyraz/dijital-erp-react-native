import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAuthHeader = async () => {
  try {
    const authData = await AsyncStorage.getItem('auth');
    if (authData) {
      const parsedData = JSON.parse(authData);
      return {
        headers: {
          Authorization: `Bearer ${parsedData.accessToken}`,
          'Content-Type': 'application/json',
        }
      };
    }
    return { headers: { 'Content-Type': 'application/json' } };
  } catch (error) {
    console.error('Error getting auth header:', error);
    return { headers: { 'Content-Type': 'application/json' } };
  }
};

export const getFormDataHeader = async () => {
  try {
    const authData = await AsyncStorage.getItem('auth');
    if (authData) {
      const parsedData = JSON.parse(authData);
      return {
        headers: {
          Authorization: `Bearer ${parsedData.accessToken}`,
          'Content-Type': 'multipart/form-data',
        }
      };
    }
    return { headers: { 'Content-Type': 'multipart/form-data' } };
  } catch (error) {
    console.error('Error getting form data header:', error);
    return { headers: { 'Content-Type': 'multipart/form-data' } };
  }
};