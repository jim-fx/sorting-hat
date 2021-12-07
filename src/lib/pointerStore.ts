
let mx = 0;
let my = 0;

let wHeight = 500;
let wWidth = 500;

let oAlpha: number, oBeta: number;
function handleGyro({ alpha, beta }) {
  if (!oAlpha) oAlpha = alpha;
  if (!oBeta) oBeta = beta;
  mx = ((oBeta - beta) / 80) * -1;
  my = ((oAlpha - alpha) / 80) * -2;
};


function handleResize() {
  wHeight = window.innerHeight;
  wWidth = window.innerWidth;
}

function handleMouseMove({ clientX, clientY }) {
  mx = (clientX / wWidth) * 2 - 1;
  my = (clientY / wHeight) * 2 - 1;
}

export default {
  get x(): number {
    return mx;
  },
  get y(): number {
    return my;
  },
  init(): void {

    wHeight = window.innerHeight;
    wWidth = window.innerWidth

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove)

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleGyro, true);
    } else if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', function(event) {
        handleGyro({ alpha: event.acceleration.x * 2, beta: event.acceleration.y * 2 });
      }, true);
    } else {
      window.addEventListener("MozOrientation", function() {
        handleGyro({ alpha: orientation.x * 50, beta: orientation.y * 50 });
      }, true);
    }

  }
}
