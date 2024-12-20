const fs = require('fs');
const path = require('path');

//Ruta a index.html
const indexPath = path.join(__dirname, 'www', 'index.html');

//Código que deseas insertar
const scriptContent = `
<script>
  (function() {
    if (typeof globalThis === 'undefined') {
      Object.defineProperty(Object.prototype, 'globalThis', {
        get: function(){
          return this;
        },
        configurable: true
      });
    }
  })();
</script>
`;

//Leer contenido de index.html
fs.readFile(indexPath, 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
    }

    const result = data.replace('</body>', `${scriptContent}</body>`);

    fs.writeFile(indexPath, result, 'utf8', (err) => {
        if (err) return console.log(err);
    });
});