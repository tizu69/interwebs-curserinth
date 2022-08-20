<template>
  <div>
    <svg
      class="rotate outer"
      width="100%"
      height="100%"
      viewBox="0 0 590 591"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xml:space="preserve"
      xmlns:serif="http://www.serif.com/"
      style="
        fill-rule: evenodd;
        clip-rule: evenodd;
        stroke-linejoin: round;
        stroke-miterlimit: 2;
      "
    >
      <g transform="matrix(1,0,0,1,652.392,-0.400578)">
        <g transform="matrix(4.16667,0,0,4.16667,-735.553,0)">
          <g transform="matrix(0.24,0,0,0.24,0,0)">
            <rect
              width="200"
              height="200"
              rx="15"
              style="fill: var(--color-brand)"
            />
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'LogoAnimated',
}
</script>

<style lang="scss" scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  margin-top: 1rem;

  svg {
    width: 5rem;
    height: 5rem;
    position: absolute;
    &.rotate {
      animation: rotate 4s infinite linear;
      &.inner {
        animation: rotate 6s infinite linear reverse;
      }
    }
    @keyframes rotate {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
