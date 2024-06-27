module.exports = {
  //...
  devServer: {
    client: {
      overlay: {
        runtimeErrors: (error) => {
          console.log(error, "ERROR HERE");
          if (error.message.contains == "ResizeObserver loop") {
            return false;
          }
          return true;
        },
      },
    },
  },
};
