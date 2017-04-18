$(function() {
    $(".delete-animal").on("click", function(e) {
        e.preventDefault();

        console.log("Delete!!!!!");
        var url = $(this).attr("href");
        console.log(url);

        $.ajax({
            url: url,
            method: "delete",
            success: function() {
                window.location.reload(true);
            }
        });
    });
});
