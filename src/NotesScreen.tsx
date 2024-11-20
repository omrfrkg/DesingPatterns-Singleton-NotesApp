import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Alert
} from 'react-native';
import { NotesManager } from './NotesManager';

export const NotesScreen: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [notes, setNotes] = useState(NotesManager.getInstance().getAllNotes());
    const [editingId, setEditingId] = useState<string | null>(null);

    const notesManager = NotesManager.getInstance();

    const handleAddNote = () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert('Hata', 'Başlık ve içerik boş olamaz!');
            return;
        }

        if (editingId) {
            notesManager.updateNote(editingId, title, content);
            setEditingId(null);
        } else {
            notesManager.addNote(title, content);
        }

        setTitle('');
        setContent('');
        setNotes(notesManager.getAllNotes());
    };

    const handleDeleteNote = (id: string) => {
        Alert.alert(
            'Silme Onayı',
            'Bu notu silmek istediğinizden emin misiniz?',
            [
                {
                    text: 'İptal',
                    style: 'cancel'
                },
                {
                    text: 'Sil',
                    onPress: () => {
                        notesManager.deleteNote(id);
                        setNotes(notesManager.getAllNotes());
                    },
                    style: 'destructive'
                }
            ]
        );
    };

    const handleEditNote = (note: any) => {
        setEditingId(note.id);
        setTitle(note.title);
        setContent(note.content);
    };

    const renderNote = ({ item }: any) => (
        <View style={styles.noteItem}>
            <View style={styles.noteContent}>
                <Text style={styles.noteTitle}>{item.title}</Text>
                <Text style={styles.noteText}>{item.content}</Text>
                <Text style={styles.noteDate}>
                    {new Date(item.date).toLocaleDateString()}
                </Text>
            </View>
            <View style={styles.noteActions}>
                <TouchableOpacity 
                    onPress={() => handleEditNote(item)}
                    style={[styles.actionButton, styles.editButton]}
                >
                    <Text style={styles.buttonText}>Düzenle</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => handleDeleteNote(item.id)}
                    style={[styles.actionButton, styles.deleteButton]}
                >
                    <Text style={styles.buttonText}>Sil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Not Uygulaması</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Başlık"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={[styles.input, styles.contentInput]}
                    placeholder="İçerik"
                    value={content}
                    onChangeText={setContent}
                    multiline
                />
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={handleAddNote}
                >
                    <Text style={styles.buttonText}>
                        {editingId ? 'Güncelle' : 'Not Ekle'}
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={notes}
                renderItem={renderNote}
                keyExtractor={item => item.id}
                style={styles.notesList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        marginTop: 40
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    contentInput: {
        height: 100,
        textAlignVertical: 'top'
    },
    addButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    notesList: {
        flex: 1
    },
    noteItem: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    noteContent: {
        marginBottom: 10
    },
    noteTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333'
    },
    noteText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5
    },
    noteDate: {
        fontSize: 12,
        color: '#999'
    },
    noteActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10
    },
    actionButton: {
        padding: 8,
        borderRadius: 4,
        minWidth: 70,
        alignItems: 'center'
    },
    editButton: {
        backgroundColor: '#5856D6'
    },
    deleteButton: {
        backgroundColor: '#FF3B30'
    }
});
