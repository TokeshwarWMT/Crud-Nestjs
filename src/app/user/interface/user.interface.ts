export interface UserInterface extends Document {
  name: string;
  email: string;
  password: string;
  phone: number;
  createdAt: Date;
}
