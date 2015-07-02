/**
 * JSXGraph_GUI v0.8
 * Author: ddrakulic@gmail.com
 * Lat update: 21.9.13.
 */

var _guis = new Array();

// Defining commands
var _ERASE_ = -1, _ARROW_ = 0, _CHANGE_ATTR_ = -2, _PENCIL_ = -3,
    _POINT_ = 1, _LINE_ = 2, _SEGMENT_ = 3, _CIRCLE_ = 4, _POLYGON_ = 5, _REGULAR_POLYGON_ = 20, _CONIC_SECTION5_ = 21,
    _ANGLE_ = 10,  _ANGLEV_ = 11, _ANGLES_ = 12, _VECTOR_ = 13, _HLINE_ = 6, _CIRCLE3_ = 7, _CIRCLER_ = 8, _FIXED_SEGMENT_ = 9,
    _INTERSECTION_ = 101, _ANGLE_BISECTOR_ = 102, _MIDPOINT_ = 103, _PERPENDICULAR_ = 104, _PARALLEL_ = 105,
    _SYMMETRY_ = 150, _SEGMENT_SYMMETRY_ = 151, _LINE_SYMMETRY_ = 152, _TRANSLATION_ = 153,
    _DISTANCE_ = 200, _AREA_ = 201, _TEXT_ = 202;

function JSXGraph_GUI(bd, axisVisibility)
{
    var brdDiv = document.getElementById(bd);
    this.bW = parseInt(brdDiv.style.width)/10;
    this.bH = parseInt(brdDiv.style.height)/10;

    this.board = JXG.JSXGraph.initBoard(bd, {axis:axisVisibility, boundingbox: [-this.bW, this.bH, this.bW, -this.bH]});
    this.id = this.board.id;
    _guis[this.board.id] = this;

    this.active_command = _ARROW_;

    this.currentX = 0;
    this.currentY = 0;

    this.snapSizeX = 1;
    this.snapSizeY = 1;

    this.magnetSize = 0.5;

    this.currentPoint;
    this.constructionPoints = new Array();
    this.animation;
    this.newPoints = new Array();
    this.selectedObjects = new Array();
    this.pencilPointsArray = null;

    // adding events
    this.board.on('mousedown', _mouseDown);
    this.board.on('touchstart', _touchStart);
    this.board.on('mousemove', _mouseMove);
    this.board.on('touchmove', _touchMove);
    this.board.on('mouseup', _mouseUp);
    this.board.on('touchend', _mouseUp);

    this.pointObjects = ["point", "intersection", "midpoint", "glider", "reflection", "mirrorpoint"];
    this.nonPointObjects = ["line", "segment", "circle", "perpendicular", "parallel", "conic"];
}


JSXGraph_GUI.prototype.changeCommands = function(command)
{
    for(i=0; i<this.newPoints.length; i++)
        this.board.removeObject(this.newPoints[i]);
    if(this.animation != null)
    {
        this.board.removeObject(this.animation);
        this.board.removeObject(this.currentPoint);
        this.animation = null;
    }
    for(var i=0; i<this.selectedObjects.length; i++)
    {
        var strW = this.selectedObjects[i].getAttribute("strokeWidth")-1;
        this.selectedObjects[i].setAttribute({strokeWidth:strW});
    }

    this.constructionPoints = [];
    this.newPoints = [];
    this.selectedObjects = [];
    this.active_command = command;
    if(this.active_command != _ANGLEV_)
        document.getElementById("angle_orientation_div_" + this.id).style.display= "none";
    if(this.active_command != _TEXT_)
        document.getElementById("input_text_div_" + this.id).style.display= "none";

    if(document.getElementById("pencil_icon_"+this.id) != null)
        document.getElementById("pencil_icon_"+this.id).src = "/scripts/gui/pencil.png";
    if(document.getElementById("erase_icon_"+this.id) != null)
        document.getElementById("erase_icon_"+this.id).src = "/scripts/gui/erase.png";
    if(document.getElementById("arrow_icon_"+this.id) != null)
        document.getElementById("arrow_icon_"+this.id).src = "/scripts/gui/arrow.png";
    if(document.getElementById("point_icon_"+this.id) != null)
        document.getElementById("point_icon_"+this.id).src = "/scripts/gui/point.png";
    if(document.getElementById("segment_icon_"+this.id) != null)
        document.getElementById("segment_icon_"+this.id).src = "/scripts/gui/segment.png";
    if(document.getElementById("fixed_segment_icon_"+this.id) != null)
        document.getElementById("fixed_segment_icon_"+this.id).src = "/scripts/gui/fixed_segment.png";
    if(document.getElementById("line_icon_"+this.id) != null)
        document.getElementById("line_icon_"+this.id).src = "/scripts/gui/line.png";
    if(document.getElementById("vector_icon_"+this.id) != null)
        document.getElementById("vector_icon_"+this.id).src = "/scripts/gui/vector.png";
    if(document.getElementById("hline_icon_"+this.id) != null)
        document.getElementById("hline_icon_"+this.id).src = "/scripts/gui/hline.png";
    if(document.getElementById("circle_icon_"+this.id) != null)
        document.getElementById("circle_icon_"+this.id).src = "/scripts/gui/circle.png";
    if(document.getElementById("circle3_icon_"+this.id) != null)
        document.getElementById("circle3_icon_"+this.id).src = "/scripts/gui/circle3.png";
    if(document.getElementById("circler_icon_"+this.id) != null)
        document.getElementById("circler_icon_"+this.id).src = "/scripts/gui/circler.png";
    if(document.getElementById("conic_section5_icon_"+this.id) != null)
        document.getElementById("conic_section5_icon_"+this.id).src = "/scripts/gui/conic_section5.png";
    if(document.getElementById("polygon_icon_"+this.id) != null)
        document.getElementById("polygon_icon_"+this.id).src = "/scripts/gui/polygon.png";
    if(document.getElementById("rpolygon_icon_"+this.id) != null)
        document.getElementById("rpolygon_icon_"+this.id).src = "/scripts/gui/rpolygon.png";
    if(document.getElementById("angle_icon_"+this.id) != null)
        document.getElementById("angle_icon_"+this.id).src = "/scripts/gui/angle.png";
    if(document.getElementById("anglev_icon_"+this.id) != null)
        document.getElementById("anglev_icon_"+this.id).src = "/scripts/gui/anglev.png";
    if(document.getElementById("angles_icon_"+this.id) != null)
        document.getElementById("angles_icon_"+this.id).src = "/scripts/gui/angles.png";
    if(document.getElementById("intersection_icon_"+this.id) != null)
        document.getElementById("intersection_icon_"+this.id).src = "/scripts/gui/intersection.png";
    if(document.getElementById("angle_bisector_icon_"+this.id) != null)
        document.getElementById("angle_bisector_icon_"+this.id).src = "/scripts/gui/angle_bisector.png";
    if(document.getElementById("midpoint_icon_"+this.id) != null)
        document.getElementById("midpoint_icon_"+this.id).src = "/scripts/gui/midpoint.png";
    if(document.getElementById("perpendicular_icon_"+this.id) != null)
        document.getElementById("perpendicular_icon_"+this.id).src = "/scripts/gui/perpendicular.png";
    if(document.getElementById("parallel_icon_"+this.id) != null)
        document.getElementById("parallel_icon_"+this.id).src = "/scripts/gui/parallel.png";
    if(document.getElementById("symmetry_icon_"+this.id) != null)
        document.getElementById("symmetry_icon_"+this.id).src = "/scripts/gui/symmetry.png";
    if(document.getElementById("segment_symmetry_icon_"+this.id) != null)
        document.getElementById("segment_symmetry_icon_"+this.id).src = "/scripts/gui/segment_symmetry.png";
    if(document.getElementById("line_symmetry_icon_"+this.id) != null)
        document.getElementById("line_symmetry_icon_"+this.id).src = "/scripts/gui/line_symmetry.png";
    if(document.getElementById("distance_icon_"+this.id) != null)
        document.getElementById("distance_icon_"+this.id).src = "/scripts/gui/distance.png";
    if(document.getElementById("area_icon_"+this.id) != null)
        document.getElementById("area_icon_"+this.id).src = "/scripts/gui/area.png";
    if(document.getElementById("translation_icon_"+this.id) != null)
        document.getElementById("translation_icon_"+this.id).src = "/scripts/gui/translation.png";
    if(document.getElementById("text_icon_"+this.id) != null)
        document.getElementById("text_icon_"+this.id).src = "/scripts/gui/text.png";

    switch(command)
    {
        case _ERASE_:
            document.getElementById("erase_icon_"+this.id).src = "/scripts/gui/erase_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_ERASE_"];
            break;
        case _PENCIL_:
            document.getElementById("pencil_icon_"+this.id).src = "/scripts/gui/pencil_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_PENCIL_"];
            break;
        case _ARROW_:
            document.getElementById("arrow_icon_"+this.id).src = "/scripts/gui/arrow_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_ARROW_"];
            break;
        case _POINT_:
            document.getElementById("point_icon_"+this.id).src = "/scripts/gui/point_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_POINT_"];
            break;
        case _LINE_:
            document.getElementById("line_icon_"+this.id).src = "/scripts/gui/line_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_LINE_"];
            break;
        case _HLINE_:
            document.getElementById("hline_icon_"+this.id).src = "/scripts/gui/hline_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_HLINE_"];
            break;
        case _SEGMENT_:
            document.getElementById("segment_icon_"+this.id).src = "/scripts/gui/segment_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_SEGMENT_"];
            break;
        case _VECTOR_:
            document.getElementById("vector_icon_"+this.id).src = "/scripts/gui/vector_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_VECTOR_"];
            break;
        case _FIXED_SEGMENT_:
            document.getElementById("fixed_segment_icon_"+this.id).src = "/scripts/gui/fixed_segment_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_FIXED_SEGMENT_"];
            break;
        case _CIRCLE_:
            document.getElementById("circle_icon_"+this.id).src = "/scripts/gui/circle_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_CIRCLE_"];
            break;
        case _CIRCLE3_:
            document.getElementById("circle3_icon_"+this.id).src = "/scripts/gui/circle3_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_CIRCLE3_"];
            break;
        case _CIRCLER_:
            document.getElementById("circler_icon_"+this.id).src = "/scripts/gui/circler_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_CIRCLER_"];
            break;
        case _CONIC_SECTION5_:
            document.getElementById("conic_section5_icon_"+this.id).src = "/scripts/gui/conic_section5_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_CONIC_SECTION5_"];
            break;
        case _ANGLE_:
            document.getElementById("angle_icon_"+this.id).src = "/scripts/gui/angle_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_ANGLE_"];
            break;
        case _ANGLES_:
            document.getElementById("angles_icon_"+this.id).src = "/scripts/gui/angles_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_ANGLES_"];
            break;
        case _ANGLEV_:
            document.getElementById("anglev_icon_"+this.id).src = "/scripts/gui/anglev_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_ANGLEV_"];
            document.getElementById("angle_orientation_div_" + this.id).style.display= "block";
            break;
        case _TEXT_:
            document.getElementById("text_icon_"+this.id).src = "/scripts/gui/text_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_TEXT_"];
            document.getElementById("input_text_div_" + this.id).style.display= "block";
            break;
        case _POLYGON_:
            document.getElementById("polygon_icon_"+this.id).src = "/scripts/gui/polygon_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_POLYGON_"];
            break;
        case _REGULAR_POLYGON_:
            document.getElementById("rpolygon_icon_"+this.id).src = "/scripts/gui/rpolygon_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_REGULAR_POLYGON_"];
            break;
        case _INTERSECTION_:
            document.getElementById("intersection_icon_"+this.id).src = "/scripts/gui/intersection_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_INTERSECTION_"];
            break;
        case _ANGLE_BISECTOR_:
            document.getElementById("angle_bisector_icon_"+this.id).src = "/scripts/gui/angle_bisector_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_ANGLE_BISECTOR_"];
            break;
        case _MIDPOINT_:
            document.getElementById("midpoint_icon_"+this.id).src = "/scripts/gui/midpoint_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_MIDPOINT_"];
            break;
        case _PERPENDICULAR_:
            document.getElementById("perpendicular_icon_"+this.id).src = "/scripts/gui/perpendicular_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_PERPENDICULAR_"];
            break;
        case _PARALLEL_:
            document.getElementById("parallel_icon_"+this.id).src = "/scripts/gui/parallel_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_PARALLEL_"];
            break;
        case _SYMMETRY_:
            document.getElementById("symmetry_icon_"+this.id).src = "/scripts/gui/symmetry_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_SYMMETRY_"];
            break;
        case _SEGMENT_SYMMETRY_:
            document.getElementById("segment_symmetry_icon_"+this.id).src = "/scripts/gui/segment_symmetry_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_SEGMENT_SYMMETRY_"];
            break;
        case _LINE_SYMMETRY_:
            document.getElementById("line_symmetry_icon_"+this.id).src = "/scripts/gui/line_symmetry_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_LINE_SYMMETRY_"];
            break;
        case _DISTANCE_:
            document.getElementById("distance_icon_"+this.id).src = "/scripts/gui/distance_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_DISTANCE_"];
            break;
        case _AREA_:
            document.getElementById("area_icon_"+this.id).src = "/scripts/gui/area_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_AREA_"];
            break;
        case _TRANSLATION_:
            document.getElementById("translation_icon_"+this.id).src = "/scripts/gui/translation_over.png";
            document.getElementById("divhelp_"+this.id).innerHTML = JSXGraph_GUI_help["slo"]["_TRANSLATION_"];
            break;
    }
}

JSXGraph_GUI.prototype.iconMouseOut = function(command)
{
    if(this.active_command == command)
        return;

    switch(command)
    {
        case _ERASE_ :
            document.getElementById("erase_icon_"+this.id).src = "/scripts/gui/erase.png";
            break;
        case _PENCIL_ :
            document.getElementById("pencil_icon_"+this.id).src = "/scripts/gui/pencil.png";
            break;
        case _ARROW_ :
            document.getElementById("arrow_icon_"+this.id).src = "/scripts/gui/arrow.png";
            break;
        case _POINT_ :
            document.getElementById("point_icon_"+this.id).src = "/scripts/gui/point.png";
            break;
        case _SEGMENT_ :
            document.getElementById("segment_icon_"+this.id).src = "/scripts/gui/segment.png";
            break;
        case _VECTOR_ :
            document.getElementById("vector_icon_"+this.id).src = "/scripts/gui/vector.png";
            break;
        case _FIXED_SEGMENT_ :
            document.getElementById("fixed_segment_icon_"+this.id).src = "/scripts/gui/fixed_segment.png";
            break;
        case _LINE_ :
            document.getElementById("line_icon_"+this.id).src = "/scripts/gui/line.png";
            break;
        case _HLINE_ :
            document.getElementById("hline_icon_"+this.id).src = "/scripts/gui/hline.png";
            break;
        case _CIRCLE_ :
            document.getElementById("circle_icon_"+this.id).src = "/scripts/gui/circle.png";
            break;
        case _CIRCLE3_ :
            document.getElementById("circle3_icon_"+this.id).src = "/scripts/gui/circle3.png";
            break;
        case _CIRCLER_ :
            document.getElementById("circler_icon_"+this.id).src = "/scripts/gui/circler.png";
            break;
        case _CONIC_SECTION5_ :
            document.getElementById("conic_section5_icon_"+this.id).src = "/scripts/gui/conic_section5.png";
            break;
        case _POLYGON_ :
            document.getElementById("polygon_icon_"+this.id).src = "/scripts/gui/polygon.png";
            break;
        case _REGULAR_POLYGON_ :
            document.getElementById("rpolygon_icon_"+this.id).src = "/scripts/gui/rpolygon.png";
            break;
        case _ANGLE_ :
            document.getElementById("angle_icon_"+this.id).src = "/scripts/gui/angle.png";
            break;
        case _ANGLES_ :
            document.getElementById("angles_icon_"+this.id).src = "/scripts/gui/angles.png";
            break;
        case _ANGLEV_ :
            document.getElementById("anglev_icon_"+this.id).src = "/scripts/gui/anglev.png";
            break;
        case _INTERSECTION_ :
            document.getElementById("intersection_icon_"+this.id).src = "/scripts/gui/intersection.png";
            break;
        case _ANGLE_BISECTOR_ :
            document.getElementById("angle_bisector_icon_"+this.id).src = "/scripts/gui/angle_bisector.png";
            break;
        case _MIDPOINT_ :
            document.getElementById("midpoint_icon_"+this.id).src = "/scripts/gui/midpoint.png";
            break;
        case _PERPENDICULAR_ :
            document.getElementById("perpendicular_icon_"+this.id).src = "/scripts/gui/perpendicular.png";
            break;
        case _PARALLEL_ :
            document.getElementById("parallel_icon_"+this.id).src = "/scripts/gui/parallel.png";
            break;
        case _SYMMETRY_ :
            document.getElementById("symmetry_icon_"+this.id).src = "/scripts/gui/symmetry.png";
            break;
        case _SEGMENT_SYMMETRY_ :
            document.getElementById("segment_symmetry_icon_"+this.id).src = "/scripts/gui/segment_symmetry.png";
            break;
        case _LINE_SYMMETRY_ :
            document.getElementById("line_symmetry_icon_"+this.id).src = "/scripts/gui/line_symmetry.png";
            break;
        case _DISTANCE_ :
            document.getElementById("distance_icon_"+this.id).src = "/scripts/gui/distance.png";
            break;
        case _AREA_ :
            document.getElementById("area_icon_"+this.id).src = "/scripts/gui/area.png";
            break;
        case _TRANSLATION_ :
            document.getElementById("translation_icon_"+this.id).src = "/scripts/gui/translation.png";
            break;
        case _TEXT_ :
            document.getElementById("text_icon_"+this.id).src = "/scripts/gui/text.png";
            break;
    }
}

function _changeCommand(v, id)
{
    _guis[id].changeCommands(v);
}

function _iconMouseOut(v, id)
{
    _guis[id].iconMouseOut(v);
}

JSXGraph_GUI.prototype.addCommands = function(id, commands)
{
    var iconsDiv = document.getElementById(id);

    var commandsHTML = "";

    for(var i=0; i<commands.length; i++)
    {
        if(commands[i] == _ARROW_)
            commandsHTML += '<img id="arrow_icon_'+this.id+'" src="/scripts/gui/arrow_over.png" onclick="_changeCommand(0, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/arrow_over.png\'" onmouseout="_iconMouseOut(0, \''+this.id+'\')" />';
        else if(commands[i] == _POINT_)
            commandsHTML += '<img id="point_icon_'+this.id+'" src="/scripts/gui/point.png" onclick="_changeCommand(1, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/point_over.png\'" onmouseout="_iconMouseOut(1, \''+this.id+'\')"/>';
        else if(commands[i] == _ERASE_)
            commandsHTML += '<img id="erase_icon_'+this.id+'" src="/scripts/gui/erase.png" onclick="_changeCommand(-1, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/erase_over.png\'" onmouseout="_iconMouseOut(-1, \''+this.id+'\')" />';
        else if(commands[i] == _PENCIL_)
            commandsHTML += '<img id="pencil_icon_'+this.id+'" src="/scripts/gui/pencil.png" onclick="_changeCommand(-3, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/pencil_over.png\'" onmouseout="_iconMouseOut(-3, \''+this.id+'\')" />';
        else if(commands[i] == _LINE_)
            commandsHTML += '<img id="line_icon_'+this.id+'" src="/scripts/gui/line.png" onclick="_changeCommand(2, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/line_over.png\'" onmouseout="_iconMouseOut(2, \''+this.id+'\')"/>';
        else if(commands[i] == _HLINE_)
            commandsHTML += '<img id="hline_icon_'+this.id+'" src="/scripts/gui/hline.png" onclick="_changeCommand(6, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/hline_over.png\'" onmouseout="_iconMouseOut(6, \''+this.id+'\')" />';
        else if(commands[i] == _SEGMENT_)
            commandsHTML += '<img id="segment_icon_'+this.id+'" src="/scripts/gui/segment.png" onclick="_changeCommand(3, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/segment_over.png\'" onmouseout="_iconMouseOut(3, \''+this.id+'\')" />';
        else if(commands[i] == _VECTOR_)
            commandsHTML += '<img id="vector_icon_'+this.id+'" src="/scripts/gui/vector.png" onclick="_changeCommand(13, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/vector_over.png\'" onmouseout="_iconMouseOut(13, \''+this.id+'\')" />';
        else if(commands[i] == _FIXED_SEGMENT_)
            commandsHTML += '<img id="fixed_segment_icon_'+this.id+'" src="/scripts/gui/fixed_segment.png" onclick="_changeCommand(9, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/fixed_segment_over.png\'" onmouseout="_iconMouseOut(9, \''+this.id+'\')" />';
        else if(commands[i] == _CIRCLE_)
            commandsHTML += '<img id="circle_icon_'+this.id+'" src="/scripts/gui/circle.png" onclick="_changeCommand(4, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/circle_over.png\'" onmouseout="_iconMouseOut(4, \''+this.id+'\')" />';
        else if(commands[i] == _CIRCLE3_)
            commandsHTML += '<img id="circle3_icon_'+this.id+'" src="/scripts/gui/circle3.png" onclick="_changeCommand(7, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/circle3_over.png\'" onmouseout="_iconMouseOut(7, \''+this.id+'\')" />';
        else if(commands[i] == _CIRCLER_)
            commandsHTML += '<img id="circler_icon_'+this.id+'" src="/scripts/gui/circler.png" onclick="_changeCommand(8, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/circler_over.png\'" onmouseout="_iconMouseOut(8, \''+this.id+'\')" />';
        else if(commands[i] == _CONIC_SECTION5_)
            commandsHTML += '<img id="conic_section5_icon_'+this.id+'" src="/scripts/gui/conic_section5.png" onclick="_changeCommand(21, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/conic_section5_over.png\'" onmouseout="_iconMouseOut(21, \''+this.id+'\')" />';
        else if(commands[i] == _POLYGON_)
            commandsHTML += '<img id="polygon_icon_'+this.id+'" src="/scripts/gui/polygon.png" onclick="_changeCommand(5, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/polygon_over.png\'" onmouseout="_iconMouseOut(5, \''+this.id+'\')" />';
        else if(commands[i] == _REGULAR_POLYGON_)
            commandsHTML += '<img id="rpolygon_icon_'+this.id+'" src="/scripts/gui/rpolygon.png" onclick="_changeCommand(20, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/rpolygon_over.png\'" onmouseout="_iconMouseOut(20, \''+this.id+'\')" />';
        else if(commands[i] == _ANGLE_)
            commandsHTML += '<img id="angle_icon_'+this.id+'" src="/scripts/gui/angle.png" onclick="_changeCommand(10, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/angle_over.png\'" onmouseout="_iconMouseOut(10, \''+this.id+'\')" />';
        else if(commands[i] == _ANGLES_)
            commandsHTML += '<img id="angles_icon_'+this.id+'" src="/scripts/gui/angles.png" onclick="_changeCommand(12, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/angles_over.png\'" onmouseout="_iconMouseOut(12, \''+this.id+'\')" />';
        else if(commands[i] == _ANGLEV_)
            commandsHTML += '<img id="anglev_icon_'+this.id+'" src="/scripts/gui/anglev.png" onclick="_changeCommand(11, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/anglev_over.png\'" onmouseout="_iconMouseOut(11, \''+this.id+'\')" />';
        else if(commands[i] == _INTERSECTION_)
            commandsHTML += '<img id="intersection_icon_'+this.id+'" src="/scripts/gui/intersection.png" onclick="_changeCommand(101, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/intersection_over.png\'" onmouseout="_iconMouseOut(101, \''+this.id+'\')" />';
        else if(commands[i] == _ANGLE_BISECTOR_)
            commandsHTML += '<img id="angle_bisector_icon_'+this.id+'" src="/scripts/gui/angle_bisector.png" onclick="_changeCommand(102, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/angle_bisector_over.png\'" onmouseout="_iconMouseOut(102, \''+this.id+'\')" />';
        else if(commands[i] == _MIDPOINT_)
            commandsHTML += '<img id="midpoint_icon_'+this.id+'" src="/scripts/gui/midpoint.png" onclick="_changeCommand(103, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/midpoint_over.png\'" onmouseout="_iconMouseOut(103, \''+this.id+'\')" />';
        else if(commands[i] == _PERPENDICULAR_)
            commandsHTML += '<img id="perpendicular_icon_'+this.id+'" src="/scripts/gui/perpendicular.png" onclick="_changeCommand(104, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/perpendicular_over.png\'" onmouseout="_iconMouseOut(104, \''+this.id+'\')" />';
        else if(commands[i] == _PARALLEL_)
            commandsHTML += '<img id="parallel_icon_'+this.id+'" src="/scripts/gui/parallel.png" onclick="_changeCommand(105, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/parallel_over.png\'" onmouseout="_iconMouseOut(105, \''+this.id+'\')" />';
        else if(commands[i] == _SYMMETRY_)
            commandsHTML += '<img id="symmetry_icon_'+this.id+'" src="/scripts/gui/symmetry.png" onclick="_changeCommand(150, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/symmetry_over.png\'" onmouseout="_iconMouseOut(150, \''+this.id+'\')" />';
        else if(commands[i] == _SEGMENT_SYMMETRY_)
            commandsHTML += '<img id="segment_symmetry_icon_'+this.id+'" src="/scripts/gui/segment_symmetry.png" onclick="_changeCommand(151, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/segment_symmetry_over.png\'" onmouseout="_iconMouseOut(151, \''+this.id+'\')" />';
        else if(commands[i] == _LINE_SYMMETRY_)
            commandsHTML += '<img id="line_symmetry_icon_'+this.id+'" src="/scripts/gui/line_symmetry.png" onclick="_changeCommand(152, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/line_symmetry_over.png\'" onmouseout="_iconMouseOut(152, \''+this.id+'\')" />';
        else if(commands[i] == _DISTANCE_)
            commandsHTML += '<img id="distance_icon_'+this.id+'" src="/scripts/gui/distance.png" onclick="_changeCommand(200, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/distance_over.png\'" onmouseout="_iconMouseOut(200, \''+this.id+'\')" />';
        else if(commands[i] == _AREA_)
            commandsHTML += '<img id="area_icon_'+this.id+'" src="/scripts/gui/area.png" onclick="_changeCommand(201, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/area_over.png\'" onmouseout="_iconMouseOut(201, \''+this.id+'\')" />';
        else if(commands[i] == _TRANSLATION_)
            commandsHTML += '<img id="translation_icon_'+this.id+'" src="/scripts/gui/translation.png" onclick="_changeCommand(153, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/translation_over.png\'" onmouseout="_iconMouseOut(153, \''+this.id+'\')" />';
        else if(commands[i] == _TEXT_)
            commandsHTML += '<img id="text_icon_'+this.id+'" src="/scripts/gui/text.png" onclick="_changeCommand(202, \'' + this.id + '\');" onmouseover="this.src=\'/scripts/gui/text_over.png\'" onmouseout="_iconMouseOut(202, \''+this.id+'\')" />';
    }

    // div for angle orientation
    commandsHTML += '<div id="angle_orientation_div_' + this.id + '" style="display:none">' +
        '<input type="radio" name="angle_orientation_' + this.id + '" id="angle_left_orientation_' + this.id + '" checked>V nasprotni smeri urinega kazalca<br/>' +
        '<input type="radio" name="angle_orientation_' + this.id + '" id="angle_right_orientation_' + this.id + '">V smeri urinega kazalca<br/>' +
        '</div>';
    // div for angle help
    // div for text input
    commandsHTML += '<div id="input_text_div_' + this.id + '" style="display:none">' +
        'Tekst: <input type="text" name="inserted_text_' + this.id + '" id="inserted_text_' + this.id + '" style="width:200px" /></div>';
    // div for angle help
    commandsHTML += '<div id="divhelp_' + this.id + '" style="width:95%; background-color:#EEEEEE; padding-left:20px;">Izberi orodje.</div>';

    iconsDiv.innerHTML = commandsHTML;
}

JSXGraph_GUI.prototype.addConsole = function(divId)
{
    var consoleDiv = document.getElementById(divId);
    consoleDiv.innerHTML = 'Vnos: <input type="text" style="width:' + (10*_guis[this.id].bW - 40) + 'px" onkeypress="endInput(event, this, \'' + this.id + '\')" />';
}

function endInput(e, elem, id)
{
    var board = _guis[id].board;
    if(e.keyCode == 13)
    {
        // Parse expression
        var str = elem.value;
        str = str.replace(/\s/g, ''); // remove whitespaces
        var regexExplicit = /^[y][=]([-]?((\d+)[*]?)?[x])?(([+]|[-])?\d+)?$/;
        var regexImplicitxy = /^(([-]?\d*[*]?)?[x])?(([+]|[-])(\d+[*]?)?[y])?(([+]|[-])\d+)?[=][-]?\d+$/;
        var regexImplicityx = /^(([-]?\d*[*]?)?[y])?(([+]|[-])(\d+[*]?)?[x])?(([+]|[-])\d+)?[=][-]?\d+$/;
        var regexxyGraph = /^(((([-]?\d*(([,]|[.])\d+)?[*]?)?[x])[*]([-]?\d*(([,]|[.])\d+)?[*]?)?[y])|((([-]?\d*(([,]|[.])\d+)?[*]?)?[y])[*]([-]?\d*(([,]|[.])\d+)?[*]?)?[x]))[=][-]?\d+(([,]|[.])\d+)?$/
        var a, b, c;
        var type = "none";
        if(str.search(regexExplicit) == 0)
        {
            var exp = str.split("=");
            b = -1;

            if(exp[1].indexOf("x") == -1)
            {
                a = 0;
                c = parseInt(exp[1]);
            }
            else
            {
                var left = exp[1].split("x");
                if(isNaN(parseInt(left[0])))
                    left[0] += "1";
                a = parseInt(left[0]);
                c = (isNaN(parseInt(left[1]))) ? 0 : parseInt(left[1]);
            }
            type = "LINE";
        }
        else if(str.search(regexImplicitxy) == 0)
        {
            var exp = str.split("=");
            var c1 = parseInt(exp[1]);

            var exp1 = exp[0].split("x");

            if(isNaN(parseInt(exp1[0])))
                exp1[0] += "1";

            a = parseInt(exp1[0]);
            if(exp1[1].indexOf("y") == -1)
            {
                b = 0;
                c = (isNaN(parseInt(exp1[1]))) ? -c1 : parseInt(exp1[1])-c1;
            }
            else
            {
                var exp2 = exp1[1].split("y");
                if(isNaN(parseInt(exp2[0])))
                    exp2[0] += "1";
                b = parseInt(exp2[0]);
                c = (isNaN(parseInt(exp2[1]))) ? -c1 : parseInt(exp2[1])-c1;
            }
            type = "LINE";
        }
        else if(str.search(regexImplicityx) == 0)
        {
            var exp = str.split("=");
            var c1 = parseInt(exp[1]);

            var exp1 = exp[0].split("y");

            if(isNaN(parseInt(exp1[0])))
                exp1[0] += "1";

            a = parseInt(exp1[0]);
            if(exp1[1].indexOf("x") == -1)
            {
                b = 0;
                c = (isNaN(parseInt(exp1[1]))) ? -c1 : parseInt(exp1[1])-c1;
            }
            else
            {
                var exp2 = exp1[1].split("x");
                if(isNaN(parseInt(exp2[0])))
                    exp2[0] += "1";
                b = parseInt(exp2[0]);
                c = (isNaN(parseInt(exp2[1]))) ? -c1 : parseInt(exp2[1])-c1;
            }
            type = "LINE";
        }
        else if(str.search(regexxyGraph) == 0)
        {
            var exp = str.split("=");
            var res = parseFloat(exp[1].replace(",","."));
            var xVal, yVal;
            var expL = exp[0].split("*");

            if(expL[0].indexOf("x") != -1)
            { // x*y format
                var expX = expL[0].split("x");
                var expY = expL[1].split("y");
                if(isNaN(parseFloat(expX[0].replace(",","."))))
                    xVal = 1;
                else
                    xVal = parseFloat(expX[0].replace(",","."));
                if(isNaN(parseFloat(expY[0].replace(",","."))))
                    yVal = 1;
                else
                    yVal = parseFloat(expY[0].replace(",","."));
            }
            else
            { // y*x format
                var expY = expL[0].split("y");
                var expX = expL[1].split("x");
                if(isNaN(parseFloat(expX[0].replace(",","."))))
                    xVal = 1;
                else
                    xVal = parseFloat(expX[0].replace(",","."));
                if(isNaN(parseFloat(expY[0].replace(",","."))))
                    yVal = 1;
                else
                    yVal = parseFloat(expY[0].replace(",","."));
            }

            type = "GRAPH";
        }

        if(type == "LINE")
            _guis[id].board.create("line", [c,a,b], {highlight:true});
        else if(type == "GRAPH")
            _guis[id].board.create("functiongraph", [function(x) { return res/(xVal*yVal*x)}], {highlight:true});
        else
        {
            alert(JSXGraph_GUI_help["slo"]["_CONSOLE_POPUP_"]);
            return;
        }
        elem.value = "";
    }
}

function _mouseDown(e)
{
    var coords = _guis[this.id].getMouseCoords(e, 0);
    _guis[this.id].currentX = coords.usrCoords[1];
    _guis[this.id].currentY = coords.usrCoords[2];
    _guis[this.id].downEvent(e);
}

function _touchStart(e)
{
    var coords = _guis[this.id].getMouseCoords(e, 1);
    _guis[this.id].currentX = coords.usrCoords[1];
    _guis[this.id].currentY = coords.usrCoords[2];
    _guis[this.id].downEvent(e);
}

function _mouseMove(e) {
    var coords = _guis[this.id].getMouseCoords(e,0);
    _guis[this.id].currentX = coords.usrCoords[1];
    _guis[this.id].currentY = coords.usrCoords[2];
    if(_guis[this.id].constructionPoints.length != 0 || _guis[this.id].selectedObjects.length != 0)
        _guis[this.id].board.update();
    if(_guis[this.id].pencilPointsArray != null)
    {
        var curvePoint = _guis[this.id].board.create('point', [_guis[this.id].currentX, _guis[this.id].currentY], {name:"", fixed:true, highlight:false, size:2});
        _guis[this.id].pencilPointsArray.push(curvePoint);
    }
}

function _touchMove(e) {
    var coords = _guis[this.id].getMouseCoords(e,1);
    _guis[this.id].currentX = coords.usrCoords[1];
    _guis[this.id].currentY = coords.usrCoords[2];
    if(_guis[this.id].constructionPoints.length != 0)
        _guis[this.id].board.update();
    if(_guis[this.id].pencilPointsArray != null)
    {
        var curvePoint = _guis[this.id].board.create('point', [_guis[this.id].currentX, _guis[this.id].currentY], {name:"", fixed:true, highlight:true, size:2});
        _guis[this.id].pencilPointsArray.push(curvePoint);
    }
}

function _mouseUp(e) {
    if(_guis[this.id].pencilPointsArray != null)
    {
        for(var i=0; i<_guis[this.id].pencilPointsArray.length-1; i++)
            _guis[this.id].board.create('segment', [_guis[this.id].pencilPointsArray[i], _guis[this.id].pencilPointsArray[i+1]], {strokeWidth:8, highlight:false});
        _guis[this.id].pencilPointsArray = null;
    }
}

JSXGraph_GUI.prototype.getMouseCoords = function(e, n)
{ // n=0 for mouse events, e=1 for tablet events
    var pos;
    if(n==0)
        pos = this.board.getMousePosition(e);
    else
        pos = this.board.getMousePosition(e, 0);

    var dx = pos[0], dy = pos[1];
    return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], this.board);
}

JSXGraph_GUI.prototype.downEvent = function(e)
{
    var currX = Math.round(this.currentX / this.snapSizeX) * this.snapSizeX;
    var currY = Math.round(this.currentY / this.snapSizeY) * this.snapSizeY;
    switch(this.active_command)
    {
        case _POINT_:
            var object = this.getNearestObject(currX, currY);
            if(object != null)
            {
                if(this.pointObjects.indexOf(object.elType) == -1)
                {
                    object = this.board.create('glider', [currX, currY, object], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                    if(this.board.options.point.withLabel)
                        object.setLabelText("$"+object.getName()+"$");
                }
                return;
            }
            object = this.board.create('point', [currX, currY], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
            object.setLabelText("$"+object.getName()+"$");
            break;
        case _LINE_ :
            var newP = false;
            var object = this.getNearestObject(currX, currY);
            var point = null;
            if(object == null)
            {
                point = this.board.create('point', [currX, currY], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                if(this.board.options.point.withLabel)
                    point.setLabelText("$"+point.getName()+"$");
            }
            else if(this.pointObjects.indexOf(object.elType) == -1)
            {
                point = this.board.create('glider', [currX, currY, object], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                if(this.board.options.point.withLabel)
                    point.setLabelText("$"+point.getName()+"$");
                newP = true;
            }
            else
                point = object;
            if(this.constructionPoints.length == 0)
            {
                this.constructionPoints.push(point);
                if(newP)
                    this.newPoints.push(point);
                this.currentPoint = this.board.create('point', [function() { return _guis[this.board.id].currentX; }, function() {return _guis[this.board.id].currentY; }], {name:""});
                this.animation = this.board.create('line', [point, this.currentPoint]);
            }
            else
            {
                var line = this.board.create('line', [this.constructionPoints[0], point], {fixed:false, highlight:true});
                this.constructionPoints = [];
                this.newPoints = [];
                this.board.removeObject(this.animation);
                this.board.removeObject(this.currentPoint);
                this.animation = null;
            }
            break;
        case _SEGMENT_ :
            var newP = false;
            var object = this.getNearestObject(currX, currY);
            var point = null;
            if(object == null)
            {
                point = this.board.create('point', [currX, currY], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                if(this.board.options.point.withLabel)
                    point.setLabelText("$"+point.getName()+"$");
            }
            else if(this.pointObjects.indexOf(object.elType) == -1)
            {
                point = this.board.create('glider', [currX, currY, object], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                if(this.board.options.point.withLabel)
                    point.setLabelText("$"+point.getName()+"$");
                newP = true;
            }
            else
                point = object;
            if(this.constructionPoints.length == 0)
            {
                this.constructionPoints.push(point);
                if(newP)
                    this.newPoints.push(point);
                this.currentPoint = this.board.create('point', [function() { return _guis[this.board.id].currentX; }, function() {return _guis[this.board.id].currentY; }], {name:""});
                this.animation = this.board.create('segment', [point, this.currentPoint]);
            }
            else
            {
                var line = this.board.create('segment', [this.constructionPoints[0], point], {fixed:false, highlight:true});
                this.constructionPoints = [];
                this.newPoints = [];
                this.board.removeObject(this.animation);
                this.board.removeObject(this.currentPoint);
                this.animation = null;
            }
            break;
        case _VECTOR_ :
            var newP = false;
            var object = this.getNearestObject(currX, currY);
            var point = null;
            if(object == null)
            {
                point = this.board.create('point', [currX, currY], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                if(this.board.options.point.withLabel)
                    point.setLabelText("$"+point.getName()+"$");
            }
            else
                point = object;
            if(this.constructionPoints.length == 0)
            {
                this.constructionPoints.push(point);
                if(newP)
                    this.newPoints.push(point);
                this.currentPoint = this.board.create('point', [function() { return _guis[this.board.id].currentX; }, function() {return _guis[this.board.id].currentY; }], {name:""});
                this.animation = this.board.create('arrow', [point, this.currentPoint]);
            }
            else
            {
                var line = this.board.create('arrow', [this.constructionPoints[0], point], {fixed:false, highlight:true});
                this.constructionPoints = [];
                this.newPoints = [];
                this.board.removeObject(this.animation);
                this.board.removeObject(this.currentPoint);
                this.animation = null;
            }
            break;
        case _FIXED_SEGMENT_ :
            var newP = false;
            var object = this.getNearestObject(currX, currY);
            var point = null;
            if(object == null)
            {
                point = this.board.create('point', [currX, currY], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                if(this.board.options.point.withLabel)
                    point.setLabelText("$"+point.getName()+"$");
            }
            else if(this.pointObjects.indexOf(object.elType) == -1)
            {
                point = this.board.create('glider', [currX, currY, object], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                if(this.board.options.point.withLabel)
                    point.setLabelText("$"+point.getName()+"$");
                newP = true;
            }
            else
            {
                point = object;
                var evt = document.createEvent("MouseEvents");
                evt.initEvent("mouseup", true, true);
                document.dispatchEvent(evt);
            }
            var n = window.prompt(JSXGraph_GUI_help["slo"]["_FIXED_SEGMENT_POPUP_"], 5);
            while(isNaN(n))
                n = window.prompt(JSXGraph_GUI_help["slo"]["_FIXED_SEGMENT_POPUP_"], 5);
            var d = parseFloat(n);
            var point2 = this.board.create('point', [function() { return point.X()+d; }, function() {return point.Y(); }], {fixed:false, highlight:false});
            if(this.board.options.point.withLabel)
                point2.setLabelText("$"+point2.getName()+"$");
            this.board.create('segment', [point, point2], {fixed:false, highlight:false});
            break;
        case _HLINE_ :
            var newP = false;
            var object = this.getNearestObject(currX, currY);
            var point = null;
            if(object == null)
            {
                point = this.board.create('point', [currX, currY], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                if(this.board.options.point.withLabel)
                    point.setLabelText("$"+point.getName()+"$");
            }
            else if(this.pointObjects.indexOf(object.elType) == -1)
            {
                point = this.board.create('glider', [currX, currY, object], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                if(this.board.options.point.withLabel)
                    point.setLabelText("$"+point.getName()+"$");
                newP = true;
            }
            else
                point = object;
            if(this.constructionPoints.length == 0)
            {
                this.constructionPoints.push(point);
                if(newP)
                    this.newPoints.push(point);
                this.currentPoint = this.board.create('point', [function() { return _guis[this.board.id].currentX; }, function() {return _guis[this.board.id].currentY; }], {name:""});
                this.animation = this.board.create('line', [point, this.currentPoint], {straightFirst:false});
            }
            else
            {
                var line = this.board.create('line', [this.constructionPoints[0], point], {fixed:false, highlight:true, straightFirst:false});
                this.constructionPoints = [];
                this.newPoints = [];
                this.board.removeObject(this.animation);
                this.board.removeObject(this.currentPoint);
                this.animation = null;
            }
            break;
        case _CIRCLE_ :
            var newP = false;
            var object = this.getNearestObject(currX, currY);
            var point = null;
            if(object == null)
            {
                point = this.board.create('point', [currX, currY], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                if(this.board.options.point.withLabel)
                    point.setLabelText("$"+point.getName()+"$");
            }
            else if(this.pointObjects.indexOf(object.elType) == -1)
            {
                point = this.board.create('glider', [currX, currY, object], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                if(this.board.options.point.withLabel)
                    point.setLabelText("$"+point.getName()+"$");
                newP = true;
            }
            else
                point = object;
            if(this.constructionPoints.length == 0)
            {
                this.constructionPoints.push(point);
                if(newP)
                    this.newPoints.push(point);
                this.currentPoint = this.board.create('point', [function() { return _guis[this.board.id].currentX; }, function() {return _guis[this.board.id].currentY; }], {name:""});
                this.animation = this.board.create('circle', [point, this.currentPoint]);
            }
            else
            {
                var circle = this.board.create('circle', [this.constructionPoints[0], point], {fixed:false, highlight:true});
                this.constructionPoints = [];
                this.newPoints = [];
                this.board.removeObject(this.animation);
                this.board.removeObject(this.currentPoint);
                this.animation = null;
            }
            break;
        case _CIRCLE3_ :
            var newP = false;
            var point = this.getNearestObject(currX, currY);
            var object = this.getNearestObject(currX, currY);
            var point = null;
            if(object == null)
            {
                point = this.board.create('point', [currX, currY], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                if(this.board.options.point.withLabel)
                    point.setLabelText("$"+point.getName()+"$");
                newP = true;
            }
            else if(this.pointObjects.indexOf(object.elType) == -1)
            {
                point = this.board.create('glider', [currX, currY, object], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                if(this.board.options.point.withLabel)
                    point.setLabelText("$"+point.getName()+"$");
                newP = true;
            }
            else
                point = object;
            this.constructionPoints.push(point);
            if(newP)
                this.newPoints.push(point);
            if(this.constructionPoints.length == 2)
            {
                this.currentPoint = this.board.create('point', [function() { return _guis[this.board.id].currentX; }, function() {return _guis[this.board.id].currentY; }], {name:""});
                this.animation = this.board.create('circle', [this.constructionPoints[0], this.constructionPoints[1], this.currentPoint]);
            }
            else if(this.constructionPoints.length == 3)
            {
                this.board.create('circle', [this.constructionPoints[0], this.constructionPoints[1], point], {fixed:false, highlight:true});
                this.constructionPoints = [];
                this.newPoints = [];
                this.board.removeObject(this.animation);
                this.board.removeObject(this.currentPoint);
                this.animation = null;
            }
            break;
        case _CONIC_SECTION5_ :
            var newP = false;
            var point = this.getNearestObject(currX, currY);
            var object = this.getNearestObject(currX, currY);
            var point = null;
            if(object == null)
            {
                point = this.board.create('point', [currX, currY], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                if(this.board.options.point.withLabel)
                    point.setLabelText("$"+point.getName()+"$");
                newP = true;
            }
            else if(this.pointObjects.indexOf(object.elType) == -1)
            {
                point = this.board.create('glider', [currX, currY, object], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                if(this.board.options.point.withLabel)
                    point.setLabelText("$"+point.getName()+"$");
                newP = true;
            }
            else
            {
                point = object;
                this.selectedObjects.push(point);
                point.setProperty({strokeWidth:3});
                point.setProperty({strokeColor:template_hcolor});
            }
            this.constructionPoints.push(point);
            if(newP)
                this.newPoints.push(point);
            if(this.constructionPoints.length == 4)
            {
                this.currentPoint = this.board.create('point', [function() { return _guis[this.board.id].currentX; }, function() {return _guis[this.board.id].currentY; }], {name:""});
                this.animation = this.board.create('conic', [this.constructionPoints[0], this.constructionPoints[1],
                    this.constructionPoints[2], this.constructionPoints[3], this.currentPoint]);
            }
            else if(this.constructionPoints.length == 5)
            {
                this.board.create('conic', [this.constructionPoints[0], this.constructionPoints[1],
                    this.constructionPoints[2], this.constructionPoints[3], point], {fixed:false, highlight:true});

                for(var i=0; i<this.selectedObjects.length; i++)
                {
                    this.selectedObjects[i].setProperty({strokeWidth:1});
                    this.selectedObjects[i].setProperty({strokeColor:'black'});
                }
                this.selectedObjects = [];
                this.constructionPoints = [];
                this.newPoints = [];
                this.board.removeObject(this.animation);
                this.board.removeObject(this.currentPoint);
                this.animation = null;
            }
            break;
        case _CIRCLER_ :
            var object = this.getNearestObject(currX, currY);
            var point = null;
            var newP = false;
            if(object == null)
            {
                point = this.board.create('point', [currX, currY], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                if(this.board.options.point.withLabel)
                    point.setLabelText("$"+point.getName()+"$");
                newP = true;
            }
            else if(this.pointObjects.indexOf(object.elType) == -1)
            {
                point = this.board.create('glider', [currX, currY, object], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                if(this.board.options.point.withLabel)
                    point.setLabelText("$"+point.getName()+"$");
                newP = true;
            }
            else
            {
                point = object;
                var evt = document.createEvent("MouseEvents");
                evt.initEvent("mouseup", true, true);
                document.dispatchEvent(evt);
            }

            if(newP)
                this.newPoints.push(point);
            var n = window.prompt(JSXGraph_GUI_help["slo"]["_FIXED_SEGMENT_POPUP_"], 5);
            while(isNaN(n))
                n = window.prompt(JSXGraph_GUI_help["slo"]["_FIXED_SEGMENT_POPUP_"], 5);
            var d = parseFloat(n);

            this.board.create('circle', [point, d], {fixed:false, highlight:true});

            break;
        case _POLYGON_ :
            var newP = false;
            var object = this.getNearestObject(currX, currY);
            var point = null;
            if(object == null)
            {
                point = this.board.create('point', [currX, currY], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                if(this.board.options.point.withLabel)
                    point.setLabelText("$"+point.getName()+"$");
                newP = true;
            }
            else if(this.pointObjects.indexOf(object.elType) == -1)
            {
                point = this.board.create('glider', [currX, currY, object], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                if(this.board.options.point.withLabel)
                    point.setLabelText("$"+point.getName()+"$");
                newP = true;
            }
            else
            {
                point = object;
                this.selectedObjects.push(point);
                point.setProperty({strokeWidth:3});
                point.setProperty({strokeColor:template_hcolor});
            }
            if(point != this.constructionPoints[0])
            {
                this.constructionPoints.push(point);
                if(newP)
                    this.newPoints.push(point);
                this.board.removeObject(this.animation);
                this.animation = this.board.create('polygon', this.constructionPoints, {highlight:false, withLines:false});
            }
            else
            {
                this.board.removeObject(this.animation);
                var polygon = this.board.create('polygon', this.constructionPoints, {fixed:false, highlight:true, withLines:true, hasInnerPoints:true});

                for(var i=0; i<this.selectedObjects.length; i++)
                {
                    this.selectedObjects[i].setProperty({strokeWidth:1});
                    this.selectedObjects[i].setProperty({strokeColor:'black'});
                }
                this.selectedObjects = [];
                this.constructionPoints = [];
                this.newPoints = [];
                this.animation = null;
            }
            break;
        case _REGULAR_POLYGON_ :
            var newP = false;
            var object = this.getNearestObject(currX, currY);
            var point = null;
            if(object == null)
            {
                point = this.board.create('point', [currX, currY], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                if(this.board.options.point.withLabel)
                    point.setLabelText("$"+point.getName()+"$");
                newP = true;
            }
            else if(this.pointObjects.indexOf(object.elType) == -1)
            {
                point = this.board.create('glider', [currX, currY, object], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                if(this.board.options.point.withLabel)
                    point.setLabelText("$"+point.getName()+"$");
                newP = true;
            }
            else
                point = object;
            this.constructionPoints.push(point);
            if(newP)
                this.newPoints.push(point);
            if(this.constructionPoints.length == 2)
            {
                var n = window.prompt(JSXGraph_GUI_help["slo"]["_RPOLYGON_POPUP_"], 5);
                while(isNaN(n))
                    n = window.prompt(JSXGraph_GUI_help["slo"]["_RPOLYGON_POPUP_"], 5);
                var d = Math.round(parseFloat(n));
                if(d < 3)
                    d = 3;
                var rpoly = this.board.create('regularpolygon', [this.constructionPoints[0], point, d], {vertices:{visible:false}, fixed:false, highlight:true});
                this.constructionPoints = [];
                this.newPoints = [];
            }
            break;
        case _ANGLE_ :
            var newP = false;
            var point = this.getNearestObject(currX, currY);
            var object = this.getNearestObject(currX, currY);
            var point = null;
            if(object == null)
            {
                point = this.board.create('point', [currX, currY], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                if(this.board.options.point.withLabel)
                    point.setLabelText("$"+point.getName()+"$");
            }
            else if(this.pointObjects.indexOf(object.elType) == -1)
            {
                point = this.board.create('glider', [currX, currY, object], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                if(this.board.options.point.withLabel)
                    point.setLabelText("$"+point.getName()+"$");
                newP = true;
            }
            else
                point = object;
            this.constructionPoints.push(point);
            if(newP)
                this.newPoints.push(point);
            var bb = this.board.getBoundingBox();
            var radiusSize = Math.abs(bb[0]-bb[2])/20;
            if(this.constructionPoints.length == 2)
            {
                this.currentPoint = this.board.create('point', [function() { return _guis[this.board.id].currentX; }, function() {return _guis[this.board.id].currentY; }], {name:""});
                this.animation = this.board.create('angle', [this.constructionPoints[0], this.constructionPoints[1], this.currentPoint], {radius:radiusSize, withLabel:false, name:'tmpangle'});
            }
            else if(this.constructionPoints.length == 3)
            {
                this.board.create('angle', [this.constructionPoints[0], this.constructionPoints[1], point], {fixed:false, radius:radiusSize, withLabel:false, highlight:true});
                this.constructionPoints = [];
                this.newPoints = [];
                this.board.removeObject(this.animation);
                this.board.removeObject(this.currentPoint);
                this.animation = null;
            }
            break;
        case _ANGLES_ :
            var newP = false;
            var point = this.getNearestObject(currX, currY);
            var object = this.getNearestObject(currX, currY);
            var point = null;
            if(object == null)
            {
                point = this.board.create('point', [currX, currY], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                if(this.board.options.point.withLabel)
                    point.setLabelText("$"+point.getName()+"$");
            }
            else if(this.pointObjects.indexOf(object.elType) == -1)
            {
                point = this.board.create('glider', [currX, currY, object], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                if(this.board.options.point.withLabel)
                    point.setLabelText("$"+point.getName()+"$");
                newP = true;
            }
            else
                point = object;
            this.constructionPoints.push(point);
            if(newP)
                this.newPoints.push(point);
            var bb = this.board.getBoundingBox();
            var radiusSize = Math.abs(bb[0]-bb[2])/20;
            if(this.constructionPoints.length == 2)
            {
                this.currentPoint = this.board.create('point', [function() { return _guis[this.board.id].currentX; }, function() {return _guis[this.board.id].currentY; }], {name:""});
                this.animation = this.board.create('angle', [this.constructionPoints[0], this.constructionPoints[1], this.currentPoint], {radius:radiusSize, withLabel:false, name:'tmpangle'});
            }
            else if(this.constructionPoints.length == 3)
            {
                var p1 = this.constructionPoints[0];
                var p2 = this.constructionPoints[1];
                var p3 = point;

                this.board.create('angle', [this.constructionPoints[0], this.constructionPoints[1], point], {fixed:false, orthoSensitivity:0.5, radius:radiusSize, highlight:true,
                    label:{color:'black'}, name:function(){return "$"+ Math.round(JXG.Math.Geometry.trueAngle(p1,p2,p3)) + "^\{\\circ\}$"; } });

                this.constructionPoints = [];
                this.newPoints = [];
                this.board.removeObject(this.animation);
                this.board.removeObject(this.currentPoint);
                this.animation = null;
            }
            break;
        case _ANGLEV_ :
            var newP = false;
            var object = this.getNearestObject(currX, currY);
            var point = null;
            if(object == null)
            {
                point = this.board.create('point', [currX, currY], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                if(this.board.options.point.withLabel)
                    point.setLabelText("$"+point.getName()+"$");
            }
            else if(this.pointObjects.indexOf(object.elType) == -1)
            {
                point = this.board.create('glider', [currX, currY, object], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                if(this.board.options.point.withLabel)
                    point.setLabelText("$"+point.getName()+"$");
                newP = true;
            }
            else
                point = object;
            this.constructionPoints.push(point);
            if(newP)
                this.newPoints.push(point);
            var bb = this.board.getBoundingBox();
            var radiusSize = Math.abs(bb[0]-bb[2])/20;
            if(this.constructionPoints.length == 2)
            {
                var genId = "_HIDDEN_" + new Date().getTime();
                var tmppoint = this.board.create('point', [currX, currY], {id:genId,snapToGrid:false, fixed:false, visible:false});
                var n = window.prompt(JSXGraph_GUI_help["slo"]["_ANGLEV_POPUP_"], 45);
                while(isNaN(n))
                    n = window.prompt(JSXGraph_GUI_help["slo"]["_ANGLEV_POPUP_"], 45);
                if(document.getElementById("angle_left_orientation_" + this.id).checked)
                {
                    var v = Math.PI*(parseFloat(n)/180);
                    this.board.update();
                    var angle = this.board.create('angle', [this.constructionPoints[0], point, tmppoint], {fixed:false, radius:radiusSize, withLabel:false, highlight:true});
                    angle.setAngle(v);
                    this.board.create('line', [point, tmppoint], {fixed:false, straightFirst:false, highlight:true});
                }
                else
                {
                    var v = Math.PI*(360-parseFloat(n)/180);
                    var angle = this.board.create('angle', [this.constructionPoints[0], point, tmppoint], {fixed:false, visible:false});
                    this.board.update();
                    angle.setAngle(v);
                    var angle1 = this.board.create('angle', [tmppoint, point, this.constructionPoints[0]], {fixed:false, radius:radiusSize, withLabel:false, highlight:true});
                    this.board.create('line', [point, tmppoint], {straightFirst:false, fixed:false, highlight:true});
                }
                this.constructionPoints = [];
                this.newPoints = [];
            }
            break;
        case _ERASE_:
            for (var i=0; i<this.board.downObjects.length; i++)
            {
                if(this.board.downObjects[i].getAttribute("fixed"))
                    continue;
                if(this.board.downObjects[i].id.substring(0, 8) != '_STATIC_')
                    this.board.removeObject(this.board.downObjects[i]);
            }
            break;
        case _INTERSECTION_:
            for (var i=0; i<this.board.downObjects.length; i++)
            {
                if(this.board.downObjects[i].id.substring(0, 8) == '_HIDDEN_')
                    continue;
                if(this.nonPointObjects.indexOf(this.board.downObjects[i].elType) != -1)
                {
                    for (var j=0; j<this.selectedObjects.length; j++)
                        if(this.selectedObjects[j] == this.board.downObjects[i])
                            continue;

                    this.selectedObjects.push(this.board.downObjects[i]);
                    this.board.downObjects[i].setProperty({strokeWidth:3});
                    this.board.downObjects[i].setProperty({strokeColor:template_hcolor});
                }
            }
            if(this.selectedObjects.length == 2)
            {
                var intersection = this.board.create('intersection', [this.selectedObjects[0], this.selectedObjects[1],0], {fixed:false, highlight:true});
                if(this.board.options.point.withLabel)
                    intersection.setLabelText("$"+intersection.getName()+"$");
                if(this.selectedObjects[0].elType == 'circle' || this.selectedObjects[1].elType == 'circle')
                    intersection = this.board.create('intersection', [this.selectedObjects[0], this.selectedObjects[1],1], {fixed:false, highlight:true});
                if(this.board.options.point.withLabel)
                    intersection.setLabelText("$"+intersection.getName()+"$");
            }
            if (this.selectedObjects.length >= 2)
            {
                for(var i=0; i<this.selectedObjects.length; i++)
                {
                    this.selectedObjects[i].setProperty({strokeWidth:1});
                    this.selectedObjects[i].setProperty({strokeColor:'black'});
                }
                this.selectedObjects = [];
            }
            break;
        case _PERPENDICULAR_ :
            if(this.selectedObjects.length == 1)
            {
                var point = this.getNearestObject(currX, currY);
                var object = this.getNearestObject(currX, currY);
                var point = null;
                if(object == null)
                {
                    point = this.board.create('point', [currX, currY], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                    if(this.board.options.point.withLabel)
                        point.setLabelText("$"+point.getName()+"$");
                }
                else if(this.pointObjects.indexOf(object.elType) == -1)
                {
                    point = this.board.create('glider', [currX, currY, object], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                    if(this.board.options.point.withLabel)
                        point.setLabelText("$"+point.getName()+"$");
                    newP = true;
                }
                else
                    point = object;
                var perpendicular = this.board.create('perpendicular', [this.selectedObjects[0], point], {fixed:false, highlight:true});
                var strW1 = this.selectedObjects[0].getAttribute("strokeWidth")-1;
                this.selectedObjects[0].setAttribute({strokeWidth:strW1});
                this.selectedObjects = [];
                this.board.removeObject(this.animation);
                this.board.removeObject(this.currentPoint);
                this.animation = null;
            }
            else
            {
                for (var i=0; i<this.board.downObjects.length; i++)
                {
                    if(this.selectedObjects.length == 0 && this.nonPointObjects.indexOf(this.board.downObjects[i].elType) != -1)
                    {
                        this.selectedObjects.push(this.board.downObjects[i]);
                        var strW = this.board.downObjects[i].getAttribute("strokeWidth")+1;
                        this.board.downObjects[i].setProperty({strokeWidth:strW});
                        this.currentPoint = this.board.create('point', [function() { return _guis[this.board.id].currentX; }, function() {return _guis[this.board.id].currentY; }], {name:""});
                        this.animation = this.board.create('perpendicular', [this.selectedObjects[0], this.currentPoint]);
                    }
                }
            }
            break;
        case _PARALLEL_ :
            if(this.selectedObjects.length == 1)
            {
                var point = this.getNearestObject(currX, currY);
                var object = this.getNearestObject(currX, currY);
                var point = null;
                if(object == null)
                {
                    point = this.board.create('point', [currX, currY], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                    if(this.board.options.point.withLabel)
                        point.setLabelText("$"+point.getName()+"$");
                }
                else if(this.pointObjects.indexOf(object.elType) == -1)
                {
                    point = this.board.create('glider', [currX, currY, object], {snapSizeX: this.snapSizeX, snapSizeY:this.snapSizeY, snapToGrid:true, fixed:false, highlight:true});
                    if(this.board.options.point.withLabel)
                        point.setLabelText("$"+point.getName()+"$");
                    newP = true;
                }
                else
                    point = object;
                var parallel = this.board.create('parallel', [this.selectedObjects[0], point], {fixed:false, highlight:true, fixed:false});
                var strW1 = this.selectedObjects[0].getAttribute("strokeWidth")-1;
                this.selectedObjects[0].setAttribute({strokeWidth:strW1});
                this.selectedObjects = [];
                this.board.removeObject(this.animation);
                this.board.removeObject(this.currentPoint);
                this.animation = null;
            }
            else
            {
                for (var i=0; i<this.board.downObjects.length; i++)
                {
                    if(this.selectedObjects.length == 0 && this.nonPointObjects.indexOf(this.board.downObjects[i].elType) != -1)
                    {
                        this.selectedObjects.push(this.board.downObjects[i]);
                        var strW = this.board.downObjects[i].getAttribute("strokeWidth")+1;
                        this.board.downObjects[i].setProperty({strokeWidth:strW});
                        this.currentPoint = this.board.create('point', [function() { return _guis[this.board.id].currentX; }, function() {return _guis[this.board.id].currentY; }], {name:""});
                        this.animation = this.board.create('parallel', [this.selectedObjects[0], this.currentPoint]);
                    }
                }
            }
            break;
        case _SYMMETRY_ :
            for (var i=0; i<this.board.downObjects.length; i++)
            {
                if(this.board.downObjects[i].id.substring(0, 8) == '_HIDDEN_')
                    continue;
                if( this.pointObjects.indexOf(this.board.downObjects[i].elType) != -1 )
                    {
                        this.selectedObjects.push(this.board.downObjects[i]);
                        var strW = this.board.downObjects[i].getAttribute("size")+1;
                        this.board.downObjects[i].setProperty({size:strW});
                        this.board.downObjects[i].setProperty({fillcolor:template_hcolor});
                    }
            }
            if(this.selectedObjects.length == 2)
            {
                var line = this.board.create('line', [this.selectedObjects[0], this.selectedObjects[1]], {visible:false});
                var circle = this.board.create('circle', [this.selectedObjects[1], this.selectedObjects[0]], {visible:false});
                var symmetry = this.board.create('intersection', [line, circle], {highlight:true, fixed:false});
                if(this.board.options.point.withLabel)
                    symmetry.setLabelText("$"+this.selectedObjects[0].getName()+"'$");
                var strW1 = this.selectedObjects[0].getAttribute("size")-1;
                this.selectedObjects[0].setProperty({size:strW1});
                this.selectedObjects[0].setProperty({color:'black'});
                var strW2 = this.selectedObjects[1].getAttribute("size")-1;
                this.selectedObjects[1].setProperty({size:strW2});
                this.selectedObjects[1].setProperty({color:'black'});
                this.selectedObjects = [];
            }
            break;
        case _SEGMENT_SYMMETRY_ :
            for (var i=0; i<this.board.downObjects.length; i++)
            {
                if(this.board.downObjects[i].id.substring(0, 8) == '_HIDDEN_')
                    continue;
                if( this.board.downObjects[i].elType == "segment")
                {
                    var point1 = this.board.downObjects[0].point1;
                    var point2 = this.board.downObjects[0].point2;
                    var genId = "_HIDDEN_" + new Date().getTime();
                    var midpoint = this.board.create("midpoint", [point1, point2], {id:genId, fixed:false, visible:false});
                    var segment_symmetry = this.board.create("perpendicular", [midpoint, this.board.downObjects[0]], {fixed:false, highlight:true});
                    this.selectedObjects = [];
                }
            }
            break;
        case _ANGLE_BISECTOR_ :
            for (var i=0; i<this.board.downObjects.length; i++)
            {
                if(this.board.downObjects[i].id.substring(0, 8) == '_HIDDEN_')
                    continue;
                if( this.pointObjects.indexOf(this.board.downObjects[i].elType) != -1 )
                {
                    this.selectedObjects.push(this.board.downObjects[i]);
                    var strW = this.board.downObjects[i].getAttribute("size")+1;
                    this.board.downObjects[i].setProperty({size:strW});
                    this.board.downObjects[i].setProperty({fillcolor:template_hcolor});
                }
            }
            if(this.selectedObjects.length >= 3)
            {
                var bisector = this.board.create('bisector', [this.selectedObjects[0], this.selectedObjects[1], this.selectedObjects[2]], {fixed:false, highlight:true});
                var strW1 = this.selectedObjects[0].getAttribute("size")-1;
                this.selectedObjects[0].setProperty({size:strW1});
                this.selectedObjects[0].setProperty({color:'black'});
                var strW2 = this.selectedObjects[1].getAttribute("size")-1;
                this.selectedObjects[1].setProperty({size:strW2});
                this.selectedObjects[1].setProperty({color:'black'});
                var strW3 = this.selectedObjects[2].getAttribute("size")-1;
                this.selectedObjects[2].setProperty({size:strW3});
                this.selectedObjects[2].setProperty({color:'black'});
                this.selectedObjects = [];
            }

            break;
        case _MIDPOINT_ :
            for (var i=0; i<this.board.downObjects.length; i++)
            {
                if(this.board.downObjects[i].id.substring(0, 8) == '_HIDDEN_')
                    continue;
                if( this.pointObjects.indexOf(this.board.downObjects[i].elType) != -1 )
                {
                    this.selectedObjects.push(this.board.downObjects[i]);
                    var strW = this.board.downObjects[i].getAttribute("size")+1;
                    this.board.downObjects[i].setProperty({size:strW});
                    this.board.downObjects[i].setProperty({fillcolor:template_hcolor});
                }
            }
            if(this.selectedObjects.length > 1)
            {
                var midpoint = this.board.create('midpoint', [this.selectedObjects[0], this.selectedObjects[1]], {highlight:true, fixed:false});
                if(this.board.options.point.withLabel)
                    midpoint.setLabelText("$"+midpoint.getName()+"$");
                var strW1 = this.selectedObjects[0].getAttribute("size")-1;
                this.selectedObjects[0].setProperty({size:strW1});
                this.selectedObjects[0].setProperty({color:'black'});
                var strW2 = this.selectedObjects[1].getAttribute("size")-1;
                this.selectedObjects[1].setProperty({size:strW2});
                this.selectedObjects[1].setProperty({color:'black'});
                this.selectedObjects = [];
            }
            break;
        case _LINE_SYMMETRY_ :
            for (var i=0; i<this.board.downObjects.length; i++)
            {
                if(this.board.downObjects[i].id.substring(0, 8) == '_HIDDEN_')
                    continue;
                if( this.selectedObjects.length == 0 && this.pointObjects.indexOf(this.board.downObjects[i].elType) != -1)
                {
                    this.selectedObjects.push(this.board.downObjects[i]);
                    var strW = this.board.downObjects[i].getAttribute("size")+1;
                    this.board.downObjects[i].setProperty({size:strW});
                    this.board.downObjects[i].setProperty({fillcolor:template_hcolor});
                }
                else if(this.selectedObjects.length == 1 && this.nonPointObjects.indexOf(this.board.downObjects[i].elType) != -1)
                {
                    this.selectedObjects.push(this.board.downObjects[i]);
                    var strW = this.board.downObjects[i].getAttribute("size")+1;
                    this.board.downObjects[i].setProperty({size:strW});
                }
            }
            if(this.selectedObjects.length == 2)
            {
                var symmetry = this.board.create('reflection', [this.selectedObjects[0], this.selectedObjects[1]], {highlight:true, fixed:false});
                if(this.board.options.point.withLabel)
                    symmetry.setLabelText("$"+this.selectedObjects[0].getName()+"'$");
                var strW1 = this.selectedObjects[0].getAttribute("size")-1;
                this.selectedObjects[0].setProperty({size:strW1});
                this.selectedObjects[0].setProperty({color:'black'});
                var strW2 = this.selectedObjects[1].getAttribute("size")-1;
                this.selectedObjects[1].setProperty({size:strW2});
                this.selectedObjects = [];
            }
            break;
        case _DISTANCE_:
            for (var i=0; i<this.board.downObjects.length; i++)
            {
                if(this.board.downObjects[i].id.substring(0, 8) == '_HIDDEN_')
                    continue;
                if( this.board.downObjects[i].elType == 'point' ||
                    this.board.downObjects[i].elType == 'midpoint' ||
                    this.board.downObjects[i].elType == 'glider' ||
                    this.board.downObjects[i].elType == 'intersection'||
                    this.board.downObjects[i].elType == 'mirrorpoint' ||
                    this.board.downObjects[i].elType == 'reflection')
                {
                    this.selectedObjects.push(this.board.downObjects[i]);
                    var strW = this.board.downObjects[i].getAttribute("size")+1;
                    this.board.downObjects[i].setProperty({size:strW});
                    this.board.downObjects[i].setProperty({fillcolor:template_hcolor});

                }
                if(this.selectedObjects.length == 2)
                    break;
            }
            if(this.selectedObjects.length == 2)
            {
                var p1 = this.board.select(this.selectedObjects[0].id);
                var p2 = this.board.select(this.selectedObjects[1].id);

                this.board.create("text", [(p1.X()+p2.X())/2, 0.5+(p1.Y()+p2.Y())/2, function() { return "$d="+(p1.Dist(p2)).toFixed(2).replace(".", ",")+"\\;\\mathbf{cm}$";}], {highlight:true, fixed:false});

                var strW1 = this.selectedObjects[0].getAttribute("size")-1;
                this.selectedObjects[0].setProperty({size:strW1});
                this.selectedObjects[0].setProperty({color:'black'});
                var strW2 = this.selectedObjects[1].getAttribute("size")-1;
                this.selectedObjects[1].setProperty({size:strW2});
                this.selectedObjects[1].setProperty({color:'black'});
                this.selectedObjects = [];
            }
            break;
        case _AREA_:
            for (var i=0; i<this.board.downObjects.length; i++)
            {
                if(this.board.downObjects[i].id.substring(0, 8) == '_HIDDEN_')
                    continue;

                if( this.board.downObjects[i].elType == "polygon")
                {
                    var polygon = this.board.select(this.board.downObjects[i].id);
                    var x = 0, y = 0;
                    var n = polygon.vertices.length-1;
                    for(var j=0; j<n; j++)
                    {
                        x += polygon.vertices[j].X();
                        y += polygon.vertices[j].Y();
                    }

                    this.board.create("text", [x/n, y/n, function() {
                        return "$P=" + polygon.Area().toFixed(2).replace(".", ",")+"\\;\\mathbf{cm}^2$";
                    }], {highlight:true, fixed:false});

                }
            }
            break;
        case _PENCIL_:
            this.pencilPointsArray = new Array();
            break;
        case _TRANSLATION_:
            for (var i=0; i<this.board.downObjects.length; i++)
            {
                if(this.board.downObjects[i].id.substring(0, 8) == '_HIDDEN_')
                    continue;
                if( this.selectedObjects.length == 0 && this.pointObjects.indexOf(this.board.downObjects[i].elType) != -1)
                {
                    this.selectedObjects.push(this.board.downObjects[i]);
                    var strW = this.board.downObjects[i].getAttribute("size")+1;
                    this.board.downObjects[i].setProperty({size:strW});
                    this.board.downObjects[i].setProperty({fillcolor:template_hcolor});
                }
                else if(this.selectedObjects.length == 1 && this.board.downObjects[i].elType == "arrow")
                {
                    this.selectedObjects.push(this.board.downObjects[i]);
                    var strW = this.board.downObjects[i].getAttribute("size")+1;
                    this.board.downObjects[i].setProperty({size:strW});
                }
            }
            if(this.selectedObjects.length == 2)
            {
                var tVector = this.selectedObjects[1];
                var translation = this.board.create('transform', [
                    function() { return tVector.point2.X() - tVector.point1.X() },
                    function() { return tVector.point2.Y() - tVector.point1.Y() }], {type:'translate'});
                var result = this.board.create('point', [this.selectedObjects[0], translation], {highlight:true, fixed:false});
                if(this.board.options.point.withLabel)
                    result.setLabelText("$"+this.selectedObjects[0].getName()+"'$");

                var strW1 = this.selectedObjects[0].getAttribute("size")-1;
                this.selectedObjects[0].setProperty({size:strW1});
                this.selectedObjects[0].setProperty({color:'black'});
                var strW2 = this.selectedObjects[1].getAttribute("size")-1;
                this.selectedObjects[1].setProperty({size:strW2});
                this.selectedObjects = [];
            }
            break;
        case _TEXT_:
            var text = document.getElementById("inserted_text_" + this.id).value;
            if(text == "")
            {
                alert(JSXGraph_GUI_help["slo"]["_EMPTY_TEXT_"]);
                document.getElementById("inserted_text_" + this.id).focus();
                break;
            }
            this.board.create('text', [currX, currY, text], {fontsize:14, highlight:true, fixed:false});
            document.getElementById("inserted_text_" + this.id).value = "";
            break;

    }
    this.board.update();
}

JSXGraph_GUI.prototype.getNearestObject = function(x, y)
{
    var minDist = 10000;
    var nearestObject = null;
    for(var el in this.board.objects)
    {
        if(this.pointObjects.indexOf(this.board.objects[el].elType) != -1)
        {
            if(Math.sqrt(Math.pow(this.board.objects[el].X() - x, 2) + Math.pow(this.board.objects[el].Y() - y, 2)) < this.magnetSize
                && this.board.objects[el].id.substring(0, 8) != '_HIDDEN_' && this.board.objects[el] != this.currentPoint)
                if(Math.sqrt(Math.pow(this.board.objects[el].X() - x, 2) + Math.pow(this.board.objects[el].Y() - y, 2)) < minDist)
                {
                    minDist = Math.sqrt(Math.pow(this.board.objects[el].X() - x, 2) + Math.pow(this.board.objects[el].Y() - y, 2));
                    nearestObject = this.board.objects[el];
                }
        }
    }
    if(nearestObject != null)
        return nearestObject;
    for(var i=0; i<this.board.downObjects.length; i++)
    {
        if(this.board.downObjects[i] == this.animation || this.board.downObjects[i].id.substring(0, 8) == '_HIDDEN_')
            continue;
        if( this.nonPointObjects.indexOf(this.board.downObjects[i].elType) != -1)
            nearestObject = this.board.downObjects[i];
    }
    return nearestObject;
}