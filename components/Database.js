import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'ContactDB',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  }
);

export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        mobilePhone TEXT,
        landlineNumber TEXT,
        photoURL TEXT,
        favorite BOOLEAN
      )`,
      [],
      (tx, result) => {
        console.log('Table created successfully');
      },
      error => {
        console.log('Error creating table: ', error);
      }
    );
  });
};

export const addContact = (name, mobilePhone, landlineNumber, photoURL, favorite, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO contacts (name, mobilePhone, landlineNumber, photoURL, favorite) VALUES (?, ?, ?, ?, ?)`,
      [name, mobilePhone, landlineNumber, photoURL, favorite],
      (tx, result) => {
        console.log('Contact added successfully');
        if (callback) {
            callback(result)
        }
      },
      error => {
        console.log('Error adding contact: ', error);
        if (callback) {
            callback(error);
          }
      }
    );
  });
};

export const updateContact = (id, name, mobilePhone, landlineNumber, photoURL, favorite) => {
  db.transaction(tx => {
    tx.executeSql(
      `UPDATE contacts SET name = ?, mobilePhone = ?, landlineNumber = ?, photoURL = ?, favorite = ? WHERE id = ?`,
      [name, mobilePhone, landlineNumber, photoURL, favorite, id],
      (tx, result) => {
        console.log('Contact updated successfully');
      },
      error => {
        console.log('Error updating contact: ', error);
      }
    );
  });
};

export const deleteContact = id => {
  db.transaction(tx => {
    tx.executeSql(
      `DELETE FROM contacts WHERE id = ?`,
      [id],
      (tx, result) => {
        console.log('Contact deleted successfully');
      },
      error => {
        console.log('Error deleting contact: ', error);
      }
    );
  });
};

export const getContacts = callback => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM contacts`,
      [],
      (tx, results) => {
        let rows = results.rows.raw();
        callback(rows);
      },
      error => {
        console.log('Error fetching contacts: ', error);
      }
    );
  });
};


export const getFavoriteContacts = callback => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM contacts WHERE favorite = 1`,
        [],
        (tx, results) => {
          let rows = results.rows.raw();
          callback(rows);
        },
        error => {
          console.log('Error fetching favorite contacts: ', error);
        }
      );
    });
  };
