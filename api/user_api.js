import ApiManager from './ApiManager';

export const user_login = async (data) => {
  try {
    const result = await ApiManager("/user/login", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      data: data,
    });
    return result.data;
  } catch (error) {
    console.error('Login Error:', error);
    if (error.response) {
      return error.response.data;
    } else {
      return { error: 'Network Error', message: error.message };
    }
  }
};