import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
import './css/style.css';

import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/js/all';

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
    
    $('.add-to-cart-btn').click(function(){
        alert('تم أضافة المنتج الى عربة الشراء');

    });
    $('#copyright').text("جميع الحقوق محفوظة لسنة"+ new Date().getFullYear());

    $('.product-option input[type="radio"]').change(function(){
        $(this).parents(".product-option").siblings().removeClass('active');
        $(this).parents(".product-option").addClass('active');
    });

    $('[data-product-quantity]').change(function(){
        var newQuantity = $(this).val();
        var parent = $(this).parents('[data-product-info]');
        var pricePerUnit = parent.attr('data-product-price');
        var totalPriceForProduct = newQuantity * pricePerUnit;
        parent.find('.total-price-for-product').text(totalPriceForProduct + '$');
        calculateTotalePrice();
    });
    $('[data-remove-from-cart]').click(function( ){
        $(this).parents('[data-product-info]').remove();
        calculateTotalePrice();
    });

    function calculateTotalePrice(){
        var totalePriceForAllProducts = 0;
        $('[data-product-info]').each(function(){
            var pricePerUnit = $(this).attr('data-product-price');
            var quantity = $(this).find('[data-product-quantity]').val();
            var totalPriceForProduct = pricePerUnit * quantity;
            totalePriceForAllProducts = totalePriceForAllProducts + totalPriceForProduct;
        });
        $('#total-price-for-all-products').text( totalePriceForAllProducts);
    }

});


