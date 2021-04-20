import './scss/style.scss';

import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.js';
import 'webpack-jquery-ui/css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/js/all';
import 'webpack-jquery-ui';
import "jquery-ui-touch-punch/jquery.ui.touch-punch";
import './css/style.css';

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
    var citiesByCountry = {
        sa: ["جدة","الرياض"],
        eg: ['الإسكندرية','القاهرة'],
        jo: ['عمان','الزرقاء'],
        si: ['دمشق','حلب','حماه']
    };
    $('#form-checkout select[name="country"]').change(function(){
        var country = $(this).val();
        var cities = citiesByCountry[country];
        $('#form-checkout select[name="city"]').empty();
        $('#form-checkout select[name="city"]').append(
        '<option value="" disabled selected>أختر مدينة</option>'
        );
   
    cities.forEach(function(city) {
        var newOption = $('<option></option>');
        newOption.text(city);
        newOption.val(city);
        $('#form-checkout select[name="city"]').append(newOption);
    });
});
$("#form-checkout input[name='payment_method']").change(function(){
    var paymentMethod =$(this).val();
    if(paymentMethod === 'on-delivery'){
        $('#credit-card-info input').prop('disabled' , true);
    }
    else{
        $('#credit-card-info input').prop('disabled' , false);
    }
    $('#credit-card-info').toggle();
});


$( function() {
    $( "#price-range" ).slider({
      range: true,
      min: 50,
      max: 1000,
      values: [ 250, 800 ],
      slide: function(event, ui){
        $("#price-min").text(ui.values[0]);
        $("#price-max").text(ui.values[1]);

    }
    });
  } );
});

