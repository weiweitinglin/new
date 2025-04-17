const { createApp, defineComponent } = Vue;

// Vue 元件
const ShimmerButton = defineComponent({
  name: 'ShimmerButton',
  template: `
    <div class="shimmer-button">
      <span>Shimmer Button</span>
    </div>
  `
});

createApp({
  components: {
    ShimmerButton
  },
  data() {
    return {
      activeTab: 'html',
      htmlCode: `<template>
  <div class="shimmer-button">
    <span>Shimmer Button</span>
  </div>
</template>`,

      jsCode: `export default {
  name: 'ShimmerButton',
  template: \`
    <div class="shimmer-button">
      <span>Shimmer Button</span>
    </div>
  \`
}`,

      cssCode: `.shimmer-button {
  position: relative;
  padding: 1rem 2rem;
  border-radius: 9999px;
  background-color: #1f1f1f;
  color: white;
  font-weight: bold;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}
.shimmer-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -150%;
  width: 200%;
  height: 100%;
  background: linear-gradient(120deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 50%,
    transparent 100%);
  animation: shimmer 2s infinite;
}
.shimmer-button span {
  position: relative;
  z-index: 1;
}
@keyframes shimmer {
  0% { left: -150%; }
  100% { left: 100%; }
}`
    };
  },
  computed: {
    currentCode() {
      return {
        html: this.htmlCode,
        js: this.jsCode,
        css: this.cssCode
      }[this.activeTab];
    }
  },
  methods: {
    copyCode() {
      navigator.clipboard.writeText(this.currentCode).then(() => {
        alert(`✅ 已複製 ${this.activeTab} 原始碼！`);
      });
    }
  }
}).mount('#app');
