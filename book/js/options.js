var template_color = 'DarkSlateGray';
var template_hcolor = 'LightSlateGray';
var color1 = 'Crimson';

try
{ // for 0.97+
    JXG.Options.board.showCopyright = false;
    JXG.Options.board.showNavigation = false;
    JXG.Options.board.takeSizeFromFile = true;
}catch(err)
{
    JXG.Options.showCopyright = false;
    JXG.Options.showNavigation = false;
    JXG.Options.takeSizeFromFile = true;
}


JXG.Options.elements.highlight = false;
JXG.Options.elements.fixed = true;
JXG.Options.elements.withLabel = false;

JXG.Options.ticks.drawLabels = true;
JXG.Options.ticks.drawZero = true;

JXG.Options.elements.strokewidth = 1;
JXG.Options.elements.highLightStrokeWidth = 1;

JXG.Options.elements.strokeColor = 'black';
JXG.Options.elements.highLightStrokeColor = 'gray';

JXG.Options.elements.fillColor = template_color;
JXG.Options.elements.highLightFillColor = template_hcolor;

JXG.Options.elements.fillOpacity = 0.3;
JXG.Options.elements.highLightFillOpacity = 0.4;

JXG.Options.circle.strokeColor = 'black';
JXG.Options.circle.fillColor = 'none';
JXG.Options.circle.highlightStrokecolor = 'gray';
JXG.Options.circle.highlightFillColor = 'none';
JXG.Options.circle.fillOpacity = 0.3;
JXG.Options.circle.highlightFillOpacity = 0.4;

JXG.Options.circumcirclearc.strokeColor = 'black';
JXG.Options.circumcirclearc.fillColor = 'none';
JXG.Options.circumcirclearc.highlightStrokecolor = 'gray';
JXG.Options.circumcirclearc.highlightFillColor = 'none';
JXG.Options.circumcirclearc.fillOpacity = 0.3;
JXG.Options.circumcirclearc.highlightFillOpacity = 0.4;

JXG.Options.curve.strokeColor = 'black';
JXG.Options.curve.fillColor = 'none';
JXG.Options.curve.highlightStrokecolor = 'gray';
JXG.Options.curve.highLightFillColor= 'none';

JXG.Options.line.strokeColor = 'black';
JXG.Options.line.highlightStrokecolor = 'gray';

JXG.Options.polygon.borders.strokeColor = 'black';
JXG.Options.polygon.borders.highlightStrokecolor = 'black';
JXG.Options.polygon.fillColor = template_color;
JXG.Options.polygon.highLightFillColor = template_hcolor;
JXG.Options.polygon.vertices.size = 2;
JXG.Options.polygon.vertices.strokeColor = 'black';
JXG.Options.polygon.vertices.fillColor = template_color;
JXG.Options.polygon.fillOpacity = 0.3;
JXG.Options.polygon.highlightFillOpacity = 0.4;

JXG.Options.point.fillColor = 'black';
JXG.Options.point.strokeColor = 'black';
JXG.Options.point.highlightFillcolor = template_hcolor;
JXG.Options.point.highlightStrokecolor = template_hcolor;
JXG.Options.point.face ='o';
JXG.Options.point.size = 3;
JXG.Options.point.showInfobox = false;
JXG.Options.point.fillOpacity = 1;
JXG.Options.point.highlightFillOpacity = 1;
JXG.Options.point.highlight = false;


JXG.Options.sector.fillColor = template_color;
JXG.Options.sector.strokeColor = 'black';
JXG.Options.sector.highLightFillColor = template_hcolor;
JXG.Options.sector.highlightStrokecolor = 'black';
JXG.Options.sector.fillOpacity = 0.3;
JXG.Options.sector.highlightFillOpacity = 0.4;

JXG.Options.angle.fillColor = template_color;
JXG.Options.angle.strokeColor = 'black';
JXG.Options.angle.highLightFillColor = template_hcolor;
JXG.Options.angle.highlightStrokecolor = 'black';
JXG.Options.angle.fillOpacity = 0.3;
JXG.Options.angle.highlightFillOpacity = 0.4;

JXG.Options.text.useMathJax = true;
JXG.Options.text.fontsize = 13;
JXG.Options.text.digits = 2;
JXG.Options.text.strokeColor = 'black';

JXG.Options.slider.fixed = false;
JXG.Options.slider.snapWidth = 1;
JXG.Options.slider.precision = 0;
JXG.Options.slider.fillColor = 'white';
JXG.Options.slider.highlightFillColor = 'white';
JXG.Options.slider.strokeColor = 'black';
JXG.Options.slider.highlightStrokecolor = 'black';
JXG.Options.slider.size = 4;
JXG.Options.slider.baseline.withTicks = true;
JXG.Options.slider.baseline.strokeWidth = 1;
JXG.Options.slider.baseline.strokeColor = 'black';
JXG.Options.slider.baseline.highlightStrokeColor = 'black';
JXG.Options.slider.highline.strokeWidth = 3;
JXG.Options.slider.highline.strokeColor = 'black';
JXG.Options.slider.highline.highlightStrokeColor = 'black';
JXG.Options.slider.fillOpacity = 1;
JXG.Options.slider.highlightFillOpacity = 1;

JXG.Options.arc.fillColor = 'none';
JXG.Options.arc.strokeColor = 'black';
JXG.Options.arc.highLightFillColor = 'none';
JXG.Options.arc.highlightStrokecolor = 'gray';
JXG.Options.arc.fillOpacity = 0.3;
JXG.Options.arc.highlightFillOpacity = 0.4;
