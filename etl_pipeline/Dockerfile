FROM python:3.10

# Arbeitsverzeichnis im Container
WORKDIR /app

# Python-Abhängigkeiten kopieren
COPY requirements.txt .

# Abhängigkeiten installieren
RUN pip install --no-cache-dir -r requirements.txt

# Python-Skripte kopieren
COPY download.py transform.py database.py pipeline.py ./

# Ordner für CSV-Dateien erstellen
RUN mkdir -p /app/data

# Python-Einstiegspunkt
CMD ["python", "pipeline.py"]
