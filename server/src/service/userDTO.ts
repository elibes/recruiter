/**
 * A DTO representing a user found in the database.
 * */
class UserDTO {
  public readonly id!: number;
  public readonly firstName!: string;
  public readonly lastName!: string;
  public readonly email!: string;
  public readonly personalIdentificationNumber!: string;
  public readonly username!: string;
  public readonly passwordHash!: string;
  public readonly role!: number;

  /**
   * Creates the DTO.
   * @todo Use validators to sanitise the data.
   * */
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    personalIdentificationNumber: string,
    username: string,
    passwordHash: string,
    role: number
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.personalIdentificationNumber = personalIdentificationNumber;
    this.username = username;
    this.passwordHash = passwordHash;
    this.role = role;
  }
}

export default UserDTO;
