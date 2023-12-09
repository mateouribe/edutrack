let users = {
  login: function (username, password, callback) {
    dbOpen.transaction(function (tx) {
      let sql = "SELECT * FROM users WHERE username = ? AND password = ?";
      let params = [username, password];

      tx.executeSql(sql, params, callback, errorHandler);
    });
  },

  addUser: function (user, callback) {
    dbOpen.transaction(function (tx) {
      let sql =
        "INSERT INTO users (role, fullName, dateOfBirth, phoneNumber, address, zipcode, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      let params = [
        user.role,
        user.fullName,
        user.dateOfBirth,
        user.phoneNumber,
        user.address,
        user.zipCode,
        user.username,
        user.password,
      ];

      tx.executeSql(sql, params, callback, errorHandler);
    });
  },

  getUserByUsername: function (username, callback) {
    dbOpen.transaction(function (tx) {
      let sql = "SELECT * FROM users WHERE username = ?";
      let params = [username];

      tx.executeSql(sql, params, callback, errorHandler);
    });
  },

  getAll: function (callback) {
    dbOpen.transaction(function (tx) {
      let sql = "SELECT * FROM users";

      tx.executeSql(sql, [], callback, errorHandler);
    });
  },

  getUserById: function (id, callback) {
    dbOpen.transaction(function (tx) {
      let sql = "SELECT * FROM users WHERE id = ?";
      let params = [id];

      tx.executeSql(sql, params, callback, errorHandler);
    });
  },

  deleteUser: function (id, callback) {
    dbOpen.transaction(function (tx) {
      let sql = "DELETE FROM users WHERE id = ?";
      let params = [id];

      tx.executeSql(sql, params, callback, errorHandler);
    });
  },

  editUser: function (userId, user, callback) {
    dbOpen.transaction(function (tx) {
      let sql =
        "UPDATE users SET fullName = ?, dateOfBirth = ?, phoneNumber = ?, address = ?, zipcode = ?, username = ?, password = ? WHERE id = ?";
      let params = [
        user.fullName,
        user.dateOfBirth,
        user.phoneNumber,
        user.address,
        user.zipCode,
        user.username,
        user.password,
        userId,
      ];

      tx.executeSql(sql, params, callback, errorHandler);
    });
  },
};

let events = {
  addEvent: function (event, callback) {
    dbOpen.transaction(function (tx) {
      let sql =
        "INSERT INTO events (title, description, date, cost, type, location, duration) VALUES (?, ?, ?, ?, ?, ?, ?)";
      let params = [
        event.title,
        event.description,
        event.date,
        event.cost,
        event.type,
        event.location,
        event.duration,
      ];

      tx.executeSql(sql, params, callback, errorHandler);
    });
  },

  getAll: function (callback) {
    dbOpen.transaction(function (tx) {
      let sql = "SELECT * FROM events";

      tx.executeSql(sql, [], callback, errorHandler);
    });
  },

  getEventById: function (id, callback) {
    dbOpen.transaction(function (tx) {
      let sql = "SELECT * FROM events WHERE id = ?";
      let params = [id];

      tx.executeSql(sql, params, callback, errorHandler);
    });
  },

  checkUserAttendance: function (eventId, userId, callback) {
    dbOpen.transaction(function (tx) {
      let sql = "SELECT * FROM user_events WHERE user_id = ? AND event_id = ?";
      let params = [userId, eventId];

      tx.executeSql(
        sql,
        params,
        function (tx, results) {
          if (results.rows.length > 0) {
            callback(true);
          } else {
            callback(false);
          }
        },
        errorHandler
      );
    });
  },

  attendEvent: function (eventId, userId, callback) {
    dbOpen.transaction(function (tx) {
      let sql = "INSERT INTO user_events (user_id, event_id) VALUES (?, ?)";
      let params = [userId, eventId];

      tx.executeSql(sql, params, callback, errorHandler);
    });
  },

  getEventAttendees: function (eventId, callback) {
    dbOpen.transaction(function (tx) {
      let sql =
        "SELECT users.id, users.fullName, users.role FROM users INNER JOIN user_events ON users.id = user_events.user_id WHERE user_events.event_id = ?";
      let params = [eventId];

      tx.executeSql(
        sql,
        params,
        function (tx, results) {
          callback(results); // Pass the actual results to the callback
        },
        errorHandler
      );
    });
  },
};

let classes = {
  addClass: function (classObj, callback) {
    dbOpen.transaction(function (tx) {
      let sql =
        "INSERT INTO classes (name, imageId, description, roomNumber, startDate, endDate) VALUES (?, ?, ?, ?, ?, ?)";
      let params = [
        classObj.name,
        classObj.imageId,
        classObj.description,
        classObj.roomNumber,
        classObj.startDate,
        classObj.endDate,
      ];

      tx.executeSql(sql, params, callback, errorHandler);
    });
  },

  getAll: function (callback) {
    dbOpen.transaction(function (tx) {
      let sql = "SELECT * FROM classes";

      tx.executeSql(sql, [], callback, errorHandler);
    });
  },

  getClassById: function (id, callback) {
    dbOpen.transaction(function (tx) {
      let sql = "SELECT * FROM classes WHERE id = ?";
      let params = [id];

      tx.executeSql(sql, params, callback, errorHandler);
    });
  },

  checkUserAttendance: function (classId, userId, callback) {
    dbOpen.transaction(function (tx) {
      let sql = "SELECT * FROM user_classes WHERE user_id = ? AND class_id = ?";
      let params = [userId, classId];

      tx.executeSql(
        sql,
        params,
        function (tx, results) {
          if (results.rows.length > 0) {
            callback(true);
          } else {
            callback(false);
          }
        },
        errorHandler
      );
    });
  },

  takeClass: function (classId, userId, callback) {
    dbOpen.transaction(function (tx) {
      let sql = "INSERT INTO user_classes (user_id, class_id) VALUES (?, ?)";
      let params = [userId, classId];

      tx.executeSql(sql, params, callback, errorHandler);
    });
  },

  editClass: function (classId, classObj, callback) {
    dbOpen.transaction(function (tx) {
      let sql =
        "UPDATE classes SET name = ?, imageId = ?, description = ?, roomNumber = ?, startDate = ?, endDate = ? WHERE id = ?";
      let params = [
        classObj.name,
        classObj.imageId,
        classObj.description,
        classObj.roomNumber,
        classObj.startDate,
        classObj.endDate,
        classId,
      ];

      tx.executeSql(sql, params, callback, errorHandler);
    });
  },

  deleteClass: function (id, callback) {
    dbOpen.transaction(function (tx) {
      let sql = "DELETE FROM classes WHERE id = ?";
      let params = [id];

      tx.executeSql(sql, params, callback, errorHandler);
    });
  },
};
