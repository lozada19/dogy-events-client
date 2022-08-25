# Dogy Events

## Descripcion 
- Es una app donde puedes crear eventos para tu mascota y tambien hacer inscribir a tu perrito en ellos

- Esta App se hizo en react 

## Estructura 

- pagina de inicio: El usuario puede ver acceder a la pagina de inicio ver las recetas e iniciar sesion y registarse 

- registarse: El usuario se tiene que registar para poder crear las recetas

- iniciar sesion: El usuario al iniciar sesion puede crear, eliminar editar y tener sus propias recetas en su perfil

- cerrar sesion: El usuario tiene que cerrar sesion para asegurarme de que nadie acceda a mi cuenta

# Rutas

- Route path="/profile"
- Route path="/dog"
- Route path="/dog/add-form"
- Route path="/dog/:dogId/details"
- Route path="/dog/:dogId/edit"
- Route path="/event"
- Route path="/event/add-form"
- Route path="/event/:eventId/details"
- Route path="/event/:eventId/edit"
- Route path="/signup"
- Route path="/login"
- Route path="/error"
- Route path="/*"

# Componentes 

- MyDog.jsx
- MyEvent.jsx
- Navbar.jsx

# Servicios

- auth.services.js
- config.services.js
- dog.services.js
- event.services.js
- upload.services.js

# Paginas 

- auht
    - Login.jsx
    - Signup.jsx

- dog 
    - AddFormDog.jsx
    - DogDetails.jsx
    - DogEdit.jsx
    - DogList.jsx

- event 
    - AddFormEvent.jsx
    - EventDetails.jsx
    - EventEdit.jsx
    - EventList.jsx

- profile
    - Profile.jsx

- Error.jsx
- Home.jsx
- NotFound.jsx





