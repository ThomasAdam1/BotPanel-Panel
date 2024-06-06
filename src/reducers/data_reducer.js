import update from "immutability-helper";
var INIT_STATE = {
  loaded: false,
  user: null,
  bot: null,
  servers: [],
  active_server: {
    id: null,
    name: null,
    img: null,
  },
  modules: [],
  serverSettings: {},
  server_data: {
    loaded: false,
    roles: [],
    channels: [],
  },
  saves_required: {
    serverSettings: null,
  },
};

var dataReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        loaded: true,
        user: action.payload.user,
        bot: action.payload.bot,
        servers: action.payload.servers,
        modules: action.payload.modules,
      };

    case "SET_ACTIVE_SERVER":
      return {
        ...state,
        active_server: action.payload,
      };
    case "SET_ACTIVE_SERVER_SETTINGS": {
      return {
        ...state,
        serverSettings: action.payload,
      };
    }
    case "SET_SERVER_DATA":
      return {
        ...state,
        server_data: action.payload,
      };
    case "UPDATE_SERVER_SETTINGS_SAVE_REQUIRED":
      return update(state, {
        saves_required: { serverSettings: { $set: null } },
      });

    case "UPDATE_SERVER_SETTINGS":
      return update(state, {
        serverSettings: { $set: action.payload },
        saves_required: { serverSettings: { $set: Date.now() } },
      });

    default:
      return state;
  }
};

export default dataReducer;
