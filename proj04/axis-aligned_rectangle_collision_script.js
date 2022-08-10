var rect1 = {x: 5, y: 5, width: 50, height: 50};
var rect2 = {x: 20, y: 10, width: 10, height: 10};

if (rect1.x > rect2.x + rect2.width ||
    rect1.x + rect1.width < rect2.x ||
    rect1.y > rect2.y + rect2.height ||
    rect1.y + rect1.height < rect2.y
) {
    // no collision
    console.log('rect1 and rect2 are NOT colliding.');
}
else {

    // collision detected
    console.log('rect1 and rect2 ARE colliding.');
}