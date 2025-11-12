$(document).ready(function() {
    $("#checkoutForm").submit(function(e) {
    e.preventDefault();

    let name = $("#name").val().trim();
    let address = $("#address").val().trim();
    let email = $("#email").val().trim();
    let payment = $("#payment").val();

    if (name === "" || address === "" || email === "" || payment === "") {
      alert("Please fill in all fields before placing your order.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email address.");
      return;
    }

    $(this).fadeOut(400, function() {
      localStorage.removeItem("cart");
      $("#successMessage").removeClass("d-none").hide().fadeIn(600);
    });
    });
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    if (cart.length === 0) {
      $("#orderSummary").html("<p>Your cart is empty. <a href='products.html'>Go shopping</a>.</p>");
      $("#checkoutForm").hide();
    } else {
      $("#orderSummary").html("<h5>Order Summary:</h5>");
      cart.forEach(item => {
        $("#orderSummary").append(`<p>${item.name} - ${item.price}</p>`);
        total += parseFloat(item.price.replace("$", ""));
      });
      $("#orderSummary").append(`<h5 class="mt-3">Total: $${total.toFixed(2)}</h5>`);
    }

    $("#checkoutForm").submit(function(e){
      e.preventDefault();
      $.ajax({
        url: "https://formspree.io/f/xblqljlz",
        method: "POST",
        data: $(this).serialize(),
        success: function() {
          alert("The order has been placed!");
        }
      });
    });
});