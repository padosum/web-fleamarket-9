import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextInput } from '../components/Base';

export default {
  title: 'Components/TextInput',
  argTypes: {
    value: {
      control: {
        disabled: true,
      },
    },
  },
} as ComponentMeta<typeof TextInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextInput> = (args) => (
  <div style={{ width: 360 }}>
    <TextInput {...args} />
  </div>
);

export const DefaultText = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultText.args = {};

export const MediumText = Template.bind({});
MediumText.args = {};

const LargeTemplate: ComponentStory<typeof TextInput.Large> = (args) => (
  <div style={{ width: 360 }}>
    <TextInput.Large {...args} />
  </div>
);

export const LargeText = LargeTemplate.bind({});
LargeText.args = {};

const NoBorderTemplate: ComponentStory<typeof TextInput.NoBorder> = (args) => (
  <div style={{ width: 360 }}>
    <TextInput.NoBorder {...args} />
  </div>
);
export const NoBorderText = NoBorderTemplate.bind({});

NoBorderText.args = {};

const TextAreaTemplate: ComponentStory<typeof TextInput.TextArea> = (args) => (
  <div style={{ width: 360, border: '1px solid #ddd', padding: 10 }}>
    <TextInput.TextArea {...args} />
  </div>
);

export const AreaText = TextAreaTemplate.bind({});
AreaText.args = {
  height: 150,
};

const IconTextTemplate: ComponentStory<typeof TextInput.Icon> = (args) => (
  <div style={{ width: 360, position: 'relative' }}>
    <span style={{ position: 'absolute', left: 10, top: 5 }}>😍</span>
    <TextInput.Icon {...args} />
  </div>
);
export const IconText = IconTextTemplate.bind({});
IconText.args = {};
