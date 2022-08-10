const circle1 = { x: 10, y: 10, radius: 300 };
const circle2 = { x: 500, y: 500, radius: 100 };


// a^2 + b^2 === c^2
let a = circle2.x - circle1.x;
let b = circle2.y - circle1.y;

let c = Math.sqrt(a * a + b * b);
console.log(a, b, c);

if (c <= circle1.radius + circle2.radius) {
    // collision detected
    console.log('circle1 and circle2 ARE colliding.');
}
else {
    // no collision
    console.log('circle1 and circle2 are NOT colliding.');
}