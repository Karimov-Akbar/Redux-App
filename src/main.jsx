import '@/shared/styles/dialog.css';
import { renderFirstCounter } from '@/widgets/first-counter';
import { renderSecondCounter } from '@/widgets/second-counter';
import { renderUserList } from '@/widgets/user-list';

const root1 = document.getElementById('root1');
const root2 = document.getElementById('root2');
const root3 = document.getElementById('root3');

renderFirstCounter(root1);
renderSecondCounter(root2);
renderUserList(root3);