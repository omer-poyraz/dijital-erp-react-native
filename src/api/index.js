export const URL = 'https://192.168.1.8:7289/api'

// AUTHENTICATION
export const LOGIN = `${URL}/Authentication/Login`
export const REGISTER = `${URL}/Authentication/Register`

// ASSEMBLY_MANUAL
export const ASSEMBLY_MANUAL_GETALL = `${URL}/AssemblyManuel/GetAll`;
export const ASSEMBLY_MANUAL_GET = `${URL}/AssemblyManuel/Get`;
export const ASSEMBLY_MANUAL_CREATE = `${URL}/AssemblyManuel/Create`;
export const ASSEMBLY_MANUAL_UPDATE = `${URL}/AssemblyManuel/Update`;
export const ASSEMBLY_MANUAL_ADDFILE = `${URL}/AssemblyManuel/AddFile`;
export const ASSEMBLY_MANUAL_DELETE = `${URL}/AssemblyManuel/Delete`;

// ASSEMBLY_MANUAL
export const ASSEMBLY_FAILURE_GETALL = `${URL}/AssemblyFailureState/GetAll`;
export const ASSEMBLY_FAILURE_GETALLBYMANUAL = `${URL}/AssemblyFailureState/GetAllByManual`;
export const ASSEMBLY_FAILURE_GET = `${URL}/AssemblyFailureState/Get`;
export const ASSEMBLY_FAILURE_CREATE = `${URL}/AssemblyFailureState/Create`;
export const ASSEMBLY_FAILURE_UPDATE = `${URL}/AssemblyFailureState/Update`;
export const ASSEMBLY_FAILURE_DELETE = `${URL}/AssemblyFailureState/Delete`;

// ASSEMBLY_SUCCESS
export const ASSEMBLY_SUCCESS_GETALL = `${URL}/AssemblySuccessState/GetAll`;
export const ASSEMBLY_SUCCESS_GETALLBYMANUAL = `${URL}/AssemblySuccessState/GetAllByManual`;
export const ASSEMBLY_SUCCESS_GET = `${URL}/AssemblySuccessState/Get`;
export const ASSEMBLY_SUCCESS_CREATE = `${URL}/AssemblySuccessState/Create`;
export const ASSEMBLY_SUCCESS_UPDATE = `${URL}/AssemblySuccessState/Update`;
export const ASSEMBLY_SUCCESS_DELETE = `${URL}/AssemblySuccessState/Delete`;

// ASSEMBLY_NOTE
export const ASSEMBLY_NOTE_GETALL = `${URL}/AssemblyNote/GetAll`;
export const ASSEMBLY_NOTE_GETALLBYMANUAL = `${URL}/AssemblyNote/GetAllByManual`;
export const ASSEMBLY_NOTE_GET = `${URL}/AssemblyNote/Get`;
export const ASSEMBLY_NOTE_CREATE = `${URL}/AssemblyNote/Create`;
export const ASSEMBLY_NOTE_UPDATE = `${URL}/AssemblyNote/Update`;
export const ASSEMBLY_NOTE_DELETE = `${URL}/AssemblyNote/Delete`;

// USER
export const RESET_PASSWORD_SERVICE = `${URL}/User/ResetPassword`;