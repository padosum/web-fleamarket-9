import React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import { Button } from '../components/Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    size: {
      options: ['md', 'lg'],
      control: { type: 'radio' },
    },
    label: {
      control: 'text',
    },
    className: {
      control: false,
    },
    onClick: {
      control: false,
    },
  },
} as ComponentMeta<typeof Button>;

const template: Story = ({ label, ...args }) => {
  return <Button {...args}>{label}</Button>;
};

export const MediumButton = template.bind({});

MediumButton.args = {
  size: 'md',
  label: '버튼',
};

export const LargeButton = template.bind({});

LargeButton.args = {
  size: 'lg',
  label: '버튼',
};
