

const deleteProduct = (btn) => {
    console.log("Click");
   const prodId = btn.parentNode.querySelector('[name=productId]').value;
   const csrfToken = btn.parentNode.querySelector('[name=_csrf]').value;

   const productElement = btn.closest('article');

   /**
    * this fetch method is for sending data to the server from de website (frontend)
    */
    fetch('/product/' + prodId, {
        method: 'DELETE',
        headers: {
            'csrf-token' :csrfToken
        }
    })
    .then(res => {
        return result.json();
    })
    .then(data => {
        productElement.parentNode.removeChild(productElement);
    })
    .catch(err => {
        console.log("Error in js/admin.js file in method deleteProduct(). Error: " + err + "-------------->>>>");
    }); 

};