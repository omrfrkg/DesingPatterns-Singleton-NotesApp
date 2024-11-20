/**
 * NotesManager - Singleton Pattern örneği
 * Bu sınıf, uygulama genelinde notları yönetir ve tek bir instance üzerinden erişim sağlar.
 */
export class NotesManager {
    private static instance: NotesManager;
    private notes: { id: string; title: string; content: string; date: Date }[] = [];

    private constructor() {
        // Private constructor
    }

    public static getInstance(): NotesManager {
        if (!NotesManager.instance) {
            NotesManager.instance = new NotesManager();
        }
        return NotesManager.instance;
    }

    // Not ekleme
    public addNote(title: string, content: string): void {
        const note = {
            id: Math.random().toString(36).substr(2, 9),
            title,
            content,
            date: new Date()
        };
        this.notes.push(note);
    }

    // Not silme
    public deleteNote(id: string): void {
        this.notes = this.notes.filter(note => note.id !== id);
    }

    // Tüm notları getirme
    public getAllNotes() {
        return [...this.notes].sort((a, b) => b.date.getTime() - a.date.getTime());
    }

    // Not güncelleme
    public updateNote(id: string, title: string, content: string): void {
        const noteIndex = this.notes.findIndex(note => note.id === id);
        if (noteIndex !== -1) {
            this.notes[noteIndex] = {
                ...this.notes[noteIndex],
                title,
                content,
                date: new Date()
            };
        }
    }
}
