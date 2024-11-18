class Point implements Moveable {
    public x: number;
    public y: number;
  
    public constructor(x: number, y: number) {
        if (typeof x != "number" || typeof y != "number") {
            throw new Error("Check input type");
        }

        this.x = x;
        this.y = y;
    }
  
    public move(x: number, y: number): void {
        this.x += x;
        this.y += y;
    }

    public scale(s: number): void {
        this.x *= s;
        this.y *= s;
    }

    public rotate(angle: number): void {
        let angleInRadians = angle * Math.PI / 180;

        let xNew = this.x * Math.cos(angleInRadians) - this.y * Math.sin(angleInRadians);
        let yNew = this.x * Math.sin(angleInRadians) + this.y * Math.cos(angleInRadians);

        this.x = Math.round(xNew);
        this.y = Math.round(yNew);
    };

    public toString = (): string => {
        return `(${this.x}, ${this.y})`;
    }
}

class Rectangle implements Moveable {
    // A-------B
    // |       |
    // C-------D

    private a: Point;
    private b: Point;
    private c: Point;
    private d: Point;

    public constructor(a: Point, b: Point, c: Point, d: Point) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }

    public getPerimeter(): number {
        let ab: number = Math.sqrt(Math.pow((this.a.x - this.b.x), 2) + Math.pow((this.a.y - this.b.y), 2));
        let bd: number = Math.sqrt(Math.pow((this.b.x - this.d.x), 2) + Math.pow((this.b.y - this.d.y), 2));

        return 2 * (ab + bd);
    }

    public move(x: number, y: number): void {
        this.a.move(x, y);
        this.b.move(x, y);
        this.c.move(x, y);
        this.d.move(x, y);
    }

    public getArea(): number {
        let ab: number = Math.sqrt(Math.pow((this.a.x - this.b.x), 2) + Math.pow((this.a.y - this.b.y), 2));
        let bd: number = Math.sqrt(Math.pow((this.b.x - this.d.x), 2) + Math.pow((this.b.y - this.d.y), 2));

        return ab * bd;
    }

    public rotate(angle: number): void {
        this.a.rotate(angle);
        this.b.rotate(angle);
        this.c.rotate(angle);
        this.d.rotate(angle);
    }

    public scale(factor: number): void {
        let centerX = (this.a.x + this.b.x + this.c.x + this.d.x) / 4;
        let centerY = (this.a.y + this.b.y + this.c.y + this.d.y) / 4;

        this.move(-centerX, -centerY);

        this.a.scale(factor);
        this.b.scale(factor);
        this.c.scale(factor);
        this.d.scale(factor);

        this.move(centerX, centerY);
    }

    public toString = () : string => {
        return `(${this.a}, ${this.b}, ${this.c}, ${this.d})`;
    }
}

class Square extends Rectangle {
    public constructor(a: Point, b: Point, c: Point, d: Point) {
        let ab = Math.round(Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2)));
        let bd = Math.round(Math.sqrt(Math.pow((b.x - d.x), 2) + Math.pow((b.y - d.y), 2)));
        let cd = Math.round(Math.sqrt(Math.pow((c.x - d.x), 2) + Math.pow((c.y - d.y), 2)));
        let ac = Math.round(Math.sqrt(Math.pow((a.x - c.x), 2) + Math.pow((a.y - c.y), 2)));

        if (ab != bd || bd != cd || cd != ac || ac != ab) {
            throw new Error("Square error: Check length!");
        }

        super(a, b, c, d);
    }
}

interface Moveable {
    move(x: number, y: number): void;
}

export {Point, Rectangle, Square};