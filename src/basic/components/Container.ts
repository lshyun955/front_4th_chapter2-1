const Container = () => {
  const container = document.createElement('div');
  container.className = 'bg-gray-100 p-8';
  container.appendChild(Wrap());

  return container;
};

export default Container;
