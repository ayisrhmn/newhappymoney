export const getApiTest = async (context: any) => {
  let response = await context.effects.api.getApiTest();

  let {
    data: {Success, Data},
  } = response;

  if (Success) {
    return Data;
  }
};
