# 📝 Not Uygulaması - Singleton Pattern Örneği

Bu proje, React Native ve Expo kullanılarak geliştirilmiş, Singleton Design Pattern'ının pratik bir uygulamasını göstermektedir. Uygulama, notları merkezi bir şekilde yöneten bir not alma uygulamasıdır.

## 🎯 Amaç

Bu örnek proje şunları göstermeyi amaçlamaktadır:
- Singleton Pattern'ın gerçek dünya uygulaması
- React Native'de state yönetimi
- TypeScript ile tip güvenli kod yazımı
- Clean Code prensipleri

## 🏗️ Singleton Pattern Nedir?

Singleton Pattern, bir sınıfın yalnızca bir örneğinin (instance) olmasını sağlayan ve bu örneğe global erişim noktası sağlayan bir tasarım desenidir.

### 🔑 Temel Özellikler
1. Tek Instance: Sınıfın yalnızca bir örneği olabilir
2. Global Erişim: Bu örneğe her yerden erişilebilir
3. Lazy Initialization: Instance ilk kullanımda oluşturulur

## 🚀 Projede Singleton Kullanımı

`NotesManager` sınıfı Singleton Pattern'ı şu şekilde uygular:

```typescript
export class NotesManager {
    private static instance: NotesManager;
    private notes: Note[] = [];

    private constructor() {
        // Private constructor önlemi
    }

    public static getInstance(): NotesManager {
        if (!NotesManager.instance) {
            NotesManager.instance = new NotesManager();
        }
        return NotesManager.instance;
    }
    
    // ... diğer metodlar
}
```

## 📱 Özellikler

- Not ekleme
- Not düzenleme
- Not silme
- Notları tarihe göre sıralama
- Modern ve kullanıcı dostu arayüz

## 🛠️ Teknolojiler

- React Native
- Expo
- TypeScript
- React Hooks

## ⚙️ Kurulum

1. Projeyi klonlayın:
\`\`\`bash
git clone [repo-url]
\`\`\`

2. Proje klasörüne gidin:
\`\`\`bash
cd singleton-notes-app-expo
\`\`\`

3. Bağımlılıkları yükleyin:
\`\`\`bash
npm install
\`\`\`

4. Uygulamayı başlatın:
\`\`\`bash
npm start
\`\`\`

## 📂 Proje Yapısı

```
src/
├── NotesManager.ts     # Singleton sınıfı
└── NotesScreen.tsx     # Ana uygulama ekranı
```

## 🎯 Singleton Pattern'ın Avantajları

1. **Veri Tutarlılığı**
   - Tüm notlar tek bir yerde yönetilir
   - Veri çakışması riski yoktur

2. **Kolay Erişim**
   - `NotesManager.getInstance()` ile her yerden erişim
   - Merkezi state yönetimi

3. **Bellek Optimizasyonu**
   - Tek instance ile bellek kullanımı optimize edilir
   - Gereksiz nesne oluşturulması engellenir

## 💡 Kullanım Örnekleri

```typescript
// NotesManager'a erişim
const notesManager = NotesManager.getInstance();

// Not ekleme
notesManager.addNote("Başlık", "İçerik");

// Notları getirme
const allNotes = notesManager.getAllNotes();

// Not silme
notesManager.deleteNote(noteId);

// Not güncelleme
notesManager.updateNote(noteId, "Yeni Başlık", "Yeni İçerik");
```

## 🤔 Ne Zaman Singleton Kullanmalı?

Singleton Pattern şu durumlarda kullanılabilir:
- Global state yönetimi
- Konfigürasyon yönetimi
- Veritabanı bağlantıları
- Logger servisleri
- Cache mekanizmaları

## ⚠️ Dikkat Edilmesi Gerekenler

1. Singleton'ı gerçekten gerektiğinde kullanın
2. Test edilebilirliği zorlaştırabilir
3. Global state yönetiminde dikkatli olun
