# Dockerfile
FROM jitsi/web:stable-8044

# Adiciona seu plugin customizado de filtros de beleza
COPY react/features/beautyfilters /usr/share/jitsi-meet/react/features/beautyfilters

# Adiciona qualquer outro ajuste futuro (interface_config.js já alterado no repo, não precisa sobrescrever aqui)

# Expõe a pasta web com os assets atualizados
WORKDIR /usr/share/jitsi-meet