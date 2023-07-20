import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    // '@storybook/addon-links',
    '@storybook/addon-essentials',
    "storybook-css-modules",
    // '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite', // Your framework name here.
    options: {
      builder: {
        viteConfigPath: '.storybook/vite.config.ts',
      },
    },
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      // Add storybook-specific dependencies to pre-optimization
      // optimizeDeps: {
      //   include: ['storybook-addon-designs'],
      // },
    });
  },
};
export default config;
