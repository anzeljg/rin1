import os
import io
import re

for root, dirs, files in os.walk(".", topdown=False):
    for filename in files:
        # Only file with ".html" extension
        if os.path.splitext(filename)[1] == '.html':
            filepath = os.path.join(root, filename)

            file = io.open(filepath, 'r', encoding='utf8')

            prevUnit = ''
            prevPage = ''
            nextUnit = ''
            nextPage = ''
            currPage = ''

            for line in file:
                """
                # Previous chapter
                if 'aria-label="Previous Unit"' in line:
                    findObj = re.search(r'href="(.*?)"', line)
                    prevUnit = findObj.group(1)
                """
                # Previous page
                if 'aria-label="Previous Page"' in line:
                    findObj = re.search(r'href="(.*?)"', line)
                    prevPage = findObj.group(1)
                """
                # Current page
                if '<li class="active"><a href="#">' in line:
                    findObj = re.search(r'href="#">(.*?)<', line)
                    currPage = findObj.group(1)
                """
                # Next page
                if 'aria-label="Next Page"' in line:
                    findObj = re.search(r'href="(.*?)"', line)
                    nextPage = findObj.group(1)
                """
                # Next chapter
                if 'aria-label="Next Unit"' in line:
                    findObj = re.search(r'href="(.*?)"', line)
                    nextUnit = findObj.group(1)
                """
            file.close()

            file = io.open(filepath, 'r', encoding='utf8')
            content = file.read()
            file.close()

            data = content.replace('</body>', '\n<script>\ndocument.body.addEventListener("keydown", function (event) {\n    var code = event.keyCode || event.which;\n    var alt  = event.altKey;\n    if (alt && code === 33 /* Alt+PgUp */) {\n        window.location.replace("' + prevPage + '");\n    }\n    if (alt && code === 34 /* Alt+PgDn */) {\n        window.location.replace("' + nextPage + '");\n    }\n});\n</script>\n\n</body>')
            file = io.open(filepath, 'w', encoding='utf8')
            file.write(data)
            file.close()
