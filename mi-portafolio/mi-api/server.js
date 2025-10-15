const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let education = [
  { id: 1, school: 'Universidad Nacional', degree: 'Ingeniería en Sistemas', startYear: 2015, endYear: 2019, details: 'Graduado con honores.' }
];
let certificates = [
  { id: 1, name: 'Bootcamp Full Stack', issuer: 'Coding Academy', date: '2018-12-01', credentialUrl: 'http://example.com/credential/123' }
];

app.get('/education', (req, res) => res.json(education));

// === AÑADE ESTE BLOQUE ===
app.post('/education', (req, res) => {
  // Extraer los datos del cuerpo de la petición
  const { school, degree, startYear, endYear, details } = req.body;

  // Validación simple
  if (!school || !degree) {
    return res.status(422).json({ error: 'Los campos "school" y "degree" son obligatorios' });
  }

  // Crear el nuevo objeto
  const newEducation = {
    id: Math.max(0, ...education.map(e => e.id)) + 1, // Nuevo ID
    school,
    degree,
    startYear: Number(startYear) || null,
    endYear: Number(endYear) || null,
    details
  };

  education.push(newEducation); // Añadir a la "base de datos"
  res.status(201).json(newEducation); // Devolver el objeto creado
});

app.get('/certificates', (req, res) => res.json(certificates));

app.post('/certificates', (req, res) => {
  const { name, issuer, date, credentialUrl } = req.body;
  if (!name || !issuer) {
    return res.status(422).json({ error: 'Los campos "name" e "issuer" son obligatorios' });
  }
  const newCertificate = {
    id: Math.max(0, ...certificates.map(c => c.id)) + 1,
    name, issuer, date, credentialUrl
  };
  certificates.push(newCertificate);
  res.status(201).json(newCertificate);
});

app.listen(PORT, () => {
  console.log(`API de Educación y Certificados escuchando en http://localhost:${PORT}`);
});

app.delete('/education/:id', (req, res) => {
  const id = Number(req.params.id);
  const initialLength = education.length;
  education = education.filter(e => e.id !== id);

  if (education.length === initialLength) {
    return res.status(404).json({ error: 'Registro de educación no encontrado' });
  }
  res.status(204).send(); // 204 No Content: éxito, sin nada que devolver
});

// RUTA DELETE /certificates/:id
app.delete('/certificates/:id', (req, res) => {
  const id = Number(req.params.id);
  const initialLength = certificates.length;
  certificates = certificates.filter(c => c.id !== id);

  if (certificates.length === initialLength) {
    return res.status(404).json({ error: 'Certificado no encontrado' });
  }
  res.status(204).send();
});
