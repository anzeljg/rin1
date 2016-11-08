# encoding=utf8
#-------------------------------------------------------------------------------
# Name:        updatePagination
# Purpose:     Generates pagination of individual HTML files (= pages)
#              of the textbook, by replacing existing pagination
#
# Author:      Gregor Anzelj <gregor.anzelj@gmail.com>
#
# Created:     03.11.2016
# Copyright:   (c) Gregor Anzelj 2016
#-------------------------------------------------------------------------------

import os
import re

def updatePagination(id, previous, next, pages, lastInPrevUnit, pastPages):
    cwd = os.getcwd()
    if previous == '': previous = None
    if next == '': next = None
    unit = {'id': id, 'pages': pages, 'lastInPrevUnit': lastInPrevUnit, 'previous': previous, 'next': next}

    for page in range(0, unit['pages']):
        if page == 0:
            filename =  cwd + "/index.html"
        else:
            filename = cwd + "/index" + str(page) + ".html"
        print(filename)
        # open file and read contents
        contents = open(filename, "r", encoding="utf8")
        html = contents.read()

        # Set active unit
        html = html.replace(
            '<li><a href="../' + unit['id'] + '/index.html">',
            '<li class="active"><a href="../' + unit['id'] + '/index.html">'
        )

        pagination = generatePagination(unit, page, pastPages)

        # Insert generated pagination
        html = re.sub('<ul class="pagination pagination-sm">.*</ul>', '<ul class="pagination pagination-sm"></ul>', html, flags=re.DOTALL)
        html = html.replace(
            '\t\t\t\t<ul class="pagination pagination-sm"></ul>',
            pagination
        )

        file = open(filename, "w", encoding="utf8")
        file.write(html)
        file.flush()
        file.close()

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
    print("Replace pagination in HTML files in this folder")
    print("===============================================")
    print()

    id = input("Enter current unit id (usually folder name, e.g. 1222): ")
    print("Enter current unit id (usually folder name, e.g. 1222): ", id)

    previous = input("Enter previous unit id (usually folder name, e.g. 1221; press Enter for None): ")
    print("Enter previous unit id (usually folder name, e.g. 1221): ", previous)
    next = input("Enter next unit id (usually folder name, e.g. 1223; press Enter for None): ")
    print("Enter next unit id (usually folder name, e.g. 1223): ", next)

    pages = int(input("Enter total number of pages in current unit: "))
    print("Enter total number of pages in current unit: ", pages)
    lastInPrevUnit = int(input("Enter number of pages in previous unit: "))
    print("Enter number of pages in previous unit: ", lastInPrevUnit)
    pastPages = int(input("Enter total number of pages in all previous units: "))
    print("Enter total number of pages in all previous units: ", pastPages)
    print()

    updatePagination(id, previous, next, pages, lastInPrevUnit, pastPages)

if __name__ == '__main__':
    main()
