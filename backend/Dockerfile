# Используем базовый образ Python 3.11
FROM python:3.11

# Назначаем рабочую директорию
WORKDIR /app

# Копируем requirements.txt из папки backend в контейнер
COPY requirements.txt /tmp/requirements.txt

# Устанавливаем зависимости
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r /tmp/requirements.txt

# Копируем само Django-приложение (из каталога app) внутрь контейнера
COPY ./app /app

# Открываем порт 8002 в контейнере
EXPOSE 8002

# Запускаем сервер
CMD ["python", "manage.py", "runserver", "0.0.0.0:8002"]