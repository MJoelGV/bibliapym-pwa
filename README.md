# Biblia de Poder y Milagros - PWA

Una aplicación web progresiva (PWA) para leer la Biblia en diferentes versiones, con soporte para modo offline.

## Características

- 📖 Múltiples versiones de la Biblia
- 🌙 Modo oscuro
- ✏️ Sistema de notas
- 📱 Funciona offline (PWA)
- 📝 Copiar versículos al portapapeles
- 🎨 Diseño moderno y responsivo

## Estructura de Archivos

La aplicación espera encontrar los archivos de las diferentes versiones de la Biblia en la carpeta `bible-versions`. Los archivos deben tener el siguiente formato:

### Ubicación de los Archivos
```
biblia-nueva/
├── bible-versions/
│   ├── Biblia Lenguaje Sencillo.xmm
│   ├── Dios Habla Hoy.xmm
│   ├── La Biblia de Las Americas.xmm
│   ├── Nueva Traducción Viviente.xmm
│   └── Traducción en Lenguaje Actual.xmm
```

### Formato de los Archivos .xmm
Cada archivo .xmm debe seguir este formato:
```
libro.capitulo.versiculo|texto del versículo
```

Ejemplo:
```
proverbios.25.1|También éstos son proverbios de Salomón, los cuales copiaron los varones de Ezequías, rey de Judá.
proverbios.25.2|Gloria de Dios es encubrir un asunto; Pero honra del rey es escudriñarlo.
```

## Versiones disponibles

- Reina-Valera 1960
- Dios Habla Hoy
- La Biblia de Las Americas
- Nueva Traducción Viviente
- Traducción en Lenguaje Actual

## Uso offline

1. La aplicación se instalará automáticamente en tu navegador
2. Los archivos de la Biblia se guardarán en caché
3. Podrás leer sin conexión a internet
4. Un indicador te mostrará cuando estés en modo offline

## Tecnologías

- HTML5
- CSS3
- JavaScript
- Service Workers
- Cache API
- Web Storage API

## Instalación local

1. Clona este repositorio
2. Ejecuta un servidor web (por ejemplo, con Python):
   ```bash
   python -m http.server 8000
   ```
3. Abre http://localhost:8000 en tu navegador

## Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

## Cómo Agregar Nuevas Versiones

1. Crea un archivo .xmm con el formato especificado
2. Coloca el archivo en la carpeta `bible-versions`
3. Agrega la nueva versión en el selector de versiones en `lectura.html`
4. Actualiza el objeto `versionFiles` en `lectura.html` con la ruta al nuevo archivo

## Notas Importantes

- La versión RVR1960 está incluida por defecto en el código
- Los archivos .xmm deben estar codificados en UTF-8
- Los nombres de los libros deben estar en minúsculas y sin acentos
- Los números de capítulo y versículo deben ser números enteros
