(function(){angular.module("abc-bubbles.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("bubble/bubble.html","<div class=\"bubble\">\n	<div class=\"light\"></div>\n</div>");
$templateCache.put("home/home.html","<ion-view view-title=\"Home\" id=\"page-home\">\n  <ion-content padding=\"true\">\n  	<h2>ABC Bubbles</h2>\n  	<h3>Please choose the game</h3>\n    \n    <div class=\"bubble-holder\">\n    	<bubble color=\"orange\"></bubble>\n    </div>\n\n    <a class=\"button button-block button button-outline button-assertive\" href=\"#/app/play\">Play</a>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("play/play.html","<ion-view view-title=\"Play\" id=\"page-play\">\n  <ion-content padding=\"true\">\n  	<h3>Playing the game</h3>\n  </ion-content>\n</ion-view>\n");}]);})();