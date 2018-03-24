import { $, $$ } from './bling';

exports.toggle = () => {
    const toggleCompleted = $$('.completed-list__expand-toggle');

    toggleCompleted.on('click', (e) => {
      e.preventDefault();
      let completedWrapper = e.target.parentElement.parentElement;
      let completedWrapperId = Array.prototype.slice.call($$('.completed-list__wrapper'));
      let completedWrapperIndex = completedWrapperId.indexOf(completedWrapper);
      
      for(let i = 0; i < $$('.completed-list__wrapper').length; i++) {
         if(i != completedWrapperIndex) {
            $$('.completed-list__wrapper')[i].classList.toggle('completed-list__wrapper--hidden');
         }
      }

      completedWrapper.classList.toggle('completed-list__wrapper--expanded');
    });
}
