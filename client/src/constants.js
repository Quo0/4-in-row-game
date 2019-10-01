export const SERVER_ORIGIN = 'http://localhost:4000';

export const SERVER_API = {
  queue: {
    getState: `${SERVER_ORIGIN}/queue/state`,
    register: `${SERVER_ORIGIN}/queue/register`,
    join: userId => `${SERVER_ORIGIN}/queue/join/${userId}`,   
    leave: userId => `${SERVER_ORIGIN}/queue/leave/${userId}`,   
    confirm: userId => `${SERVER_ORIGIN}/queue/confirm/${userId}`,   
    decline: `${SERVER_ORIGIN}/queue/decline`,   
  },

  game: {
    getState: `${SERVER_ORIGIN}/game/get-state`,
    setState: `${SERVER_ORIGIN}/game/set-state`,
    resetState: `${SERVER_ORIGIN}/game/reset-state`,
  }
};

export const TIMEOUTS = {
  serverUpdate: 200,
  redirect: 2000,
};