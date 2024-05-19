type UserData = {
  id: string;
  name: string;
  email: string;
  image: string;
};

type AccountData = {
  provider: string;
  type: string;
  providerAccountId: string;
  access_token: string;
  expires_at: number;
  scope: string;
  token_type: string;
  id_token: string;
};

type CallbackParams = {
  user: UserData;
  account: AccountData;
};
