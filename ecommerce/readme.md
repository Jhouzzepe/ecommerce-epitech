# Cloner le projet
git clone <URL_DU_REPO_GITHUB>
cd <NOM_DU_REPO>

# Configurer l'environnement virtuel
python3 -m venv env
source env/bin/activate  # ou .\env\Scripts\activate pour Windows
pip install -r requirements.txt

# Configurer les dépendances Python
pip install django

pip install djangorestframework

pip install django-cors-headers

pip install psycopg2-binary 

pip install pillow


# Configurer le frontend
cd frontend
npm install  # ou yarn install
cd ..

# Appliquer les migrations et créer un super utilisateur
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser

# Lancer le serveur Django
python manage.py runserver

# Lancer l'application React
cd frontend
npm start  # ou yarn start