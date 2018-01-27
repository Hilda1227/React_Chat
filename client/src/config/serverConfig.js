const development = {
  HOST: 'localhost',
  PORT: '3004'
}
const production = {
  HOST: '123.206.31.196',
  PORT: '3004'
}
const server = process.env.NODE_ENV === 'development' ? development : production;
export default {
  server,
  EMOJI_URL: `http://${server.HOST}:${server.PORT}/chat/emoji/`,
  DEFAULT_GROUP_URL: `http://${server.HOST}:${server.PORT}/chat/img/default_group_avatar.svg`,
}