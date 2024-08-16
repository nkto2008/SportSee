class UserModel {
  constructor(data) {
    this.id = data.id;
    this.userInfos = data.userInfos;
    this.score = data.todayScore || data.score;
    this.keyData = data.keyData;
  }
  getScore() {
    return this.score;
  }
}

class ActivityModel {
  constructor(data) {
    this.userId = data.userId;
    this.sessions = data.sessions.map(session => ({
      day: new Date(session.day).getDate(),
      kilogram: session.kilogram,
      calories: session.calories
    }));
  }
}

class AverageSessionModel {
  constructor(data) {
    this.userId = data.userId;
    const days = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    this.sessions = data.sessions.map(session => ({
      day: days[session.day - 1],
      sessionLength: session.sessionLength
    }));
  }
}

class PerformanceModel {
  constructor(data) {
    this.userId = data.userId;
    this.kind = data.kind;
    this.data = Array.isArray(data.data) 
      ? data.data.map(item => ({
          subject: this.kind[item.kind],
          A: item.value,
          fullMark: 150
        }))
      : Object.entries(data.data).map(([kind, value]) => ({
          subject: this.kind[kind],
          A: value,
          fullMark: 150
        }));
  }
}

export { UserModel, ActivityModel, AverageSessionModel, PerformanceModel };