import Example1 from './Example1';
import Example2 from './Example2';
import Example3 from './Example3';
import Example4 from './Example4';
import Example5 from './Example5';

export default {
  SimpleExample: { name: 'SimpleExample', component: Example1, description: 'open console and see logs' },
  ScheduledCall: {
    name: 'ScheduledCall',
    component: Example2,
    description: 'Drag the component around and see what happens in the 20th render',
  },
  DependencyArray: {
    name: 'DependencyArray',
    component: Example3,
    description: 'click on the button and see the' + ' consoled dimensions of the created box',
  },
  HookBehavior: {
    name: 'HookBehavior',
    component: Example5,
    description: 'this example deeply demonstrate this hook behavior',
  },
  EffectFromNoEffect: {
    name: 'EffectFromNoEffect',
    component: Example4,
    description: 'you can listen to event and schedule renders. resize the window and see console',
  },
};
