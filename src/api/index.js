export const URL = 'http://192.168.1.4:5254/api'

// AUTHENTICATION
export const LOGIN = `${URL}/Authentication/Login`
export const REGISTER = `${URL}/Authentication/Register`
export const REFRESH = `${URL}/Authentication/Refresh`

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

// EMPLOYEE
export const EMPLOYEE_GETALL = `${URL}/Employee/GetAll`;
export const EMPLOYEE_GET = `${URL}/Employee/Get`;
export const EMPLOYEE_CREATE = `${URL}/Employee/Create`;
export const EMPLOYEE_UPDATE = `${URL}/Employee/Update`;
export const EMPLOYEE_DELETE = `${URL}/Employee/Delete`;

// TECHNICAL_DRAWING
export const TECHNICALDRAWING_GETALL = `${URL}/TechnicalDrawing/GetAll`;
export const TECHNICALDRAWING_GET = `${URL}/TechnicalDrawing/Get`;
export const TECHNICALDRAWING_CREATE = `${URL}/TechnicalDrawing/Create`;
export const TECHNICALDRAWING_UPDATE = `${URL}/TechnicalDrawing/Update`;
export const TECHNICALDRAWING_ADDFILE = `${URL}/TechnicalDrawing/AddFile`;
export const TECHNICALDRAWING_DELETE = `${URL}/TechnicalDrawing/Delete`;

// TECHNICAL_DRAWING_FAUILURE
export const TECHNICALDRAWING_FAILURE_GETALL = `${URL}/TechnicalDrawingFailureState/GetAll`;
export const TECHNICALDRAWING_FAILURE_GETALLBYDRAWING = `${URL}/TechnicalDrawingFailureState/GetAllByDrawing`;
export const TECHNICALDRAWING_FAILURE_GET = `${URL}/TechnicalDrawingFailureState/Get`;
export const TECHNICALDRAWING_FAILURE_CREATE = `${URL}/TechnicalDrawingFailureState/Create`;
export const TECHNICALDRAWING_FAILURE_UPDATE = `${URL}/TechnicalDrawingFailureState/Update`;
export const TECHNICALDRAWING_FAILURE_DELETE = `${URL}/TechnicalDrawingFailureState/Delete`;

// TECHNICAL_DRAWING_SUCCESS
export const TECHNICALDRAWING_SUCCESS_GETALL = `${URL}/TechnicalDrawingSuccessState/GetAll`;
export const TECHNICALDRAWING_SUCCESS_GETALLBYDRAWING = `${URL}/TechnicalDrawingSuccessState/GetAllByDrawing`;
export const TECHNICALDRAWING_SUCCESS_GET = `${URL}/TechnicalDrawingSuccessState/Get`;
export const TECHNICALDRAWING_SUCCESS_CREATE = `${URL}/TechnicalDrawingSuccessState/Create`;
export const TECHNICALDRAWING_SUCCESS_UPDATE = `${URL}/TechnicalDrawingSuccessState/Update`;
export const TECHNICALDRAWING_SUCCESS_DELETE = `${URL}/TechnicalDrawingSuccessState/Delete`;

// TECHNICAL_DRAWING_NOTE
export const TECHNICALDRAWING_NOTE_GETALL = `${URL}/TechnicalDrawingNote/GetAll`;
export const TECHNICALDRAWING_NOTE_GETALLBYDRAWING = `${URL}/TechnicalDrawingNote/GetAllByDrawing`;
export const TECHNICALDRAWING_NOTE_GET = `${URL}/TechnicalDrawingNote/Get`;
export const TECHNICALDRAWING_NOTE_CREATE = `${URL}/TechnicalDrawingNote/Create`;
export const TECHNICALDRAWING_NOTE_UPDATE = `${URL}/TechnicalDrawingNote/Update`;
export const TECHNICALDRAWING_NOTE_DELETE = `${URL}/TechnicalDrawingNote/Delete`;

// USER
export const RESET_PASSWORD_SERVICE = `${URL}/User/ResetPassword`;