
export function saveAuthentication(data) {
  return {
    type : 'SESSION',
    isloggedin : true,
    bussines_unit : data.bussines_unit,
    datatimesheet : data.datatimesheet,
    userdata : data.userdata,
    projects : data.projects
  }
}
export function deleteAuthentication() {
  return {
    type : 'SESSION',
    isloggedin : false,
    bussines_unit : null,
    datatimesheet : null,
    userdata : null,
    projects : null
  }
}
