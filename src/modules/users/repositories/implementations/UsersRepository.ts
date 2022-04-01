import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const newUser = new User();
    Object.assign(newUser, { name, email });

    this.users.push(newUser);

    return newUser;
  }

  findById(id: string): User | undefined {
    const user = this.users.find((user) => user.id === id);
    if (!user) return undefined;

    return user;
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find((user) => user.email === email);
    if (!user) return undefined;

    return user;
  }

  turnAdmin(receivedUser: User): User {
    const userIndex = this.users.findIndex(
      (user) => user.id === receivedUser.id
    );

    const editedUser = Object.assign(this.users[userIndex], {
      admin: true,
      updated_at: new Date(),
    });

    return editedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
