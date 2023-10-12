const os = require('os');

const networkInterfaces = os.networkInterfaces();
const addresses = [];

for (const key in networkInterfaces) {
  for (const iface of networkInterfaces[key]) {
    if (iface.family === 'IPv4' && !iface.internal) {
      addresses.push(iface.address);
    }
  }
}

console.log('Dirección IP del servidor local:', addresses.join(', '));