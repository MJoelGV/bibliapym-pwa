// Función para cargar y procesar archivos XML
class BibleLoader {
    static async loadBibleFile(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error('No se pudo cargar el archivo');
            
            const data = await response.text();
            const parser = new DOMParser();
            return parser.parseFromString(data, "text/xml");
        } catch (error) {
            console.error('Error al cargar el archivo:', error);
            throw error;
        }
    }

    static getVerses(xmlDoc, bookName, chapter) {
        try {
            // Buscar el libro (probar diferentes formatos del nombre)
            let book = xmlDoc.querySelector(`b[n="${bookName}"]`);
            if (!book) {
                // Intentar con la primera letra en mayúscula
                const capitalizedName = bookName.charAt(0).toUpperCase() + bookName.slice(1);
                book = xmlDoc.querySelector(`b[n="${capitalizedName}"]`);
            }
            if (!book) throw new Error(`Libro ${bookName} no encontrado`);

            // Buscar el capítulo
            const chapterElement = book.querySelector(`c[n="${chapter}"]`);
            if (!chapterElement) throw new Error(`Capítulo ${chapter} no encontrado`);

            // Obtener todos los versículos
            const verses = Array.from(chapterElement.querySelectorAll('v'));
            
            // Convertir a array de textos, ordenados por número de versículo
            return verses
                .sort((a, b) => parseInt(a.getAttribute('n')) - parseInt(b.getAttribute('n')))
                .map(verse => verse.textContent.trim());
        } catch (error) {
            console.error('Error al obtener versículos:', error);
            throw error;
        }
    }
}

// Hacer la clase disponible globalmente
window.BibleLoader = BibleLoader;
