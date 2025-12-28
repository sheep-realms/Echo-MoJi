const config = $.ajax({
    type:"GET",
    url:"config.json",
    async:false,
    cache: false
}).responseJSON;