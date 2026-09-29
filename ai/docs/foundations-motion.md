# Motion

Motion explains what changed: a menu grows from its button, a toast slides in from the edge. Keep it short and purposeful.

## Guidelines

- Use `--duration-fast` for hover and press, `--duration-normal` for elements changing size or position, `--duration-slow` for elements entering or leaving.
- Pair `--easing-enter` with things appearing and `--easing-exit` with things leaving.
- Never animate only to decorate, and never block input while an animation runs.

## Reduced motion

When someone asks their system for less motion (`prefers-reduced-motion: reduce`), every duration token becomes `0ms`. Components that use the tokens get this for free, including the Button loading spinner, which stops spinning.
