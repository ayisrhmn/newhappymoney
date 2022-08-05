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
