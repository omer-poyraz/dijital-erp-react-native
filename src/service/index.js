import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASSEMBLY_FAILURE_CREATE, ASSEMBLY_FAILURE_DELETE, ASSEMBLY_FAILURE_GET, ASSEMBLY_FAILURE_GETALL, ASSEMBLY_FAILURE_GETALLBYMANUAL, ASSEMBLY_FAILURE_UPDATE, ASSEMBLY_MANUAL_ADDFILE, ASSEMBLY_MANUAL_CREATE, ASSEMBLY_MANUAL_DELETE, ASSEMBLY_MANUAL_GET, ASSEMBLY_MANUAL_GETALL, ASSEMBLY_MANUAL_UPDATE, ASSEMBLY_NOTE_CREATE, ASSEMBLY_NOTE_DELETE, ASSEMBLY_NOTE_GET, ASSEMBLY_NOTE_GETALL, ASSEMBLY_NOTE_GETALLBYMANUAL, ASSEMBLY_NOTE_UPDATE, ASSEMBLY_QUALITY_CREATE, ASSEMBLY_QUALITY_DELETE, ASSEMBLY_QUALITY_GET, ASSEMBLY_QUALITY_GETALL, ASSEMBLY_QUALITY_GETALLBYFAILURE, ASSEMBLY_QUALITY_UPDATE, ASSEMBLY_SUCCESS_CREATE, ASSEMBLY_SUCCESS_DELETE, ASSEMBLY_SUCCESS_GET, ASSEMBLY_SUCCESS_GETALL, ASSEMBLY_SUCCESS_GETALLBYMANUAL, ASSEMBLY_SUCCESS_UPDATE, ASSEMBLY_VISUAL_NOTE_CREATE, ASSEMBLY_VISUAL_NOTE_DELETE, ASSEMBLY_VISUAL_NOTE_GET, ASSEMBLY_VISUAL_NOTE_GETALL, ASSEMBLY_VISUAL_NOTE_GETALLBYDRAWING, DEPARTMENT_CREATE, DEPARTMENT_DELETE, DEPARTMENT_GET, DEPARTMENT_GETALL, DEPARTMENT_UPDATE, EMPLOYEE_CREATE, EMPLOYEE_DELETE, EMPLOYEE_GET, EMPLOYEE_GETALL, EMPLOYEE_UPDATE, LOGIN, REGISTER, RESET_PASSWORD_SERVICE, TECHNICALDRAWING_ADDFILE, TECHNICALDRAWING_CREATE, TECHNICALDRAWING_DELETE, TECHNICALDRAWING_FAILURE_CREATE, TECHNICALDRAWING_FAILURE_DELETE, TECHNICALDRAWING_FAILURE_GET, TECHNICALDRAWING_FAILURE_GETALL, TECHNICALDRAWING_FAILURE_GETALLBYDRAWING, TECHNICALDRAWING_FAILURE_UPDATE, TECHNICALDRAWING_GET, TECHNICALDRAWING_GETALL, TECHNICALDRAWING_NOTE_CREATE, TECHNICALDRAWING_NOTE_DELETE, TECHNICALDRAWING_NOTE_GET, TECHNICALDRAWING_NOTE_GETALL, TECHNICALDRAWING_NOTE_GETALLBYDRAWING, TECHNICALDRAWING_NOTE_UPDATE, TECHNICALDRAWING_QUALITY_CREATE, TECHNICALDRAWING_QUALITY_DELETE, TECHNICALDRAWING_QUALITY_GET, TECHNICALDRAWING_QUALITY_GETALL, TECHNICALDRAWING_QUALITY_GETALLBYFAILURE, TECHNICALDRAWING_QUALITY_UPDATE, TECHNICALDRAWING_SUCCESS_CREATE, TECHNICALDRAWING_SUCCESS_DELETE, TECHNICALDRAWING_SUCCESS_GET, TECHNICALDRAWING_SUCCESS_GETALL, TECHNICALDRAWING_SUCCESS_GETALLBYDRAWING, TECHNICALDRAWING_SUCCESS_UPDATE, TECHNICALDRAWING_UPDATE, TECHNICALDRAWING_VISUAL_NOTE_CREATE, TECHNICALDRAWING_VISUAL_NOTE_DELETE, TECHNICALDRAWING_VISUAL_NOTE_GET, TECHNICALDRAWING_VISUAL_NOTE_GETALL, TECHNICALDRAWING_VISUAL_NOTE_GETALLBYDRAWING, USER_DELETE, USER_GET, USER_GETALL, USER_UPDATE } from "../api";

let token = "";
let userId = "";
let user = "";
let header = "";
let headerFormData = "";
let isLoading = true;

const init = async () => {
    try {
        const authData = await AsyncStorage.getItem('auth');
        if (authData) {
            user = JSON.parse(authData);
            token = user.accessToken || "";
            userId = user.userId || "";
        } else {
            userId = "";
        }

        header = { headers: { "Authorization": `Bearer ${token}` } };
        headerFormData = { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "multipart/form-data" } };
    } catch (error) {
        console.error("Bir hata oluştu:", error);
    } finally {
        isLoading = false;
    }
};

const useInit = async () => {
    await init();
    try {
        await init();
    } catch (error) {
        console.error("Init error:", error);
    }
};

useInit();


const refreshTokenIfNeeded = async () => {
    const authData = await AsyncStorage.getItem('auth');
    if (!authData) return;
    const user = JSON.parse(authData);
    const accessToken = user.accessToken;
    const refreshToken = user.refreshToken;
    const refreshTokenExpireTime = user.refreshTokenExpireTime;

    const expireDate = new Date(refreshTokenExpireTime);
    const now = new Date();
    if (expireDate - now < 2 * 60 * 1000) {
        try {
            const res = await axios.post(REFRESH, {
                accessToken,
                refreshToken
            });
            if (res.data?.result) {
                await AsyncStorage.setItem('auth', JSON.stringify({
                    ...user,
                    accessToken: res.data.result.accessToken,
                    refreshToken: res.data.result.refreshToken,
                    refreshTokenExpireTime: res.data.result.user.refreshTokenExpireTime
                }));
                token = res.data.result.accessToken;
                header = { headers: { "Authorization": `Bearer ${token}` } };
                headerFormData = { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "multipart/form-data" } };
            }
        } catch (err) {
            console.log("Refresh token hatası:", err);
        }
    }
};

axios.interceptors.request.use(
    async (config) => {
        await refreshTokenIfNeeded();
        const authData = await AsyncStorage.getItem('auth');
        if (authData) {
            const user = JSON.parse(authData);
            config.headers["Authorization"] = `Bearer ${user.accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


// AUTHENTICATION
export async function login(formData) {
    try {
        const response = await axios.post(LOGIN, formData);
        return response.data;
    } catch (error) {
        return { isSuccess: false, message: "Bağlantı hatası: " + error.message };
    }
}

export const logout = () => {
    return Promise.resolve(true);
};
// AUTHENTICATION_END


// ASSEMBLY_MANUAL
export function AssemblyManualGetAllService() {
    return axios.get(ASSEMBLY_MANUAL_GETALL, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyManualGetService(id) {
    return axios.get(`${ASSEMBLY_MANUAL_GET}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyManualCreateService(data) {
    return axios.post(ASSEMBLY_MANUAL_CREATE, data, headerFormData)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyManualUpdateService(data) {
    return axios.put(ASSEMBLY_MANUAL_UPDATE, data, headerFormData)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyManualAddFileService(data) {
    return axios.put(ASSEMBLY_MANUAL_ADDFILE, data, headerFormData)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyManualDeleteService(id) {
    return axios.delete(`${ASSEMBLY_MANUAL_DELETE}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
// ASSEMBLY_MANUAL_END


// ASSEMBLY_FAILURE
export function AssemblyFailureGetAllService() {
    return axios.get(ASSEMBLY_FAILURE_GETALL, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyFailureGetAllByManualService(id) {
    return axios.get(`${ASSEMBLY_FAILURE_GETALLBYMANUAL}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyFailureGetService(id) {
    return axios.get(`${ASSEMBLY_FAILURE_GET}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyFailureCreateService(data) {
    return axios.post(ASSEMBLY_FAILURE_CREATE, data, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyFailureUpdateService(data) {
    return axios.put(ASSEMBLY_FAILURE_UPDATE, data, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyFailureDeleteService(id) {
    return axios.delete(`${ASSEMBLY_FAILURE_DELETE}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
// ASSEMBLY_FAILURE_END


// ASSEMBLY_SUCCESS
export function AssemblySuccessGetAllService() {
    return axios.get(ASSEMBLY_SUCCESS_GETALL, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblySuccessGetAllByManualService(id) {
    return axios.get(`${ASSEMBLY_SUCCESS_GETALLBYMANUAL}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblySuccessGetService(id) {
    return axios.get(`${ASSEMBLY_SUCCESS_GET}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblySuccessCreateService(data) {
    return axios.post(ASSEMBLY_SUCCESS_CREATE, data, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblySuccessUpdateService(data) {
    return axios.put(ASSEMBLY_SUCCESS_UPDATE, data, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblySuccessDeleteService(id) {
    return axios.delete(`${ASSEMBLY_SUCCESS_DELETE}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
// ASSEMBLY_SUCCESS_END


// ASSEMBLY_NOTE
export function AssemblyNoteGetAllService() {
    return axios.get(ASSEMBLY_NOTE_GETALL, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyNoteGetAllByManualService(id) {
    return axios.get(`${ASSEMBLY_NOTE_GETALLBYMANUAL}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyNoteGetService(id) {
    return axios.get(`${ASSEMBLY_NOTE_GET}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyNoteCreateService(data) {
    return axios.post(ASSEMBLY_NOTE_CREATE, data, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyNoteUpdateService(data) {
    return axios.put(ASSEMBLY_NOTE_UPDATE, data, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyNoteDeleteService(id) {
    return axios.delete(`${ASSEMBLY_NOTE_DELETE}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
// ASSEMBLY_NOTE_END


// ASSEMBLY_VISUAL_NOTE
export function AssemblyVisualNoteGetAllService() {
    return axios.get(ASSEMBLY_VISUAL_NOTE_GETALL, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyVisualNoteGetAllByDrawingService(id) {
    return axios.get(`${ASSEMBLY_VISUAL_NOTE_GETALLBYDRAWING}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyVisualNoteGetService(id) {
    return axios.get(`${ASSEMBLY_VISUAL_NOTE_GET}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyVisualNoteCreateService(data) {
    return axios.post(ASSEMBLY_VISUAL_NOTE_CREATE, data, headerFormData)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyVisualNoteDeleteService(id) {
    return axios.delete(`${ASSEMBLY_VISUAL_NOTE_DELETE}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
// ASSEMBLY_VISUAL_NOTE_END


// ASSEMBLY_QUALITY
export function AssemblyQualityGetAllService() {
    return axios.get(ASSEMBLY_QUALITY_GETALL, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyQualityGetAllByFailureService(id) {
    return axios.get(`${ASSEMBLY_QUALITY_GETALLBYFAILURE}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyQualityGetService(id) {
    return axios.get(`${ASSEMBLY_QUALITY_GET}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyQualityCreateService(data) {
    return axios.post(ASSEMBLY_QUALITY_CREATE, data, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyQualityUpdateService(data) {
    return axios.put(ASSEMBLY_QUALITY_UPDATE, data, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyQualityDeleteService(id) {
    return axios.delete(`${ASSEMBLY_QUALITY_DELETE}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
// ASSEMBLY_QUALITY_END


// DEPARTMENT
export function DepartmentGetAllService() {
    return axios.get(DEPARTMENT_GETALL, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function DepartmentGetService(id) {
    return axios.get(`${DEPARTMENT_GET}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function DepartmentCreateService(data) {
    return axios.post(DEPARTMENT_CREATE, data, headerFormData)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function DepartmentUpdateService(data) {
    return axios.put(DEPARTMENT_UPDATE, data, headerFormData)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function DepartmentDeleteService(id) {
    return axios.delete(`${DEPARTMENT_DELETE}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
// DEPARTMENT_END


// EMPLOYEE
export function EmployeeGetAllService() {
    return axios.get(EMPLOYEE_GETALL, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function EmployeeGetService(id) {
    return axios.get(`${EMPLOYEE_GET}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function EmployeeCreateService(data) {
    return axios.post(EMPLOYEE_CREATE, data, headerFormData)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function EmployeeUpdateService(data) {
    return axios.put(EMPLOYEE_UPDATE, data, headerFormData)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function EmployeeDeleteService(id) {
    return axios.delete(`${EMPLOYEE_DELETE}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
// EMPLOYEE_END


// TECHNICALDRAWING
export function TechnicalDrawingGetAllService() {
    return axios.get(TECHNICALDRAWING_GETALL, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function TechnicalDrawingGetService(id) {
    return axios.get(`${TECHNICALDRAWING_GET}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function TechnicalDrawingCreateService(data) {
    return axios.post(TECHNICALDRAWING_CREATE, data, headerFormData)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function TechnicalDrawingUpdateService(data) {
    return axios.put(TECHNICALDRAWING_UPDATE, data, headerFormData)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function TechnicalDrawingAddFileService(data) {
    return axios.put(TECHNICALDRAWING_ADDFILE, data, headerFormData)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function TechnicalDrawingDeleteService(id) {
    return axios.delete(`${TECHNICALDRAWING_DELETE}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
// TECHNICALDRAWING_END


// TECHNICALDRAWING_FAILURE
export function TechnicalDrawingFailureGetAllService() {
    return axios.get(TECHNICALDRAWING_FAILURE_GETALL, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function TechnicalDrawingFailureGetAllByDrawingService(id) {
    return axios.get(`${TECHNICALDRAWING_FAILURE_GETALLBYDRAWING}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function TechnicalDrawingFailureGetService(id) {
    return axios.get(`${TECHNICALDRAWING_FAILURE_GET}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function TechnicalDrawingFailureCreateService(data) {
    return axios.post(TECHNICALDRAWING_FAILURE_CREATE, data, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function TechnicalDrawingFailureUpdateService(data) {
    return axios.put(TECHNICALDRAWING_FAILURE_UPDATE, data, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function TechnicalDrawingFailureDeleteService(id) {
    return axios.delete(`${TECHNICALDRAWING_FAILURE_DELETE}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
// TECHNICALDRAWING_FAILURE_END


// TECHNICALDRAWING_SUCCESS
export function TechnicalDrawingSuccessGetAllService() {
    return axios.get(TECHNICALDRAWING_SUCCESS_GETALL, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function TechnicalDrawingSuccessGetAllByDrawingService(id) {
    return axios.get(`${TECHNICALDRAWING_SUCCESS_GETALLBYDRAWING}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function TechnicalDrawingSuccessGetService(id) {
    return axios.get(`${TECHNICALDRAWING_SUCCESS_GET}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function TechnicalDrawingSuccessCreateService(data) {
    return axios.post(TECHNICALDRAWING_SUCCESS_CREATE, data, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function TechnicalDrawingSuccessUpdateService(data) {
    return axios.put(TECHNICALDRAWING_SUCCESS_UPDATE, data, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function TechnicalDrawingSuccessDeleteService(id) {
    return axios.delete(`${TECHNICALDRAWING_SUCCESS_DELETE}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
// TECHNICALDRAWING_SUCCESS_END


// TECHNICALDRAWING_NOTE
export function TechnicalDrawingNoteGetAllService() {
    return axios.get(TECHNICALDRAWING_NOTE_GETALL, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function TechnicalDrawingNoteGetAllByDrawingService(id) {
    return axios.get(`${TECHNICALDRAWING_NOTE_GETALLBYDRAWING}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function TechnicalDrawingNoteGetService(id) {
    return axios.get(`${TECHNICALDRAWING_NOTE_GET}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function TechnicalDrawingNoteCreateService(data) {
    return axios.post(TECHNICALDRAWING_NOTE_CREATE, data, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function TechnicalDrawingNoteUpdateService(data) {
    return axios.put(TECHNICALDRAWING_NOTE_UPDATE, data, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function TechnicalDrawingNoteDeleteService(id) {
    return axios.delete(`${TECHNICALDRAWING_NOTE_DELETE}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
// TECHNICALDRAWING_NOTE_END


// TECHNICALDRAWING_VISUAL_NOTE
export function TechnicalDrawingVisualNoteGetAllService() {
    return axios.get(TECHNICALDRAWING_VISUAL_NOTE_GETALL, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function TechnicalDrawingVisualNoteGetAllByDrawingService(id) {
    return axios.get(`${TECHNICALDRAWING_VISUAL_NOTE_GETALLBYDRAWING}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function TechnicalDrawingVisualNoteGetService(id) {
    return axios.get(`${TECHNICALDRAWING_VISUAL_NOTE_GET}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function TechnicalDrawingVisualNoteCreateService(data) {
    return axios.post(TECHNICALDRAWING_VISUAL_NOTE_CREATE, data, headerFormData)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function TechnicalDrawingVisualNoteDeleteService(id) {
    return axios.delete(`${TECHNICALDRAWING_VISUAL_NOTE_DELETE}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
// TECHNICALDRAWING_VISUAL_NOTE_END


// TECHNICALDRAWING_QUALITY
export function TechnicalDrawingQualityGetAllService() {
    return axios.get(TECHNICALDRAWING_QUALITY_GETALL, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function TechnicalDrawingQualityGetAllByFailureService(id) {
    return axios.get(`${TECHNICALDRAWING_QUALITY_GETALLBYFAILURE}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function TechnicalDrawingQualityGetService(id) {
    return axios.get(`${TECHNICALDRAWING_QUALITY_GET}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function TechnicalDrawingQualityCreateService(data) {
    return axios.post(TECHNICALDRAWING_QUALITY_CREATE, data, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function TechnicalDrawingQualityUpdateService(data) {
    return axios.put(TECHNICALDRAWING_QUALITY_UPDATE, data, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function TechnicalDrawingQualityDeleteService(id) {
    return axios.delete(`${TECHNICALDRAWING_QUALITY_DELETE}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
// TECHNICALDRAWING_QUALITY_END


// USER
export function ResetPassordService(mail) {
    return axios.get(RESET_PASSWORD_SERVICE, { "mail": mail }, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}

export function UserCreate(data) {
    return axios.post(REGISTER, data, headerFormData)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}

export function UserUpdate(data) {
    return axios.put(USER_UPDATE, data, headerFormData)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}

export function UserDelete(id) {
    return axios.delete(`${USER_DELETE}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}

export function UserGetAll(search, pageNumber, pageSize) {
    return axios.get(`${USER_GETALL}?searchTerm=${search}&pageNumber=${pageNumber}&pageSize=${pageSize}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}

export function UserGet(id) {
    return axios.get(`${USER_GET}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
// USER_END