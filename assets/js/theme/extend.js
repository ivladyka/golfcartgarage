export function initializeCartOffers(){
  if (window.Extend && window.ExtendBigCommerce) {
      var slice = Array.prototype.slice;

      function findAll(element) {
          var items = document.querySelectorAll(element);
          return items ? slice.call(items, 0) : [];
      }

      function addPlanToCart(sku, plan, quantity, cart) {
          ExtendBigCommerce.addPlanToCart(
              {
                  sku: sku,
                  plan: plan,
                  quantity: quantity,
                  cart: cart,
              },
              function (err) {
                  if (err) {
                      return;
                  } else {
                      window.location.reload();
                  }
              }
          );
      }
      ExtendBigCommerce.getCart(function (error, cart) {
          if (cart) {
              // ExtendBigCommerce.normalizeCart({ cart: cart }, function (err, data) {
              //     if (data && data.updates) {
              //         return window.location.reload();
              //     }
              // });

              var planToName = {};
              cart.lineItems.customItems.forEach(function(cItem){
                  if (cItem && cItem.sku && cItem.sku.indexOf(';xtd;') > -1) {
                      var customId = cItem.id
                      var sku = cItem.sku.split(';xtd;')[1]
                      var product = cart.lineItems.physicalItems.find(function(pItem){
                          if (pItem.sku === sku) return pItem.name
                      })
                      planToName[customId] = product.name
                  }
              });

              findAll('#extend-plan-item').forEach(function(el) {
                  var cartItemId = el.getAttribute("data-extend-itemid")
                  if (planToName[cartItemId]) {
                      el.innerText = 'For: ' + planToName[cartItemId]
                  }
              });

              findAll('#extend-cart-offer').forEach( function(el) {
                  var sku = el.getAttribute("data-extend-sku");
                  var quantity = el.getAttribute("data-extend-quantity");
                  var itemId = el.getAttribute("data-extend-item-id");

                  if (ExtendBigCommerce.warrantyAlreadyInCart(sku, cart)) {
                      return;
                  }
                  Extend.buttons.renderSimpleOffer(el, {
                      referenceId: sku,
                      onAddToCart: function (offer) {
                          if(cart.lineItems.physicalItems.length === 1) {
                              addPlanToCart(sku, offer.plan, quantity, cart)
                              return;
                          }
                          document.querySelector('[data-cart] .loadingOverlay').setAttribute('style', 'display: block')
                          var cartItem = cart.lineItems.physicalItems.find(it => it.id == itemId)
                          // var options = cartItem.options.map(opt => ({ optionId: opt.nameId, optionValue: opt.valueId }))
                          var cartId = cart.id
                          if (cartItem.options) {
                              var options = cartItem.options.reduce((optArray, opt) => {
                                  var optId = opt.nameId
                                  var optValue = opt.valueId === null ? opt.value : opt.valueId;
                                  return optArray = [...optArray, { "optionId": optId, optionValue: optValue} ]
                              },[])
                          }
                          ExtendBigCommerce.deleteCartItem(
                              { cartId, itemId },
                              function() {
                                  ExtendBigCommerce.addCartItem({
                                      cartId: cartId,
                                      productId: cartItem.productId,
                                      variantId: cartItem.variantId,
                                      quantity: quantity,
                                      optionSelections: options || [],
                                  }, function(){ addPlanToCart(sku, offer.plan, quantity, cart) })
                              }
                          )
                      },
                  });
              })
          }
      });
  }
}
