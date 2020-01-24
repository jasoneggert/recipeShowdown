import { rgba } from 'polished';
import { css } from 'styled-components';

const accentColors = ['#CEFF1A', '#AAA95A', '#82816D', '#384D48'];
const neutralColors = ['#EB6060', '#01C781', '#6095EB', '#FFB200'];
const statusColors = {
  critical: '#FF3333',
  error: '#FF3333',
  warning: '#F7E464',
  ok: '#7DD892',
  unknown: '#a8a8a8',
  disabled: '#a8a8a8',
};
const backgroundColor = '#1B2D2A';

const colors = {
  active: rgba(102, 102, 102, 0.5),
  background: backgroundColor,
  black: '#1B2D2A',
  brand: '#FD6FFF',
  control: {
    dark: '#FFCA58',
    light: '#403216',
  },
  focus: '#FFCA58',
  icon: {
    dark: '#f8f8f8',
    light: '#666666',
  },
  placeholder: '#AAAAAA',
  text: {
    dark: '#eeeeee',
    light: '#444444',
  },
  white: '#FFFFFF',
};

const colorArray = (array, prefix) =>
  array.forEach((color, index) => {
    colors[`${prefix}-${index + 1}`] = color;
  });

colorArray(accentColors, 'accent');
colorArray(neutralColors, 'neutral');
Object.keys(statusColors).forEach(color => {
  colors[`status-${color}`] = statusColors[color];
});

const componentCustomization = {
  input: {
    marginTop: '20px',
  },
};

export const customDarkTheme = {
  global: {
    componentCustomization,
    colors,
    drop: {
      background: '#333333',
    },
    focus: {
      border: {
        color: css`
          ___CSS_0___;
        `,
        width: '2px',
      },
    },
    font: {
      family: 'Arial',
    },
    input: {
      weight: 700,
    },
  },
  anchor: {
    color: 'control',
  },
  layer: {
    background: backgroundColor,
    overlay: {
      background: rgba(48, 48, 48, 0.5),
    },
  },
};
