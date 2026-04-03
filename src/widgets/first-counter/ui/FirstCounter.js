import  {store, increment, decrement} from '@/entities/counter'
import { createWrappedButton, createDiv } from '@/shared/ui/dom'

export function renderFirstCounter (rootElement) {
    let unsubscribe = null;
    function render(){
        rootElement.innerHTML = '';
        rootElement.appendChild(createDiv(store.getState()));
        rootElement.appendChild(createWrappedButton('increment', increment));
        rootElement.appendChild(createWrappedButton('decrement', decrement));
        rootElement.appendChild(createWrappedButton('unsubscribe', () => {
            if(unsubscribe){
                unsubscribe();
                unsubscribe = null;
            }
        }));
    }

    unsubscribe = store.subscribe(render);
    render();
}