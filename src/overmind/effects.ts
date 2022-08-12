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
  getMyCategory() {
    return http.post('/category');
  },
  onCreateCategory(payload: any) {
    return http.post('/category/create', payload);
  },
  onEditCategory(payload: any) {
    return http.post('/category/edit', payload);
  },
  onDeleteCategory(payload: any) {
    return http.post('/category/delete', payload);
  },
};
