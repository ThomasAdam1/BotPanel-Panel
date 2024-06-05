import server from "../utils/server";

export const setAuth = () => {
    return async (dispatch, getState) => {
        console.log(process.env.API_SERVER);
        const response = await server.get("/auth").catch(e => {

        });

        if (response?.data) {
            dispatch({ type: "SET_AUTH", payload: true });
        } else {
            window.location.replace(process.env.REACT_APP_API_SERVER + "/auth/botpanel?redirect=" + window.location.href);
        }
    };
};


export const getData = () => {
    return async (dispatch, getState) => {
        const response = await server.get("/client/data").catch(e => {

        });

        if (response?.data) {
            if (!response?.data.bot?.color_settings) {
                response.data.bot.color_settings = {
                    primary: "#f45142"
                };
            }
            dispatch({ type: "SET_DATA", payload: response.data });
        }

        if (response?.data?.user) {
            dispatch({ type: "SET_AUTH", payload: true });
        }
    };
};


export const setServerData = (data) => {
    return async (dispatch, getState) => {
        data.loaded = true;
        dispatch({ type: "SET_SERVER_DATA", payload: data });
    };

};

export const setActiveServer = (server_id) => {
    return async (dispatch, getState) => {
        const activeServer = getState().data.servers.find(s => s.id == server_id);

        var response = await server.get("/client/server/" + server_id + "/settings", {

        });

        if (activeServer) {
            dispatch({ type: "SET_ACTIVE_SERVER", payload: activeServer });
        }

        if (response?.data) {
            dispatch({ type: "SET_ACTIVE_SERVER_SETTINGS", payload: response.data });
        }
    };

}


