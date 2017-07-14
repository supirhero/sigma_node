
export function saveAuthentication(data) {
  return {
    type : 'API',
    isloggedin : true,
    bussines_unit : data.bussines_unit,
    datatimesheet : data.datatimesheet,
    userdata : data.userdata,
    projects : data.projects
  }
}
export function deleteAuthentication() {
  return {
    type : 'API',
    isloggedin : false,
    bussines_unit : null,
    datatimesheet : null,
    userdata : null,
    projects : null
  }
}
