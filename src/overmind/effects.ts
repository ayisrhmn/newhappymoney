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
  getMyBalance(payload: any) {
    return http.post('/transaction/balance', payload);
  },
  getMySpendingReport(payload: any) {
    return http.post('/report', payload);
  },
  getTopIncome(payload: any) {
    return http.post('/report/top/income', payload);
  },
  getTopExpense(payload: any) {
    return http.post('/report/top/expense', payload);
  },
  getReachedLimit(payload: any) {
    return http.post('/report/reachedlimit', payload);
  },
  getMyTransactions(payload: any) {
    return http.post('/transaction', payload);
  },
};
