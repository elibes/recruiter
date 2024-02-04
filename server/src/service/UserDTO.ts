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
  public readonly loggedInUntil!: Date;
  public readonly isRecruiter!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

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
    loggedInUntil: Date,
    isRecruiter: boolean,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.personalIdentificationNumber = personalIdentificationNumber;
    this.username = username;
    this.passwordHash = passwordHash;
    this.loggedInUntil = loggedInUntil;
    this.isRecruiter = isRecruiter;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}

export default UserDTO;
