# 🌸 Valentina Piccoli — Life & Love Coach

Sito web ufficiale di **Valentina Piccoli**, Life & Love Coach e Maestra dei Registri Akashici.

> *"Ti aiuto ad uscire da relazioni difficili e disfunzionali e a ritrovare amore per te stessa/o"*

---

## 🚀 Sito Live

👉 **[valentinapiccoli-lifecoach.github.io](https://valentinapiccoli-lifecoach.github.io)**

---

## 📁 Struttura

```
coach-landing/
├── index.html              # Pagina principale
├── assets/
│   ├── styles.css          # Tutti gli stili
│   ├── app.js              # Logica interattiva (10 moduli)
│   └── images/
│       └── valentina-piccoli.png   # Foto (sostituire con quella reale)
└── README.md
```

---

## ⚡ Deploy su GitHub Pages — Guida Passo-Passo

### Step 1 — Crea un account GitHub
1. Vai su [github.com](https://github.com) e registrati (gratuito)
2. Scegli un username (es. `valentinapiccoli-lifecoach`)

### Step 2 — Crea un nuovo repository
1. Clicca su **"New repository"** (pulsante verde in alto a destra)
2. Nome repository: `valentinapiccoli-lifecoach.github.io`
   > ⚠️ Il nome DEVE essere esattamente `[username].github.io` per GitHub Pages
3. Impostalo come **Public**
4. Clicca **"Create repository"**

### Step 3 — Carica i file
**Metodo A — Drag & Drop (più semplice):**
1. Nella pagina del repository, clicca **"uploading an existing file"**
2. Trascina tutta la cartella `coach-landing` nel browser
3. Clicca **"Commit changes"**

**Metodo B — GitHub Desktop:**
1. Scarica [GitHub Desktop](https://desktop.github.com/)
2. Clona il repository localmente
3. Copia i file nella cartella del repository
4. Commit e Push

### Step 4 — Attiva GitHub Pages
1. Vai su **Settings** del repository
2. Seleziona **Pages** nel menu laterale
3. In "Source" seleziona **"Deploy from a branch"**
4. Branch: **main** / Folder: **/ (root)**
5. Clicca **Save**
6. ✅ Il sito sarà live su `https://[username].github.io` entro 2-3 minuti!

---

## 🔌 Integrare il Form Email (Gratuito)

Il form contatto funziona ma non invia email. Per attivarlo:

### Opzione A — Formspree (consigliata, gratuita)
1. Vai su [formspree.io](https://formspree.io) e registrati
2. Crea un nuovo form → copia il tuo **Form ID** (es. `xwkgeabc`)
3. In `assets/app.js`, cerca il commento `[PRODUZIONE]` e sostituisci:
   ```javascript
   const data = new FormData(form);
   await fetch('https://formspree.io/f/TUO_FORM_ID', {
     method: 'POST',
     body: data,
     headers: { 'Accept': 'application/json' }
   });
   ```

### Opzione B — EmailJS (gratuita fino a 200 email/mese)
1. Vai su [emailjs.com](https://emailjs.com) e registrati
2. Crea un service (Gmail), un template e copia le credenziali
3. Aggiungi in `index.html` prima di `app.js`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
   ```

---

## 📸 Sostituire la Foto

Sostituire il file `assets/images/valentina-piccoli.png` con la foto reale.
La foto è usata in due sezioni: **Hero** e **Chi sono**.

---

## 🔗 Link Ufficiali

- Instagram: [@valentinapiccoli_lifecoach](https://www.instagram.com/valentinapiccoli_lifecoach)
- Profilo Akademy: [akademy.world/consulting/valentina-piccoli](https://akademy.world/consulting/valentina-piccoli/)
