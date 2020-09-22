import {combineReducers} from "redux";
import StudentReducer from './Student/StudentReducer'
import LecturerReducer from './Lecturer/LecturerReducer'
import LoginReducer from './Login/LoginReducer'
import AuthApiReducer from "./AuthApi/AuthApiReducer";
import StudentListReducer from "./Student/StudentListReducer";
import StdModelControlReducer from "./StdModelControl/StdModelControlReducer";
import LecturerCoursesReducer from "./Lecturer/LecturerCoursesReducer";
import StudentCourseBYCourseSsnReducer from "./Student/StudentCourseBYCourseSsnReducer"
import LoginAsReducer from "./LoginAs/LoginAsReducer";



const rootReducer = combineReducers ({
    student: StudentReducer,
    studentList:StudentListReducer,
    lecturer: LecturerReducer,
    user: LoginReducer,
    auth: AuthApiReducer,
    stdModalControl: StdModelControlReducer,
    lecturer_courseList: LecturerCoursesReducer,
    studentCourseListByCSsn:StudentCourseBYCourseSsnReducer,
    LoginAsOpen:LoginAsReducer
})

export default rootReducer;