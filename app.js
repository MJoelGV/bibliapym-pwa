// Variables globales
let currentUser;

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    console.log('Aplicación iniciada');
    setupEventListeners();
    initializeFirebase();
});

// Configurar event listeners
function setupEventListeners() {
    console.log('Configurando event listeners');
    
    // Botón de notas
    const notesButton = document.getElementById('notes-button');
    if (notesButton) {
        console.log('Botón de notas encontrado');
        notesButton.addEventListener('click', () => {
            console.log('Botón de notas clickeado');
            toggleNotesPanel();
        });
    } else {
        console.error('No se encontró el botón de notas');
    }

    // Botón de cerrar panel
    const closeButton = document.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            console.log('Botón cerrar clickeado');
            toggleNotesPanel();
        });
    }

    // Botón de guardar nota
    const saveButton = document.getElementById('save-note');
    if (saveButton) {
        saveButton.addEventListener('click', saveNote);
    }
}

// Alternar panel de notas
function toggleNotesPanel() {
    console.log('Alternando panel de notas');
    const panel = document.querySelector('.notes-panel');
    if (panel) {
        panel.classList.toggle('open');
        console.log('Panel alternado:', panel.classList.contains('open'));
    } else {
        console.error('No se encontró el panel de notas');
    }
}

// Inicializar Firebase y autenticación
function initializeFirebase() {
    console.log('Iniciando Firebase');
    // Autenticar anónimamente
    firebase.auth().signInAnonymously()
        .then(userCredential => {
            currentUser = userCredential.user;
            console.log('Usuario autenticado:', currentUser.uid);
            loadNotes(); // Cargar notas después de autenticar
        })
        .catch(error => {
            console.error('Error de autenticación:', error);
            showToast('Error al conectar con el servidor');
        });
}

// Cargar notas desde Firebase
function loadNotes() {
    if (!currentUser) {
        console.log('No hay usuario autenticado');
        return;
    }

    console.log('Cargando notas para usuario:', currentUser.uid);

    firebase.firestore().collection('users').doc(currentUser.uid).collection('notes')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => {
            const notesList = document.getElementById('notes-list');
            notesList.innerHTML = '';

            snapshot.forEach(doc => {
                const note = doc.data();
                console.log('Nota cargada:', note);
                const noteElement = createNoteElement(doc.id, note);
                notesList.appendChild(noteElement);
            });
        }, error => {
            console.error('Error al cargar notas:', error);
            showToast('Error al cargar las notas');
        });
}

// Crear elemento de nota
function createNoteElement(noteId, note) {
    const div = document.createElement('div');
    div.className = 'note-item';
    div.innerHTML = `
        <p class="note-text">${note.text}</p>
        <p class="note-date">${note.timestamp ? new Date(note.timestamp.toDate()).toLocaleString() : 'Fecha no disponible'}</p>
        <button class="delete-button" onclick="deleteNote('${noteId}')">
            <i class="material-icons">delete</i>
        </button>
    `;
    return div;
}

// Guardar nota
async function saveNote() {
    if (!currentUser) {
        console.log('No hay usuario autenticado');
        showToast('Error: No hay conexión con el servidor');
        return;
    }

    const noteInput = document.getElementById('note-input');
    const text = noteInput.value.trim();

    if (!text) {
        showToast('La nota no puede estar vacía');
        return;
    }

    try {
        console.log('Guardando nota para usuario:', currentUser.uid);
        const docRef = await firebase.firestore().collection('users').doc(currentUser.uid).collection('notes').add({
            text: text,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('Nota guardada con ID:', docRef.id);

        noteInput.value = '';
        showToast('Nota guardada');
    } catch (error) {
        console.error('Error al guardar nota:', error);
        showToast('Error al guardar la nota');
    }
}

// Eliminar nota
async function deleteNote(noteId) {
    if (!currentUser) {
        console.log('No hay usuario autenticado');
        return;
    }

    try {
        console.log('Eliminando nota:', noteId);
        await firebase.firestore().collection('users').doc(currentUser.uid).collection('notes')
            .doc(noteId).delete();
        showToast('Nota eliminada');
    } catch (error) {
        console.error('Error al eliminar nota:', error);
        showToast('Error al eliminar la nota');
    }
}

// Mostrar notificación toast
function showToast(message) {
    console.log('Mostrando toast:', message);
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Mostrar el toast
    setTimeout(() => toast.classList.add('show'), 100);

    // Ocultar y eliminar el toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
}
