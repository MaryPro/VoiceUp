const collapsibleElem = document.querySelector('.collapsible');
const collapsibleInstance = M.Collapsible.init(collapsibleElem);


document.addEventListener('DOMContentLoaded', function() {
  const elems = document.querySelectorAll('.sidenav');
  const instances = M.Sidenav.init(elems);

});
