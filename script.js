window.addEventListener('DOMContentLoaded', (event) => {
  let money = 0;
  let moneyPerClick = 1;
  const displayMoney = document.querySelector('.displayMoney');
  const items = document.querySelectorAll('.item');

  document.getElementById('cheat').addEventListener('input', (event) => {
    money = event.target.valueAsNumber;
  });

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let id = item.id;
    item.innerHTML = `<button id="buy${id}">Buy ${id}</button>`;
    item.innerHTML += `<div id="display${id}"></div>`;
  }

  // handle all clicks
  document.body.addEventListener('click', (event) => {
    let id = event.target.id;
    if (!id) return;
    console.log(`${id} was clicked`);

    if (id === 'clickMe') {
      money += moneyPerClick;
      return;
    }

    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      if (`buy${item.id}` === id) {
        let { price, priceBuff, clickBuff } = item.dataset;
        if (money < price) return;
        money -= price;
        item.dataset.price *= priceBuff || 2;
        moneyPerClick *= clickBuff || 2;
      }
    }
  });

  // event loop, runs 30 times per second
  clearInterval(window.loop);
  window.loop = setInterval(() => {
    // display stuff
    displayMoney.innerHTML = `$${money}<br>`;
    displayMoney.innerHTML += `Clickrate: $${moneyPerClick}`;

    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let id = item.id;
      let price = item.dataset.price;
      document.getElementById(`buy${id}`).disabled = price > money;
      document.getElementById(`display${id}`).innerHTML = `Price: $${price}`;
    }

    // TODO auto click stuff
  }, 1000 / 30);
});
