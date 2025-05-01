import { configureStore } from '@reduxjs/toolkit';
import langReducer from './slices/langSlice';
import loginReducer from './slices/loginSlice';
import appReducer from './slices/appSlice';
import logoutReducer from './slices/logoutSlice';
import loadingReducer from './slices/loadingSlice';
import authReducer from './slices/authSlice';
import leftMenuReducer from './slices/leftMenuSlice';
import jobAndHoldReducer from './slices/jobAndHoldSlice';
import assemblyManualGetAllReducer from './slices/assemblyManualGetAllSlice'
import assemblyManualGetReducer from './slices/assemblyManualGetSlice'
import assemblyManualCreateReducer from './slices/assemblyManualCreateSlice'
import assemblyManualUpdateReducer from './slices/assemblyManualUpdateSlice'
import assemblyManualAddFileReducer from './slices/assemblyManualAddFileSlice'
import assemblyManualDeleteReducer from './slices/assemblyManualDeleteSlice'
import assemblyFailureGetAllReducer from './slices/assemblyFailureGetAllSlice'
import assemblyFailureGetAllByManualReducer from './slices/assemblyFailureGetAllByManualSlice'
import assemblyFailureGetReducer from './slices/assemblyFailureGetSlice'
import assemblyFailureCreateReducer from './slices/assemblyFailureCreateSlice'
import assemblyFailureUpdateReducer from './slices/assemblyFailureUpdateSlice'
import assemblyFailureDeleteReducer from './slices/assemblyFailureDeleteSlice'
import assemblySuccessGetAllReducer from './slices/assemblySuccessGetAllSlice'
import assemblySuccessGetAllByManualReducer from './slices/assemblySuccessGetAllByManualSlice'
import assemblySuccessGetReducer from './slices/assemblySuccessGetSlice'
import assemblySuccessCreateReducer from './slices/assemblySuccessCreateSlice'
import assemblySuccessUpdateReducer from './slices/assemblySuccessUpdateSlice'
import assemblySuccessDeleteReducer from './slices/assemblySuccessDeleteSlice'
import assemblyNoteGetAllReducer from './slices/assemblyNoteGetAllSlice'
import assemblyNoteGetAllByManualReducer from './slices/assemblyNoteGetAllByManualSlice'
import assemblyNoteGetReducer from './slices/assemblyNoteGetSlice'
import assemblyNoteCreateReducer from './slices/assemblyNoteCreateSlice'
import assemblyNoteUpdateReducer from './slices/assemblyNoteUpdateSlice'
import assemblyNoteDeleteReducer from './slices/assemblyNoteDeleteSlice'
import employeeGetAllReducer from './slices/employeeGetAllSlice'
import employeeGetReducer from './slices/employeeGetSlice'
import employeeCreateReducer from './slices/employeeCreateSlice'
import employeeUpdateReducer from './slices/employeeUpdateSlice'
import employeeDeleteReducer from './slices/employeeDeleteSlice'
import technicalDrawingGetAllReducer from './slices/technicalDrawingGetAllSlice'
import technicalDrawingGetReducer from './slices/technicalDrawingGetSlice'
import technicalDrawingAddFileReducer from './slices/technicalDrawingAddFileSlice'
import technicalDrawingCreateReducer from './slices/technicalDrawingCreateSlice'
import technicalDrawingUpdateReducer from './slices/technicalDrawingUpdateSlice'
import technicalDrawingDeleteReducer from './slices/technicalDrawingDeleteSlice'
import technicalDrawingFailureGetAllReducer from './slices/technicalDrawingFailureGetAllSlice'
import technicalDrawingFailureGetAllByDrawingReducer from './slices/technicalDrawingFailureGetAllByDrawingSlice'
import technicalDrawingFailureGetReducer from './slices/technicalDrawingFailureGetSlice'
import technicalDrawingFailureCreateReducer from './slices/technicalDrawingFailureCreateSlice'
import technicalDrawingFailureUpdateReducer from './slices/technicalDrawingFailureUpdateSlice'
import technicalDrawingFailureDeleteReducer from './slices/technicalDrawingFailureDeleteSlice'
import technicalDrawingSuccessGetAllReducer from './slices/technicalDrawingSuccessGetAllSlice'
import technicalDrawingSuccessGetAllByDrawingReducer from './slices/technicalDrawingSuccessGetAllByDrawingSlice'
import technicalDrawingSuccessGetReducer from './slices/technicalDrawingSuccessGetSlice'
import technicalDrawingSuccessCreateReducer from './slices/technicalDrawingSuccessCreateSlice'
import technicalDrawingSuccessUpdateReducer from './slices/technicalDrawingSuccessUpdateSlice'
import technicalDrawingSuccessDeleteReducer from './slices/technicalDrawingSuccessDeleteSlice'
import technicalDrawingNoteGetAllReducer from './slices/technicalDrawingNoteGetAllSlice'
import technicalDrawingNoteGetAllByDrawingReducer from './slices/technicalDrawingNoteGetAllByDrawingSlice'
import technicalDrawingNoteGetReducer from './slices/technicalDrawingNoteGetSlice'
import technicalDrawingNoteCreateReducer from './slices/technicalDrawingNoteCreateSlice'
import technicalDrawingNoteUpdateReducer from './slices/technicalDrawingNoteUpdateSlice'
import technicalDrawingNoteDeleteReducer from './slices/technicalDrawingNoteDeleteSlice'

export const store = configureStore({
    reducer: {
        app: appReducer,
        assemblyManualGetAll: assemblyManualGetAllReducer,
        assemblyManualGet: assemblyManualGetReducer,
        assemblyManualCreate: assemblyManualCreateReducer,
        assemblyManualUpdate: assemblyManualUpdateReducer,
        assemblyManualAddFile: assemblyManualAddFileReducer,
        assemblyManualDelete: assemblyManualDeleteReducer,
        assemblyFailureGetAll: assemblyFailureGetAllReducer,
        assemblyFailureGetAllByManual: assemblyFailureGetAllByManualReducer,
        assemblyFailureGet: assemblyFailureGetReducer,
        assemblyFailureCreate: assemblyFailureCreateReducer,
        assemblyFailureUpdate: assemblyFailureUpdateReducer,
        assemblyFailureDelete: assemblyFailureDeleteReducer,
        assemblyNoteGetAll: assemblyNoteGetAllReducer,
        assemblyNoteGetAllByManual: assemblyNoteGetAllByManualReducer,
        assemblyNoteGet: assemblyNoteGetReducer,
        assemblyNoteCreate: assemblyNoteCreateReducer,
        assemblyNoteUpdate: assemblyNoteUpdateReducer,
        assemblyNoteDelete: assemblyNoteDeleteReducer,
        assemblySuccessGetAll: assemblySuccessGetAllReducer,
        assemblySuccessGetAllByManual: assemblySuccessGetAllByManualReducer,
        assemblySuccessGet: assemblySuccessGetReducer,
        assemblySuccessCreate: assemblySuccessCreateReducer,
        assemblySuccessUpdate: assemblySuccessUpdateReducer,
        assemblySuccessDelete: assemblySuccessDeleteReducer,
        auth: authReducer,
        employeeGetAll: employeeGetAllReducer,
        employeeGet: employeeGetReducer,
        employeeCreate: employeeCreateReducer,
        employeeUpdate: employeeUpdateReducer,
        employeeDelete: employeeDeleteReducer,
        jobAndHold: jobAndHoldReducer,
        lang: langReducer,
        leftMenu: leftMenuReducer,
        login: loginReducer,
        loading: loadingReducer,
        logout: logoutReducer,
        technicalDrawingGetAll: technicalDrawingGetAllReducer,
        technicalDrawingGet: technicalDrawingGetReducer,
        technicalDrawingAddFile: technicalDrawingAddFileReducer,
        technicalDrawingCreate: technicalDrawingCreateReducer,
        technicalDrawingUpdate: technicalDrawingUpdateReducer,
        technicalDrawingDelete: technicalDrawingDeleteReducer,
        technicalDrawingFailureGetAll: technicalDrawingFailureGetAllReducer,
        technicalDrawingFailureGetAllByDrawing: technicalDrawingFailureGetAllByDrawingReducer,
        technicalDrawingFailureGet: technicalDrawingFailureGetReducer,
        technicalDrawingFailureCreate: technicalDrawingFailureCreateReducer,
        technicalDrawingFailureUpdate: technicalDrawingFailureUpdateReducer,
        technicalDrawingFailureDelete: technicalDrawingFailureDeleteReducer,
        technicalDrawingNoteGetAll: technicalDrawingNoteGetAllReducer,
        technicalDrawingNoteGetAllByDrawing: technicalDrawingNoteGetAllByDrawingReducer,
        technicalDrawingNoteGet: technicalDrawingNoteGetReducer,
        technicalDrawingNoteCreate: technicalDrawingNoteCreateReducer,
        technicalDrawingNoteUpdate: technicalDrawingNoteUpdateReducer,
        technicalDrawingNoteDelete: technicalDrawingNoteDeleteReducer,
        technicalDrawingSuccessGetAll: technicalDrawingSuccessGetAllReducer,
        technicalDrawingSuccessGetAllByDrawing: technicalDrawingSuccessGetAllByDrawingReducer,
        technicalDrawingSuccessGet: technicalDrawingSuccessGetReducer,
        technicalDrawingSuccessCreate: technicalDrawingSuccessCreateReducer,
        technicalDrawingSuccessUpdate: technicalDrawingSuccessUpdateReducer,
        technicalDrawingSuccessDelete: technicalDrawingSuccessDeleteReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: process.env.NODE_ENV !== 'production',
});