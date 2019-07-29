function get_local_ip() {
    const interfaces = require('os').networkInterfaces();

    console.log(interfaces)

    let IPAdress = '';
    for (const devName in interfaces) {
      const iface = interfaces[devName];
      for (let i = 0; i < iface.length; i++) {
        const alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          IPAdress = alias.address;
        }
      }
    }
    console.log(IPAdress)
    return IPAdress;
  }

  get_local_ip()