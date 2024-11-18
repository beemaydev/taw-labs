 import { Rectangle, Point, Square } from './rectangle';

let rectangle = new Rectangle(new Point(0, 2), new Point(2, 2), new Point(0, 0), new Point(2, 0));
console.log(`Rectangle: ${rectangle}`);
console.log(`Area: ${rectangle.getArea()}`);
console.log(`Perimeter: ${rectangle.getPerimeter()}`);
console.log('*'.repeat(20));

rectangle.rotate(90);
console.log(`Rortate 90: ${rectangle}`);

rectangle.rotate(90);
console.log(`Rortate 180: ${rectangle}`);

rectangle.rotate(90);
console.log(`Rortate 270: ${rectangle}`);

rectangle.rotate(90);
console.log(`Rortate 360: ${rectangle}`);

console.log('*'.repeat(20));
console.log(`Rectangle: ${rectangle}`);
console.log(`Area: ${rectangle.getArea()}`);
console.log(`Perimeter: ${rectangle.getPerimeter()}`);

console.log('*'.repeat(20));
console.log("Scale: 2")
rectangle.scale(2);
console.log(`Rectangle: ${rectangle}`);
console.log(`Area: ${rectangle.getArea()}`);
console.log(`Perimeter: ${rectangle.getPerimeter()}`);

console.log();
console.log("Scale: 0.5")
rectangle.scale(0.25);
console.log(`${rectangle}`);
console.log(`Area: ${rectangle.getArea()}`);
console.log(`Perimeter: ${rectangle.getPerimeter()}`);

console.log('*'.repeat(20));
console.log("Move (3, 10)")
rectangle.move(3, 10);
console.log(`Rectangle: ${rectangle}`);

console.log();
console.log("Move (-3.5, -10.5)")
rectangle.move(-3.5, -10.5);
console.log(`Rectangle: ${rectangle}`);

console.log('*'.repeat(20));
let square = new Square(new Point(0, 1), new Point(1, 1), new Point(0, 0), new Point(1, 0));
console.log(`Square: ${square}`);

try {
    console.log();
    console.log("Check wrong square (0, 100) (1, 100) (0, 0) (1, 0):");
    let squareError = new Square(new Point(0, 100), new Point(1, 100), new Point(0, 0), new Point(1, 0));
    console.log(`Square: ${squareError}`);
} catch (error) {
    if (error instanceof Error) {
        console.log(error.message);
    }
}
