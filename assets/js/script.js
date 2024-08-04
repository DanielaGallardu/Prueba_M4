
$(document).ready(function() {
  $("#heroInfoContainer").hide();
  const token = "4ef104f3bafac4efe570638ea7086927"
 
  $('#heroForm').on('submit', function(event) {
    event.preventDefault(); 
    
    function isValidNumber(value) {
      return /^\d+$/.test(value);
    }

    // Obtener entrada
    let heroId = $('#heroId').val();
    if (!isValidNumber(heroId)) {
      alert('La entrada no es válida, Por favor utiliza solo números');
      return;
    }

     $.fn.HeroData(heroId, token).done(function(res) {
      limpar();
      if(res.response != "error"){
        renderHeroeCard(res);
        renderHeroChart(res.powerstats, res.name);
        $("#heroInfoContainer").show();
      }else{
        alert("No se encontre heroe con ese id.")
      }
    }).fail(function(textStatus) {
      alert('Error al consultar la API: ' + textStatus);
    });

    
  });

  function renderHeroeCard(response) {

    $("#foto_hero").attr("src",response.image.url);
    $("#nombre_hero").append(" "+ response.name);
    $("#conexiones_hero").append(" "+ response.connections['group-affiliation']);
    $("#publicado_hero").append(" "+ response.biography['publisher']);
    $("#ocupacion_hero").append(" "+ response.work['occupation']);
    $("#primera_ap_hero").append(" "+ response.biography['first-appearance']);
    $("#altura_hero").append(" "+ response.appearance['height']);
    $("#peso_hero").append(" "+ response.appearance['weight']);
    $("#alianza_hero").append(" "+ response.biography['aliases'].join(', '));
  
  
  }
  
  function renderHeroChart(powerstats, heroName) { // Recibe el nombre del superhéroe
    const dataPoints = Object.keys(powerstats).map(heroName => {
      let yValue;
      if (powerstats[heroName]) {
        yValue = Number(powerstats[heroName]);
      } else {
        yValue = 0;
      }
      return { label: heroName, y: yValue };
    }).filter(dataPoint => dataPoint.y > 0);
  
    if (dataPoints.length === 0) {
      $('#heroChart').html('<p>No se tienen datos de super poder para este Superhero.</p>');
      return;
    }
  
    let chart = new CanvasJS.Chart("heroChart", {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: `Estadísticas de Poder para ${heroName}` 
      },
      data: [{
        type: "pie",
        startAngle: 45,
        showInLegend: "true",
        legendText: "{label}",
        indexLabel: "{label} ({y})",
        yValueFormatString: "#,##0.#%",
        dataPoints: dataPoints
      }]
    });
    chart.render();
  }
  
  function limpar(){
  
    $("#heroInfoContainer").hide();
    $("#foto_hero").attr("src","");
    $("#foto_hero").html("");
    $("#nombre_hero").html("");
    $("#conexiones_hero").html("");
    $("#publicado_hero").html("");
    $("#ocupacion_hero").html("");
    $("#primera_ap_hero").html("");
    $("#altura_hero").html("");
    $("#peso_hero").html("");
    $("#alianza_hero").html("");
  
  }
});