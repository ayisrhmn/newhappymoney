export const getApiTest = async (context: any) => {
  let response = await context.effects.api.getApiTest();

  let {
    data: {Success, Data},
  } = response;

  if (Success) {
    return Data;
  }
};

export const doSignIn = async (context: any, payload: object) => {
  let response = await context.effects.api.doSignIn(payload);

  return response;
};

export const doSignUp = async (context: any, payload: object) => {
  let response = await context.effects.api.doSignUp(payload);

  return response;
};

export const setToken = (context: any, token: string) => {
  context.state.token = token;
};

export const getMyProfile = async (context: any) => {
  let response = await context.effects.api.getMyProfile();

  let {
    data: {Success, Data},
  } = response;

  if (Success) {
    return Data;
  }
};

export const getMyBalance = async (context: any, payload: object) => {
  let response = await context.effects.api.getMyBalance(payload);

  let {
    data: {Success, Data},
  } = response;

  if (Success) {
    return Data;
  }
};

export const getMySpendingReport = async (context: any, payload: object) => {
  let response = await context.effects.api.getMySpendingReport(payload);

  let {
    data: {Success, Data},
  } = response;

  if (Success) {
    Data;
  }

  return response;
};

export const getTopIncome = async (context: any, payload: object) => {
  let response = await context.effects.api.getTopIncome(payload);

  let {
    data: {Success, Data},
  } = response;

  if (Success) {
    Data;
  }

  return response;
};

export const getTopExpense = async (context: any, payload: object) => {
  let response = await context.effects.api.getTopExpense(payload);

  let {
    data: {Success, Data},
  } = response;

  if (Success) {
    Data;
  }

  return response;
};

export const getReachedLimit = async (context: any, payload: object) => {
  let response = await context.effects.api.getReachedLimit(payload);

  let {
    data: {Success, Data},
  } = response;

  if (Success) {
    return Data;
  }
};

export const setCloseReachedLimit = (context: any, close: boolean) => {
  context.state.closeReachedLimit = close;
};

export const getMyTransactions = async (context: any, payload: object) => {
  let response = await context.effects.api.getMyTransactions(payload);

  let {
    data: {Success, Data},
  } = response;

  if (Success) {
    return Data;
  }
};
