import { store } from "@/entities/counter";
import { createWrappedButton, createDiv } from '@/shared/ui/dom'

export function renderSecondCounter(rootElement){
    let unsubscribe = null;
    function render() {
        rootElement.innerHTML = '';
        rootElement.appendChild(createDiv(`Counter: ${store.getState()}`));
        rootElement.appendChild(createWrappedButton('Unsubscribe', () => {
            if(unsubscribe){
                unsubscribe();
                unsubscribe = null;
            }
        }))
    };

    unsubscribe = store.subscribe(render);
    render();
}