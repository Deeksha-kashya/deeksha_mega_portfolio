// ---------------- ANALYTICS (LOAD EARLY) ----------------

// GA4
const ga = document.createElement("script");
ga.async = true;
ga.src = "https://www.googletagmanager.com/gtag/js?id=G-EJRSQ3LTP7";
document.head.appendChild(ga);

ga.onload = function () {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', 'G-EJRSQ3LTP7');
};

// Clarity
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;
    t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "x5df9ftha4");