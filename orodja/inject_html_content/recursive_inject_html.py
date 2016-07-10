import os
import io

for root, dirs, files in os.walk(".", topdown=False):
    for filename in files:
        # Only file with ".html" extension
        if os.path.splitext(filename)[1] == '.html':
            filepath = os.path.join(root, filename)

            file = io.open(filepath, 'r', encoding='utf8')
            content = file.read()
            file.close()

            data = content.replace('</body>', '\n<!-- CookieCuttr -->\n<script type="text/javascript" src="../cc/jquery.cookie.js"></script>\n<script type="text/javascript" src="../cc/jquery.cookiecuttr.js"></script>\n<link rel="stylesheet" href="../cc/cookiecuttr.css">\n<script type="text/javascript" src="../cc/google-analytics.js"></script>\n<script type="text/javascript" src="../cc/setup.cookiecuttr.js"></script>\n\n</body>')
            file = io.open(filepath, 'w', encoding='utf8')
            file.write(data)
            file.close()
