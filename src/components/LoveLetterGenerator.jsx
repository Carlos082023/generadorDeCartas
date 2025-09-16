import React, { useState, useEffect, useRef } from "react";
import "../App.css";

// Importar las imágenes desde src/assets
import luli1 from "../assets/luli1.jpg";
import luli2 from "../assets/luli2.jpg";
import luli3 from "../assets/luli3.jpg";
import luli4 from "../assets/luli4.jpg";
import luli5 from "../assets/luli5.jpg";
import luli6 from "../assets/luli6.jpg";
import luli7 from "../assets/luli7.jpg";
import luli8 from "../assets/luli8.jpg";
import luli9 from "../assets/luli9.jpg";
import luli10 from "../assets/luli10.JPG";
import luli11 from "../assets/luli11.jpg";
import luli12 from "../assets/luli12.jpg";

const LoveLetterGenerator = () => {
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("Carlitos Tony");
  const [letter, setLetter] = useState(null);
  const [template, setTemplate] = useState("romantic");
  const [colorTheme, setColorTheme] = useState("#e74c3c");
  const [savedLetters, setSavedLetters] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const letterRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("loveLetters");
    if (saved) setSavedLetters(JSON.parse(saved));
  }, []);

  // Lista de fotos usando imports
  const lovePhotos = [
    luli1, luli2, luli3, luli4, luli5, luli6,
    luli7, luli8, luli9, luli10, luli11, luli12
  ];

  const messageTemplates = {
    romantic: [
      `Mi querido/a ${recipient}, mi corazón late solo por vos. Eres la razón por la que cada día es especial.`,
      `Amor mío, ${recipient}, no hay palabras suficientes para describir lo que siento por vos. Sos mi todo.`,
      `${recipient}, tu presencia ilumina mi vida y me haces sentir completo/a. Te amo más de lo que puedo expresar.`,
    ],
    poetic: [
      `Como la luna necesita a las estrellas, ${recipient}, yo te necesito a ti. Eres el verso perfecto en el poema de mi vida.`,
      `En el jardín de mi corazón, ${recipient}, floreces como la rosa más bella. Tu amor es el rocío que me nutre cada día.`,
      `${recipient}, eres el soneto que mi alma recita en silencio, la metáfora que da sentido a mi existir.`,
    ],
    funny: [
      `${recipient}, mi amor por ti es como el Wi-Fi... ¡siempre conectado y con máxima señal!`,
      `Si fueras un zombie, ${recipient}, dejaría que me mordieras... ¡para poder ser tuyo por toda la eternidad!`,
      `${recipient}, eres como el café por las mañanas: ¡necesario, calentito y perfecto para empezar el día!`,
    ]
  };

  const generateLetter = () => {
    if (!recipient.trim()) {
      alert("Por favor, ingresa tu nombre amor.");
      return;
    }

    const randomPhoto = lovePhotos[Math.floor(Math.random() * lovePhotos.length)];
    const templateMessages = messageTemplates[template] || messageTemplates.romantic;
    const randomMessage = templateMessages[Math.floor(Math.random() * templateMessages.length)];

    const newLetter = { 
      recipient, 
      sender,
      message: randomMessage, 
      photo: randomPhoto,
      template,
      color: colorTheme,
      date: new Date().toLocaleDateString()
    };
    
    setLetter(newLetter);
  };

  const saveLetter = () => {
    if (!letter) return;
    const updatedLetters = [...savedLetters, {...letter, id: Date.now()}];
    setSavedLetters(updatedLetters);
    localStorage.setItem("loveLetters", JSON.stringify(updatedLetters));
    alert("¡Carta guardada con éxito! 💖");
  };

  const loadLetter = (savedLetter) => {
    setLetter(savedLetter);
    setShowSaved(false);
  };

  const shareLetter = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Carta de amor para ${letter.recipient}`,
          text: letter.message,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      alert("Tu navegador no soporta la función de compartir. Puedes copiar el enlace manualmente.");
    }
  };

  return (
    <div>
      <div className="container">
        <h1 className="title" style={{ color: colorTheme }}>💌 Generador de Cartas de Amor 💌</h1>

        <div className="card">
          <div className="input-group">
            <label>Para:</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Escribe el nombre de tu amor"
            />
          </div>
          
          <div className="input-group">
            <label>De:</label>
            <input
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              placeholder="Tu nombre"
            />
          </div>
          
          <div className="input-group">
            <label>Estilo de carta:</label>
            <select value={template} onChange={(e) => setTemplate(e.target.value)}>
              <option value="romantic">Romántica</option>
              <option value="poetic">Poética</option>
              <option value="funny">Divertida</option>
            </select>
          </div>
          
          <div className="input-group">
            <label>Color tema:</label>
            <input
              type="color"
              value={colorTheme}
              onChange={(e) => setColorTheme(e.target.value)}
            />
          </div>
          
          <button onClick={generateLetter} style={{ backgroundColor: colorTheme }}>
            💖 Crear Carta 💖
          </button>
          
          <div className="action-buttons">
            <button 
              onClick={() => setShowSaved(!showSaved)} 
              className="secondary-btn"
            >
              {showSaved ? "Ocultar guardadas" : "Ver cartas guardadas"}
            </button>
          </div>
        </div>

        {showSaved && savedLetters.length > 0 && (
          <div className="saved-letters">
            <h2>Tus cartas guardadas</h2>
            {savedLetters.map((savedLetter) => (
              <div key={savedLetter.id} className="saved-letter-item" onClick={() => loadLetter(savedLetter)}>
                <span>Para: {savedLetter.recipient}</span>
                <span>{savedLetter.date}</span>
              </div>
            ))}
          </div>
        )}

        {letter && (
          <div className="letter-display" ref={letterRef}>
            <div className="letter-content">
              <h2 style={{ color: colorTheme }}>Para: {letter.recipient}</h2>
              <h2 style={{ color: colorTheme }}>De: {sender}</h2>
              <p>{letter.message}</p>
              <span className="heart">❤️</span>
              
              <div className="letter-actions">
                <button onClick={saveLetter} style={{ backgroundColor: colorTheme }}>
                  Guardar carta
                </button>
                <button onClick={shareLetter} className="share-btn">
                  Compartir
                </button>
              </div>
            </div>

            <div className="photo-display">
              <img
                src={letter.photo}
                alt="Momento especial"
                onError={(e) => {
                  e.target.onerror = null;
                  // Imagen de fallback genérica
                  e.target.src = "https://via.placeholder.com/300x200?text=Imagen+no+disponible";
                }}
              />
            </div>
          </div>
        )}
        
        <div className="floating-hearts">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="floating-heart" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              color: colorTheme
            }}>❤️</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoveLetterGenerator;
