# Directus & Nextjs ![Directus](https://img.shields.io/badge/directus-%2364f.svg?style=for-the-badge&logo=directus&logoColor=white) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)

**Directus** es un CMS que nos permite crear contenidos y una estructura y base de datos para luego exponer toda esa arquitectura mediante su API y así poder conectarlo con otras tecnologías y aplicaciones.

## Objetivo

El objetivo de este proyecto es realizar un análisis exhaustivo del acoplamiento de **Directus** con el frontal de una aplicación de ecommerce. Para la creación de interfaces se usará **Nextjs** y para la obtención e inserción de datos **GraphQL**.

## Primeros pasos

### Instalación

#### Directus

Instalar con npm:

```console
npm init directus-project <nombre del directorio de la api>
```

Durante el proceso de instalación seleccionar la base de datos deseada y las credenciales de administración.

Lanzar la aplicación:

```console
cd <ruta del directorio de la api>
npx directus start
```

Servidor lanzado en: http://localhost:8055

#### Nextjs

Instalar con npm:

```console
npx create-next-app@latest <nombre de la aplicación>
```

>[OPCIONAL]
>
>Agregar Typescript a la instalación:

```console
npx create-next-app@latest nextjs-con-typescript <nombre de la aplicación>
```

Lanzar la aplicación:

```console
cd <ruta del directorio de la aplicación>
npm run dev
```

Servidor lanzado en http://localhost:3000

#### React query

Instalar react query como manejador de estados en el servidor y optimizador del rendimiento de las solicitudes a la API:

```console
cd <ruta del directorio de la aplicación>
```

npm install react-query ![maintenance-status](https://img.shields.io/badge/maintenance-deprecated-red.svg)

```console
npm install @tanstack/react-query
```

#### Zustand

Instalar Zustand como solución ligera, rápida y escalable que utiliza principios de flujo simplificados para manejar estados globales en el cliente:

```console
cd <ruta del directorio de la aplicación>
npm install zustand
```

#### Tailwind

Instalar Tailwind como framework CSS para estilizar prototipos y casos de testing al permitir un desarrollo ágil y optimizado:

```console
cd <ruta del directorio de la aplicación>
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### Next Auth

Instalar Next Auth para ejecutar las pruebas de autentificación en la aplicación de una manera sencilla y rápida:

```console
cd <ruta del directorio de la aplicación>
npx install next-auth
```

### Variables de entorno

Variables del entorno de *Desarrollo* usadas al compilar/ejecutar la aplicación:

```console
GRAPHQL=http://localhost:8055/graphql
NEXT_PUBLIC_GRAPHQL=http://localhost:8055/graphql
```
```console
FILES_URL=http://localhost:8055/graphql/system
NEXT_PUBLIC_FILES_URL=http://localhost:8055/graphql/system
```
```console
ASSETS_URL=http://localhost:8055/assets
NEXT_PUBLIC_ASSETS_URL=http://localhost:8055/assets
```
```console
COLLECTION_URL=http://localhost:8055/items
NEXT_PUBLIC_COLLECTION_URL=http://localhost:8055/items
```

## Casos de uso

1. [**CU-01**] La aplicación mostrará los productos que hay en stock.
2. [**CU-02**] Cada producto pertenecerá a una única categoría.
3. [**CU-03**] El usuario podrá filtrar los productos por cada categoría.
4. [**CU-04**] Cada producto tendrá varios valores disponibles.
5. [**CU-05**] El usuario podrá elegir el idoma de la aplicación. Los idiomas disponibles son: español e inglés.
6. [**CU-06**] En el carrito de la compra deberán aparecer los productos seleccionados.
7. [**CU-07**] Los productos añadidos al carrito permanecerán en la sesión del usuario hasta que este decida eliminarlos o comprarlos.
8. [**CU-08**] El sistema permitirá al usuario loguearse en la aplicación.
9.  [**CU-09**] Cuando un usuario se loguea en el sistema únicamente le aparecerá su perfil personal.

## Modelo de datos

-  **Products**: id (*UUID*), status (*string*), name (*string*), slug (*slug*), description (*string*), product_image (*string*), price (*float*), category (*manyToOne*), translations (*translations*) y available_values (*manyToMany*)
-  **Categories**: id (*UUID*), name (*string*), slug (*slug*), translations (*translations*) y products (*oneToMany*)
-  **Values**: id (*UUID*), long_title (*string*), short_title (*string*), translations (*translations*) y products (*ManyToMany*)
-  **Sessions**: id (*UUID*) y temp_order (*repeater*): id (*UUID*), quantity (*integer*), price (*float*), value_short_title (*string*), product_id (*UUID*) y product_name (*string*)

>Directus crea automáticamente la tabla *languages* para las traducciones y también las tablas intermedias en las relaciones *manyToMany*.

## Análisis

Análisis de los siguientes items en cuanto al acoplamiento de Directus con el frontal de una aplicación:

| Testing | Valoración  | Comentarios |
| ------------- | ------------- | ------------- |
| `Setup`  | <span style=" text-align: center; padding: 5px; background-color: 	#3CB371; color: #fff;">EXCELENTE</span> | La configuración y puesta en marcha de un proyecto en Directus es una tarea muy rápida y sencilla. Además, la interfaz es muy amigable e intuitiva. |
| `GraphQL`  | <span style=" text-align: center; padding: 5px; background-color: 	#3CB371; color: #fff;">EXCELENTE</span> | Al hacer uso de GraphQL únicamente obtenemos el contenido necesario, minimizando así el tiempo de carga. Esto se traduce en una mejor experiencia de usuario y un mayor rendimiento de la aplicación. |
| `Frameworks`  | <span style=" text-align: center; padding: 5px; background-color: 	#3CB371; color: #fff;">EXCELENTE</span>  | Compatible con cualquier framework del lado del cliente. En este caso se ha usado Nextjs pero se podía haber elegido cualquier otro.   |
| `Componentes`  | <span style=" text-align: center; padding: 5px; background-color: 	#3CB371; color: #fff;">EXCELENTE</span> | Permite la reutilización de componentes lo que hace que sea muy flexible y escalable.  |
| `SEO`  | <span style=" text-align: center; padding: 5px; background-color: 	#3CB371; color: #fff;">NOTABLE</span> | Al tratar el SEO como datos, nos da un control completo para definir las diferentes estrategias y soluciones. Una configuración correcta puede resultar algo compleja ya que es necesario una implementación técnica sólida.  |
| `Filtrado`  | <span style=" text-align: center; padding: 5px; background-color: 	#3CB371; color: #fff;">EXCELENTE</span> | Ofrece un potente filtrado para hacer solicitudes o paginación.  |
| `Datos dinámicos`  | <span style=" text-align: center; padding: 5px; background-color: 	#3CB371; color: #fff;">EXCELENTE</span> | No es necesario recargar una página para ver nuevos contenidos. La API entrega datos dinámicos sin necesidad de volverlos a cargar.  |
| `JSON`  | <span style=" text-align: center; padding: 5px; background-color: 	#3CB371; color: #fff;">EXCELENTE</span>  | Está preparado para recibir información vía JSON, lo que facilita la importación de datos de forma limpia y utilizando sólo la información que necesitamos. |
| `Internalización`  | <span style=" text-align: center; padding: 5px; background-color: 	#3CB371; color: #fff;">EXCELENTE</span>  | Directus permite realizar traducciones en varios idiomas de manera rápida y sin complejidad. La exportación de esos datos se realiza vía JSON lo que hace que el proceso sea sencillo y ágil. |
| `Autenticación`  | <span style=" text-align: center; padding: 5px; background-color: 	#3CB371; color: #fff;">NOTABLE</span>  | Directus proporciona varios métodos de autenticación. La complejidad de configuración aumenta con el nivel de seguridad de la aplicación. |
| `Documentación`  | <span style=" text-align: center; padding: 5px; background-color: 	#ffa500; color: #fff;">ACEPTABLE</span>  | La documentación en algunos puntos es algo escasa pero en general el proyecto está bien documentado en la parte de las APIs. Además es una comunidad muy activa, lo que garantiza una resolución rápida de problemas y un mantenimiento frecuente. |
| `Limitaciones`  | <span style=" text-align: center; padding: 5px; background-color: 	#ffa500; color: #fff;">ACEPTABLE</span>  | Se han encontrado algunas limitaciones en la obtención de la información para poder formatearla a través del frontal de la aplicación. |

## Conclusiones

La API de Directus genera de forma dinámica tanto endpoints REST como un esquema GraphQL basado en la arquitectura de la base de datos conectada. Para este proyecto, aunque no hay diferencia en cuanto a la funcionalidad disponible de REST y GraphQL, se ha usado esta última para obtener únicamente el contenido necesario y así minimizar los tiempos de carga.

Desde la visión de un perfil frontend, destacamos los siguientes puntos tras analizar el acoplamiento de Directus con el frontal de una aplicación de ecommerce:

-  Es una herramienta compatible con multitud de tecnologías al poder entregar el contenido cuando se desee. 
-  Al ser un CMS agnóstico a la parte frontend no ha sido necesario aprender lenguajes de desarrollo específicos. Además, el tiempo de desarrollo ha sido más rápido al poder probar varias hipótesis muy rápidamente.
-  Al ser completamente de código abierto, modular y extensible, Directus se puede adaptar completamente a los requisitos de cualquier proyecto.
-  Aporta un plus de flexibilidad en tanto que se puede elegir el lenguaje de programación y el framework, eliminando gran parte de las limitaciones que existían con el modelo tradicional. Además, es posible utilizar contenidos similares en proyectos distintos, reutilizándolos con una exportación sencilla.
-  Requiere cierta experiencia técnica en cuanto a su estructura y configuración.
-  Se han encontrado algunas limitaciones en la obtención de la información para poder formatearla a través del frontal de la aplicación. Esto se soluciona definiendo y cumpliendo estrictamente ciertas directrices en cuanto al modelado e inserción de datos en la aplicación.


## Construido con...

* [Directus](https://docs.directus.io/) - Usado como API y gestor de bases de datos
* [Nextjs](https://nextjs.org/) - Usado como framework para manejar la capa de presentación

## Documentación

La documentación del proyecto se puede consultar en la carpeta correspondiente.