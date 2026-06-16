"""Download media files from Strapi matching URLs found in built output."""
import urllib.request, os, re, concurrent.futures, sys

api_url = os.environ.get('GATSBY_API_URL', 'http://localhost:1337')
base = os.path.dirname(os.path.abspath(__file__))
dest_dir = os.path.join(base, 'public', 'uploads')
os.makedirs(dest_dir, exist_ok=True)

urls = set()
for root, dirs, files in os.walk(os.path.join(base, 'public')):
    for f in files:
        fp = os.path.join(root, f)
        try:
            with open(fp, 'rb') as fh:
                data = fh.read()
                for m in re.findall(rb'/uploads/[^"\' \\>]+', data):
                    d = m.decode('utf-8', errors='ignore')
                    if '/uploads/' in d and d != '/uploads/':
                        urls.add(d)
        except:
            pass

if not urls:
    print("No media URLs found in built output")
    sys.exit(0)

print(f"Found {len(urls)} unique media URLs")

def download(path):
    fname = path.split('/uploads/')[1]
    dest = os.path.join(dest_dir, fname)
    if os.path.exists(dest) and os.path.getsize(dest) > 0:
        return f"SKIP {fname}"
    try:
        urllib.request.urlretrieve(f'{api_url}{path}', dest)
        return f"OK {fname} ({os.path.getsize(dest)}b)"
    except Exception as e:
        return f"FAIL {fname}: {e}"

with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
    results = list(executor.map(download, urls))

ok = sum(1 for r in results if r.startswith('OK'))
skip = sum(1 for r in results if r.startswith('SKIP'))
fail = sum(1 for r in results if r.startswith('FAIL'))
print(f"Downloaded: {ok}, Skipped: {skip}, Failed: {fail}")
for r in results:
    if r.startswith('FAIL'):
        print(f"  {r}")
