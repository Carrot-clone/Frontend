export interface UserSingUp {
  email: string;
  profilePhoto: File[] | undefined;
  password: string | number;
  address?: string;
  username: string;
}

export interface DuplicatedCheck {
  email: string;
}
