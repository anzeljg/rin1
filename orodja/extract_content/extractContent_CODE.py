# encoding=utf8
#-------------------------------------------------------------------------------
# Name:        extractContent
# Purpose:     This script extract content from e-u�beniki units.
# Author:      Gregor Anzelj <gregor.anzelj@gmail.com>
#
# Created:     20.01.2016
# Copyright:   (c) Gregor Anzelj 2016
#-------------------------------------------------------------------------------

import json
import os
import re
#import zipfile

DEBUG = True

def processFolder():
    cwd = os.getcwd()
    print("Processing HTML files in " + cwd)
    for file in os.listdir(cwd):
        if file.startswith("index") and file.endswith(".html"):
            if (DEBUG): print("- processing file " + file)

            # open file and read contents
            contents = open(cwd + "/" + file, "r", encoding="utf8")
            html = contents.read()

            # extract left column content
            pattern = re.compile(r'<section class="page page-left">(.*?)</section>', re.DOTALL)
            results = re.findall(pattern, html)
            if len(results) > 0:
                if (DEBUG): print("  - extracting left column")
                left = results[0]
                # fix HTML by removing unnecessary things...
                left = left.replace('<!-- Samostojno besedilo --> ', '')
                left = left.replace('  <div class=\'wrapper\'>\n<div class="splosna_obvezna_znanja">', '')
                left = left.replace('</div>\n</div>\n<div style="clear:both;height:1px;overflow:hidden;"></div>', '')
                left = left.replace('<div style="clear:both;height:1px;overflow:hidden;"></div>', '')
                left = left.replace(' <p><div align="justify">', '<p align="justify">')
                left = left.replace('<p><div align="justify">', '<p align="justify">')
                left = left.replace('</div></p>', '</p>')
                left = left.replace('\n\n', '\n')
                left = left.replace('\n\n', '\n')
                left = left.replace('\n\n', '\n')
                left = left.replace('<h1>', '\n<h1>')
                left = left.replace('<h2>', '\n<h2>')
                left = left.replace('<br />\n<br />\n', '</p>\n\n<p align="justify">')
                # fix image file paths
                left = left.replace('<img src="', '<img src="img/')
                # fix javascript file paths
                left = left.replace('h5utils.js', '../js/h5utils/h5utils.js')
                left = left.replace('jquery.jsPlumb-1.4.0-all.js', '../js/h5utils/jquery.jsPlumb-1.4.0-all.js')
                left = left.replace('jquery.ui.touch-punch.min.js', '../js/h5utils/jquery.ui.touch-punch.min.js')
                left = left.replace('jquery-1.9.0-min.js', '../js/h5utils/jquery-1.9.0-min.js')
                left = left.replace('jquery-ui-1.9.2-min.js', '../js/h5utils/jquery-ui-1.9.2-min.js')
                left = left.replace('sCript.js', '../js/h5utils/sCript.js')
				# fix source code snippets
                left = left.replace('<span class="tab1">', ' ')
                left = left.replace('<span class="tab2">', '  ')
                left = left.replace('<span class="tab3">', '   ')
                left = left.replace('<span class="tab4">', '    ')
                left = left.replace('<span class="tab5">', '     ')
                left = left.replace('<span class="tab6">', '      ')
                left = left.replace('<span class="tab7">', '       ')
                left = left.replace('<span class="tab8">', '        ')
                left = left.replace('<span class="tab9">', '         ')
                left = left.replace('<span class="tab10">', '          ')
                left = left.replace('<span class="tab11">', '           ')
                left = left.replace('<span class="tab12">', '            ')
                left = left.replace('<span class="tab13">', '             ')
                left = left.replace('<span class="tab14">', '              ')
                left = left.replace('<span class="tab15">', '               ')
                left = left.replace('<span class="tab16">', '                ')
                left = left.replace('<span class="tab17">', '                 ')
                left = left.replace('<span class="tab18">', '                  ')
                left = left.replace('<span class="tab19">', '                   ')
                left = left.replace('<span class="tab20">', '                    ')
                left = left.replace('<span class="tab21">', '                     ')
                left = left.replace('<span class="tab22">', '                      ')
                left = left.replace('<span class="tab23">', '                       ')
                left = left.replace('<span class="tab24">', '                        ')
                left = left.replace('<span class="tab25">', '                         ')
                left = left.replace('<span class="tab26">', '                          ')
                left = left.replace('<span class="tab27">', '                           ')
                left = left.replace('<span class="tab28">', '                            ')
                left = left.replace('<span class="tab29">', '                             ')
                left = left.replace('</span>', '')
                left = left.replace('<br />', '')
                left = left.replace('<link href="codeformatting.css" rel="stylesheet" type="text/css" />', '')
                left = left.replace('<button type="button" class="btn-blue"  onclick="runit()">Izvedi</button>', '<p>\n<a href="#" class="btn btn-primary"  onclick="runit()"><span class="fa fa-play"></span> Izvedi</a>')
                left = left.replace('<button type="button" class="btn-blue"  onclick="clearit()">Počisti</button>', '<a href="#" class="btn btn-primary"  onclick="clearit()">Počisti</a>\n</p>')
                left = left.replace('<textarea', '<p>\n<textarea')
                left = left.replace('</textarea>', '</textarea>\n</p>')
                left = left.replace('editor.setSize(500', 'editor.setSize(\'100%\'')
                left = left.replace('<h2>Naloga</h2>', '<h4>Vaja</h4>\n')
                left = left.replace('<div style="width:500px">', '<div>')

                # write page
                file_left = open(cwd + "/left_" + file, "w", encoding="utf8")
                file_left.write(left)
                file_left.flush()
                file_left.close()

            # extract right column content
            pattern = re.compile(r'<section class="page page-right">(.*?)</section>', re.DOTALL)
            results = re.findall(pattern, html)
            if len(results) > 0:
                if (DEBUG): print("  - extracting right column")
                right = results[0]
                # fix HTML by removing unnecessary things...
                right = right.replace('<!-- Samostojno besedilo --> ', '')
                right = right.replace('  <div class=\'wrapper\'>\n<div class="splosna_obvezna_znanja">', '')
                right = right.replace('</div>\n</div>\n<div style="clear:both;height:1px;overflow:hidden;"></div>', '')
                right = right.replace('<div style="clear:both;height:1px;overflow:hidden;"></div>', '')
                right = right.replace(' <p><div align="justify">', '<p align="justify">')
                right = right.replace('<p><div align="justify">', '<p align="justify">')
                right = right.replace('</div></p>', '</p>')
                right = right.replace('\n\n', '\n')
                right = right.replace('\n\n', '\n')
                right = right.replace('\n\n', '\n')
                right = right.replace('<h1>', '\n<h1>')
                right = right.replace('<h2>', '\n<h2>')
                right = right.replace('<br />\n<br />\n', '</p>\n\n<p align="justify">')
                # fix image file paths
                right = right.replace('<img src="', '<img src="img/')
                # fix javascript file paths
                right = right.replace('h5utils.js', '../js/h5utils/h5utils.js')
                right = right.replace('jquery.jsPlumb-1.4.0-all.js', '../js/h5utils/jquery.jsPlumb-1.4.0-all.js')
                right = right.replace('jquery.ui.touch-punch.min.js', '../js/h5utils/jquery.ui.touch-punch.min.js')
                right = right.replace('jquery-1.9.0-min.js', '../js/h5utils/jquery-1.9.0-min.js')
                right = right.replace('jquery-ui-1.9.2-min.js', '../js/h5utils/jquery-ui-1.9.2-min.js')
                right = right.replace('sCript.js', '../js/h5utils/sCript.js')
				# fix source code snippets
                right = right.replace('<span class="tab1">', ' ')
                right = right.replace('<span class="tab2">', '  ')
                right = right.replace('<span class="tab3">', '   ')
                right = right.replace('<span class="tab4">', '    ')
                right = right.replace('<span class="tab5">', '     ')
                right = right.replace('<span class="tab6">', '      ')
                right = right.replace('<span class="tab7">', '       ')
                right = right.replace('<span class="tab8">', '        ')
                right = right.replace('<span class="tab9">', '         ')
                right = right.replace('<span class="tab10">', '          ')
                right = right.replace('<span class="tab11">', '           ')
                right = right.replace('<span class="tab12">', '            ')
                right = right.replace('<span class="tab13">', '             ')
                right = right.replace('<span class="tab14">', '              ')
                right = right.replace('<span class="tab15">', '               ')
                right = right.replace('<span class="tab16">', '                ')
                right = right.replace('<span class="tab17">', '                 ')
                right = right.replace('<span class="tab18">', '                  ')
                right = right.replace('<span class="tab19">', '                   ')
                right = right.replace('<span class="tab20">', '                    ')
                right = right.replace('<span class="tab21">', '                     ')
                right = right.replace('<span class="tab22">', '                      ')
                right = right.replace('<span class="tab23">', '                       ')
                right = right.replace('<span class="tab24">', '                        ')
                right = right.replace('<span class="tab25">', '                         ')
                right = right.replace('<span class="tab26">', '                          ')
                right = right.replace('<span class="tab27">', '                           ')
                right = right.replace('<span class="tab28">', '                            ')
                right = right.replace('<span class="tab29">', '                             ')
                right = right.replace('</span>', '')
                right = right.replace('<br />', '')
                right = right.replace('<link href="codeformatting.css" rel="stylesheet" type="text/css" />', '')
                right = right.replace('<button type="button" class="btn-blue"  onclick="runit()">Izvedi</button>', '<p>\n<a href="#" class="btn btn-primary"  onclick="runit()"><span class="fa fa-play"></span> Izvedi</a>')
                right = right.replace('<button type="button" class="btn-blue"  onclick="clearit()">Počisti</button>', '<a href="#" class="btn btn-primary"  onclick="clearit()">Počisti</a>\n</p>')
                right = right.replace('<textarea', '<p>\n<textarea')
                right = right.replace('</textarea>', '</textarea>\n</p>')
                right = right.replace('editor.setSize(500', 'editor.setSize(\'100%\'')
                right = right.replace('<h2>Naloga</h2>', '<h4>Vaja</h4>\n')
                right = right.replace('<div style="width:500px">', '<div>')

                # write page
                file_right = open(cwd + "/right_" + file, "w", encoding="utf8")
                file_right.write(right)
                file_right.flush()
                file_right.close()

            # extract summary column content
            pattern = re.compile(r'<section class="page summary">(.*?)</section>', re.DOTALL)
            results = re.findall(pattern, html)
            if len(results) > 0:
                if (DEBUG): print("  - extracting summary column")
                middle = results[0]
                # fix HTML by removing unnecessary things...
                middle = middle.replace('<!-- Samostojno besedilo --> ', '')
                middle = middle.replace('  <div class=\'wrapper\'>\n<div class="splosna_obvezna_znanja">', '')
                middle = middle.replace('</div>\n</div>\n<div style="clear:both;height:1px;overflow:hidden;"></div>', '')
                middle = middle.replace('<div style="clear:both;height:1px;overflow:hidden;"></div>', '')
                middle = middle.replace(' <p><div align="justify">', '<p align="justify">')
                middle = middle.replace('<p><div align="justify">', '<p align="justify">')
                middle = middle.replace('</div></p>', '</p>')
                middle = middle.replace('\n\n', '\n')
                middle = middle.replace('\n\n', '\n')
                middle = middle.replace('\n\n', '\n')
                middle = middle.replace('<h1>', '\n<h1>')
                middle = middle.replace('<h2>', '\n<h2>')
                middle = middle.replace('<br />\n<br />\n', '</p>\n\n<p align="justify">')
                # fix image file paths
                middle = middle.replace('<img src="', '<img src="img/')
                # fix javascript file paths
                middle = middle.replace('h5utils.js', '../js/h5utils/h5utils.js')
                middle = middle.replace('jquery.jsPlumb-1.4.0-all.js', '../js/h5utils/jquery.jsPlumb-1.4.0-all.js')
                middle = middle.replace('jquery.ui.touch-punch.min.js', '../js/h5utils/jquery.ui.touch-punch.min.js')
                middle = middle.replace('jquery-1.9.0-min.js', '../js/h5utils/jquery-1.9.0-min.js')
                middle = middle.replace('jquery-ui-1.9.2-min.js', '../js/h5utils/jquery-ui-1.9.2-min.js')
                middle = middle.replace('sCript.js', '../js/h5utils/sCript.js')
				# fix source code snippets
                middle = middle.replace('<span class="tab1">', ' ')
                middle = middle.replace('<span class="tab2">', '  ')
                middle = middle.replace('<span class="tab3">', '   ')
                middle = middle.replace('<span class="tab4">', '    ')
                middle = middle.replace('<span class="tab5">', '     ')
                middle = middle.replace('<span class="tab6">', '      ')
                middle = middle.replace('<span class="tab7">', '       ')
                middle = middle.replace('<span class="tab8">', '        ')
                middle = middle.replace('<span class="tab9">', '         ')
                middle = middle.replace('<span class="tab10">', '          ')
                middle = middle.replace('<span class="tab11">', '           ')
                middle = middle.replace('<span class="tab12">', '            ')
                middle = middle.replace('<span class="tab13">', '             ')
                middle = middle.replace('<span class="tab14">', '              ')
                middle = middle.replace('<span class="tab15">', '               ')
                middle = middle.replace('<span class="tab16">', '                ')
                middle = middle.replace('<span class="tab17">', '                 ')
                middle = middle.replace('<span class="tab18">', '                  ')
                middle = middle.replace('<span class="tab19">', '                   ')
                middle = middle.replace('<span class="tab20">', '                    ')
                middle = middle.replace('<span class="tab21">', '                     ')
                middle = middle.replace('<span class="tab22">', '                      ')
                middle = middle.replace('<span class="tab23">', '                       ')
                middle = middle.replace('<span class="tab24">', '                        ')
                middle = middle.replace('<span class="tab25">', '                         ')
                middle = middle.replace('<span class="tab26">', '                          ')
                middle = middle.replace('<span class="tab27">', '                           ')
                middle = middle.replace('<span class="tab28">', '                            ')
                middle = middle.replace('<span class="tab29">', '                             ')
                middle = middle.replace('</span>', '')
                middle = middle.replace('<br />', '')
                middle = middle.replace('<link href="codeformatting.css" rel="stylesheet" type="text/css" />', '')
                middle = middle.replace('<button type="button" class="btn-blue"  onclick="runit()">Izvedi</button>', '<p>\n<a href="#" class="btn btn-primary"  onclick="runit()"><span class="fa fa-play"></span> Izvedi</a>')
                middle = middle.replace('<button type="button" class="btn-blue"  onclick="clearit()">Počisti</button>', '<a href="#" class="btn btn-primary"  onclick="clearit()">Počisti</a>\n</p>')
                middle = middle.replace('<textarea', '<p>\n<textarea')
                middle = middle.replace('</textarea>', '</textarea>\n</p>')
                middle = middle.replace('editor.setSize(500', 'editor.setSize(\'100%\'')
                middle = middle.replace('<h2>Naloga</h2>', '<h4>Vaja</h4>\n')
                middle = middle.replace('<div style="width:500px">', '<div>')

                # write page
                file_middle = open(cwd + "/summary_" + file, "w", encoding="utf8")
                file_middle.write(middle)
                file_middle.flush()
                file_middle.close()



def main():
    processFolder()

if __name__ == '__main__':
    main()
