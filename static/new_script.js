/**
 * Created by okocsis90 on 2017.03.20..
 */
$(document).ready(function() {
    $('.board').hover(
        function() {
            $(this).addClass('active')
        },
        function() {
            $(this).removeClass('active')
        }
    );
    $("#button-div").click(function() {
        alarm("hey!")
    });
});