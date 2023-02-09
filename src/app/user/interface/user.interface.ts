export interface UserInterface extends Document {
  name: string;
  email: string;
  phone: number;
  image: string;
  createdAt: Date;
}
