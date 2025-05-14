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
import assemblyFailureGetAllByQualityReducer from './slices/assemblyFailureGetAllByQualitySlice'
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
import assemblyVisualNoteCreateReducer from './slices/assemblyVisualNoteCreateSlice'
import assemblyVisualNoteGetReducer from './slices/assemblyVisualNoteGetSlice'
import assemblyVisualNoteGetAllByDrawingReducer from './slices/assemblyVisualNoteGetAllByDrawingSlice'
import assemblyVisualNoteDeleteReducer from './slices/assemblyVisualNoteDeleteSlice'
import assemblyNoteUpdateReducer from './slices/assemblyNoteUpdateSlice'
import assemblyNoteDeleteReducer from './slices/assemblyNoteDeleteSlice'
import cmmAddFileReducer from './slices/cmmAddFileSlice'
import cmmAddResultFileReducer from './slices/cmmAddResultFileSlice'
import cmmGetAllReducer from './slices/cmmGetAllSlice'
import cmmGetReducer from './slices/cmmGetSlice'
import cmmCreateReducer from './slices/cmmCreateSlice'
import cmmUpdateReducer from './slices/cmmUpdateSlice'
import cmmDeleteReducer from './slices/cmmDeleteSlice'
import cmmFailureGetAllReducer from './slices/cmmFailureGetAllSlice'
import cmmFailureGetAllByManualReducer from './slices/cmmFailureGetAllByManualSlice'
import cmmFailureGetReducer from './slices/cmmFailureGetSlice'
import cmmFailureCreateReducer from './slices/cmmFailureCreateSlice'
import cmmFailureUpdateReducer from './slices/cmmFailureUpdateSlice'
import cmmFailureDeleteReducer from './slices/cmmFailureDeleteSlice'
import cmmModuleGetAllReducer from './slices/cmmModuleGetAllSlice'
import cmmModuleGetReducer from './slices/cmmModuleGetSlice'
import cmmModuleCreateReducer from './slices/cmmModuleCreateSlice'
import cmmModuleUpdateReducer from './slices/cmmModuleUpdateSlice'
import cmmModuleDeleteReducer from './slices/cmmModuleDeleteSlice'
import cmmSuccessGetAllReducer from './slices/cmmSuccessGetAllSlice'
import cmmSuccessGetAllByManualReducer from './slices/cmmSuccessGetAllByManualSlice'
import cmmSuccessGetReducer from './slices/cmmSuccessGetSlice'
import cmmSuccessCreateReducer from './slices/cmmSuccessCreateSlice'
import cmmSuccessUpdateReducer from './slices/cmmSuccessUpdateSlice'
import cmmSuccessDeleteReducer from './slices/cmmSuccessDeleteSlice'
import cmmNoteGetAllReducer from './slices/cmmNoteGetAllSlice'
import cmmNoteGetAllByManualReducer from './slices/cmmNoteGetAllByManualSlice'
import cmmNoteGetReducer from './slices/cmmNoteGetSlice'
import cmmNoteCreateReducer from './slices/cmmNoteCreateSlice'
import cmmNoteUpdateReducer from './slices/cmmNoteUpdateSlice'
import cmmNoteDeleteReducer from './slices/cmmNoteDeleteSlice'
import cmmQualityDescriptionReducer from './slices/cmmQualityDescriptionSlice'
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
import technicalDrawingCMMDescriptionReducer from './slices/technicalDrawingCMMDescriptionSlice'
import technicalDrawingFailureGetAllReducer from './slices/technicalDrawingFailureGetAllSlice'
import technicalDrawingFailureGetAllByDrawingReducer from './slices/technicalDrawingFailureGetAllByDrawingSlice'
import technicalDrawingFailureGetReducer from './slices/technicalDrawingFailureGetSlice'
import technicalDrawingFailureCreateReducer from './slices/technicalDrawingFailureCreateSlice'
import technicalDrawingFailureUpdateReducer from './slices/technicalDrawingFailureUpdateSlice'
import technicalDrawingFailureDeleteReducer from './slices/technicalDrawingFailureDeleteSlice'
import technicalDrawingFailureGetAllByCMMReducer from './slices/technicalDrawingFailureGetAllByCMMSlice'
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
import technicalDrawingVisualNoteCreateReducer from './slices/technicalDrawingVisualNoteCreateSlice'
import technicalDrawingFailureGetAllByQualityReducer from './slices/technicalDrawingFailureGetAllByQualitySlice'
import technicalDrawingVisualNoteGetReducer from './slices/technicalDrawingVisualNoteGetSlice'
import technicalDrawingVisualNoteGetAllByDrawingReducer from './slices/technicalDrawingVisualNoteGetAllByDrawingSlice'
import technicalDrawingVisualNoteDeleteReducer from './slices/technicalDrawingVisualNoteDeleteSlice'
import technicalDrawingNoteUpdateReducer from './slices/technicalDrawingNoteUpdateSlice'
import technicalDrawingNoteDeleteReducer from './slices/technicalDrawingNoteDeleteSlice'
import departmentGetAllReducer from './slices/departmentGetAllSlice'
import departmentGetReducer from './slices/departmentGetSlice'
import departmentCreateReducer from './slices/departmentCreateSlice'
import departmentUpdateReducer from './slices/departmentUpdateSlice'
import departmentDeleteReducer from './slices/departmentDeleteSlice'
import assemblyQualityGetAllByFailureReducer from './slices/assemblyQualityGetAllByFailureSlice'
import assemblyQualityGetAllReducer from './slices/assemblyQualityGetAllSlice'
import assemblyQualityDeleteReducer from './slices/assemblyQualityDeleteSlice'
import assemblyQualityGetReducer from './slices/assemblyQualityGetSlice'
import assemblyQualityCreateReducer from './slices/assemblyQualityCreateSlice'
import assemblyQualityUpdateReducer from './slices/assemblyQualityUpdateSlice'
import assemblyQualityDescriptionReducer from './slices/assemblyQualityDescriptionSlice'
import technicalDrawingQualityGetAllByFailureReducer from './slices/technicalDrawingQualityGetAllByFailureSlice'
import technicalDrawingQualityGetAllReducer from './slices/technicalDrawingQualityGetAllSlice'
import technicalDrawingQualityDeleteReducer from './slices/technicalDrawingQualityDeleteSlice'
import technicalDrawingQualityGetReducer from './slices/technicalDrawingQualityGetSlice'
import technicalDrawingQualityCreateReducer from './slices/technicalDrawingQualityCreateSlice'
import technicalDrawingQualityUpdateReducer from './slices/technicalDrawingQualityUpdateSlice'
import technicalDrawingQualityDescriptionReducer from './slices/technicalDrawingQualityDescriptionSlice'
import userGetAllReducer from './slices/userGetAllSlice'
import userGetReducer from './slices/userGetSlice'
import userCreateReducer from './slices/userCreateSlice'
import userUpdateReducer from './slices/userUpdateSlice'
import userDeleteReducer from './slices/userDeleteSlice'

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
        assemblyVisualNoteCreate: assemblyVisualNoteCreateReducer,
        assemblyVisualNoteGet: assemblyVisualNoteGetReducer,
        assemblyVisualNoteGetAllByDrawing: assemblyVisualNoteGetAllByDrawingReducer,
        assemblyVisualNoteDelete: assemblyVisualNoteDeleteReducer,
        assemblyNoteUpdate: assemblyNoteUpdateReducer,
        assemblyNoteDelete: assemblyNoteDeleteReducer,
        assemblySuccessGetAll: assemblySuccessGetAllReducer,
        assemblySuccessGetAllByManual: assemblySuccessGetAllByManualReducer,
        assemblySuccessGet: assemblySuccessGetReducer,
        assemblySuccessCreate: assemblySuccessCreateReducer,
        assemblySuccessUpdate: assemblySuccessUpdateReducer,
        assemblySuccessDelete: assemblySuccessDeleteReducer,
        assemblyFailureGetAllByQuality: assemblyFailureGetAllByQualityReducer,
        assemblyQualityGetAllByFailure: assemblyQualityGetAllByFailureReducer,
        assemblyQualityGetAll: assemblyQualityGetAllReducer,
        assemblyQualityGet: assemblyQualityGetReducer,
        assemblyQualityCreate: assemblyQualityCreateReducer,
        assemblyQualityUpdate: assemblyQualityUpdateReducer,
        assemblyQualityDelete: assemblyQualityDeleteReducer,
        assemblyQualityDescription: assemblyQualityDescriptionReducer,
        auth: authReducer,
        cmmAddFile: cmmAddFileReducer,
        cmmAddResultFile: cmmAddResultFileReducer,
        cmmGetAll: cmmGetAllReducer,
        cmmGet: cmmGetReducer,
        cmmCreate: cmmCreateReducer,
        cmmUpdate: cmmUpdateReducer,
        cmmDelete: cmmDeleteReducer,
        cmmModuleGetAll: cmmModuleGetAllReducer,
        cmmModuleGet: cmmModuleGetReducer,
        cmmModuleCreate: cmmModuleCreateReducer,
        cmmModuleUpdate: cmmModuleUpdateReducer,
        cmmModuleDelete: cmmModuleDeleteReducer,
        cmmFailureGetAll: cmmFailureGetAllReducer,
        cmmFailureGetAllByManual: cmmFailureGetAllByManualReducer,
        cmmFailureGet: cmmFailureGetReducer,
        cmmFailureCreate: cmmFailureCreateReducer,
        cmmFailureUpdate: cmmFailureUpdateReducer,
        cmmFailureDelete: cmmFailureDeleteReducer,
        cmmSuccessGetAll: cmmSuccessGetAllReducer,
        cmmSuccessGetAllByManual: cmmSuccessGetAllByManualReducer,
        cmmSuccessGet: cmmSuccessGetReducer,
        cmmSuccessCreate: cmmSuccessCreateReducer,
        cmmSuccessUpdate: cmmSuccessUpdateReducer,
        cmmSuccessDelete: cmmSuccessDeleteReducer,
        cmmNoteGetAll: cmmNoteGetAllReducer,
        cmmNoteGetAllByManual: cmmNoteGetAllByManualReducer,
        cmmNoteGet: cmmNoteGetReducer,
        cmmNoteCreate: cmmNoteCreateReducer,
        cmmNoteUpdate: cmmNoteUpdateReducer,
        cmmNoteDelete: cmmNoteDeleteReducer,
        cmmQualityDescription: cmmQualityDescriptionReducer,
        departmentGetAll: departmentGetAllReducer,
        departmentGet: departmentGetReducer,
        departmentCreate: departmentCreateReducer,
        departmentUpdate: departmentUpdateReducer,
        departmentDelete: departmentDeleteReducer,
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
        technicalDrawingFailureGetAllByCMM: technicalDrawingFailureGetAllByCMMReducer,
        technicalDrawingNoteGetAll: technicalDrawingNoteGetAllReducer,
        technicalDrawingNoteGetAllByDrawing: technicalDrawingNoteGetAllByDrawingReducer,
        technicalDrawingNoteGet: technicalDrawingNoteGetReducer,
        technicalDrawingNoteCreate: technicalDrawingNoteCreateReducer,
        technicalDrawingCMMDescription: technicalDrawingCMMDescriptionReducer,
        technicalDrawingVisualNoteCreate: technicalDrawingVisualNoteCreateReducer,
        technicalDrawingVisualNoteGet: technicalDrawingVisualNoteGetReducer,
        technicalDrawingVisualNoteGetAllByDrawing: technicalDrawingVisualNoteGetAllByDrawingReducer,
        technicalDrawingFailureGetAllByQuality: technicalDrawingFailureGetAllByQualityReducer,
        technicalDrawingVisualNoteDelete: technicalDrawingVisualNoteDeleteReducer,
        technicalDrawingNoteUpdate: technicalDrawingNoteUpdateReducer,
        technicalDrawingNoteDelete: technicalDrawingNoteDeleteReducer,
        technicalDrawingSuccessGetAll: technicalDrawingSuccessGetAllReducer,
        technicalDrawingSuccessGetAllByDrawing: technicalDrawingSuccessGetAllByDrawingReducer,
        technicalDrawingSuccessGet: technicalDrawingSuccessGetReducer,
        technicalDrawingSuccessCreate: technicalDrawingSuccessCreateReducer,
        technicalDrawingSuccessUpdate: technicalDrawingSuccessUpdateReducer,
        technicalDrawingSuccessDelete: technicalDrawingSuccessDeleteReducer,
        technicalDrawingQualityGetAllByFailure: technicalDrawingQualityGetAllByFailureReducer,
        technicalDrawingQualityGetAll: technicalDrawingQualityGetAllReducer,
        technicalDrawingQualityGet: technicalDrawingQualityGetReducer,
        technicalDrawingQualityCreate: technicalDrawingQualityCreateReducer,
        technicalDrawingQualityUpdate: technicalDrawingQualityUpdateReducer,
        technicalDrawingQualityDelete: technicalDrawingQualityDeleteReducer,
        technicalDrawingQualityDescription: technicalDrawingQualityDescriptionReducer,
        userGetAll: userGetAllReducer,
        userGet: userGetReducer,
        userCreate: userCreateReducer,
        userUpdate: userUpdateReducer,
        userDelete: userDeleteReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: process.env.NODE_ENV !== 'production',
});