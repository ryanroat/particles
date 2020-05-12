// constants
// proximity distance of particles based on window width > = closer proxity for contact
const proxDist = window.innerWidth / 12;
// num of particles > = fewer
const particleCount = Math.floor(window.innerWidth / 20);

const particles = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(55, 100, 144);
    particles.forEach((p, index) => {
        p.update();
        p.deploy();
        p.checkProximity(particles.slice(index));
    });
}

class Particle {
    constructor() {
        // position
        this.pos = createVector(random(width), random(height));
        // velocity
        this.vel = createVector(random(-2, 2), random(-2, 2));
        // size
        this.size = 8;
    }

    update() {
        // udate movement by adding velocity
        this.edges();
        this.pos.add(this.vel);
    }

    // draw single particle
    deploy() {
        noStroke();
        fill('rgba(255, 255 ,255, 0.4)');
        circle(this.pos.x, this.pos.y, this.size);
    }

    // detect edges
    edges() {
        if (
            this.pos.x < 0 + this.size / 2 ||
            this.pos.x > width - this.size / 2
        ) {
            this.vel.x *= -1;
        }
        if (
            this.pos.y < 0 + this.size / 2 ||
            this.pos.y > height - this.size / 2
        ) {
            this.vel.y *= -1;
        }
    }

    checkProximity(particles) {
        particles.forEach(particle => {
            const distance = dist(
                this.pos.x,
                this.pos.y,
                particle.pos.x,
                particle.pos.y
            );
            if (distance < proxDist) {
                stroke('rgba(255,255,255,0.1)');
                line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
            }
        });
    }
}
