import Component from '@ember/component';
import layout from '../templates/components/accordion-panel';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  tagName: '',
  paymentOptions: {
    "Transferência Bancária" : "PAYMENT_MODALITY_SAFETYPAY_TRANSF",
    "Pagamento em dinheiro" : "PAYMENT_MODALITY_SAFETYPAY_MONEY",
    "Cartão de Crédito" : "PAYMENT_MODALITY_CREDIT_CARD"
  },
  selected: computed('active', function(){
    let atualAtivo = this.get('active') === this.get('title');
    if (atualAtivo)
      this.set('selectedPaymentMethod', this.paymentOptions[this.get('active')]);
    return atualAtivo;
  }),
  formatedTitleForId: computed('title', function() {
    return this.get('title').normalize('NFD').replace(/[\u0300-\u036f]| /g, '').toLowerCase()
  }),
  accordionId: computed('title', function() {
    return `accordion-${this.get('formatedTitleForId')}`;
  }),
  sectId: computed('title', function() {
    return `sect-${this.get('formatedTitleForId')}`;
  }),
  ariaExpanded: computed('active', 'title', 'refresh', function() {
    let _allowToggle = this.get('toggle');
    let _active = this.get('active');
    let _title = this.get('title');
    let _accordionId = this.get('accordionId');
    let buttonEl = document.getElementById(_accordionId);
    let isExpanded = false;
    if(buttonEl) {
      isExpanded = buttonEl.getAttribute('aria-expanded') === "true" ? true : false;
    }
    if(_allowToggle && _active == _title) {
      return !isExpanded;
    } else {
      if(this.get('multiple')) {
        return this.get('activePanels').has(_title);
      } else {
        return _active == _title;
      }
    }
  }),
  hidden: computed.not('ariaExpanded')

});
