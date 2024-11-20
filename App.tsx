import { StatusBar } from 'expo-status-bar';
import { NotesScreen } from './src/NotesScreen';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NotesScreen />
    </>
  );
}
