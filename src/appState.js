class AppState {
  constructor(currProjectID){
    this._currProjectID = currProjectID;
    this._projectList = [];
  }
  get currProjectID(){
    return this._currProjectID;
  }
  set currProjectID(id){
    this._currProjectID = id;
  }
  get projectList(){
    return this._projectList;
  }
  set projectList(projects){
    this._projectList = projects;
  }
  getCurrProject(){
    return this.projectList.find(p => p.id === this.currProjectID);
  }
}

const appState = new AppState();
export { appState };