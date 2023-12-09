let dbOpen;

function errorHandler(err) {
  console.error(`SQL Error: ${err.message}`);
}

let DB = {
  createDatabase: function () {
    let dbSize = 5 * 1024 * 1024; // 5MB
    let dbName = "eduTrackDB";
    let dbVersion = "1.0";
    let dbDisplayName = "Edutrack Database";

    function successCreateDb() {
      console.info(
        `Success: Database created successfully. ${
          (dbName, dbVersion, dbDisplayName, dbSize)
        }`
      );
    }

    dbOpen = openDatabase(
      dbName,
      dbVersion,
      dbDisplayName,
      dbSize,
      successCreateDb
    );
  },

  createTables: function () {
    dbOpen.transaction(function (tx) {
      // User table
      let sqlUser =
        "CREATE TABLE IF NOT EXISTS users(" +
        "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        "role VARCHAR(20) NOT NULL," +
        "fullName VARCHAR(100) NOT NULL," +
        "dateOfBirth Date NOT NULL," +
        "phoneNumber VARCHAR(10) NOT NULL," +
        "address VARCHAR(100) NOT NULL," +
        "zipcode VARCHAR(100) NOT NULL," +
        "username VARCHAR(30) UNIQUE NOT NULL," +
        "password VARCHAR(30) NOT NULL);";

      // Classes table
      let sqlClasses =
        "CREATE TABLE IF NOT EXISTS classes(" +
        "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        "imageId INTEGER NOT NULL," +
        "name VARCHAR(50) NOT NULL," +
        "description TEXT NOT NULL," +
        "roomNumber VARCHAR(10) NOT NULL," +
        "startDate DATE NOT NULL," +
        "endDate DATE NOT NULL);";

      // Create 'user_classes' table for many-to-many relationship
      let sqlUserClasses =
        "CREATE TABLE IF NOT EXISTS user_classes(" +
        "user_id INTEGER NOT NULL," +
        "class_id INTEGER NOT NULL," +
        "PRIMARY KEY (user_id, class_id)," +
        "FOREIGN KEY(user_id) REFERENCES users(id)," +
        "FOREIGN KEY(class_id) REFERENCES classes(id));";

      // Create 'events' table
      let sqlEvents =
        "CREATE TABLE IF NOT EXISTS events(" +
        "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        "title VARCHAR(100) NOT NULL," +
        "description TEXT NOT NULL," +
        "date DATE NOT NULL," +
        "cost INTEGER NOT NULL," +
        "type VARCHAR(20) NOT NULL," +
        "location VARCHAR(50) NOT NULL," +
        "duration VARCHAR(50) NOT NULL);";

      let sqlUserEvents =
        "CREATE TABLE IF NOT EXISTS user_events(" +
        "user_id INTEGER NOT NULL," +
        "event_id INTEGER NOT NULL," +
        "PRIMARY KEY (user_id, event_id)," +
        "FOREIGN KEY(user_id) REFERENCES users(id)," +
        "FOREIGN KEY(event_id) REFERENCES events(id));";

      // Execute the SQL statements to create tables
      tx.executeSql(
        sqlUser,
        [],
        function () {
          console.info("Success: 'uses' table created successfully");
        },
        errorHandler
      );

      tx.executeSql(
        sqlClasses,
        [],
        function () {
          console.info("Success: 'classes' table created successfully");
        },
        errorHandler
      );

      tx.executeSql(
        sqlUserClasses,
        [],
        function () {
          console.info("Success: 'user_classes' table created successfully");
        },
        errorHandler
      );

      tx.executeSql(
        sqlEvents,
        [],
        function () {
          console.info("Success: 'events' table created successfully");
        },
        errorHandler
      );
      tx.executeSql(
        sqlUserEvents,
        [],
        function () {
          console.info("Success: 'user_events' table created successfully");
        },
        errorHandler
      );
    });
  },

  createAdminUser: function () {
    dbOpen.transaction(function (tx) {
      let dateOfBirth = new Date(2002, 10, 1);

      // Format the date as YYYY-MM-DD for SQLite
      let formattedDateOfBirth = dateOfBirth.toISOString().split("T")[0];

      "CREATE TABLE IF NOT EXISTS users(" +
        "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        "role VARCHAR(20) NOT NULL," +
        "fullName VARCHAR(100) NOT NULL," +
        "dateOfBirth Date NOT NULL," +
        "phoneNumber VARCHAR(10) NOT NULL," +
        "address VARCHAR(100) NOT NULL," +
        "zipcode VARCHAR(100) NOT NULL," +
        "username VARCHAR(30) UNIQUE NOT NULL," +
        "password VARCHAR(30) NOT NULL);";
      let sql =
        "INSERT INTO users (role, fullName, dateOfBirth, phoneNumber, address, zipcode, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      let params = [
        "admin",
        "Matteo Kin Quyen",
        formattedDateOfBirth,
        "1231231234",
        "University Av. 190",
        "N2N 2N2",
        "admin",
        "adminPassword",
      ];

      tx.executeSql(
        sql,
        params,
        function () {
          console.info("Success: Admin user created successfully");
        },
        errorHandler
      );
    });
  },

  dropDatabase: function () {
    dbOpen.changeVersion(
      dbOpen.version,
      "",
      function (tx) {
        // Drop all tables
        tx.executeSql("DROP TABLE IF EXISTS users;");
        tx.executeSql("DROP TABLE IF EXISTS classes;");
        tx.executeSql("DROP TABLE IF EXISTS user_classes;");
        tx.executeSql("DROP TABLE IF EXISTS events;");
        tx.executeSql("DROP TABLE IF EXISTS attendances;");
        tx.executeSql("DROP TABLE IF EXISTS attendance_students;");
      },
      function (err) {
        console.error("Error dropping tables: " + err.message);
      },
      function () {
        console.info("Success: Database dropped successfully");
      }
    );
  },
};
