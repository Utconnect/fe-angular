export type LoginRequest = {
  userName: string;
  password: string;
};

export interface LoginResponse {
  data: {
    /** @format date-time */
    expiration: Date;
    token: string;
  };
  errors?: unknown[] | null;
  success: boolean;
}
