import getReturnFunc from './utils'

export default {
  reqUserInfo: getReturnFunc('reqUserInfo'),
  getUsers: getReturnFunc('getUsers'),
  deleteUser: getReturnFunc('deleteUser'),
  lockUser: getReturnFunc('lockUser'),
  editUser: getReturnFunc('editUser'),
  nameExist: getReturnFunc('nameExist'),
  addUser: getReturnFunc('addUser'),
  changePassword: getReturnFunc('changePassword')
}
