import Ember from 'ember';

export function formatName(name) {
  name = name[0].split('-')[1];  
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export default Ember.Helper.helper(formatName);
