export type LoginRequest = {
  userName: string;
  password: string;
};

export type LoginResponse = {
  data: {
    /** @format date-time */
    expiration: Date;
    token: string;
  };
  errors?: unknown[] | null;
  success: boolean;
};

export type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type ChangePasswordResponse = {
  data: boolean;
  errors?: unknown[] | null;
  success: boolean;
};
