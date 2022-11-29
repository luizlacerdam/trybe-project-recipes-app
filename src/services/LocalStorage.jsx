const saveEmailLocalStorage = (data) => {
  localStorage.setItem('user', JSON.stringify(data));
};

export default saveEmailLocalStorage;
