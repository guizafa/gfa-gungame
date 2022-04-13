-- Resource Metadata
fx_version 'cerulean'
game 'gta5'

author 'guizafa#6064'
description 'Gun Game'
version '1.0.0'

-- Default Page
ui_page 'ui/index.html'
-- What to run
client_script 'dist/client/*.client.js'

server_script 'dist/server/*.server.js'

files {
    'ui/index.html',
	'ui/css/main.css',
    'ui/css/responsive.css',
    'ui/images/*.png',
	'ui/js/app.js'
}
