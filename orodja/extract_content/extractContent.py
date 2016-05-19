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

                # write page
                file_middle = open(cwd + "/summary_" + file, "w", encoding="utf8")
                file_middle.write(middle)
                file_middle.flush()
                file_middle.close()



def main():
    processFolder()

if __name__ == '__main__':
    main()
