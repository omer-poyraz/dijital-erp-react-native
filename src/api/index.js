export const URL = 'http://192.168.222.60:5254/api'

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

// ASSEMBLY_VISUAL_NOTE
export const ASSEMBLY_VISUAL_NOTE_GETALL = `${URL}/AssemblyVisualNote/GetAll`;
export const ASSEMBLY_VISUAL_NOTE_GETALLBYDRAWING = `${URL}/AssemblyVisualNote/GetAllByDrawing`;
export const ASSEMBLY_VISUAL_NOTE_GET = `${URL}/AssemblyVisualNote/Get`;
export const ASSEMBLY_VISUAL_NOTE_CREATE = `${URL}/AssemblyVisualNote/Create`;
export const ASSEMBLY_VISUAL_NOTE_DELETE = `${URL}/AssemblyVisualNote/Delete`;

// ASSEMBLY_QUALITY
export const ASSEMBLY_QUALITY_GETALL = `${URL}/AssemblyQuality/GetAll`;
export const ASSEMBLY_QUALITY_GETALLBYFAILURE = `${URL}/AssemblyQuality/GetAllByFailure`;
export const ASSEMBLY_QUALITY_GET = `${URL}/AssemblyQuality/Get`;
export const ASSEMBLY_QUALITY_CREATE = `${URL}/AssemblyQuality/Create`;
export const ASSEMBLY_QUALITY_UPDATE = `${URL}/AssemblyQuality/Update`;
export const ASSEMBLY_QUALITY_DELETE = `${URL}/AssemblyQuality/Delete`;

// DEPARTMENT
export const DEPARTMENT_GETALL = `${URL}/Department/GetAll`;
export const DEPARTMENT_GET = `${URL}/Department/Get`;
export const DEPARTMENT_CREATE = `${URL}/Department/Create`;
export const DEPARTMENT_UPDATE = `${URL}/Department/Update`;
export const DEPARTMENT_DELETE = `${URL}/Department/Delete`;

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

// TECHNICAL_DRAWING_VISUAL_NOTE
export const TECHNICALDRAWING_VISUAL_NOTE_GETALL = `${URL}/TechnicalDrawingVisualNote/GetAll`;
export const TECHNICALDRAWING_VISUAL_NOTE_GETALLBYDRAWING = `${URL}/TechnicalDrawingVisualNote/GetAllByDrawing`;
export const TECHNICALDRAWING_VISUAL_NOTE_GET = `${URL}/TechnicalDrawingVisualNote/Get`;
export const TECHNICALDRAWING_VISUAL_NOTE_CREATE = `${URL}/TechnicalDrawingVisualNote/Create`;
export const TECHNICALDRAWING_VISUAL_NOTE_DELETE = `${URL}/TechnicalDrawingVisualNote/Delete`;

// TECHNICALDRAWING_QUALITY
export const TECHNICALDRAWING_QUALITY_GETALL = `${URL}/TechnicalDrawingQuality/GetAll`;
export const TECHNICALDRAWING_QUALITY_GETALLBYFAILURE = `${URL}/TechnicalDrawingQuality/GetAllByFailure`;
export const TECHNICALDRAWING_QUALITY_GET = `${URL}/TechnicalDrawingQuality/Get`;
export const TECHNICALDRAWING_QUALITY_CREATE = `${URL}/TechnicalDrawingQuality/Create`;
export const TECHNICALDRAWING_QUALITY_UPDATE = `${URL}/TechnicalDrawingQuality/Update`;
export const TECHNICALDRAWING_QUALITY_DELETE = `${URL}/TechnicalDrawingQuality/Delete`;

// USER
export const RESET_PASSWORD_SERVICE = `${URL}/User/ResetPassword`;
export const USER_UPDATE = `${URL}/User/Update`;
export const USER_DELETE = `${URL}/User/Delete`;
export const USER_GETALL = `${URL}/User/GetAll`;
export const USER_GET = `${URL}/User/Get`;