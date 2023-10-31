let {PythonShell} = require('python-shell')
var path = require('path')

function systemSpec() {
    var options = {
        scriptPath: path.join(__dirname, '/python/'),
        args: [null]
    }

    let pyshell = new PythonShell('main.py', options)

    pyshell.on('message', function(message) {
        spec = JSON.parse(message);

        document.getElementById('computer').innerHTML = spec[0];
        document.getElementById('user').innerHTML = spec[1];
        document.getElementById('diskusage').innerHTML = spec[2];
        document.getElementById('memoryusage').innerHTML = spec[3];
        document.getElementById('cpu').innerHTML = spec[4];
        document.getElementById('performance').innerHTML = spec[5];
    });
}
