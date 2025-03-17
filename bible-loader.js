// Función para cargar y procesar archivos XML
class BibleLoader {
    constructor() {
        this.bookNames = {
            'Génesis': 'Genesis',
            'Éxodo': 'Exodo',
            'Levítico': 'Levitico',
            'Números': 'Numeros',
            'Deuteronomio': 'Deuteronomio',
            'Josué': 'Josue',
            'Jueces': 'Jueces',
            'Rut': 'Rut',
            '1 Samuel': '1 Samuel',
            '2 Samuel': '2 Samuel',
            '1 Reyes': '1 Reyes',
            '2 Reyes': '2 Reyes',
            '1 Crónicas': '1 Cronicas',
            '2 Crónicas': '2 Cronicas',
            'Esdras': 'Esdras',
            'Nehemías': 'Nehemias',
            'Ester': 'Ester',
            'Job': 'Job',
            'Salmos': 'Salmos',
            'Proverbios': 'Proverbios',
            'Eclesiastés': 'Eclesiastes',
            'Cantares': 'Cantares',
            'Isaías': 'Isaias',
            'Jeremías': 'Jeremias',
            'Lamentaciones': 'Lamentaciones',
            'Ezequiel': 'Ezequiel',
            'Daniel': 'Daniel',
            'Oseas': 'Oseas',
            'Joel': 'Joel',
            'Amós': 'Amos',
            'Abdías': 'Abdias',
            'Jonás': 'Jonas',
            'Miqueas': 'Miqueas',
            'Nahúm': 'Nahum',
            'Habacuc': 'Habacuc',
            'Sofonías': 'Sofonias',
            'Hageo': 'Hageo',
            'Zacarías': 'Zacarias',
            'Malaquías': 'Malaquias',
            'Mateo': 'Mateo',
            'Marcos': 'Marcos',
            'Lucas': 'Lucas',
            'Juan': 'Juan',
            'Hechos': 'Hechos',
            'Romanos': 'Romanos',
            '1 Corintios': '1 Corintios',
            '2 Corintios': '2 Corintios',
            'Gálatas': 'Galatas',
            'Efesios': 'Efesios',
            'Filipenses': 'Filipenses',
            'Colosenses': 'Colosenses',
            '1 Tesalonicenses': '1 Tesalonicenses',
            '2 Tesalonicenses': '2 Tesalonicenses',
            '1 Timoteo': '1 Timoteo',
            '2 Timoteo': '2 Timoteo',
            'Tito': 'Tito',
            'Filemón': 'Filemon',
            'Hebreos': 'Hebreos',
            'Santiago': 'Santiago',
            '1 Pedro': '1 Pedro',
            '2 Pedro': '2 Pedro',
            '1 Juan': '1 Juan',
            '2 Juan': '2 Juan',
            '3 Juan': '3 Juan',
            'Judas': 'Judas',
            'Apocalipsis': 'Apocalipsis'
        };
    }

    async loadBible(version) {
        try {
            const response = await fetch(`./biblia-files/${version}.xmm`);
            if (!response.ok) throw new Error('No se pudo cargar el archivo');
            
            const data = await response.text();
            const parser = new DOMParser();
            return parser.parseFromString(data, 'text/xml');
        } catch (error) {
            console.error('Error al cargar la Biblia:', error);
            throw error;
        }
    }

    getBooks(xmlDoc) {
        const books = [];
        const bookElements = xmlDoc.getElementsByTagName('book');
        for (let i = 0; i < bookElements.length; i++) {
            books.push(bookElements[i].getAttribute('name'));
        }
        return books;
    }

    getChaptersCount(xmlDoc, book) {
        const normalizedBook = this.bookNames[book] || book;
        const bookElement = xmlDoc.querySelector(`book[name="${normalizedBook}"]`);
        if (!bookElement) throw new Error(`Libro ${book} no encontrado`);
        
        const chapters = bookElement.getElementsByTagName('chapter');
        return chapters.length;
    }

    getVerses(xmlDoc, book, chapter) {
        const normalizedBook = this.bookNames[book] || book;
        const verses = [];
        
        const bookElement = xmlDoc.querySelector(`book[name="${normalizedBook}"]`);
        if (!bookElement) throw new Error(`Libro ${book} no encontrado`);
        
        const chapterElement = bookElement.querySelector(`chapter[number="${chapter}"]`);
        if (!chapterElement) throw new Error(`Capítulo ${chapter} no encontrado`);
        
        const verseElements = chapterElement.getElementsByTagName('verse');
        for (let i = 0; i < verseElements.length; i++) {
            const verse = verseElements[i];
            verses.push({
                number: verse.getAttribute('number'),
                text: verse.textContent.trim()
            });
        }
        
        return verses;
    }

    getRandomProverb() {
        const chapter = Math.floor(Math.random() * 31) + 1;
        const verse = Math.floor(Math.random() * 20) + 1;
        return { chapter, verse };
    }
}

// Exportar la clase
window.BibleLoader = BibleLoader;
