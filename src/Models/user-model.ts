import Role from "./role";

class UserModel {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  roleId: Role;
  auth: any;

  constructor(user: UserModel) {
    this._id = user._id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.password = user.password;
    this.roleId = user.roleId
  }
};

export default UserModel;