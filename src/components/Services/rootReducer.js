import {combineReducers} from "redux";
import StudentReducer from './Student/StudentReducer'
import LoginReducer from './Login/LoginReducer'
import AuthApiReducer from "./AuthApi/AuthApiReducer";
import StudentListReducer from "./Student/StudentListReducer";
import StdModelControlReducer from "./StdModelControl/StdModelControlReducer";
import LecturerCoursesReducer from "./Lecturer/LecturerCoursesReducer";
import StudentCourseBYCourseSsnReducer from "./Student/StudentCourseBYCourseSsnReducer"
import LoginAsReducer from "./LoginAs/LoginAsReducer";
import CampusListReducer from "./Campus/CampusListReducer";
import SchoolListReducer from "./School/SchoolListReducer";
import ProgrammeListReducer from "./Programme/ProgrammeListReducer";
import LecturerListReducer from "./Lecturer/LecturerListReducer";
import UserListReducer from "./User/UserListReducer";
import CampusReducer from "./Campus/CampusReducer";
import SchoolReducer from "./School/SchoolReducer";
import ProgrammeReducer from "./Programme/ProgrammeReducer";
import LecturerReducer from "./Lecturer/LecturerReducer";
import UserReducer from "./User/UserReducer";



const rootReducer = combineReducers ({
    student: StudentReducer,
    studentList:StudentListReducer,
    lecturerList: LecturerListReducer,
    lecturer: LecturerReducer,
    user: LoginReducer,
    auth: AuthApiReducer,
    stdModalControl: StdModelControlReducer,
    lecturer_courseList: LecturerCoursesReducer,
    studentCourseListByCSsn:StudentCourseBYCourseSsnReducer,
    LoginAsOpen:LoginAsReducer,
    CampusList:CampusListReducer,
    Campus:CampusReducer,
    SchoolList:SchoolListReducer,
    School:SchoolReducer,
    ProgrammeList:ProgrammeListReducer,
    Programme:ProgrammeReducer,
    userList:UserListReducer,
    user1:UserReducer,
})

export default rootReducer;