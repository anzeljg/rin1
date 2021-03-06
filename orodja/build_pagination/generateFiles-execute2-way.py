# encoding=utf8
#-------------------------------------------------------------------------------
# Name:        generateFiles
# Purpose:     Generates individual HTML files (= pages) of the textbook
#              based on appropriate template
#
# Author:      Gregor Anzelj <gregor.anzelj@gmail.com>
#
# Created:     21.01.2016
# Copyright:   (c) Gregor Anzelj 2016
#-------------------------------------------------------------------------------

import os

structure = [
  {'id': '1101', 'pages': 3, 'lastInPrevUnit': 0, 'previous': None, 'next': '1102'},
  {'id': '1102', 'pages': 9, 'lastInPrevUnit': 3, 'previous': '1101', 'next': '1201'},
  {'id': '1201', 'pages': 12, 'lastInPrevUnit': 9, 'previous': '1102', 'next': '1202'},
  {'id': '1202', 'pages': 18, 'lastInPrevUnit': 12, 'previous': '1201', 'next': '1203'},
  {'id': '1203', 'pages': 12, 'lastInPrevUnit': 18, 'previous': '1202', 'next': '1204'},
  {'id': '1204', 'pages': 16, 'lastInPrevUnit': 12, 'previous': '1203', 'next': '1205'},
  {'id': '1205', 'pages': 18, 'lastInPrevUnit': 16, 'previous': '1204', 'next': '1206'},
  {'id': '1206', 'pages': 12, 'lastInPrevUnit': 18, 'previous': '1205', 'next': '1207'},
  {'id': '1207', 'pages': 16, 'lastInPrevUnit': 12, 'previous': '1206', 'next': '1208'},
  {'id': '1208', 'pages': 19, 'lastInPrevUnit': 16, 'previous': '1207', 'next': '1209'},
  {'id': '1209', 'pages': 23, 'lastInPrevUnit': 19, 'previous': '1208', 'next': '1210'},
  {'id': '1210', 'pages': 17, 'lastInPrevUnit': 23, 'previous': '1209', 'next': '1211'},
  {'id': '1211', 'pages': 21, 'lastInPrevUnit': 17, 'previous': '1210', 'next': '1212'},
  {'id': '1212', 'pages': 14, 'lastInPrevUnit': 21, 'previous': '1211', 'next': '1301'},
  {'id': '1301', 'pages': 14, 'lastInPrevUnit': 14, 'previous': '1212', 'next': '1302'},
  {'id': '1302', 'pages': 9, 'lastInPrevUnit': 14, 'previous': '1301', 'next': '1303'},
  {'id': '1303', 'pages': 8, 'lastInPrevUnit': 9, 'previous': '1302', 'next': '1304'},
  {'id': '1304', 'pages': 8, 'lastInPrevUnit': 8, 'previous': '1303', 'next': '1305'},
  {'id': '1305', 'pages': 7, 'lastInPrevUnit': 8, 'previous': '1304', 'next': '1306'},
  {'id': '1306', 'pages': 14, 'lastInPrevUnit': 7, 'previous': '1305', 'next': '1307'},
  {'id': '1307', 'pages': 10, 'lastInPrevUnit': 14, 'previous': '1306', 'next': '1308'},
  {'id': '1308', 'pages': 11, 'lastInPrevUnit': 10, 'previous': '1307', 'next': '1309'},
  {'id': '1309', 'pages': 11, 'lastInPrevUnit': 11, 'previous': '1308', 'next': '1310'},
  {'id': '1310', 'pages': 8, 'lastInPrevUnit': 11, 'previous': '1309', 'next': '1401'},
  {'id': '1401', 'pages': 7, 'lastInPrevUnit': 8, 'previous': '1310', 'next': '1402'},
  {'id': '1402', 'pages': 8, 'lastInPrevUnit': 7, 'previous': '1401', 'next': '1403'},
  {'id': '1403', 'pages': 11, 'lastInPrevUnit': 8, 'previous': '1402', 'next': '1404'},
  {'id': '1404', 'pages': 8, 'lastInPrevUnit': 11, 'previous': '1403', 'next': '1405'},
  {'id': '1405', 'pages': 9, 'lastInPrevUnit': 8, 'previous': '1404', 'next': '1406'},
  {'id': '1406', 'pages': 10, 'lastInPrevUnit': 9, 'previous': '1405', 'next': '1407'},
  {'id': '1407', 'pages': 8, 'lastInPrevUnit': 10, 'previous': '1406', 'next': '1408'},
  {'id': '1408', 'pages': 8, 'lastInPrevUnit': 8, 'previous': '1407', 'next': '1409'},
  {'id': '1409', 'pages': 8, 'lastInPrevUnit': 8, 'previous': '1408', 'next': '1501'},
  {'id': '1501', 'pages': 9, 'lastInPrevUnit': 8, 'previous': '1409', 'next': '1502'},
  {'id': '1502', 'pages': 6, 'lastInPrevUnit': 9, 'previous': '1501', 'next': '1503'},
  {'id': '1503', 'pages': 14, 'lastInPrevUnit': 6, 'previous': '1502', 'next': '1901'},
  {'id': '1901', 'pages': 7, 'lastInPrevUnit': 14, 'previous': '1503', 'next': None}
]

def generateFiles():
    cwd = os.getcwd()
    pastPages = 0  # total number of pages in previous units
    for unit in structure:
        template = 'template.html'
        if (unit['id'] >= '1101' and unit['id'] <= '1102'):
            template = 'template1.html'
        if (unit['id'] >= '1201' and unit['id'] <= '1212'):
            template = 'template2.html'
        if (unit['id'] >= '1301' and unit['id'] <= '1310'):
            template = 'template3.html'
        if (unit['id'] >= '1401' and unit['id'] <= '1409'):
            template = 'template4.html'
        if (unit['id'] >= '1501' and unit['id'] <= '1503'):
            template = 'template5.html'

        for page in range(0, unit['pages']):
            # open template and read contents
            contents = open(cwd + "/" + template, "r", encoding="utf8")
            html = contents.read()

            # Set active unit
            html = html.replace(
                '<li><a href="../' + unit['id'] + '/index.html">',
                '<li class="active"><a href="../' + unit['id'] + '/index.html">'
            )

            pagination = generatePagination(unit, page, pastPages)
            # Insert generated pagination
            html = html.replace(
                '\t\t\t\t<ul class="pagination pagination-sm"></ul>',
                pagination
            )

            # write page (= HTML file)
            if not os.path.exists(cwd + "/" + unit['id']):
                os.makedirs(cwd + "/" + unit['id'])
            if page == 0:
                filename =  cwd + "/" + unit['id'] + "/index.html"
            else:
                filename = cwd + "/" + unit['id'] + "/index" + str(page) + ".html"

            file = open(filename, "w", encoding="utf8")
            file.write(html)
            file.flush()
            file.close()

        pastPages += unit['pages']

def generatePagination(unit, currPage, pastPages):
    # Generate previous unit link
    if unit['previous'] != None:
        prevUnit = '../' + unit['previous'] + '/index.html'
    else:
        prevUnit = '../index.html'

    # Generate previous page link
    if unit['previous'] != None:
        if currPage == 0:
            prevPage = '../' + unit['previous'] + '/index' + str(unit['lastInPrevUnit'] - 1) + '.html'
        elif currPage == 1:
            prevPage = '../' + unit['id'] + '/index.html'
        else:
            prevPage = '../' + unit['id'] + '/index' + str(currPage - 1) + '.html'
    else:
        if currPage == 0:
            prevPage = '../index.html'
        elif currPage == 1:
            prevPage = '../' + unit['id'] + '/index.html'
        else:
            prevPage = '../' + unit['id'] + '/index' + str(currPage - 1) + '.html'

    # Generate next page link
    disPage = ''
    if unit['next'] != None:
        if currPage == unit['pages'] - 1:
            nextPage = '../' + unit['next'] + '/index.html'
        else:
            nextPage = '../' + unit['id'] + '/index' + str(currPage + 1) + '.html'
    else:
        if currPage == unit['pages'] - 1:
            nextPage = '#'
            disPage = ' class="disabled"'
        else:
            nextPage = '../' + unit['id'] + '/index' + str(currPage + 1) + '.html'

    # Generate next unit link
    if unit['next'] != None:
        nextUnit = '../' + unit['next'] + '/index.html'
        disUnit = ''
    else:
        nextUnit = '#'
        disUnit = ' class="disabled"'

    # Generate pagination
    html = '\t\t\t\t<ul class="pagination pagination-sm">\n'
    html += '\t\t\t\t\t<li><a href="' + prevUnit + '" aria-label="Previous Unit"><span aria-hidden="true">&laquo;</span></a></li>\n'
    html += '\t\t\t\t\t<li><a href="' + prevPage + '" aria-label="Previous Page"><span aria-hidden="true">&#x2039;</span></a></li>\n'

    for page in range(0, unit['pages']):
        if currPage == page:
            html += '\t\t\t\t\t<li class="active"><a href="#">' + str(page + pastPages + 1) + '</a></li>\n'
        else:
            if page == 0:
                html += '\t\t\t\t\t<li><a href="../' + unit['id'] + '/index.html">' + str(page + pastPages + 1) + '</a></li>\n'
            else:
                html += '\t\t\t\t\t<li><a href="../' + unit['id'] + '/index' + str(page) + '.html">' + str(page + pastPages + 1) + '</a></li>\n'

    html += '\t\t\t\t\t<li' + disPage + '><a href="' + nextPage + '" aria-label="Next Page"><span aria-hidden="true">&#x203A;</span></a></li>\n'
    html += '\t\t\t\t\t<li' + disUnit + '><a href="' + nextUnit + '" aria-label="Next Unit"><span aria-hidden="true">&raquo;</span></a></li>\n'
    html += '\t\t\t\t</ul>'

    return html


def main():
    generateFiles()


if __name__ == '__main__':
    main()
