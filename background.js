
const options = {
    background: {
      color: "#000", // the canvas background color
    },
    particles: {
      links: {
        enable: true, // this enables links between particles
        opacity: 0.3,
        distance: 200,
      },
      move: {
        enable: true, // this makes particles move
        speed: { min: 1, max: 3 }, // this is the speed of the particles
      },
      opacity: {
        value: { min: 0.3, max: 0.7 }, // this sets the opacity of the particles
      },
      size: {
        value: { min: 1, max: 3 }, // this sets the size of the particles
      },
    },
  };

const checkTsParticles = setInterval(() => {
    if (window.tsParticles) {
        clearInterval(checkTsParticles);
        tsParticles.load("tsparticles", options);
    }
}, 100);
  tsParticles.load("tsparticles", options);


