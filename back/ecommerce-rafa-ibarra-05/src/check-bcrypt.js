const bcrypt = require('bcrypt');

// Cambiá estos valores para probar
const plainPassword = 'Password123!';
const hashedPassword =
  '$2b$10$abBnk9TFSO7eoor1hQRP5uUXuRFu2dFXkDuCe3vAPSVB2SNlE2zrS';

bcrypt.compare(plainPassword, hashedPassword).then((isMatch) => {
  console.log('Plain:', plainPassword);
  console.log('Hash:', hashedPassword);
  console.log('Match?', isMatch);
});
