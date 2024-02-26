Kurze Installationsbeschreibung um es auf Docker laufen zu lassen: (Windows)

1. Herunterladen meines Projekts
2. Dann im Terminal zu dem Verzeichnis mit Projekt navigieren
3. docker build -t web-project .
4. docker run -p 5000:5000 -p 3000:3000 web-project

Jetzt läuft die Docker Umgebung:
Im browser http://localhost:3000/home öffnen und viel Spaß
