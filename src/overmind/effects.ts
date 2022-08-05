import http from '@utils/http';

export const api = {
  getApiTest() {
    return http.post('');
  },
  doSignIn(payload: any) {
    return http.post('/auth/signin', payload);
  },
  doSignUp(payload: any) {
    return http.post('/auth/signup', payload);
  },
  getMyProfile() {
    return http.post('/user/profile');
  },
};
