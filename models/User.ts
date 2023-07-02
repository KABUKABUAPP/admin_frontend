export interface User {
  _id: string;
  full_name: string;
  phone_number: string;
  email: string;
  role: string;
  isBlocked: boolean;
  hasResetDefaultPassword: boolean;
  created_at: Date | string;
  updated_at: Date | string;
}
