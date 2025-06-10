FROM jitsi/web

# Copia os arquivos de configuração personalizados
COPY ./config /usr/share/jitsi-meet/
COPY ./interface_config.js /usr/share/jitsi-meet/interface_config.js