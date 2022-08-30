type State = {
  token: string;
  closeReachedLimit: boolean;
  showNextMonth: boolean;
};

export const state: State = {
  token: '',
  closeReachedLimit: false,
  showNextMonth: false,
};
