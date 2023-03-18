# Rust Practice

A collection of solutions for various interesting problems for learning computer concepts
and algorithms. It also has my solutions for competitive coding sites like Leetcode and
Edabit.

## Calculate pi

### Question

You have a function called random, that calculates a number from 0 to 1 randomly. Now
calculate the value of pi.

### Solution

Pi is the ratio of the circumference to its diameter. Lets imagine the points to be in
a circle now.
![image with points in a circle that is inside a square](/assets/projects/rust-practice/calculate-pi.png)
We can determine if a point (two of the random numbers we generate) is inside or outside
the circle using the formula: $$distance = (x^{2}) + (y^{2})$$
Then we compare it to the radius of the circle (1) to see if it is inside
or outside the circle.
$$ \frac{\pi r^{2}}{(2 \times r)^{2}} = \frac{cd}{td}$$
Simplifying gives us
$$ \frac{\pi}{4} = \frac{cd}{td}$$

$$ \pi = \frac{4 \times cd}{td}$$

Therefore we can calculate pi with some random numbers. Here is my rust code for that:

```rust
fn main() {
    run(10_000_000);
}

fn run(iterations: i64) {
    let mut num_circle = 0.0;
    let mut num_total = 0.0;
    let mut rng = rand::thread_rng();
    let now = Instant::now();
    for _ in 0..iterations {
        let x: f64 = rng.gen_range(0.0..1.0);
        let y: f64 = rng.gen_range(0.0..1.0);
        let distance: f64 = (x * x) + (y * y);
        if distance <= 1.0 {
            num_circle += 1.0;
        }
        num_total += 1.0;
    }
    let pi = 4.0 * (num_circle / num_total);
    let elapsed_time = now.elapsed();
    println!("Calculated value of pi is: {}", pi);
}

```

We can change the number of iterations to change our accuracy.

## Searching algorithms

### The jug problem
