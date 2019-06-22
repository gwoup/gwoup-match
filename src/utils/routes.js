const routeRefresh = (history, path) => {
  history.replace('/reload');
  setTimeout(() => {
    history.replace(path);
  });
};

export {
  routeRefresh
};