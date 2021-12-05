export default function(cb: (v: number[]) => void): void {
  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function() {
      cb([event.beta, event.gamma]);
    }, true);
  } else if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', function() {
      cb([event.acceleration.x * 2, event.acceleration.y * 2]);
    }, true);
  } else {
    window.addEventListener("MozOrientation", function() {
      cb([orientation.x * 50, orientation.y * 50]);
    }, true);
  }
}
