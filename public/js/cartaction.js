$(document).ready(function(){

    $('.addtocart').click(function(){
        let id = $(this).data('id');
        $.ajax({
            type: "POST",
            url: "/addtocart",
            data: {
                id: id
            },
            success: function(data){
                $('.cart-item').replaceWith(data);
            }
        })
    })

    $('.cart-body').on('change', '#quantity', function(){
        let id = $(this).data('id'),
            quantity = $(this).val();
        $.ajax({
            type: "POST",
            url: "/changequantitycart",
            data:{
                id: id,
                quantity: quantity
            },
            success: function(data){
                $('.cart-body').html('');
                $('.cart-body').append(data);
            }
        })
    })

})