
jQuery.fn.HeroData = function(heroId, token) {
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://superheroapi.com/api.php/${token}/${heroId}`,
    "method": "GET",
    "dataType": "json",
    "headers": {
      "Accept": "*/*",
    }
  };
  return $.ajax(settings);

}

