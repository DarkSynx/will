$( document ).ready(function() {

	var clique = 0;
	console.log('>> load script ok !');
	
	chargement_article();

	$('input#recherche').keyup(function(e) { if(e.keyCode == 13) { 
		$('section').html("");
		var marecherche = $('input#recherche').val();
		
		$.get( "themes/will/article.html?" + $.now() , function( html ) {
			
				$.ajax({
				  //dataType: 'json',
				  type : 'POST',
				  data: { 'chr': marecherche },
				  url: 'themes/will/scripts/recherche.php',
				  success: function( json ) { 
				  
				  console.log('>>>' + json);
				  console.log(json);
					
					$.each( json, function( index, element ) { console.log('>> ' + index + ':' + element[0]);
					
					var mxnum =  parseInt(element[6]) + parseInt(element[7]) + parseInt(element[8]);
					
					var e1 =  Math.round((parseInt(element[6]) * 100) / mxnum) || 0; 
					var e2 =  Math.round((parseInt(element[7]) * 100) / mxnum) || 0; 
					var e3 =  Math.round((parseInt(element[8]) * 100) / mxnum) || 0; 

					
					var article = html;
						article = article.replace(	/{{ID}}/i, 			"A_" + element[0]);
						
						article = article.replace(	/{{BID1}}/i, 			"BV1_" + element[0]);
						article = article.replace(	/{{BID2}}/i, 			"BV2_" + element[0]);
						article = article.replace(	/{{BID3}}/i, 			"BV3_" + element[0]);
						
						
						if( element[3].length <= 32) { article = article.replace(	/{{TITRE}}/i, 		'<span style="top:10px;font-size: 1.1em;">' + element[3] + '</span>');}
						else {
						article = article.replace(	/{{TITRE}}/i, 		'<span>' + element[3] + '</span>'); }
						
						article = article.replace(	/{{DATE}}/i, 		element[2]);
						article = article.replace(	/{{TYPE}}/i, 		element[4]);
						article = article.replace(	/{{VUE}}/i, 		/*element[5]*/ "");
						article = article.replace(	/{{POSITIF}}/i, 	e1 + "<span>%</span>");
						article = article.replace(	/{{NEGATIF}}/i, 	e2 + "<span>%</span>");
						article = article.replace(	/{{COMPLOT}}/i, 	e3 + "<span>%</span>");
						article = article.replace(	/{{URL}}/i, 		element[1]);
						
						
						
						//console.log(ImageExist('data/' + element[2] + '/' + element[0] + '/tumb.jpg'));
						
						if( ImageExist('data/' + element[2] + '/' + element[0] + '/tumb.jpg')) {
							var img = 'data/' + element[2] + '/' + element[0] + '/tumb.jpg';
							article = article.replace(	/{{IMAGE1}}/i, 		'style="background-images:url(\'' +  img + '\');"');
							article = article.replace(	/{{IMAGE2}}/i, 		'<img src="' + img + '" />');
							
						} 

						else if( ImageExist('data/' + element[2] + '/' + element[0] + '/tumb.png')) {
							var img = 'data/' + element[2] + '/' + element[0] + '/tumb.png';
							article = article.replace(	/{{IMAGE1}}/i, 		'style="background-images:url(\'' +  img + '\');"');
							article = article.replace(	/{{IMAGE2}}/i, 		'<img src="' + img + '" />');
						} 

						else if( ImageExist('data/' + element[2] + '/' + element[0] + '/tumb.gif')) {
							var img = 'data/' + element[2] + '/' + element[0] + '/tumb.gif';
							article = article.replace(	/{{IMAGE1}}/i, 		'style="background-images:url(\'' +  img + '\');"');
							article = article.replace(	/{{IMAGE2}}/i, 		'<img src="' + img + '" />');
						} 						

						else if( ImageExist('data/' + element[2] + '/' + element[0] + '/tumb.pic')) {
							var img = 'data/' + element[2] + '/' + element[0] + '/tumb.pic';
							article = article.replace(	/{{IMAGE1}}/i, 		'style="background-images:url(\'' +  img + '\');"');
							article = article.replace(	/{{IMAGE2}}/i, 		'<img src="' + img + '" />');
						} 
						
							var img = 'data/' + element[2] + '/' + element[0] + '/tumb';
							article = article.replace(	/{{IMAGE1}}/i, 		'style="background-images:url(\'' +  img + '\');"');
							article = article.replace(	/{{IMAGE2}}/i, 		'<img src="' + img + '" />');
						

						if( element[10].length <= 100) { article = article.replace(	/{{DESCRIPTION}}/i, '<span style="top:50px;font-size: 1.2em;">' + element[10] + '</span>'); }
						else if( element[10].length <= 160) { article = article.replace(	/{{DESCRIPTION}}/i, '<span style="top:30px;font-size: 1.1em;">' + element[10] + '</span>'); }
						else if( element[10].length <= 225) { article = article.replace(	/{{DESCRIPTION}}/i, '<span style="top:10px;">' + element[10] + '</span>'); }
						else { article = article.replace(	/{{DESCRIPTION}}/i, '<span>' + element[10] + '</span>'); }
					
						$('section').append(article);
					
					});
				
				
				}});
		});
		
	 }});

	
	function chargement_article() {
		//chargement du bloque article default
		$('section').html("");
		
		$.get( "themes/will/article.html?" + $.now() , function( html ) {
			
				$.ajax({
				  //dataType: 'json',
				  url: 'themes/will/scripts/getjson.php',
				  success: function( json ) { 
				  
				  console.log('>>>' + json);
				  console.log(json);
					
					$.each( json, function( index, element ) { console.log('>> ' + index + ':' + element[0]);
					
					var mxnum =  parseInt(element[6]) + parseInt(element[7]) + parseInt(element[8]);
					
					var e1 =  Math.round((parseInt(element[6]) * 100) / mxnum) || 0; 
					var e2 =  Math.round((parseInt(element[7]) * 100) / mxnum) || 0; 
					var e3 =  Math.round((parseInt(element[8]) * 100) / mxnum) || 0; 

					
					var article = html;
						article = article.replace(	/{{ID}}/i, 			"A_" + element[0]);
						
						article = article.replace(	/{{BID1}}/i, 			"BV1_" + element[0]);
						article = article.replace(	/{{BID2}}/i, 			"BV2_" + element[0]);
						article = article.replace(	/{{BID3}}/i, 			"BV3_" + element[0]);
						
						
						if( element[3].length <= 32) { article = article.replace(	/{{TITRE}}/i, 		'<span style="top:10px;font-size: 1.1em;">' + element[3] + '</span>');}
						else {
						article = article.replace(	/{{TITRE}}/i, 		'<span>' + element[3] + '</span>'); }
						
						article = article.replace(	/{{DATE}}/i, 		element[2]);
						article = article.replace(	/{{TYPE}}/i, 		element[4]);
						article = article.replace(	/{{VUE}}/i, 		/*element[5]*/ "");
						article = article.replace(	/{{POSITIF}}/i, 	e1 + "<span>%</span>");
						article = article.replace(	/{{NEGATIF}}/i, 	e2 + "<span>%</span>");
						article = article.replace(	/{{COMPLOT}}/i, 	e3 + "<span>%</span>");
						article = article.replace(	/{{URL}}/i, 		element[1]);
						
						
						
						//console.log(ImageExist('data/' + element[2] + '/' + element[0] + '/tumb.jpg'));
						
						if( ImageExist('data/' + element[2] + '/' + element[0] + '/tumb.jpg')) {
							var img = 'data/' + element[2] + '/' + element[0] + '/tumb.jpg';
							article = article.replace(	/{{IMAGE1}}/i, 		'style="background-images:url(\'' +  img + '\');"');
							article = article.replace(	/{{IMAGE2}}/i, 		'<img src="' + img + '" />');
							
						} 

						else if( ImageExist('data/' + element[2] + '/' + element[0] + '/tumb.png')) {
							var img = 'data/' + element[2] + '/' + element[0] + '/tumb.png';
							article = article.replace(	/{{IMAGE1}}/i, 		'style="background-images:url(\'' +  img + '\');"');
							article = article.replace(	/{{IMAGE2}}/i, 		'<img src="' + img + '" />');
						} 

						else if( ImageExist('data/' + element[2] + '/' + element[0] + '/tumb.gif')) {
							var img = 'data/' + element[2] + '/' + element[0] + '/tumb.gif';
							article = article.replace(	/{{IMAGE1}}/i, 		'style="background-images:url(\'' +  img + '\');"');
							article = article.replace(	/{{IMAGE2}}/i, 		'<img src="' + img + '" />');
						} 						

						else if( ImageExist('data/' + element[2] + '/' + element[0] + '/tumb.pic')) {
							var img = 'data/' + element[2] + '/' + element[0] + '/tumb.pic';
							article = article.replace(	/{{IMAGE1}}/i, 		'style="background-images:url(\'' +  img + '\');"');
							article = article.replace(	/{{IMAGE2}}/i, 		'<img src="' + img + '" />');
						} 
						
							var img = 'data/' + element[2] + '/' + element[0] + '/tumb';
							article = article.replace(	/{{IMAGE1}}/i, 		'style="background-images:url(\'' +  img + '\');"');
							article = article.replace(	/{{IMAGE2}}/i, 		'<img src="' + img + '" />');
						

						if( element[10].length <= 100) { article = article.replace(	/{{DESCRIPTION}}/i, '<span style="top:50px;font-size: 1.2em;">' + element[10] + '</span>'); }
						else if( element[10].length <= 160) { article = article.replace(	/{{DESCRIPTION}}/i, '<span style="top:30px;font-size: 1.1em;">' + element[10] + '</span>'); }
						else if( element[10].length <= 225) { article = article.replace(	/{{DESCRIPTION}}/i, '<span style="top:10px;">' + element[10] + '</span>'); }
						else { article = article.replace(	/{{DESCRIPTION}}/i, '<span>' + element[10] + '</span>'); }
					
						$('section').append(article);
					
					});
				
				
				}});
		});
	}
	
	$('section').on('click', 'div.articles div.socle div.vpab span.a button.bv1', function() { 
		//$(this).parent().parent().parent().parent().attr('id')
		var rid = this.id.substr(4);
		
				$.ajax({
					dataType: 'json',
					type : 'POST',
					data: { 'rid': rid, 'vote': '1'},
					url: 'themes/will/scripts/vote.php',
					success: function( xdata ) { 
					console.log('>>' + xdata);
					
					if(xdata == 'ok') { alert('merci pour se vote !'); chargement_article();}
					else if(xdata == 'no'){ alert(' vous avez déjà voté pour cet article ! '); }
					else { alert(' une erreur est arriver ! vote est bloquer'); }

				}});
				
				
	});
	
	$('section').on('click', 'div.articles div.socle div.vpab span.a button.bv2', function() { 
		//$(this).parent().parent().parent().parent().attr('id')
		var rid = this.id.substr(4);
		
				$.ajax({
					dataType: 'json',
					type : 'POST',
					data: { 'rid': rid, 'vote': '2'},
					url: 'themes/will/scripts/vote.php',
					success: function( xdata ) { 
					console.log('>>' + xdata);
					
					if(xdata == 'ok') { alert('merci pour se vote !'); chargement_article(); }
					else if(xdata == 'no'){ alert(' vous avez déjà voté pour cet article ! '); }
					else { alert(' une erreur est arriver ! vote est bloquer'); }

					
				}});
	
	});

	$('section').on('click', 'div.articles div.socle div.vpab span.a button.bv3', function() { 
		//$(this).parent().parent().parent().parent().attr('id')
		var rid = this.id.substr(4);
		
				$.ajax({
					dataType: 'json',
					type : 'POST',
					data: { 'rid': rid, 'vote': '3'},
					url: 'themes/will/scripts/vote.php',
					success: function( xdata ) { 
					console.log('>>' + xdata);
					
					if(xdata == 'ok') { alert('merci pour se vote !'); chargement_article();}
					else if(xdata == 'no'){ alert(' vous avez déjà voté pour cet article ! '); }
					else { alert(' une erreur est arriver ! vote est bloquer'); }


					
				}});
	
	});
	
	/*
	$('section').on('click', 'div.articles', function() { 
		var id = 'div#' + this.id;
		var ourl = $('section ' + id + ' input.ouvrir').val();
		// <iframe src="https://www.w3schools.com"></iframe> 
		console.log('>>> url : ' + ourl);
		
		//$("div#page_quitte2").fadeIn(); $("div#page_ouverture").fadeIn();
		
			window.open(ourl); 
		  //$('div#page_ouverture div#oiframe').load(ourl);

	
	});
	*/
	
	$('button#validmonurl').on('click', function() { 
				
				var add_url  = $('input#addlink').val();
				var add_type = $('select#addtype').val();
				var add_desc = $('textarea#adddescription').val();
				
				console.log('>>' + add_url);
				console.log('>>' + add_type);
				console.log('>>' + add_desc);
				
				$.ajax({
					dataType: 'json',
					type : 'POST',
					data: { 'aurl': add_url, 'atype': add_type, 'adesc':add_desc },
					url: 'themes/will/scripts/addarticle.php',
					success: function( xdata ) { 
				  
					console.log('>>' + xdata);
					console.log('>>' + xdata[0]);
					
						if( xdata[0] == 'ok' ) {
							alert('Le lien est correctement envoyer , merci pour se partage !');
							
							$("div#page_quitte").fadeOut(); 
							$("div#add_will").fadeOut();
							
							chargement_article();

						} 
						else if( xdata[0] == 'err' ) {
							alert('!!! Il y a une erreur avec cette url, elle n\'a donc pas était ajouter !!!');
						}
						else {
							
							alert(' !! Ce lien existe déjà, éviter les doublons merci !! ');
						}
						
						$('input#addlink').val("");
						$('select#addtype').val("");
						$('textarea#adddescription').val("");
						
						
				}});

	});
	
	

	$('input#recherche').on('click',  function() { $(this).val(''); });
	$('button#ajouter').on('click',  function() { $("div#page_quitte").fadeIn(); $("div#add_will").fadeIn();});
	
	$('div#page_quitte').on('click',  function() { $("div#page_quitte").fadeOut(); $("div#add_will").fadeOut(); });

	
	$('section').on('mouseover', 'div.articles', function() {  
		
	});
	
	$('section').on('mouseout', 'div.articles', function() {  
	
	});	







function ImageExist(url) {
   var img = new Image();
   img.src = url;
   return img.height != 0;
}	



























});