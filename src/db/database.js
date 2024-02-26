const sqlite3 = require("sqlite3").verbose();

// Pfad zur SQLite-Datenbankdatei
const dbPath = "./database.db";

// Erstellen Sie eine Verbindung zur SQLite-Datenbank
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Fehler beim Öffnen der SQLite-Datenbank:", err.message);
  } else {
    console.log("Verbindung zur SQLite-Datenbank hergestellt.");

    // Erstellen Sie die Benutzertabelle, wenn sie nicht existiert
    db.run(
      `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        role TEXT NOT NULL
      )
    `,
      (err) => {
        if (err) {
          console.error("Fehler beim Erstellen der Benutzertabelle:", err);
        } else {
          console.log("Benutzertabelle erfolgreich erstellt.");
        }
      }
    );
  }
});

module.exports = db;
