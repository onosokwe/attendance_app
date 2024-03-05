import axios from "axios";
import instance from "./instance";

const baseURL = "https://kloka-api-b0c0cc5775ef.herokuapp.com/api";
// const baseURL = "http://localhost:9000/api";

const getLoggedInUser = async (token) => {
  const response = await axios.get(
    `${baseURL}/user/mine`,
    { headers: { Authorization: `Bearer ${token}`, }, }
  );
  return response;
};

const logoutUser = async (TOKEN) => {
  console.log(TOKEN)
  const response = await instance.post("/user/logout", TOKEN);
  console.log(response)
  return response;
};

const getUserRadius = async (lat, lon, opts, token) => {
  const { data } = await axios.post(
    `${baseURL}/attendance/address`,
    { lat, lon },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      opts,
    }
  );
  return data;
};

// projects
const addProject = async (data) => {
  const response = await instance.post("/projects/create", data);
  return response;
};
const getProjects = async () => {
  const response = await instance.get("/projects/mine");
  return response;
};
const getMyTeamProjects = async () => {
  const response = await instance.get("/projects/team");
  return response;
};
const getProject = async (id) => {
  const response = await instance.get(`/projects/mine/${id}`);
  return response;
};
const updateProject = async (data, id) => {
  const response = await instance.put(`/projects/${id}`, data);
  return response;
};
const deleteProject = async (id) => {
  const response = await instance.delete(`/projects/${id}`);
  return response;
};
const projectAnalytics = async (data) => {
  const response = await instance.post(`/projects/analytics`, data);
  return response;
};
const newProjectAnalytics = async (data) => {
  const response = await instance.post(`/projects/newanalytics`, data);
  return response;
};

// task
const addTask = async (data) => {
  const response = await instance.post("/tasks/create", data);
  return response;
};
const getTasks = async () => {
  const response = await instance.get("/tasks/mine");
  return response;
};
const getMyTasks = async () => {
  const response = await instance.get("/tasks/mine/mine");
  return response;
};
const getMyPendingTasks = async () => {
  const response = await instance.get("/tasks/mine/pending");
  return response;
};
const getTask = async (id) => {
  const response = await instance.get(`/tasks/mine/${id}`);
  return response;
};
const getProjectTasks = async (id) => {
  const response = await instance.get(`/tasks/project/${id}`);
  return response;
};
const updateTask = async (data, id) => {
  const response = await instance.put(`/tasks/${id}`, data);
  return response;
};
const approveTask = async (id) => {
  const response = await instance.patch(`/tasks/${id}`);
  return response;
};
const disapproveTask = async (id) => {
  const response = await instance.patch(`/tasks/disapprove/${id}`);
  return response;
};

const approveManyTasks = async (data) => {
  const response = await instance.post(`/tasks/approve/many`, data);
  return response;
};
const disapproveManyTasks = async (data) => {
  const response = await instance.post(`/tasks/disapprove/many`, data);
  return response;
};
const deleteTask = async (id) => {
  const response = await instance.delete(`/tasks/${id}`);
  return response;
};

// timesheets
const addTimesheet = async (data) => {
  const response = await instance.post("/timesheet/create", data);
  return response;
};
const getTimesheets = async () => {
  const response = await instance.get("/timesheet/all");
  return response;
};
const getTimesheet = async (id) => {
  const response = await instance.get(`/timesheet/${id}`);
  return response;
};
const updateTimesheet = async (data, id) => {
  const response = await instance.put(`/timesheet/${id}`, data);
  return response;
};
const approveTimesheet = async (data, id) => {
  const response = await instance.patch(`/timesheet/${id}`, data);
  return response;
};
const deleteTimesheet = async (id) => {
  const response = await instance.delete(`/timesheet/${id}`);
  return response;
};

// workschedule
const addSchedule = async (data) => {
  const response = await instance.post("/schedule/create", data);
  return response;
};
const getSchedules = async (group) => {
  let response;
  if(group === 1){
    response = await instance.get(`/schedule/${group}`);
  }else if (group === 2){
    response = await instance.get(`/schedule/${group}`);
  }else if(group === 3) {
    response = await instance.get(`/schedule/${group}`);
  }
  return response;
};
const getSchedule = async (id) => {
  const response = await instance.get(`/schedule/${id}`);
  return response;
};
const updateSchedule = async (data, id) => {
  const response = await instance.put(`/schedule/${id}`, data);
  return response;
};
const deleteSchedule = async (id) => {
  const response = await instance.delete(`/schedule/${id}`);
  return response;
};



// manage employees
const addAdmin = async (data) => {
  const formData = new FormData();
  for (const property in data) {
    formData.append(property, data[property]);
  }
  const response = await instance.post(`/user/signup`, formData);
  return response;
};
const createAdmin = async (data) => {
  const response = await instance.post(`/user/create`, data);
  return response;
};
const getAllAdmins = async () => {
  const response = await instance.get("/user/all");
  return response;
};
const getOneAdmin = async (id) => {
  const response = await instance.get(`/user/one/${id}`);
  return response;
};
const updateAdmin = async (data, id) => {
  const response = await instance.put(`/user/one/${id}`, data);
  return response;
};
const getTeamMates = async () => {
  const response = await instance.get("/user/team");
  return response;
};
// workgroup
const getGroups = async () => {
  const response = await instance.get("/user/group");
  return response;
};
const updatePassword = async (data) => {
  const response = await instance.post(`/user/password`, data);
  return response;
};
const forgotPassword = async (data) => {
  const response = await instance.post(`/user/forgotpass`, data);
  return response;
};
const getResetUserDataByToken = async (id) => {
  const response = await instance.post(`/user/resetuser/${id}`);
  return response;
};
const resetPassword = async (id) => {
  const response = await instance.post(`/user/resetpassword/${id}`);
  return response;
};
const uploadPhoto = async (data) => {
  const formData = new FormData();
  for (const property in data) {
    formData.append(property, data[property]);
  }
  const response = await instance.post("/user/photo", formData);
  return response;
};

// grades
const addGrade = async (data) => {
  const response = await instance.post("/grades/create", data);
  return response;
};
const getGrades = async () => {
  const response = await instance.get("/grades/all");
  return response;
};
const getGradeStaffs = async (id) => {
  const response = await instance.get(`/grades/staff/${id}`);
  return response;
};
const updateGrade = async (data, id) => {
  const response = await instance.post(`/grades/${id}`, data);
  return response;
};
const deleteGrade = async (id) => {
  const response = await instance.delete(`/grades/${id}`);
  return response;
};

// jobtitle
const addJobTitle = async (data) => {
  const response = await instance.post("/jobtitle/create", data);
  return response;
};
const getJobTitles = async () => {
  const response = await instance.get("/jobtitle/all");
  return response;
};
const getJobTitleStaffs = async (id) => {
  const response = await instance.get(`/jobtitle/staff/${id}`);
  return response;
};
const updateJobTitle = async (data, id) => {
  const response = await instance.post(`/jobtitle/${id}`, data);
  return response;
};
const deleteJobTitle = async (id) => {
  const response = await instance.delete(`/jobtitle/${id}`);
  return response;
};

// teams
const addTeam = async (data) => {
  const response = await instance.post("/teams/create", data);
  return response;
};
const getTeams = async () => {
  const response = await instance.get("/teams/all");
  return response;
};
const getTeam = async (id) => {
  const response = await instance.get(`/teams/${id}`);
  return response;
};
const getTeamMembers = async (id) => {
  const response = await instance.get(`/teams/${id}/members`);
  return response;
};

// attendance
const getMyAddress = async (data) => {
  const response = await instance.post("/attendance/address", data);
  return response;
};
const clockStaffIn = async (data) => {
  const response = await instance.post("/attendance/clockin", data);
  return response;
};
const getMyLastClockin = async () => {
  const response = await instance.get(`/attendance/last`);
  return response;
};
const getTodaysAttendances = async () => {
  const response = await instance.get(`/attendance/today`);
  return response;
};
const getAllAttendances = async () => {
  const response = await instance.get(`/attendance/all`);
  return response;
};
const getMyAttendances = async () => {
  const response = await instance.get(`/attendance/mine`);
  return response;
};
const getMyAttendance = async (id) => {
  const response = await instance.get(`/attendance/mine/${id}`);
  return response;
};
const clockStaffOut = async (data) => {
  const response = await instance.put(`/attendance/clockout/${data.id}`, data);
  return response;
};
const clockOutAll= async () => {
  const response = await instance.post("/attendance/clockoutall");
  return response;
};
const attendanceAnalytics = async (data) => {
  const response = await instance.post("/attendance/analytics", data);
  return response;
};
const sendNotif = async () => {
  const response = await instance.post("/attendance/notification");
  return response;
};

// goalsokr
const addKPD = async (data) => {
  const response = await instance.post("/goalsokr/kpd/create", data);
  return response;
};
const getKPDs = async () => {
  const response = await instance.get("/goalsokr/kpd/all");
  return response;
};
const getMyKPDs = async () => {
  const response = await instance.get(`/goalsokr/kpd/mine`);
  return response;
};
const getKPD = async (id) => {
  const response = await instance.get(`/goalsokr/kpd/one/${id}`);
  return response;
};
const updateKPD = async (data, id) => {
  const response = await instance.post(`/goalsokr/kpd/${id}`, data);
  return response;
};
const deleteKPD = async (id) => {
  const response = await instance.delete(`/goalsokr/kpd/${id}`);
  return response;
};
const getKPDKPIs = async (id) => {
  const response = await instance.get(`/goalsokr/kpd/kpi/${id}`);
  return response;
};

const addKPI = async (data) => {
  const response = await instance.post("/goalsokr/kpi/create", data);
  return response;
};
const getKPIs = async () => {
  const response = await instance.get("/goalsokr/kpi/all");
  return response;
};
const getMyKPIs = async () => {
  const response = await instance.get(`/goalsokr/kpi/mine`);
  return response;
};
const getKPI = async (id) => {
  const response = await instance.get(`/goalsokr/kpi/one/${id}`);
  return response;
};
const updateKPI = async (data, id) => {
  const response = await instance.post(`/goalsokr/kpi/${id}`, data);
  return response;
};
const deleteKPI = async (id) => {
  const response = await instance.delete(`/goalsokr/kpi/${id}`);
  return response;
};

// leave
const addLeave = async (data) => {
  const formData = new FormData();
  for (const property in data) {
    formData.append(property, data[property]);
  }
  const response = await instance.post("/leave/create", formData);
  return response;
};
const getLeaves = async () => {
  const response = await instance.get("/leave/all");
  return response;
};
const getMyLeaves = async () => {
  const response = await instance.get(`/leave/mine`);
  return response;
};
const getLeave = async (id) => {
  const response = await instance.get(`/leave/one/${id}`);
  return response;
};
const approveLeave = async (data, id) => {
  const response = await instance.patch(`/leave/approve/${id}`, data);
  return response;
};
const disapproveLeave = async (data, id) => {
  const response = await instance.patch(`/leave/disapprove/${id}`, data);
  return response;
};

const submitLeave = async (data, id) => {
  const response = await instance.post(`/leave/submit/${id}`, data);
  return response;
};
const reviewLeave = async (data, id) => {
  const response = await instance.patch(`/leave/review/${id}`, data);
  return response;
};
const declineLeave = async (data, id) => {
  const response = await instance.patch(`/leave/decline/${id}`, data);
  return response;
};

const resumeLeave = async (data, id) => {
  const response = await instance.post(`/leave/resume/${id}`, data);
  return response;
};
const deleteLeave = async (id) => {
  const response = await instance.delete(`/leave/${id}`);
  return response;
};

// appraisal
const addAppraisal  = async (data) => {
  const response = await instance.post("/appraisal/create", data);
  return response;
};
const getAppraisals = async () => {
  const response = await instance.get("/appraisal/all");
  return response;
};
const getMyAppraisals = async () => {
  const response = await instance.get(`/appraisal/mine`);
  return response;
};
const getAppraisal = async (id) => {
  const response = await instance.get(`/appraisal/one/${id}`);
  return response;
};
const approveAppraisal = async (data, id) => {
  const response = await instance.patch(`/appraisal/approve/${id}`, data);
  return response;
};
const disapproveAppraisal = async (data, id) => {
  const response = await instance.post(`/appraisal/disapprove/${id}`, data);
  return response;
};
const deleteAppraisal = async (id) => {
  const response = await instance.delete(`/appraisal/${id}`);
  return response;
};
const submitAppraisal = async (data, id) => {
  const response = await instance.put(`/appraisal/submit/${id}`, data);
  return response;
};
const appraiseAppraisal = async (data, id) => {
  const response = await instance.put(`/appraisal/appraise/${id}`, data);
  return response;
};
const updateAppraisal = async (data, id) => {
  const response = await instance.put(`/appraisal/update/${id}`, data);
  return response;
};


// exit
const startExit = async (data) => {
  const response = await instance.post("/exit/create", data);
  return response;
};
const initiateExit = async (data) => {
  const response = await instance.post("/exit/initiate", data);
  return response;
};
const getAllExits = async () => {
  const response = await instance.get("/exit/all");
  return response;
};
const getMyExit = async () => {
  const response = await instance.get(`/exit/mine`);
  return response;
};
const getExit = async (id) => {
  const response = await instance.get(`/exit/one/${id}`);
  return response;
};
const approveExit = async (data, id) => {
  const response = await instance.patch(`/exit/approve/${id}`, data);
  return response;
};
const disapproveExit = async (data, id) => {
  const response = await instance.patch(`/exit/disapprove/${id}`, data);
  return response;
};

const reviewExit = async (data, id) => {
  const response = await instance.patch(`/exit/review/${id}`, data);
  return response;
};
const declineExit = async (data, id) => {
  const response = await instance.patch(`/exit/decline/${id}`, data);
  return response;
};

const deleteExit = async (id) => {
  const response = await instance.delete(`/exit/${id}`);
  return response;
};



// organization
const addOrganization = async (data) => {
  const response = await instance.post("/organization/create", data);
  return response;
};
const addOrganizationStaff = async (data) => {
  const response = await instance.post("/organization/staff/create", data);
  return response;
};
const importOrganizationStaff = async (data) => {
  const response = await instance.post("/organization/staff/import", data);
  return response;
};
const getOrganizations = async () => {
  const response = await instance.get("/organization/all");
  return response;
};
const getAllOutsourcedStaffs = async () => {
  const response = await instance.get("/organization/outsourced/staff");
  return response;
};
const getOrganization = async (id) => {
  const response = await instance.get(`/organization/one/${id}`);
  return response;
};
const getOrganizationStaffs = async (id) => {
  const response = await instance.get(`/organization/one/staffs/${id}`);
  return response;
};
const getOrganizationStaff = async (id) => {
  const response = await instance.get(`/organization/one/staff/${id}`);
  return response;
};
const updateOrganization = async (data, id) => {
  const response = await instance.put(`/organization/${id}`, data);
  return response;
};
const deleteOrganization = async (id) => {
  const response = await instance.delete(`/organization/${id}`);
  return response;
};


// outsourcing leave
const addOutsourcedLeave = async (data) => {
  const response = await instance.post("/outsourcingleave/create", data);
  return response;
};
const submitOutsourcedLeave = async (id) => {
  const response = await instance.post(`/outsourcingleave/submit/${id}`);
  return response;
};
const getOutsourcedLeaves = async () => {
  const response = await instance.get("/outsourcingleave/all");
  return response;
};
const getMyOutsourcedLeaves = async () => {
  const response = await instance.get(`/outsourcingleave/mine`);
  return response;
};
const getOutsourcedLeave = async (id) => {
  const response = await instance.get(`/outsourcingleave/one/${id}`);
  return response;
};
const approveOutsourcedLeave = async (data, id) => {
  const response = await instance.put(`/outsourcingleave/approve/${id}`, data);
  return response;
};
const disapproveOutsourcedLeave = async (data, id) => {
  const response = await instance.put(`/outsourcingleave/disapprove/${id}`, data);
  return response;
};

const resumeOutsourcedLeave = async (data, id) => {
  const response = await instance.post(`/outsourcingleave/resume/${id}`, data);
  return response;
};
const deleteOutsourcedLeave = async (id) => {
  const response = await instance.delete(`/outsourcingleave/${id}`);
  return response;
};

// outsourcing townhall
const createTownhall = async (data) => {
  const formData = new FormData();
  for (const property in data) {
    formData.append(property, data[property]);
  }
  const response = await instance.post("/outsourcingtownhall/create", formData);
  return response;
};
const submitTownhall = async (id) => {
  const response = await instance.post(`/outsourcingtownhall/submit/${id}`);
  return response;
};
const getTownhalls = async () => {
  const response = await instance.get("/outsourcingtownhall/all");
  return response;
};
const getOrgTownhalls = async (id) => {
  const response = await instance.get(`/outsourcingtownhall/org/${id}`);
  return response;
};
const getTownhall = async (id) => {
  const response = await instance.get(`/outsourcingtownhall/one/${id}`);
  return response;
};
const approveTownhall = async (data, id) => {
  const response = await instance.put(`/outsourcingtownhall/approve/${id}`, data);
  return response;
};
const disapproveTownhall = async (data, id) => {
  const response = await instance.put(`/outsourcingtownhall/disapprove/${id}`, data);
  return response;
};
const updateTownhall = async (data, id) => {
  const response = await instance.put(`/outsourcingtownhall/update/${id}`, data);
  return response;
};
const joinTownhall = async (data, id) => {
  const response = await instance.post(`/outsourcingtownhall/join/${id}`, data);
  return response;
};
const deleteTownhall = async (id) => {
  const response = await instance.delete(`/outsourcingtownhall/${id}`);
  return response;
};


// outsourcing training
const createTraining = async (data) => {
  const response = await instance.post("/outsourcingtraining/create", data);
  return response;
};
const submitTraining = async (id) => {
  const response = await instance.post(`/outsourcingtraining/submit/${id}`);
  return response;
};
const getTrainings = async () => {
  const response = await instance.get("/outsourcingtraining/all");
  return response;
};
const getOrgTrainings = async (id) => {
  const response = await instance.get(`/outsourcingtraining/org/${id}`);
  return response;
};
const getTraining = async (id) => {
  const response = await instance.get(`/outsourcingtraining/one/${id}`);
  return response;
};
const approveTraining = async (data, id) => {
  const response = await instance.put(`/outsourcingtraining/approve/${id}`, data);
  return response;
};
const disapproveTraining = async (data, id) => {
  const response = await instance.put(`/outsourcingtraining/disapprove/${id}`, data);
  return response;
};
const updateTraining = async (data, id) => {
  const response = await instance.put(`/outsourcingtraining/update/${id}`, data);
  return response;
};
const joinTraining = async (data, id) => {
  const response = await instance.post(`/outsourcingtraining/join/${id}`, data);
  return response;
};
const deleteTraining = async (id) => {
  const response = await instance.delete(`/outsourcingtraining/${id}`);
  return response;
};

// onboarding docs
const addDocument = async (data) => {
  const formData = new FormData();
  for (const property in data) {
    formData.append(property, data[property]);
  }
  const response = await instance.post("/document/create", formData);
  return response;
};
const sendAllDocuments = async (data) => {
  const response = await instance.post(`/document/send/all`, data);
  return response;
};
const getAllDocuments = async () => {
  const response = await instance.get("/document/all");
  return response;
};
const getOrgDocs = async (id) => {
  const response = await instance.get(`/document/org/${id}`);
  return response;
};
const deleteDoc = async (id) => {
  const response = await instance.delete(`/document/${id}`);
  return response;
};

// org branches
const addBranch = async (data) => {
  const response = await instance.post("/branch/create", data);
  return response;
};
const getOrgBranches = async (id) => {
  const response = await instance.get(`/branch/org/${id}`);
  return response;
};
const getBranch = async (id) => {
  const response = await instance.get(`/branch/one/${id}`);
  return response;
};
const deleteBranch = async (id) => {
  const response = await instance.delete(`/branch/one/${id}`);
  return response;
};
const updateBranch = async (data, id) => {
  const response = await instance.put(`/branch/one/${id}`, data);
  return response;
};

// org contact persons
const addContactPerson = async (data) => {
  const response = await instance.post("/branch/cp/create", data);
  return response;
};
const getOrgContactPersons = async (id) => {
  const response = await instance.get(`/branch/cp/org/${id}`);
  return response;
};
const deleteContactPerson = async (id) => {
  const response = await instance.delete(`/branch/cp/one/${id}`);
  return response;
};
const updateContactPerson = async (data, id) => {
  const response = await instance.put(`/branch/cp/one/${id}`, data);
  return response;
};

// org jobrole
const addJobRole = async (data) => {
  const response = await instance.post("/jobrole/create", data);
  return response;
};
const getJobRoles = async () => {
  const response = await instance.get("/jobrole/all");
  return response;
};
const getOrgJobRoles = async (id) => {
  const response = await instance.get(`/jobrole/org/${id}`);
  return response;
};
const getJobRoleStaffs = async (id) => {
  const response = await instance.get(`/jobrole/staff/${id}`);
  return response;
};
const updateJobRole = async (data, id) => {
  const response = await instance.post(`/jobrole/${id}`, data);
  return response;
};
const deleteJobRole = async (id) => {
  const response = await instance.delete(`/jobrole/${id}`);
  return response;
};


// org depts
const addOrgDept = async (data) => {
  const response = await instance.post("/department/create", data);
  return response;
};
const getOrgDepts = async (id) => {
  const response = await instance.get(`/department/org/${id}`);
  return response;
};
const getOrgStaffs = async (id) => {
  const response = await instance.get(`/department/staff/${id}`);
  return response;
};
const updateOrgDept  = async (data, id) => {
  const response = await instance.put(`/department/${id}`, data);
  return response;
};
const deleteOrgDept = async (id) => {
  const response = await instance.delete(`/department/${id}`);
  return response;
};

// job opening
const addJobOpening = async (data) => {
  const response = await instance.post("/recruitment/jobopening/create", data);
  return response;
};
const submitJobOpening = async (data) => {
  const response = await instance.post(`/recruitment/jobopening/submit/${data.id}`, data);
  return response;
};
const updateJobOpening = async (data) => {
  const response = await instance.put(`/recruitment/jobopening/update/${data.id}`, data);
  return response;
};
const getJobOpenings = async () => {
  const response = await instance.get("/recruitment/jobopening/all");
  return response;
};
const getMyJobOpenings = async () => {
  const response = await instance.get(`/recruitment/jobopening/mine`);
  return response;
};
const getJobOpening = async (id) => {
  const response = await instance.get(`/recruitment/jobopening/one/${id}`);
  return response;
};
const deleteJobOpening = async (id) => {
  const response = await instance.delete(`/recruitment/jobopening/one/${id}`);
  return response;
};
const approveJobOpening = async (data, id) => {
  const response = await instance.patch(`/recruitment/jobopening/approve/${id}`, data);
  return response;
};
const disapproveJobOpening = async (data, id) => {
  const response = await instance.patch(`/recruitment/jobopening/disapprove/${id}`, data);
  return response;
};
const publishJobOpening = async (data, id) => {
  const response = await instance.put(`/recruitment/jobopening/publish/${id}`, data);
  return response;
};
const getPublicJobOpening = async (id) => {
  const response = await instance.get(`/recruitment/jobopening/public/${id}`);
  return response;
};

export {
  addJobOpening,
  submitJobOpening,
  updateJobOpening,
  getJobOpening,
  getPublicJobOpening,
  getJobOpenings,
  getMyJobOpenings,
  deleteJobOpening,
  approveJobOpening,
  disapproveJobOpening,
  publishJobOpening,

  getLoggedInUser,
  logoutUser,
  clockStaffIn,
  getUserRadius,
  getMyLastClockin,
  clockStaffOut,
  addAdmin,
  createAdmin,
  getAllAdmins,
  getOneAdmin,
  updateAdmin,
  getTeamMates,
  addTeam,
  getTeam,
  getTeams,
  getTeamMembers,
  getTodaysAttendances,
  getMyAttendances,
  getMyAddress,
  getMyAttendance,
  getAllAttendances,
  clockOutAll,
  attendanceAnalytics,
  sendNotif,
  
  addProject,
  updateProject,
  deleteProject,
  getProjects,
  getMyTeamProjects,
  getProject,
  projectAnalytics,
  newProjectAnalytics,

  addTask,
  updateTask,
  approveTask,
  disapproveTask,
  approveManyTasks,
  disapproveManyTasks,
  deleteTask,
  getTasks,
  getMyTasks,
  getMyPendingTasks,
  getProjectTasks,
  getTask,

  addSchedule,
  getSchedules,
  getSchedule,
  deleteSchedule,
  updateSchedule,
  getGroups,
  updatePassword,
  forgotPassword,
  getResetUserDataByToken,
  resetPassword,
  uploadPhoto,

  addTimesheet,
  getTimesheets,
  getTimesheet,
  updateTimesheet,
  approveTimesheet,
  deleteTimesheet,

  addGrade,
  getGradeStaffs,
  getGrades,
  updateGrade,
  deleteGrade,

  addJobTitle,
  getJobTitleStaffs,
  getJobTitles,
  updateJobTitle,
  deleteJobTitle,

  addKPD,
  getKPDs,
  getKPD,
  getMyKPDs,
  updateKPD,
  deleteKPD,
  getKPDKPIs,

  addKPI,
  getKPIs,
  getKPI,
  getMyKPIs,
  updateKPI,
  deleteKPI,

  addLeave,
  getLeaves,
  getLeave,
  getMyLeaves,
  approveLeave,
  disapproveLeave,
  submitLeave,
  reviewLeave,
  declineLeave,
  resumeLeave,
  deleteLeave,

  addAppraisal,
  getAppraisals,
  getAppraisal,
  getMyAppraisals,
  approveAppraisal,
  disapproveAppraisal,
  deleteAppraisal,
  submitAppraisal,
  appraiseAppraisal,
  updateAppraisal,

  startExit,
  initiateExit,
  getAllExits,
  getExit,
  getMyExit,
  approveExit,
  disapproveExit,
  reviewExit,
  declineExit,
  deleteExit,

  addOrganization,
  addOrganizationStaff,
  importOrganizationStaff,
  getOrganizations,
  getOrganizationStaff,
  getOrganizationStaffs,
  getAllOutsourcedStaffs,
  getOrganization,
  updateOrganization,
  deleteOrganization,

  addDocument,
  getAllDocuments,
  sendAllDocuments,
  getOrgDocs,
  deleteDoc,

  addJobRole,
  getJobRoleStaffs,
  getOrgJobRoles,
  getJobRoles,
  updateJobRole,
  deleteJobRole,

  addBranch,
  getBranch,
  getOrgBranches,
  deleteBranch,
  updateBranch,

  addContactPerson,
  getOrgContactPersons,
  deleteContactPerson,
  updateContactPerson,

  addOrgDept,
  getOrgDepts,
  getOrgStaffs,
  updateOrgDept,
  deleteOrgDept,

  addOutsourcedLeave,
  getOutsourcedLeaves,
  getMyOutsourcedLeaves,
  getOutsourcedLeave,
  submitOutsourcedLeave,
  approveOutsourcedLeave,
  disapproveOutsourcedLeave,
  resumeOutsourcedLeave,
  deleteOutsourcedLeave,

  createTownhall,
  submitTownhall,
  getTownhalls,
  getOrgTownhalls,
  getTownhall,
  approveTownhall,
  disapproveTownhall,
  joinTownhall,
  deleteTownhall,
  updateTownhall,

  
  createTraining,
  submitTraining,
  getTrainings,
  getOrgTrainings,
  getTraining,
  approveTraining,
  disapproveTraining,
  joinTraining,
  deleteTraining,
  updateTraining,
};