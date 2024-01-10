import axios, { AxiosInstance } from 'axios';
axios.defaults.baseURL = 'http://localhost:3001'; 

const userService: AxiosInstance = axios.create({
  baseURL: process.env.REACT_SERVICE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('accessToken', token);
    userService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('accessToken');
    delete userService.defaults.headers.common['Authorization'];
  }
};

const getAuthToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

const tokenFromStorage = getAuthToken();
if (tokenFromStorage) {
  setAuthToken(tokenFromStorage);
}

const login = async function(data: any) {
  try {
    return await userService.post('/auth', data);
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

const update = async function(data: any) {
  return userService.post('/update', data)
}

const sign = async function(data: any) {
  try {
    const response = await userService.post('/sign', data);
    if ('accessToken' in response.data) {
      const { accessToken } = response.data;
      setAuthToken(accessToken);
      return accessToken;
    }
    return
  } catch (error) {
    console.error('Signing error:', error);
    throw error; 
  }

}
export default userService;
export {login, update, sign, getAuthToken} ;