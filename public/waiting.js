const redirectPage = () => {
  const id = setInterval(async () => {
    const res = await fetch("/redirect");
    console.log("The response is", res.redirected)
    if (res.redirected) {
      console.log("should redirect to game page")
      globalThis.location.href = '/gamePage.html';
      clearInterval(id);
    }
    const opponentStatus = await res.json();
    const isOpponentReady = opponentStatus.isOpponentThere;
  }, 10);
};

const main = () => {
  redirectPage();
};

globalThis.onload = main;